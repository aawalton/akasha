import {
  asNumber,
  asNumberOpt,
  asPresent,
  asString,
  asStringOpt,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asBagValue,
  asFcoisProbe,
  asGetNameCtrl,
  asIifaProbe,
  asMasterMerchantProbe,
  asNever,
  asSetIdNodeProbe,
} from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import {
  IIFA_CTRL_NAMES,
  infoTooltip,
  itemTooltip,
  MASTER_MERCHANT_CTRL_NAMES,
  popupTooltip,
} from "../lib-sets-tip-header/lib-sets-tip-header.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

const lib = LibSets

interface RowControl {
  itemLink?: string
  bagId?: number
  bag?: number
  slotIndex?: number
  index?: number
  id?: number
  questIndex?: number
  slotType?: number
  node?: { data?: unknown }
  dataEntry?: { data?: { [key: string]: unknown } }
  data?: { [key: string]: unknown } & { [n: number]: { Name?: string } }
  GetParent?: (this: RowControl) => RowControl | undefined
  GetName?: (this: RowControl) => string
  GetText?: (this: RowControl) => string
}

function asRowControl(value: unknown): RowControl {
  return value as RowControl
}

function isMasterMerchantName(this: void, name: string): boolean {
  const [masterMerchantMatchStart] = string.find(name, "MasterMerchant", 1, true)
  return masterMerchantMatchStart !== undefined
}

export function getSetReconstructionCost(
  this: void,
  itemLink: string | undefined,
  setId: number | undefined,
  buildTextures?: boolean
): LuaMultiReturn<[string | undefined, string | undefined]> {
  if (itemLink === undefined || setId === undefined) {
    return $multi(undefined, undefined)
  }
  if (IsItemLinkSetCollectionPiece(itemLink) === true) {
    const buildTexturesResolved = buildTextures ?? false
    const currencyCosts = GetItemReconstructionCurrencyOptionCost(setId, asNever(5))
    if (currencyCosts !== undefined) {
      if (STATE.tooltipTextures === true || buildTexturesResolved === true) {
        const currencyType = CURT_CHAOTIC_CREATIA
        const formatType = ZO_CURRENCY_FORMAT_AMOUNT_ICON
        const extraOptions = {
          color: ZO_DEFAULT_TEXT,
          iconInheritColor: true,
        }
        return $multi(
          zo_strformat(
            SI_NUMBER_FORMAT,
            ZO_Currency_FormatKeyboard(
              currencyType,
              tonumber(currencyCosts),
              formatType,
              extraOptions
            )
          ),
          tostring(currencyCosts)
        )
      }
      return $multi(tostring(currencyCosts), tostring(currencyCosts))
    }
  }
  return $multi(undefined, undefined)
}

