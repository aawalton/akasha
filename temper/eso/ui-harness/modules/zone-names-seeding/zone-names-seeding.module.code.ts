import { ZONE_NAMES_EN_00 } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-names-en-00/zone-names-en-00.module.code.ts"
import { ZONE_NAMES_EN_01 } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-names-en-01/zone-names-en-01.module.code.ts"
import { ZONE_NAMES_EN_02 } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-names-en-02/zone-names-en-02.module.code.ts"
import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"

const TABLES: readonly Readonly<Record<number, string>>[] = [
  ZONE_NAMES_EN_00,
  ZONE_NAMES_EN_01,
  ZONE_NAMES_EN_02,
]

export function zoneNamesLua(): string {
  const rows: string[] = []
  for (const table of TABLES) {
    for (const [id, name] of Object.entries(table)) {
      rows.push(`[${id}] = ${luaStringLiteral(name)}`)
    }
  }
  return [
    `local names = {${rows.join(", ")}}`,
    'GetZoneNameById = function(zoneId) return names[zoneId] or "" end',
    `return ${String(rows.length)}`,
  ].join("\n")
}
