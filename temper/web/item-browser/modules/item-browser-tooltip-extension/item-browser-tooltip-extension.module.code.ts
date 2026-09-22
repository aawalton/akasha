import type { TooltipExtensionInstance } from "akasha/temper/addon/pages/world/collections/modules/journal-shape/journal-shape.module.code.ts"
import { Public } from "akasha/temper/addon/pages/world/collections/modules/journal-state/journal-state.module.code.ts"
import {
  FLAG_FULL_PIECES,
  FLAG_OTHER_SERVER,
  FLAG_SHOW_ACCOUNTS,
  FLAG_SHOW_HEADER,
  FLAG_SHOW_PIECES,
  MASK_HIDE_ACCOUNTS,
} from "akasha/temper/web/item-browser/modules/item-browser-constants/item-browser-constants.module.code.ts"
import { getLmas } from "akasha/temper/web/item-browser/modules/item-browser-multi-account/item-browser-multi-account.module.code.ts"
import {
  formatTransmuteCost,
  getItemAntiquitySetId,
  getVars,
} from "akasha/temper/web/item-browser/modules/item-browser-state/item-browser-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-codes-common-code/lib-codes-common-code.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-port/eso-item-browser-port.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-strings/eso-item-browser-strings.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

const ITEM_CATEGORIES: number[] = [
  GAMEPAD_ITEM_CATEGORY_LIGHT_ARMOR,
  GAMEPAD_ITEM_CATEGORY_MEDIUM_ARMOR,
  GAMEPAD_ITEM_CATEGORY_HEAVY_ARMOR,
  GAMEPAD_ITEM_CATEGORY_JEWELRY,
  GAMEPAD_ITEM_CATEGORY_WEAPONS,
]

const FILTER_TYPE_TO_CATEGORY: { [filterType: number]: number | undefined } = {
  [EQUIPMENT_FILTER_TYPE_BOW]: GAMEPAD_ITEM_CATEGORY_WEAPONS,
  [EQUIPMENT_FILTER_TYPE_DESTRO_STAFF]: GAMEPAD_ITEM_CATEGORY_WEAPONS,
  [EQUIPMENT_FILTER_TYPE_HEAVY]: GAMEPAD_ITEM_CATEGORY_HEAVY_ARMOR,
  [EQUIPMENT_FILTER_TYPE_LIGHT]: GAMEPAD_ITEM_CATEGORY_LIGHT_ARMOR,
  [EQUIPMENT_FILTER_TYPE_MEDIUM]: GAMEPAD_ITEM_CATEGORY_MEDIUM_ARMOR,
  [EQUIPMENT_FILTER_TYPE_NECK]: GAMEPAD_ITEM_CATEGORY_JEWELRY,
  [EQUIPMENT_FILTER_TYPE_ONE_HANDED]: GAMEPAD_ITEM_CATEGORY_WEAPONS,
  [EQUIPMENT_FILTER_TYPE_RESTO_STAFF]: GAMEPAD_ITEM_CATEGORY_WEAPONS,
  [EQUIPMENT_FILTER_TYPE_RING]: GAMEPAD_ITEM_CATEGORY_JEWELRY,
  [EQUIPMENT_FILTER_TYPE_SHIELD]: GAMEPAD_ITEM_CATEGORY_WEAPONS,
  [EQUIPMENT_FILTER_TYPE_TWO_HANDED]: GAMEPAD_ITEM_CATEGORY_WEAPONS,
}

function getItemSlotName(this: void, itemLink: string, isWeapon: boolean): string {
  if (isWeapon) {
    const weaponType = GetItemLinkWeaponType(itemLink)
    let prefix = "SI_WEAPONTYPE"
    if (
      weaponType === WEAPONTYPE_TWO_HANDED_SWORD ||
      weaponType === WEAPONTYPE_TWO_HANDED_AXE ||
      weaponType === WEAPONTYPE_TWO_HANDED_HAMMER
    ) {
      prefix = "SI_ITEMBROWSER_WEAPONTYPE"
    }
    return GetString(prefix, weaponType)
  }
  return GetString("SI_EQUIPTYPE", GetItemLinkEquipType(itemLink))
}

function isSlotUnlocked(
  this: void,
  server: string | undefined,
  account: string | undefined,
  setId: number,
  slot: Id64
): boolean {
  const lmas = getLmas()
  if (lmas !== undefined) {
    return lmas.IsItemSetCollectionSlotUnlockedForAccountEx(server, account, setId, slot)
  }
  return IsItemSetCollectionSlotUnlocked(setId, slot)
}

