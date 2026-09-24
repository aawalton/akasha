import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { EngineColors } from "akasha/temper/eso/color/modules/engine-colors-reading/engine-colors-reading.module.code.ts"

export const COLORS_AT = "temper/eso/color/modules/engine-colors/engine-colors.data-table.data.json"

const GETTER = `
local held = __eso_colors_held
__eso_colors_held = nil
function GetInterfaceColor(colorType, field)
  local fields = held[colorType]
  local color = fields and fields[field]
  if color == nil then return 1, 1, 1, 1 end
  return color[1], color[2], color[3], color[4]
end
`

export function engineColorsTable(root: string = akashaRoot()): EngineColors {
  return JSON.parse(readFileSync(join(root, COLORS_AT), "utf8")) as EngineColors
}

export function colorsLua(table: EngineColors): string {
  const types = Object.entries(table.colors).map(([type, fields]) => {
    const inner = Object.entries(fields)
      .map(([field, color]) => `[${field}]={${color.join(",")}}`)
      .join(",")
    return `[${type}]={${inner}}`
  })
  return `__eso_colors_held = {${types.join(",")}}\n${GETTER}`
}
