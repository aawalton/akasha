import { getPages } from "./lib/temper-addon-data/pages-bridge.ts"
const r = await getPages({ pageTypeSlug: "temper-armor-trait", limit: 1000 })
console.log("rows", r.rows.length)
for (const row of r.rows.slice(0, 3)) console.log(JSON.stringify(row).slice(0, 500))
const withEffects = r.rows.filter((x: any) => x.effects !== undefined)
console.log("rows carrying effects inline:", withEffects.length)
if (withEffects[0]) console.log(JSON.stringify((withEffects[0] as any).effects).slice(0, 400))