function countUnlockedSlots(
  this: void,
  server: string | undefined,
  account: string | undefined,
  setId: number
): number {
  const lmas = getLmas()
  if (lmas !== undefined) {
    return lmas.GetNumItemSetCollectionSlotsUnlockedForAccountEx(server, account, setId)
  }
  return GetNumItemSetCollectionSlotsUnlocked(setId)
}

function getCurrencyCost(
  this: void,
  server: string | undefined,
  account: string | undefined,
  setId: number,
  currencyType: number
): number | undefined {
  const lmas = getLmas()
  if (lmas !== undefined) {
    return lmas.GetItemReconstructionCurrencyOptionCostForAccountEx(
      server,
      account,
      setId,
      currencyType
    )
  }
  return GetItemReconstructionCurrencyOptionCost(setId, currencyType)
}

function addTooltipExtensionToUndauntedCoffer(
  this: void,
  tooltip: TooltipControl,
  itemLink: string
): undefined {
  const extension = Public.TooltipExtensionInitialize(true)

  for (const i of $range(1, 2)) {
    const [, setName, , , maxEquipped, setId] = GetItemLinkContainerSetInfo(itemLink, i)

    if (maxEquipped !== 2) {
      return
    }

    const results: string[] = []

    for (const j of $range(1, GetNumItemSetCollectionPieces(setId))) {
      const [pieceId, slot] = GetItemSetCollectionPieceInfo(setId, j)
      const pieceLink = GetItemSetCollectionPieceItemLink(
        pieceId,
        LINK_STYLE_DEFAULT,
        ITEM_TRAIT_TYPE_NONE,
        undefined
      )

      if (GetItemLinkEquipType(pieceLink) === EQUIP_TYPE_SHOULDERS) {
        results.push(
          string.format(
            "|c%06X%s|r",
            Public.GetTooltipColor(1, IsItemSetCollectionSlotUnlocked(setId, slot) ? 1 : 2),
            GetString("SI_ARMORTYPE", GetItemLinkArmorType(pieceLink))
          )
        )
      }
    }

    extension.AddSection(
      zo_strformat(
        "<<C:1>>: <<2>>",
        setName,
        formatTransmuteCost(GetItemReconstructionCurrencyOptionCost(setId, CURT_CHAOTIC_CREATIA))
      ),
      table.concat(results, ", ")
    )
  }

  extension.Finalize(tooltip)
  return undefined
}

