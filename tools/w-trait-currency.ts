// Compares the on-disk generated trait tables against the live pages, field by
// field, without going through the sidecar plumbing that no longer resolves.
import { getPages } from "./lib/temper-addon-data/pages-bridge.ts"
const G = "/var/home/walton/repos/akasha/temper/game-characters-equipment/src/traits"
type Row = Record<string, any>
const jobs: [string, string, string][] = [
  ["temper-armor-trait", `${G}/generated/temper-armor-trait.generated.ts`, "TEMPER_ARMOR_TRAITS_BY_ID"],
  ["temper-weapon-trait", `${G}/generated/temper-weapon-trait.generated.ts`, "TEMPER_WEAPON_TRAITS_BY_ID"],
  ["temper-jewelry-trait", `${G}/generated/temper-jewelry-trait.generated.ts`, "TEMPER_JEWELRY_TRAITS_BY_ID"],
]
for (const [slug, file, constName] of jobs) {
  const table = (await import(file))[constName] as Record<string, Row>
  const { rows } = await getPages({ pageTypeSlug: slug, limit: 1000 })
  const pages = (rows as Row[]).slice().sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  const tableKeys = Object.keys(table)
  const pageKeys = pages.map((p) => p.key)
  const orderSame = JSON.stringify(tableKeys) === JSON.stringify(pageKeys)
  const missing = pageKeys.filter((k) => !tableKeys.includes(k))
  const extra = tableKeys.filter((k) => !pageKeys.includes(k))
  const drift: string[] = []
  for (const p of pages) {
    const t = table[p.key]
    if (t === undefined) continue
    for (const [tk, pk] of [["name", "title"], ["material", "material"], ["effect", "effect"], ["esoTraitConstantName", "esoTraitConstantName"]] as const) {
      if (p[pk] !== undefined && t[tk] !== p[pk]) drift.push(`${p.key}.${tk}: table=${JSON.stringify(t[tk])} page=${JSON.stringify(p[pk])}`)
    }
    const pageEffects = (p.effects ?? []) as Row[]
    const tableEffects = (t.effects ?? []) as Row[]
    if (pageEffects.length !== tableEffects.length) drift.push(`${p.key}.effects: table=${tableEffects.length} page=${pageEffects.length}`)
    else for (const [i, pe] of pageEffects.entries()) {
      const te = tableEffects[i]
      if (te?.metricId !== pe.metricId) drift.push(`${p.key}.effects[${i}].metricId: table=${JSON.stringify(te?.metricId)} page=${JSON.stringify(pe.metricId)}`)
    }
  }
  console.log(`${slug}: n_table=${tableKeys.length} n_pages=${pageKeys.length} orderSame=${orderSame} missing=${JSON.stringify(missing)} extra=${JSON.stringify(extra)} drift=${drift.length}`)
  for (const d of drift.slice(0, 8)) console.log("   " + d)
}
