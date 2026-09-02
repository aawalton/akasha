// The companion-skill and eso-companion generators cannot run today, so this
// compares the on-disk tables against the live pages directly instead.
import { getPages } from "./lib/temper-addon-data/pages-bridge.ts"
const G = "/var/home/walton/repos/akasha/temper/game-companions-core/src"
type Row = Record<string, any>

const skills = (await import(`${G}/generated/temper-companion-skill.generated.ts`)).companionSkillsFromPages
const skillPages = (await getPages({ pageTypeSlug: "temper-companion-skill", limit: 1000 })).rows as Row[]
const wantOrder = skillPages.slice().sort((a, b) => {
  const sa = a.key === "no-skill" ? 0 : 1, sb = b.key === "no-skill" ? 0 : 1
  if (sa !== sb) return sa - sb
  return String(a.key).localeCompare(String(b.key))
}).map((p) => p.key)
const haveOrder = skills.ids as string[]
console.log(`companion-skill: table=${haveOrder.length} pages=${wantOrder.length} orderSame=${JSON.stringify(haveOrder) === JSON.stringify(wantOrder)}`)
let moved = -1
for (let i = 0; i < Math.max(haveOrder.length, wantOrder.length); i++) if (haveOrder[i] !== wantOrder[i]) { moved = i; break }
if (moved >= 0) console.log(`   first index that differs: ${moved} table=${haveOrder[moved]} pages=${wantOrder[moved]}`)
console.log(`   only in pages: ${JSON.stringify(wantOrder.filter((k) => !haveOrder.includes(k)))}`)
console.log(`   only in table: ${JSON.stringify(haveOrder.filter((k) => !wantOrder.includes(k)))}`)
let drift = 0
for (const p of skillPages) {
  const t = skills.data[p.key]
  if (!t) continue
  if (t.abilityId !== p.abilityId) { console.log(`   ${p.key}.abilityId table=${t.abilityId} page=${p.abilityId}`); drift++ }
  if (t.name !== p.title) { console.log(`   ${p.key}.name table=${JSON.stringify(t.name)} page=${JSON.stringify(p.title)}`); drift++ }
  if (t.skillType !== p.skillType) { console.log(`   ${p.key}.skillType table=${t.skillType} page=${p.skillType}`); drift++ }
  if (t.companionId !== p.companionId) { console.log(`   ${p.key}.companionId table=${t.companionId} page=${p.companionId}`); drift++ }
}
console.log(`   field drift: ${drift}`)

const companions = (await import(`${G}/generated/temper-eso-companion.generated.ts`)).companionsFromPages
const cPages = (await getPages({ pageTypeSlug: "temper-eso-companion", limit: 1000 })).rows as Row[]
const cWant = cPages.slice().sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)).map((p) => p.key)
console.log(`eso-companion: table=${companions.ids.length} pages=${cWant.length} idsInTable=${JSON.stringify(companions.ids)}`)
console.log(`   pages by displayOrder: ${JSON.stringify(cWant)}`)
let cd = 0
for (const p of cPages) {
  const t = companions.data[p.key]
  if (!t) continue
  if (t.name !== p.title) { console.log(`   ${p.key}.name table=${JSON.stringify(t.name)} page=${JSON.stringify(p.title)}`); cd++ }
  if (t.esoCompanionId !== p.esoCompanionId) { console.log(`   ${p.key}.esoCompanionId table=${t.esoCompanionId} page=${p.esoCompanionId}`); cd++ }
}
console.log(`   field drift: ${cd}`)
