import { readFileSync, existsSync } from "node:fs"
import { getPages } from "../lib/temper-addon-data/pages-bridge.ts"
import { generateTemperCompanionSkill } from "./companion-skill.ts"
const DISK = "/var/home/walton/repos/akasha/temper/game-companions-core/src/generated/temper-companion-skill.generated.ts"
const rows = (await getPages({ pageTypeSlug: "temper-companion-skill", limit: 5000 })).rows
console.log("rows", rows.length)
let made: string
try { made = generateTemperCompanionSkill(rows) } catch (e) { console.log("THREW", String(e).replace(/\s+/g," ").slice(0,500)); process.exit(1) }
const disk = existsSync(DISK) ? readFileSync(DISK, "utf8") : ""
console.log("disk", disk.length, "made", made.length, disk === made ? "SAME" : "DIFF")
const dl = disk.split("\n"), ml = made.split("\n")
const onlyDisk = dl.filter(l=>!ml.includes(l)), onlyMade = ml.filter(l=>!dl.includes(l))
console.log("only on disk:", onlyDisk.length, " only in made:", onlyMade.length)
const kinds = (ls: string[]) => { const c: Record<string,number> = {}; for (const l of ls) { const m = /^\s*([A-Za-z]+):/.exec(l); const k = m ? m[1] : "(other)"; c[k]=(c[k]??0)+1 } return c }
console.log("disk-only field kinds:", JSON.stringify(kinds(onlyDisk)))
console.log("made-only field kinds:", JSON.stringify(kinds(onlyMade)))
for (const l of onlyDisk.slice(0,6)) console.log("  -", l.slice(0,150))
for (const l of onlyMade.slice(0,6)) console.log("  +", l.slice(0,150))
