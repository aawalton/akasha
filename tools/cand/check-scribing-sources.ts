import { readFileSync, existsSync } from "node:fs"
import { getPages } from "../lib/temper-addon-data/pages-bridge.ts"
import { generateTemperScribingSources } from "./scribing-sources.ts"
const DISK = "/var/home/walton/repos/akasha/temper/player-completion-addon/src/generated/scribing-sources.generated.ts"
const sources = (await getPages({ pageTypeSlug: "temper-scribing-source", limit: 5000 })).rows
const zones = (await getPages({ pageTypeSlug: "temper-zone", limit: 5000 })).rows
console.log("sources", sources.length, "zones", zones.length)
let made: string
try { made = generateTemperScribingSources(sources, zones) } catch (e) { console.log("THREW", String(e).replace(/\s+/g," ").slice(0,500)); process.exit(1) }
const disk = existsSync(DISK) ? readFileSync(DISK, "utf8") : ""
console.log("disk", disk.length, "made", made.length, disk === made ? "SAME" : "DIFF")
if (disk !== made) {
  const dl = disk.split("\n"), ml = made.split("\n")
  let shown = 0
  for (let i = 0; i < Math.max(dl.length, ml.length) && shown < 8; i++) {
    if (dl[i] !== ml[i]) { console.log(`line ${i+1}:`); console.log("  disk:", JSON.stringify(dl[i]?.slice(0,170))); console.log("  made:", JSON.stringify(ml[i]?.slice(0,170))); shown++ }
  }
  console.log("disk lines", dl.length, "made lines", ml.length)
}
