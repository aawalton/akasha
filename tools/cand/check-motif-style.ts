import { readFileSync, existsSync } from "node:fs"
import { getPages } from "../lib/temper-addon-data/pages-bridge.ts"
import { generateTemperMotifStyle } from "./motif-style.ts"
const DISK = "/var/home/walton/repos/akasha/temper/player-completion-addon/src/generated/motif-style-lookup.generated.ts"
const motifs = (await getPages({ pageTypeSlug: "temper-motif-style", limit: 5000 })).rows
const sources = (await getPages({ pageTypeSlug: "temper-scribing-source", limit: 5000 })).rows
console.log("motifs", motifs.length, "sources", sources.length)
let made: string
try { made = generateTemperMotifStyle(motifs, sources) } catch (e) { console.log("THREW", String(e).replace(/\s+/g," ").slice(0,400)); process.exit(1) }
const disk = existsSync(DISK) ? readFileSync(DISK, "utf8") : ""
console.log("disk", disk.length, "made", made.length, disk === made ? "SAME" : "DIFF")
if (disk !== made) {
  const dl = disk.split("\n"), ml = made.split("\n")
  let shown = 0
  for (let i = 0; i < Math.max(dl.length, ml.length) && shown < 6; i++) {
    if (dl[i] !== ml[i]) { console.log(`line ${i+1}:`); console.log("  disk:", JSON.stringify(dl[i]?.slice(0,170))); console.log("  made:", JSON.stringify(ml[i]?.slice(0,170))); shown++ }
  }
  console.log("disk lines", dl.length, "made lines", ml.length)
}
