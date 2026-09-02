import { getPages } from "./lib/temper-addon-data/pages-bridge.ts"
for (const t of ["temper-companion-trait","temper-companion-armor-slot","temper-companion-weapon-slot","temper-companion-weapon-type","temper-companion-jewelry-slot","temper-companion-equipment-quality","temper-companion-skill","temper-companion-skill-slot","temper-quality-value"]) {
  try { const r = await getPages({ pageTypeSlug: t, limit: 1000 }); console.log(t, "rows", r.rows.length, JSON.stringify(r.rows[0]).slice(0,300)) }
  catch (e) { console.log(t, "FAIL", String(e).slice(0,200)) }
}
