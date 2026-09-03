import { readFileSync, existsSync } from "node:fs"
import { getPages } from "../lib/temper-addon-data/pages-bridge.ts"
import { generateTemperCharacterSkillActivation } from "./skill-activation.ts"
const DISK = "/var/home/walton/repos/akasha/temper/game-characters-skills/src/generated/temper-character-skill-activation.generated.ts"
const rows = (await getPages({ pageTypeSlug: "temper-character-skill-activation", limit: 5000, select: ["descriptionTemplate","activationEffects"] })).rows
console.log("rows", rows.length)
let made: string
try { made = generateTemperCharacterSkillActivation(rows) } catch (e) { console.log("THREW", String(e).replace(/\s+/g," ").slice(0,600)); process.exit(1) }
const disk = existsSync(DISK) ? readFileSync(DISK, "utf8") : ""
console.log("disk", disk.length, "made", made.length, disk === made ? "SAME" : "DIFF")
if (disk !== made) {
  const dl = disk.split("\n"), ml = made.split("\n")
  let shown = 0
  for (let i = 0; i < Math.max(dl.length, ml.length) && shown < 6; i++) {
    if (dl[i] !== ml[i]) { console.log(`line ${i+1}:`); console.log("  disk:", JSON.stringify(dl[i]?.slice(0,200))); console.log("  made:", JSON.stringify(ml[i]?.slice(0,200))); shown++ }
  }
  console.log("disk lines", dl.length, "made lines", ml.length)
}
