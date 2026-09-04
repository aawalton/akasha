import { asGlobalTable, asNumber } from "../journal-casts/journal-casts.module.code.ts"
import { LCCC } from "../journal-lccc/journal-lccc.module.code.ts"
import { Internal, Public } from "../journal-state/journal-state.module.code.ts"

const DEFAULTS: Record<number, Record<number, number>> = {
  [1]: {
    [1]: 0x00ff00,
    [2]: 0xff0000,
    [3]: 0xffff00,
  },
  [2]: {
    [0]: 0x333333,
    [1]: 0x3399ff,
    [2]: 0x777766,
  },
}

const CURRENT: { rows: Record<number, Record<number, number | undefined>> } = { rows: {} }

function validate(this: void, m: number, n: number): boolean {
  return (
    (m === 1 && (n === 1 || n === 2 || n === 3)) || (m === 2 && (n === 0 || n === 1 || n === 2))
  )
}

Internal.LoadTooltipColors = (): undefined => {
  CURRENT.rows = LibExtendedJournalTooltipColors ?? {}
  CURRENT.rows[1] = CURRENT.rows[1] ?? {}
  CURRENT.rows[2] = CURRENT.rows[2] ?? {}
}

Public.GetTooltipColor = (m: number, n: number): number => {
  if (validate(m, n)) {
    const currentRow = CURRENT.rows[m]
    const fromCurrent = currentRow !== undefined ? currentRow[n] : undefined
    return fromCurrent ?? asNumber(DEFAULTS[m]?.[n])
  }
  return 0
}

Public.GetTooltipColorUnpacked = (
  m: number,
  n: number
): LuaMultiReturn<[number, number, number]> => {
  return LCCC.Int24ToRGB(Public.GetTooltipColor(m, n))
}

Public.SetTooltipColor = (m: number, n: number, color?: number, ...rgba: number[]): undefined => {
  if (validate(m, n)) {
    let colorLocal = color
    const g = rgba[0]
    const b = rgba[1]
    if (type(g) === "number" && type(b) === "number") {
      colorLocal = LCCC.RGBToInt24(asNumber(color), asNumber(g), asNumber(b))
    }
    const defaultsRow = DEFAULTS[m]
    const currentRow = CURRENT.rows[m]
    if (defaultsRow !== undefined && currentRow !== undefined) {
      if (defaultsRow[n] !== colorLocal) {
        currentRow[n] = colorLocal
        asGlobalTable(_G).LibExtendedJournalTooltipColors = CURRENT.rows
      } else {
        currentRow[n] = undefined
      }
    }
  }
}

Public.SelectComboBoxItemByIndex = (
  object: ZoComboBox,
  index: number,
  ...args: unknown[]
): undefined => {
  let idx = index
  if (type(index) !== "number" || index < 1 || index > object.GetNumItems()) {
    idx = 1
  }
  object.SelectItemByIndex(idx, ...args)
}