export function getItemLinkFromControl(
  this: void,
  rowControl: RowControl
): LuaMultiReturn<[string | undefined, number | undefined]> {
  let name: string | undefined
  let parentCtrl: RowControl | undefined
  let bagId: number | undefined
  let slotIndex: number | undefined
  let itemLink: string | undefined

  if (rowControl.itemLink !== undefined) {
    return $multi(rowControl.itemLink, undefined)
  }

  if (rowControl.GetParent !== undefined) {
    parentCtrl = rowControl.GetParent()
    if (parentCtrl !== undefined) {
      const parent = parentCtrl
      name = asPresent(parent.GetName).call(parent)
    } else {
      name = asPresent(rowControl.GetName).call(rowControl)
    }
  } else {
    name = asPresent(rowControl.GetName).call(rowControl)
  }

  const iifa = asIifaProbe(globalThis).IIfA
  if (iifa !== undefined) {
    const fcois = asFcoisProbe(globalThis).FCOIS
    if (fcois !== undefined) {
      const iifAclicked = fcois.IIfAclicked
      if (iifAclicked !== undefined) {
        return $multi(GetItemLink(iifAclicked.bagId, iifAclicked.slotIndex, asNever(0)), undefined)
      }
    }
    if (name !== undefined && IIFA_CTRL_NAMES[string.sub(name, 1, 13)]) {
      return $multi(rowControl.itemLink, undefined)
    }
  }

  const nodeData = rowControl.node !== undefined ? rowControl.node.data : undefined
  const setDataNode = asSetIdNodeProbe(nodeData)
  if (type(setDataNode) === "table" && setDataNode?.GetItemSetId !== undefined) {
    const setIdOfNode = asPresent(setDataNode.GetItemSetId).call(setDataNode)
    if (setIdOfNode !== undefined) {
      const itemIdOfCraftableSetId = lib.GetSetFirstItemId(setIdOfNode)
      if (itemIdOfCraftableSetId !== undefined) {
        const itemLinkOfCraftableSet = lib.buildItemLink(itemIdOfCraftableSetId)
        if (itemLinkOfCraftableSet !== undefined) {
          return $multi(itemLinkOfCraftableSet, setIdOfNode)
        }
      }
    }
  }

  const dataEntry = rowControl.dataEntry
  const data = rowControl.data

  const isDataEntryNil = dataEntry === undefined
  const isDataNil = data === undefined

  const dataEntryData = !isDataEntryNil ? asPresent(dataEntry).data : undefined

  if (isDataEntryNil) {
    if (isDataNil) {
      bagId = rowControl.bagId
      slotIndex = rowControl.slotIndex
    } else {
      itemLink = asStringOpt(asPresent(data)["itemLink"])
    }
  } else {
    if (dataEntryData !== undefined) {
      if (dataEntryData["lootId"] !== undefined) {
        return $multi(
          GetLootItemLink(asNumber(dataEntryData["lootId"]), LINK_STYLE_BRACKETS),
          undefined
        )
      } else if (rowControl.index !== undefined && name === "ZO_InteractWindowRewardArea") {
        return $multi(GetQuestRewardItemLink(rowControl.index, LINK_STYLE_BRACKETS), undefined)
      } else if (dataEntryData["itemLink"] !== undefined) {
        return $multi(asString(dataEntryData["itemLink"]), undefined)
      } else {
        bagId = asNumberOpt(dataEntryData["bagId"])
        bagId = bagId ?? asNumberOpt(dataEntryData["bag"])
        slotIndex = asNumberOpt(dataEntryData["slotIndex"])
        slotIndex = slotIndex ?? asNumberOpt(dataEntryData["index"])
      }
    }
  }

  if (bagId === undefined) {
    if (rowControl.questIndex !== undefined) {
      parentCtrl =
        parentCtrl ?? (rowControl.GetParent !== undefined ? rowControl.GetParent() : undefined)
      const parentDataEntry =
        parentCtrl !== undefined && parentCtrl.dataEntry !== undefined
          ? parentCtrl.dataEntry.data
          : undefined
      bagId = BAG_BACKPACK
      slotIndex = asNumberOpt(asPresent(parentDataEntry)["slotIndex"])
    } else if (rowControl.index !== undefined && rowControl.slotType !== undefined) {
      if (
        rowControl.slotType === SLOT_TYPE_STORE_BUY ||
        rowControl.slotType === SLOT_TYPE_BUY_MULTIPLE
      ) {
        return $multi(GetStoreItemLink(rowControl.index, LINK_STYLE_BRACKETS), undefined)
      } else if (rowControl.slotType === SLOT_TYPE_STORE_BUYBACK) {
        return $multi(GetBuybackItemLink(rowControl.index, LINK_STYLE_BRACKETS), undefined)
      }
    }
  }

  if (itemLink === undefined && bagId !== undefined && slotIndex !== undefined) {
    itemLink = GetItemLink(asBagValue(bagId), slotIndex, asNever(0))
  }

  if (itemLink === undefined) {
    if (name === "ZO_MailInboxMessageAttachments") {
      return $multi(
        GetAttachedItemLink(
          asNever(asPresent(MAIL_INBOX).GetOpenMailId()),
          asPresent(rowControl.id),
          LINK_STYLE_DEFAULT
        ),
        undefined
      )
    } else if (name === "ZO_MailSendAttachments") {
      return $multi(
        GetMailQueuedAttachmentLink(asPresent(rowControl.id), LINK_STYLE_DEFAULT),
        undefined
      )
    } else if (name === "ZO_TradingHousePostedItemsListContents") {
      return $multi(
        GetTradingHouseListingItemLink(
          asNumber(asPresent(dataEntryData)["slotIndex"]),
          LINK_STYLE_DEFAULT
        ),
        undefined
      )
    } else if (name === "ZO_TradingHouseLeftPanePostItemFormInfo") {
      if (rowControl.bagId !== undefined && rowControl.slotIndex !== undefined) {
        return $multi(
          GetItemLink(asBagValue(rowControl.bagId), rowControl.slotIndex, asNever(0)),
          undefined
        )
      }
    } else if (
      dataEntryData !== undefined &&
      dataEntryData["timeRemaining"] !== undefined &&
      asNumber(dataEntryData["timeRemaining"]) > 0 &&
      dataEntryData["itemLink"] !== undefined
    ) {
      return $multi(asString(dataEntryData["itemLink"]), undefined)
    } else if (
      asMasterMerchantProbe(globalThis).MasterMerchant !== undefined &&
      rowControl.GetText !== undefined &&
      name !== undefined &&
      isMasterMerchantName(name)
    ) {
      parentCtrl =
        parentCtrl ?? (rowControl.GetParent !== undefined ? rowControl.GetParent() : undefined)
      const mocGPGP =
        parentCtrl !== undefined ? asPresent(parentCtrl.GetParent).call(parentCtrl) : undefined
      if (mocGPGP !== undefined) {
        name = asPresent(mocGPGP.GetName).call(mocGPGP)
        if (MASTER_MERCHANT_CTRL_NAMES[name]) {
          return $multi(asPresent(rowControl.GetText).call(rowControl), undefined)
        }
      }
    } else if (name === "DolgubonSetCrafterWindowMaterialListListContents") {
      return $multi(asPresent(asPresent(rowControl.data)[1]).Name, undefined)
    }
  }
  return $multi(itemLink, undefined)
}

