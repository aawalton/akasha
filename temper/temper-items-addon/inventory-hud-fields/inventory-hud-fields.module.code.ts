import "@akasha/temper-addon-library-types/temper-hud-global"

import { GREEN, RED } from "@akasha/design-tokens/semantic-color"
import { recordNetWorthScanMs } from "../inventory-bank-trace/inventory-bank-trace.module.code.ts"
import { getInventoryConfig } from "../inventory-config/inventory-config.module.code.ts"
import { computeLiveNetWorth } from "../inventory-live-net-worth/inventory-live-net-worth.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import {
  applyBurstChange,
  type BurstState,
  burstAlpha,
  EMPTY_BURST,
  formatBagSlots,
  formatSignedGold,
  isBurstVisible,
} from "../inventory-session-tracking/inventory-session-tracking.module.code.ts"

interface HudCell {
  text: string
  color?: readonly [number, number, number]
  alpha?: number
}

const GAIN_COLOR = GREEN
const LOSS_COLOR = RED

let lastKnownNetWorth = 0
let burst: BurstState = EMPTY_BURST

function currentNetWorth(): number {
  const cfg = getInventoryConfig()
  return computeLiveNetWorth(getSavedVariables().db, cfg.currencyRates, cfg.crownReplacementCosts)
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
  const scanStart = GetGameTimeMilliseconds()
  const current = currentNetWorth()
  recordNetWorthScanMs(GetGameTimeMilliseconds() - scanStart)
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
  if (getSavedVariables().session.startTime === 0) resetSession()
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
