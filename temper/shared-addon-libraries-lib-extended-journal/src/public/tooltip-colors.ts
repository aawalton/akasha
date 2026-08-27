import { asNumber } from "../casts"
import { Internal, Public } from "../internal/state"
import { LCCC } from "../lccc"

const Defaults: Record<number, Record<number, number>> = {
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

let Current: Record<number, Record<number, number | undefined>> = {}

function Validate(this: void, m: number, n: number): boolean {
  return (
    (m === 1 && (n === 1 || n === 2 || n === 3)) || (m === 2 && (n === 0 || n === 1 || n === 2))
  )
}

Internal.LoadTooltipColors = (): undefined => {
  Current = LibExtendedJournalTooltipColors ?? {}
  Current[1] = Current[1] ?? {}
  Current[2] = Current[2] ?? {}
}

Public.GetTooltipColor = (m: number, n: number): number => {
  if (Validate(m, n)) {
    const currentRow = Current[m]
    const fromCurrent = currentRow !== undefined ? currentRow[n] : undefined
    return fromCurrent ?? asNumber(Defaults[m]?.[n])
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
  if (Validate(m, n)) {
    let colorLocal = color
    const g = rgba[0]
    const b = rgba[1]
    if (type(g) === "number" && type(b) === "number") {
      colorLocal = LCCC.RGBToInt24(asNumber(color), asNumber(g), asNumber(b))
    }
    const defaultsRow = Defaults[m]
    const currentRow = Current[m]
    if (defaultsRow !== undefined && currentRow !== undefined) {
      if (defaultsRow[n] !== colorLocal) {
        currentRow[n] = colorLocal
        globalThis.LibExtendedJournalTooltipColors = Current
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
