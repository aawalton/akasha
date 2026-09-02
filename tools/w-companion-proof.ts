import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { getPages } from "./lib/temper-addon-data/pages-bridge.ts"
import { withSidecars } from "./lib/temper-addon-data/catalog-sidecars.ts"
import { generateTemperEsoCompanion } from "@akasha/temper-addon-generators/temper-eso-companion"
import { generateTemperCompanionActivationBuff } from "@akasha/temper-addon-generators/temper-companion-activation-buff"
import { generateTemperCompanionArmorSlot } from "@akasha/temper-addon-generators/temper-companion-armor-slot"
import { generateTemperCompanionBaseRole } from "@akasha/temper-addon-generators/temper-companion-base-role"
import { generateTemperCompanionEquipmentQuality } from "@akasha/temper-addon-generators/temper-companion-equipment-quality"
import { generateTemperCompanionJewelrySlot } from "@akasha/temper-addon-generators/temper-companion-jewelry-slot"
import { generateTemperCompanionPassiveMetric } from "@akasha/temper-addon-generators/temper-companion-passive-metric"
import { generateTemperCompanionRole } from "@akasha/temper-addon-generators/temper-companion-role"
import { generateTemperCompanionSkill } from "@akasha/temper-addon-generators/temper-companion-skill"
import { generateTemperCompanionSkillLine } from "@akasha/temper-addon-generators/temper-companion-skill-line"
import { generateTemperCompanionSkillSlot } from "@akasha/temper-addon-generators/temper-companion-skill-slot"
import { generateTemperCompanionTrait } from "@akasha/temper-addon-generators/temper-companion-trait"
import { generateTemperCompanionWeaponRole } from "@akasha/temper-addon-generators/temper-companion-weapon-role"
import { generateTemperCompanionWeaponSlot } from "@akasha/temper-addon-generators/temper-companion-weapon-slot"
import { generateTemperCompanionWeaponType } from "@akasha/temper-addon-generators/temper-companion-weapon-type"

const OUT = "/tmp/claude-1000/-var-home-walton-repos/9aea5a77-be7d-4e9c-949a-307cd524e85a/scratchpad/w/gen"
const DISK = "/var/home/walton/repos/akasha/temper/game-companions-core/src/generated"
const PAGES = "/var/home/walton/repos/akasha/akasha/temper/temper-catalog"

// Build the sidecar map from the jsonl files on disk, since the store index
// holds no page type named temper-quality-value / temper-metric-effect.
const sidecars = new Map<string, { at: number; values: Record<string, unknown> }[]>()
function scan(dir: string): void {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) { scan(full); continue }
    if (!name.endsWith(".jsonl")) continue
    const bits = name.slice(0, -6).split(".")
    if (bits.length !== 3) continue
    const [named, pageType, key] = bits
    const mark = `${pageType} ${named} ${key}`
    const held = readFileSync(full, "utf8").trim().split("\n").filter(Boolean)
      .map((line, at) => ({ at, values: JSON.parse(line) as Record<string, unknown> }))
    sidecars.set(mark, held)
  }
}
scan(PAGES)
console.log("sidecar marks", sidecars.size)

async function rowsOf(slug: string, select?: readonly string[]) {
  const r = await getPages({ pageTypeSlug: slug, limit: 1000, ...(select ? { select } : {}) })
  return withSidecars(slug, r.rows, sidecars as never)
}

const COMPANION_SKILL_SELECT = JSON.parse(process.env.CSS ?? "null")
const jobs: [string, () => Promise<string>][] = [
  ["temper-eso-companion.generated.ts", async () => generateTemperEsoCompanion(await rowsOf("temper-eso-companion"))],
  ["temper-companion-activation-buff.generated.ts", async () => generateTemperCompanionActivationBuff(await rowsOf("temper-companion-activation-buff"))],
  ["temper-companion-armor-slot.generated.ts", async () => generateTemperCompanionArmorSlot(await rowsOf("temper-companion-armor-slot"))],
  ["temper-companion-base-role.generated.ts", async () => generateTemperCompanionBaseRole(await rowsOf("temper-companion-base-role"))],
  ["temper-companion-equipment-quality.generated.ts", async () => generateTemperCompanionEquipmentQuality(await rowsOf("temper-companion-equipment-quality"))],
  ["temper-companion-jewelry-slot.generated.ts", async () => generateTemperCompanionJewelrySlot(await rowsOf("temper-companion-jewelry-slot"))],
  ["temper-companion-passive-metric.generated.ts", async () => generateTemperCompanionPassiveMetric(await rowsOf("temper-companion-passive-metric"))],
  ["temper-companion-role.generated.ts", async () => generateTemperCompanionRole(await rowsOf("temper-companion-role"))],
  ["temper-companion-skill.generated.ts", async () => generateTemperCompanionSkill(await rowsOf("temper-companion-skill", COMPANION_SKILL_SELECT ?? undefined))],
  ["temper-companion-skill-line.generated.ts", async () => generateTemperCompanionSkillLine(await rowsOf("temper-companion-skill-line"))],
  ["temper-companion-skill-slot.generated.ts", async () => generateTemperCompanionSkillSlot(await rowsOf("temper-companion-skill-slot"))],
  ["temper-companion-trait.generated.ts", async () => generateTemperCompanionTrait(await rowsOf("temper-companion-trait"))],
  ["temper-companion-weapon-role.generated.ts", async () => generateTemperCompanionWeaponRole(await rowsOf("temper-companion-weapon-role"))],
  ["temper-companion-weapon-slot.generated.ts", async () => generateTemperCompanionWeaponSlot(await rowsOf("temper-companion-weapon-slot"))],
  ["temper-companion-weapon-type.generated.ts", async () => generateTemperCompanionWeaponType(await rowsOf("temper-companion-weapon-type"))],
]
for (const [name, run] of jobs) {
  let source: string
  try { source = await run() } catch (e) { console.log(`THREW ${name}: ${String(e).slice(0, 300)}`); continue }
  const onDisk = join(DISK, name)
  const had = existsSync(onDisk) ? readFileSync(onDisk, "utf8") : "<<ABSENT>>"
  writeFileSync(join(OUT, name), source)
  console.log(`${had === source ? "SAME " : "DIFF "} ${name}  disk=${had.length} gen=${source.length}`)
}
