import {
  createParser,
  scanInventoryForMasterWrits,
  toMatKnowList,
  toVoucherCount,
} from "./parser-dispatch"
import {
  canDumpMatlist,
  canShowCMWDuplicates,
  knowTooltipText,
  matHaveCtTooltipText,
  matTooltipText,
  type TooltipTarget,
  tooltipVars,
} from "./tooltip-text"
import type { KnowList, MatList, Parser } from "./types"

interface AssemblerParser extends Parser {
  WarningText: (this: Parser) => string | undefined
}

function parserHasWarningText(this: void, parser: Parser): parser is AssemblerParser {
  return "WarningText" in parser && parser.WarningText !== undefined
}

export function tooltipInsertOurText<S = unknown>(
  this: void,
  control: TooltipTarget<S>,
  item_link: string,
  purchase_gold?: number,
  style?: S
): undefined {
  const [item_type] = GetItemLinkItemType(item_link)
  if (ITEMTYPE_MASTER_WRIT !== item_type) {
    return
  }

  const [mat_list, know_list, parser] = toMatKnowList(item_link)
  if (parser === undefined) {
    return
  }
  const voucher_ct = toVoucherCount(item_link)
  const mat_text = matTooltipText(mat_list, purchase_gold, voucher_ct)
  if (mat_text === undefined) {
    return
  }
  if (tooltipVars().enable_mat_price_tooltip !== false) {
    control.AddLine(mat_text, style)
  }

  if (canDumpMatlist(tooltipVars().enable_mat_list_chat, parser)) {
    listDumpFromGlobal(mat_list)
  }
  const mat_have_text = matHaveCtTooltipText(mat_list)
  if (mat_have_text !== undefined) {
    control.AddLine(mat_have_text, style)
  }
  const know_text = knowTooltipText(know_list)
  if (know_text !== undefined) {
    control.AddLine(know_text, style)
  }
  const warning_text = parserHasWarningText(parser) ? parser.WarningText() : undefined
  if (warning_text !== undefined) {
    control.AddLine(warning_text, style)
  }
}

function listDumpFromGlobal(this: void, mat_list: MatList | undefined): undefined {
  const matRow = TemperWrit.MatRow
  if (matRow?.ListDump !== undefined) {
    matRow.ListDump(mat_list)
  }
}

export function knowDump(this: void, know_list: KnowList | undefined): undefined {
  if (know_list === undefined) {
    return undefined
  }
  for (const know of know_list) {
    d(know.DebugText())
  }
  return undefined
}

export function tooltipInterceptInstall(this: void): undefined {
  const ttBag = ItemTooltip.SetBagItem
  ItemTooltip.SetBagItem = function (
    this: TooltipControl,
    bagId: number,
    slotIndex: number,
    ...rest: number[]
  ) {
    ttBag.call(this, bagId, slotIndex, ...rest)
    tooltipInsertOurText(this, GetItemLink(bagId, slotIndex, LINK_STYLE_DEFAULT))
  }

  const ttLoot = ItemTooltip.SetLootItem
  ItemTooltip.SetLootItem = function (this: TooltipControl, lootId: number, ...rest: unknown[]) {
    ttLoot.call(this, lootId, ...rest)
    tooltipInsertOurText(this, GetLootItemLink(lootId, LINK_STYLE_DEFAULT))
  }

  const ttPopup = PopupTooltip.SetLink
  PopupTooltip.SetLink = function (this: TooltipControl, link: string, ...rest: unknown[]) {
    ttPopup.call(this, link, ...rest)
    tooltipInsertOurText(this, link)
  }

  const setupTradingHouseItemTooltipHook = (): undefined => {
    const ttTrade = ItemTooltip.SetTradingHouseItem
    ItemTooltip.SetTradingHouseItem = function (
      this: TooltipControl,
      tradingHouseIndex: number,
      ...rest: unknown[]
    ) {
      ttTrade.call(this, tradingHouseIndex, ...rest)
      const [, , , , , , purchase_gold] = GetTradingHouseSearchResultItemInfo(tradingHouseIndex)
      tooltipInsertOurText(
        this,
        GetTradingHouseSearchResultItemLink(tradingHouseIndex, LINK_STYLE_DEFAULT),
        purchase_gold
      )
    }
  }

  setupTradingHouseItemTooltipHook()

  const setupGamepadTooltip = (): undefined => {
    const leftGamepadTooltip = GAMEPAD_TOOLTIPS.GetTooltip(GAMEPAD_LEFT_TOOLTIP)
    ZO_PostHook(
      leftGamepadTooltip,
      "LayoutMasterWritItem",
      (self: WritGamepadTooltip, itemLink: string) => {
        const section = self.AcquireSection(self.GetStyle("bodySection"))
        tooltipInsertOurText(section, itemLink, undefined, self.GetStyle("bodyDescription"))
        self.AddSection(section)
      }
    )
  }

  setupGamepadTooltip()
}

TemperWrit.TooltipInsertOurText = tooltipInsertOurText
TemperWrit.TooltipInterceptInstall = tooltipInterceptInstall
TemperWrit.MatTooltipText = matTooltipText
TemperWrit.KnowTooltipText = knowTooltipText
TemperWrit.MatHaveCtTooltipText = matHaveCtTooltipText
TemperWrit.CanShowCMWDuplicates = canShowCMWDuplicates
TemperWrit.KnowDump = knowDump

export {
  canDumpMatlist,
  canShowCMWDuplicates,
  createParser,
  knowTooltipText,
  matHaveCtTooltipText,
  matTooltipText,
  scanInventoryForMasterWrits,
  type TooltipTarget,
}
