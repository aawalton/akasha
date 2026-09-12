import type { BarSettings } from "akasha/temper/combat-addon/modules/combat-actions-saved-variables/combat-actions-saved-variables.module.code.ts"

function buildFont(name: string, size: number, style: string): string {
  return name + "|" + size + "|" + style
}

export function getLabelFont(s: BarSettings): string {
  return buildFont(s.barLabelFontName, s.barLabelFontSize, s.barLabelFontStyle)
}

export function getStackLabelFont(s: BarSettings): string {
  return buildFont(s.barStackLabelFontName, s.barStackLabelFontSize, s.barStackLabelFontStyle)
}
