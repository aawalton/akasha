import { readFileSync, existsSync } from "node:fs"
import { getPages } from "../lib/temper-addon-data/pages-bridge.ts"
import { withSidecars } from "../lib/temper-addon-data/catalog-sidecars.ts"
import { generateTemperEsoCompanion } from "@akasha/temper-addon-generators/temper-eso-companion"
import { generateTemperCompanionArmorSlot } from "@akasha/temper-addon-generators/temper-companion-armor-slot"
import { generateTemperCompanionBaseRole } from "@akasha/temper-addon-generators/temper-companion-base-role"
import { generateTemperCompanionRole } from "@akasha/temper-addon-generators/temper-companion-role"
import { generateTemperEsoCompanionEquipmentConstant } from "@akasha/temper-addon-generators/temper-eso-companion-equipment-constant"
const C = "/var/home/walton/repos/akasha/temper/game-companions-core/src/generated"
const E = "/var/home/walton/repos/akasha/temper/game-characters-equipment/src/traits/generated"
const rowsOf = async (s: string) => withSidecars(s, (await getPages({ pageTypeSlug: s, limit: 5000 })).rows)
const jobs: [string, string, () => Promise<string>][] = [
  [C, "temper-eso-companion.generated.ts", async () => generateTemperEsoCompanion(await rowsOf("temper-eso-companion"))],
  [C, "temper-companion-armor-slot.generated.ts", async () => generateTemperCompanionArmorSlot(await rowsOf("temper-companion-armor-slot"))],
  [C, "temper-companion-base-role.generated.ts", async () => generateTemperCompanionBaseRole(await rowsOf("temper-companion-base-role"))],
  [C, "temper-companion-role.generated.ts", async () => generateTemperCompanionRole(await rowsOf("temper-companion-role"))],
  [E, "temper-eso-companion-equipment-constant.generated.ts", async () => generateTemperEsoCompanionEquipmentConstant(await rowsOf("temper-eso-companion-equipment-constant"))],
]
for (const [dir, name, run] of jobs) {
  const made = await run()
  const path = `${dir}/${name}`
  const disk = existsSync(path) ? readFileSync(path, "utf8") : ""
  console.log(`\n### ${name}  disk=${disk.length} made=${made.length} ${disk===made?"SAME":"DIFF"}`)
  if (disk === made) continue
  const dl = disk.split("\n"), ml = made.split("\n")
  const onlyD = dl.filter(l=>!ml.includes(l)), onlyM = ml.filter(l=>!dl.includes(l))
  console.log(`  only on disk ${onlyD.length}, only in made ${onlyM.length}`)
  for (const l of onlyD.slice(0,5)) console.log("   -", l.slice(0,150))
  for (const l of onlyM.slice(0,5)) console.log("   +", l.slice(0,150))
}
