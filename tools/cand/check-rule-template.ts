import { readFileSync, existsSync } from "node:fs"
import { getPages } from "../lib/temper-addon-data/pages-bridge.ts"
import { generateTemperRuleTemplate } from "./rule-template.ts"
const DISK = "/var/home/walton/repos/akasha/temper/game-items-rules-core/src/generated/temper-rule-template.generated.ts"
const rows = (await getPages({ pageTypeSlug: "temper-rule-template", limit: 5000 })).rows
console.log("rows", rows.length)
let made: string
try { made = generateTemperRuleTemplate(rows) } catch (e) { console.log("THREW", String(e).replace(/\s+/g," ").slice(0,600)); process.exit(1) }
const disk = existsSync(DISK) ? readFileSync(DISK, "utf8") : ""
console.log("disk", disk.length, "made", made.length, disk === made ? "SAME" : "DIFF")
if (disk !== made) {
  const dl = disk.split("\n"), ml = made.split("\n")
  let shown = 0
  for (let i = 0; i < Math.max(dl.length, ml.length) && shown < 10; i++) {
    if (dl[i] !== ml[i]) { console.log(`line ${i+1}:`); console.log("  disk:", JSON.stringify(dl[i]?.slice(0,150))); console.log("  made:", JSON.stringify(ml[i]?.slice(0,150))); shown++ }
  }
  console.log("disk lines", dl.length, "made lines", ml.length)
}
