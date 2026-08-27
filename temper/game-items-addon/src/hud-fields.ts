import { GREEN, RED } from "../../../design-tokens/design-tokens"
import { recordNetWorthWalkMs } from "./bank-trace"
import { getInventoryConfig } from "./inventory-config"
import { computeLiveNetWorth } from "./net-worth"
import { getSavedVariables } from "./saved-variables"
import {
  applyBurstChange,
  type BurstState,
  burstAlpha,
  EMPTY_BURST,
  formatBagSlots,
  formatSignedGold,
  isBurstVisible,
} from "./session-tracking"

interface HudCell {
  text: string
  color?: readonly [number, number, number]
  alpha?: number
}
interface TemperHudApi {
  registerField: (
    this: void,
    field: { id: string; order: number; compute: (this: void) => HudCell }
  ) => undefined
  registerCommand: (
    this: void,
    command: {
      name: string
      description: string
      addon: string
      handler?: (this: void, args: string) => undefined
    }
  ) => undefined
  refresh: (this: void) => undefined
  isReady: (this: void) => boolean
}
declare global {
  var TemperHud: TemperHudApi | undefined
}

const GAIN_COLOR = GREEN
const LOSS_COLOR = RED

let lastKnownNetWorth = 0
let burst: BurstState = EMPTY_BURST

function currentNetWorth(): number {
  const cfg = getInventoryConfig()
  return computeLiveNetWorth(getSavedVariables().db, cfg.currencyRates, cfg.crownReplacementCosts)
}

function ensureSession(): undefined {
  const sv = getSavedVariables()
  if (sv.session.startTime === 0) resetSession()
}

export function resetSession(): undefined {
  const sv = getSavedVariables()
  sv.session = {
    startTime: GetTimeStamp(),
    startNetWorth: currentNetWorth(),
    startCharId: tostring(GetCurrentCharacterId()),
  }
  lastKnownNetWorth = sv.session.startNetWorth
  burst = EMPTY_BURST
  globalThis.TemperHud?.refresh()
}

export function reseedNetWorthBaseline(): undefined {
  lastKnownNetWorth = currentNetWorth()
}

export function recomputeNetWorthAndUpdateHud(): undefined {
  const walkStart = GetGameTimeMilliseconds()
  const current = currentNetWorth()
  recordNetWorthWalkMs(GetGameTimeMilliseconds() - walkStart)
  const change = current - lastKnownNetWorth
  lastKnownNetWorth = current
  if (change !== 0) burst = applyBurstChange(burst, change, GetTimeStamp())
  globalThis.TemperHud?.refresh()
}

function bagCell(): HudCell {
  return { text: formatBagSlots(GetNumBagUsedSlots(BAG_BACKPACK), GetBagSize(BAG_BACKPACK)) }
}

function netWorthDeltaCell(): HudCell {
  const sv = getSavedVariables()
  const delta = lastKnownNetWorth - sv.session.startNetWorth
  const color = delta < 0 ? LOSS_COLOR : GAIN_COLOR
  return { text: formatSignedGold(delta), color }
}

function burstCell(): HudCell {
  const now = GetTimeStamp()
  if (!isBurstVisible(burst, now)) return { text: "" }
  const color = burst.amount < 0 ? LOSS_COLOR : GAIN_COLOR
  return { text: formatSignedGold(burst.amount), color, alpha: burstAlpha(burst, now) }
}

export function registerHudFields(): undefined {
  ensureSession()
  lastKnownNetWorth = currentNetWorth()
  globalThis.TemperHud?.registerField({
    id: "inventory:bag",
    order: 40,
    compute: bagCell,
  })
  globalThis.TemperHud?.registerField({
    id: "inventory:networth",
    order: 50,
    compute: netWorthDeltaCell,
  })
  globalThis.TemperHud?.registerField({
    id: "inventory:burst",
    order: 60,
    compute: burstCell,
  })
}
