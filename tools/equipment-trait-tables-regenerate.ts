import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { getPages } from "./lib/temper-addon-data/pages-bridge.ts"
import { withSidecars } from "./lib/temper-addon-data/catalog-sidecars.ts"
import { generateTemperArmorTrait } from "@akasha/temper-addon-generators/temper-armor-trait"
import { generateTemperEsoTraitMap } from "@akasha/temper-addon-generators/temper-eso-trait-map"
import { generateTemperJewelryTrait } from "@akasha/temper-addon-generators/temper-jewelry-trait"
import { generateTemperWeaponTrait } from "@akasha/temper-addon-generators/temper-weapon-trait"

const OUT = "/tmp/claude-1000/-var-home-walton-repos/9aea5a77-be7d-4e9c-949a-307cd524e85a/scratchpad/w/gen"
const DISK = "/var/home/walton/repos/akasha/temper/game-characters-equipment/src/traits/generated"


async function rowsOf(slug: string) {
  const r = await getPages({ pageTypeSlug: slug, limit: 1000 })
  return withSidecars(slug, r.rows)
}
const jobs: [string, string, () => Promise<string>][] = [
  ["temper-armor-trait.generated.ts", "temper-armor-trait", async () => generateTemperArmorTrait(await rowsOf("temper-armor-trait"))],
  ["temper-weapon-trait.generated.ts", "temper-weapon-trait", async () => generateTemperWeaponTrait(await rowsOf("temper-weapon-trait"))],
  ["temper-jewelry-trait.generated.ts", "temper-jewelry-trait", async () => generateTemperJewelryTrait(await rowsOf("temper-jewelry-trait"))],
  ["temper-eso-trait-map.generated.ts", "temper-eso-trait-map", async () => generateTemperEsoTraitMap(await rowsOf("temper-eso-trait-map"))],
]
for (const [name, , run] of jobs) {
  let source: string
  try { source = await run() } catch (e) { console.log(`THREW ${name}: ${String(e).slice(0, 240)}`); continue }
  const had = existsSync(join(DISK, name)) ? readFileSync(join(DISK, name), "utf8") : "<<ABSENT>>"
  writeFileSync(join(OUT, name), source)
  console.log(`${had === source ? "SAME " : "DIFF "} ${name}  disk=${had.length} gen=${source.length}`)
}
