import { readFileSync, existsSync } from "node:fs"
import { getPages } from "../lib/temper-addon-data/pages-bridge.ts"
import { withSidecars } from "../lib/temper-addon-data/catalog-sidecars.ts"
import { generateTemperEsoCompanion } from "./temper-eso-companion.ts"
import { generateTemperCompanionArmorSlot } from "./temper-companion-armor-slot.ts"
import { generateTemperCompanionBaseRole } from "./temper-companion-base-role.ts"
import { generateTemperCompanionRole } from "./temper-companion-role.ts"
import { generateTemperEsoCompanionEquipmentConstant } from "./temper-eso-companion-equipment-constant.ts"
const C = "/var/home/walton/repos/akasha/temper/game-companions-core/src/generated"
const I = "/var/home/walton/repos/akasha/temper/game-items-core/src/generated"
const rowsOf = async (s: string) => withSidecars(s, (await getPages({ pageTypeSlug: s, limit: 5000 })).rows)
const jobs: [string, string, () => Promise<string>][] = [
  [C, "temper-eso-companion.generated.ts", async () => generateTemperEsoCompanion(await rowsOf("temper-eso-companion"))],
  [C, "temper-companion-armor-slot.generated.ts", async () => generateTemperCompanionArmorSlot(await rowsOf("temper-companion-armor-slot"))],
  [C, "temper-companion-base-role.generated.ts", async () => generateTemperCompanionBaseRole(await rowsOf("temper-companion-base-role"))],
  [C, "temper-companion-role.generated.ts", async () => generateTemperCompanionRole(await rowsOf("temper-companion-role"))],
  [I, "temper-eso-companion-equipment-constant.generated.ts", async () => generateTemperEsoCompanionEquipmentConstant(await rowsOf("temper-eso-companion-equipment-constant"))],
]
for (const [dir, name, run] of jobs) {
  const made = await run()
  const path = `${dir}/${name}`
  const disk = existsSync(path) ? readFileSync(path, "utf8") : ""
  console.log(`${disk===made?"SAME":"DIFF"}  ${name.padEnd(50)} disk=${disk.length} made=${made.length}`)
  if (disk !== made) {
    const dl = disk.split("\n"), ml = made.split("\n")
    for (const l of dl.filter(l=>!ml.includes(l)).slice(0,3)) console.log("   -", l.slice(0,140))
    for (const l of ml.filter(l=>!dl.includes(l)).slice(0,3)) console.log("   +", l.slice(0,140))
  }
}
