import "../writ-smith-request-items/writ-smith-request-items.module.code.ts"
import type { Improvement } from "../writ-smith-schema-types/writ-smith-schema-types.module.code.ts"

export const PURPLE: Improvement = {
  index: 4,
  name: "",
  green_mat_ct: 2,
  blue_mat_ct: 3,
  purple_mat_ct: 4,
  gold_mat_ct: 0,
}

export const GOLD: Improvement = {
  index: 5,
  name: "",
  green_mat_ct: 2,
  blue_mat_ct: 3,
  purple_mat_ct: 4,
  gold_mat_ct: 8,
}

export const GREEN_JEWELRY: Improvement = {
  index: 2,
  name: "",
  green_mat_ct: 2,
  blue_mat_ct: 0,
  purple_mat_ct: 0,
  gold_mat_ct: 0,
}

export const BLUE_JEWELRY: Improvement = {
  index: 3,
  name: "",
  green_mat_ct: 2,
  blue_mat_ct: 3,
  purple_mat_ct: 0,
  gold_mat_ct: 0,
}

export const PURPLE_JEWELRY: Improvement = {
  index: 4,
  name: "",
  green_mat_ct: 2,
  blue_mat_ct: 3,
  purple_mat_ct: 4,
  gold_mat_ct: 0,
}

export const GOLD_JEWELRY: Improvement = {
  index: 5,
  name: "",
  green_mat_ct: 2,
  blue_mat_ct: 3,
  purple_mat_ct: 4,
  gold_mat_ct: 8,
}

export const QUALITY: Record<number, Improvement | undefined> = {
  [4]: PURPLE,
  [5]: GOLD,
}

export const QUALITY_JEWELRY: Record<number, Improvement | undefined> = {
  [2]: GREEN_JEWELRY,
  [3]: BLUE_JEWELRY,
  [4]: PURPLE_JEWELRY,
  [5]: GOLD_JEWELRY,
}

export function smithingInit(this: void): undefined {
  const siLookup = TemperWrit.SI
  const colorized: Record<number, string | undefined> = {}
  for (let quality = 1; quality <= 5; quality += 1) {
    const qualityText =
      (siLookup !== undefined ? siLookup("SI_ITEMQUALITY" + tostring(quality)) : undefined) ?? ""
    const [r, g, b, alpha] = GetInterfaceColor(INTERFACE_COLOR_TYPE_ITEM_QUALITY_COLORS, quality)
    const colorDef = ZO_ColorDef.New(r, g, b, alpha)
    colorized[quality] = colorDef.Colorize(qualityText)
  }
  TemperWrit.COLORIZED_QUALITY = colorized

  PURPLE.name = colorized[4] ?? ""
  GOLD.name = colorized[5] ?? ""
  GREEN_JEWELRY.name = colorized[2] ?? ""
  BLUE_JEWELRY.name = colorized[3] ?? ""
  PURPLE_JEWELRY.name = colorized[4] ?? ""
  GOLD_JEWELRY.name = colorized[5] ?? ""
}