export function addTooltipExtension(
  this: void,
  tooltip: TooltipControl,
  itemLink: string,
  account: string | undefined,
  flagsParam: number,
  itemSource: unknown,
  server?: string
): undefined {
  let flags = flagsParam

  if (server !== undefined) {
    flags = BitAnd(flags, MASK_HIDE_ACCOUNTS)
    if (server !== LibCodesCommonCode.GetServerName()) {
      flags = BitOr(flags, FLAG_OTHER_SERVER)
    }
  }

  let valid: boolean
  let setId: number
  const container = GetItemLinkNumContainerSetIds(itemLink)

  if (container === 2) {
    addTooltipExtensionToUndauntedCoffer(tooltip, itemLink)
    return
  }
  if (container === 1) {
    flags = BitAnd(flags, BitOr(FLAG_SHOW_HEADER, FLAG_SHOW_PIECES))
    valid = true
    const [, , , , , containerSetId] = GetItemLinkContainerSetInfo(itemLink, 1)
    setId = containerSetId
  } else {
    valid = IsItemLinkSetCollectionPiece(itemLink)
    const [, , , , , linkSetId] = GetItemLinkSetInfo(itemLink, false)
    setId = linkSetId
  }

  const setSize = GetNumItemSetCollectionPieces(setId)
  if (setSize < 1) {
    return
  }

  let extension: TooltipExtensionInstance
  if (BitAnd(flags, FLAG_SHOW_HEADER) === FLAG_SHOW_HEADER) {
    const unlocked = countUnlockedSlots(server, account, setId)
    extension = Public.TooltipExtensionInitialize(
      true,
      string.format("%d/%d (%d%%)", unlocked, setSize, (100 * unlocked) / setSize),
      formatTransmuteCost(getCurrencyCost(server, account, setId, CURT_CHAOTIC_CREATIA))
    )
  } else {
    extension = Public.TooltipExtensionInitialize(false)
  }

  if (BitAnd(flags, FLAG_SHOW_PIECES) === FLAG_SHOW_PIECES && valid) {
    const showAllPieces =
      getVars().externalTooltips.showPieces !== 2 ||
      BitAnd(flags, FLAG_FULL_PIECES) === FLAG_FULL_PIECES

    const results: { [category: number]: string[] | undefined } = {}
    for (const category of ITEM_CATEGORIES) {
      results[category] = []
    }

    for (const i of $range(1, setSize)) {
      const [pieceId, slot] = GetItemSetCollectionPieceInfo(setId, i)
      const category = FILTER_TYPE_TO_CATEGORY[GetEquipmentFilterTypeForItemSetCollectionSlot(slot)]

      if (category !== undefined) {
        const pieceLink = GetItemSetCollectionPieceItemLink(
          pieceId,
          LINK_STYLE_DEFAULT,
          ITEM_TRAIT_TYPE_NONE,
          undefined
        )
        const unlocked = isSlotUnlocked(server, account, setId, slot)

        if (showAllPieces || !unlocked) {
          const bucket = results[category]
          if (bucket !== undefined) {
            bucket.push(
              string.format(
                "|c%06X%s|r",
                Public.GetTooltipColor(1, unlocked ? 1 : 2),
                getItemSlotName(pieceLink, category === GAMEPAD_ITEM_CATEGORY_WEAPONS)
              )
            )
          }
        }
      }
    }

    for (const category of ITEM_CATEGORIES) {
      const bucket = results[category]
      if (bucket !== undefined && bucket.length > 0) {
        let header = GetString("SI_GAMEPADITEMCATEGORY", category)
        if (!showAllPieces) {
          header = string.format(
            "%s (%s)",
            header,
            GetString(SI_ITEM_FORMAT_STR_SET_COLLECTION_PIECE_LOCKED)
          )
        }
        extension.AddSection(header, table.concat(bucket, ", "))
      }
    }
  }

  if (
    (account === undefined || account === GetDisplayName()) &&
    BitAnd(flags, FLAG_OTHER_SERVER) !== FLAG_OTHER_SERVER &&
    valid
  ) {
    const antiquitySetId = getItemAntiquitySetId(itemLink)
    if (antiquitySetId !== 0) {
      const results: string[] = []
      let noLeads = 0

      for (const i of $range(1, GetNumAntiquitySetAntiquities(antiquitySetId))) {
        const antiquityId = GetAntiquitySetAntiquityId(antiquitySetId, i)
        let color: number

        if (DoesAntiquityNeedCombination(antiquityId)) {
          color = Public.GetTooltipColor(1, 1)
        } else if (DoesAntiquityHaveLead(antiquityId)) {
          color = Public.GetTooltipColor(1, 3)
        } else {
          color = Public.GetTooltipColor(1, 2)
          noLeads = noLeads + 1
        }

        results.push(
          string.format(
            "|c%06X%s|r",
            color,
            zo_strformat(SI_TOOLTIP_ITEM_NAME, GetAntiquityName(antiquityId))
          )
        )
      }

      if (
        noLeads < results.length ||
        !IsItemSetCollectionPieceUnlocked(GetItemLinkItemId(itemLink))
      ) {
        extension.AddSection(GetString(SI_ANTIQUITY_FRAGMENTS), table.concat(results, ", "))
      }
    }
  }

  const lmas = getLmas()
  if (lmas !== undefined && BitAnd(flags, FLAG_SHOW_ACCOUNTS) === FLAG_SHOW_ACCOUNTS && valid) {
    const accounts = lmas.GetServerAndAccountList(true)[0]?.accounts

    if (accounts !== undefined && accounts.length > 1) {
      const results: string[] = []
      const status = lmas.GetItemCollectionAndTradabilityStatus(accounts, itemLink, itemSource)

      for (const acct of accounts) {
        let result: string
        if (status[acct] === lmas.ITEM_UNCOLLECTED_NOTRADE) {
          const color = Public.GetTooltipColor(2, 2)
          result = string.format("|c%06X|l0:0:0:50%%:2:%06X|l%s|l|r", color, color, acct)
        } else {
          result = string.format(
            "|c%06X%s|r",
            Public.GetTooltipColor(2, status[acct] === lmas.ITEM_COLLECTED ? 1 : 2),
            acct
          )
        }
        results.push(result)
      }
      extension.AddSection(GetString(SI_ITEMBROWSER_TT_HEADER_ACCTS), table.concat(results, ", "))
    }
  }

  if (!valid) {
    extension.AddSection(
      GetString(SI_ITEMBROWSER_TT_INVALID_HEAD),
      GetString("SI_ITEMBROWSER_TT_INVALID_MSG", GetItemLinkItemId(itemLink) < 167300 ? 1 : 2)
    )
  }

  extension.Finalize(tooltip, BitAnd(flags, FLAG_SHOW_HEADER) === FLAG_SHOW_HEADER)
  return undefined
}
