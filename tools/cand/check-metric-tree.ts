import { readFileSync, existsSync } from "node:fs"
import { getPages } from "../lib/temper-addon-data/pages-bridge.ts"
import { generateTemperMetricTree } from "./metric-tree.ts"
const DISK = "/var/home/walton/repos/akasha/temper/game-characters-stats/src/generated/metric-tree.generated.ts"
const rows = (await getPages({ pageTypeSlug: "temper-metric-tree", limit: 5000 })).rows
console.log("rows", rows.length)
let made: string
try { made = generateTemperMetricTree(rows) } catch (e) { console.log("THREW", String(e).replace(/\s+/g," ").slice(0,500)); process.exit(1) }
const disk = existsSync(DISK) ? readFileSync(DISK, "utf8") : ""
console.log("disk", disk.length, "made", made.length, disk === made ? "SAME" : "DIFF")
if (disk !== made) {
  const dl = disk.split("\n"), ml = made.split("\n")
  console.log("disk lines", dl.length, "made lines", ml.length)
  for (let i = 0; i < Math.max(dl.length, ml.length); i++) {
    if (dl[i] !== ml[i]) { console.log(`first at line ${i+1}:`); console.log("  disk:", JSON.stringify(dl[i]?.slice(0,140))); console.log("  made:", JSON.stringify(ml[i]?.slice(0,140))); break }
  }
  console.log("only on disk:", dl.filter(l=>!ml.includes(l)).length, "only in made:", ml.filter(l=>!dl.includes(l)).length)
}