export function getMouseOverLink(
  this: void
): LuaMultiReturn<[string | undefined, number | undefined]> {
  const [itemLink, setId] = getItemLinkFromControl(asRowControl(moc()))
  return $multi(itemLink, setId)
}

export function getLastItemLink(
  this: void,
  tooltipControl: unknown
): LuaMultiReturn<[string | undefined, number | undefined]> {
  let itemLink: string | undefined
  let setId: number | undefined
  if (tooltipControl === popupTooltip) {
    itemLink = STATE.lastTooltipItemLink
  } else if (tooltipControl === itemTooltip || tooltipControl === infoTooltip) {
    ;[itemLink, setId] = getMouseOverLink()
    STATE.lastTooltipItemLink = itemLink
  } else {
    const ctrl = asGetNameCtrl(tooltipControl)
    if (ctrl.GetName !== undefined) {
      const ctrlName = asPresent(ctrl.GetName).call(ctrl)
      if (lib.customTooltipHooks.hooked[ctrlName] === true) {
        ;[itemLink] = getMouseOverLink()
        STATE.lastTooltipItemLink = itemLink
      }
    }
  }
  return $multi(itemLink, setId)
}

export function isTooltipOfSetItem(
  this: void,
  itemLink: string
): LuaMultiReturn<[boolean, number]> {
  const [isSet, , , , , setId] = GetItemLinkSetInfo(itemLink, false)
  return $multi(isSet, setId)
}
