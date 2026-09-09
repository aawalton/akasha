import { LANG } from "../craft-lang-index/craft-lang-index.module.code.ts"
import * as Utilities from "../craft-utilities/craft-utilities.module.code.ts"
import * as DataValidation from "../craft-validation/craft-validation.module.code.ts"
import { MAXCRAFT } from "../crafting-constants/crafting-constants.module.code.ts"
import { stripLink } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export function setTimer(control: TemperCraftingButton, hour: number): undefined {
  const account = STATE.Account
  const seconds = hour * 3600
  if ((account.timer[hour] ?? 0) > 0) {
    control.SetText(`${hour}:00h`)
    account.timer[hour] = 0
  } else {
    control.SetText(Utilities.getTime(seconds - 1))
    account.timer[hour] = seconds + GetTimeStamp()
  }
  Utilities.getTimer()
}

export interface CsTooltipOwner extends TemperCraftingControl {
  text?: TooltipControl
}

export function tooltip(
  c: CsTooltipOwner | undefined,
  visible: boolean,
  scale?: boolean,
  parent?: TemperCraftingControl,
  pos?: string | number
): undefined {
  if (c === undefined) {
    return
  }
  function iconScale(target: TemperCraftingControl, from: number, to: number): undefined {
    const [a, t] = CreateSimpleAnimation(ANIMATION_SCALE, target)
    a.SetDuration(150)
    const scale = a as ScaleAnimation
    scale.SetStartScale(from)
    scale.SetEndScale(to)
    t.SetPlaybackType(ANIMATION_PLAYBACK_ONE_SHOT, 0)
    t.PlayFromStart()
  }
  function tooltipCraft(
    data: TemperCraftingControlData,
    field: CsTooltipCraftField,
    maxval: number
  ): string[] {
    const ttEntries: Record<number, string | string[]> = STATE.Loc.TT
    function tt(index: number): string {
      const entry = ttEntries[index]
      return typeof entry === "string" ? entry : ""
    }
    if (STATE.Extern) {
      return [tt(6), tt(4)]
    }
    if (data.craftable && maxval > 0) {
      if (maxval > MAXCRAFT) {
        maxval = MAXCRAFT
      }
      const amount = tonumber(field.GetText()) ?? 1
      const [itemType] = GetItemLinkItemType(data.link ?? "")
      if (itemType === ITEMTYPE_FURNISHING) {
        return [zo_strformat(tt(2), amount), tt(4)]
      } else {
        return [zo_strformat(tt(2), amount), zo_strformat(tt(3), maxval), tt(4)]
      }
    }
    return [tt(4)]
  }
  if (scale) {
    const texture = c.GetNamedChild("Texture")
    if (texture !== undefined) {
      if (visible) {
        iconScale(texture, 1, 1.4)
      } else {
        iconScale(texture, 1.4, 1)
      }
    }
  }
  if (c.data === undefined) {
    return
  } else if (visible) {
    const account = STATE.Account
    if (parent === undefined) {
      parent = c
    }
    if (pos === undefined) {
      pos = 0
    }
    const anchor: Record<string | number, [number, number, number, number]> = {
      tl: [9, 2, 1, 3],
      tc: [4, 0, -2, 1],
      tr: [3, 2, 3, 9],
      cl: [8, -2, 0, 2],
      [0]: [2, 1, 0, 8],
      cr: [2, 2, 0, 8],
      bl: [3, 2, 2, 6],
      bc: [1, 0, 2, 4],
      br: [6, 2, -3, 12],
    }
    let first = "\n"
    const offsets = anchor[pos]
    if (offsets === undefined) {
      return
    }
    if (c.data.link !== undefined) {
      c.text = ItemTooltip
      InitializeTooltip(c.text, parent, offsets[0], offsets[1], offsets[2], offsets[3])
      c.text.SetLink(c.data.link)
      ZO_ItemTooltip_ClearCondition(c.text)
      ZO_ItemTooltip_ClearCharges(c.text)
    } else if (c.data.info !== undefined) {
      c.text = InformationTooltip
      InitializeTooltip(c.text, parent, offsets[0], offsets[1], offsets[2], offsets[3])
      SetTooltipText(c.text, c.data.info)
    }
    const tooltip = c.text
    if (tooltip === undefined) {
      return
    }
    if (c.data.addline !== undefined) {
      for (const [, text] of pairs(c.data.addline)) {
        tooltip.AddLine(first + text, "TemperCraftingFont")
        first = ""
      }
    }
    if (c.data.buttons !== undefined) {
      tooltip.AddLine(first + table.concat(c.data.buttons as never, "\n"), "TemperCraftingFont")
      first = ""
    }

    if (c.data.crafting !== undefined) {
      let amount = account.options.bulkcraftlimit
      if (amount > c.data.crafting[1]) {
        amount = c.data.crafting[1]
      }
      tooltip.AddLine(
        first + table.concat(tooltipCraft(c.data, c.data.crafting[0], amount), "\n"),
        "TemperCraftingFont"
      )
      first = ""
    }

    if (
      c.data.link !== undefined &&
      account.options.displaymm &&
      MasterMerchant?.isInitialized === true
    ) {
      MasterMerchant.addStatsAndGraph(tooltip, c.data.link, false)
    }
    if (
      account.options.displayttc &&
      TamrielTradeCentre !== undefined &&
      TamrielTradeCentrePrice !== undefined
    ) {
      if (c.data.info !== undefined) {
        TamrielTradeCentrePrice.AppendPriceInfo(tooltip, c.data.info)
      } else if (c.data.link !== undefined && TamrielTradeCentre_ItemInfo !== undefined) {
        TamrielTradeCentrePrice.AppendPriceInfo(
          tooltip,
          TamrielTradeCentre_ItemInfo.New(c.data.link)
        )
      }
    }
    tooltip.SetHidden(false)
  } else {
    const tooltip = c.text
    if (tooltip === undefined) {
      return
    }
    ClearTooltip(tooltip)
    tooltip.SetHidden(true)
    c.text = undefined
  }
}

export function tooltipShow(control: TooltipControl, link: string, id?: string): undefined {
  const account = STATE.Account
  function localizeStorage(storage: string): string {
    let localize = ""
    if (GetCVar("language.2") !== "en") {
      if (storage === LANG.en.bank) {
        localize = STATE.Loc.bank
      }
      const [housebankStart] = string.find(storage, LANG.en.housebank)
      if (housebankStart !== undefined) {
        const [localized] = string.gsub(storage, LANG.en.housebank, STATE.Loc.housebank)
        localize = localized
      }
      if (storage === LANG.en.guildbank) {
        localize = STATE.Loc.guildbank
      }
      if (storage === LANG.en.craftbag) {
        localize = STATE.Loc.craftbag
      }
    }
    if (localize === "") {
      localize = storage
    }
    return localize
  }
  const stripedLink = stripLink(link)
  const [it, specializedItemType] = GetItemLinkItemType(link)
  let store: string[] = []
  let need = ""
  let unneed = ""
  if (it === ITEMTYPE_RACIAL_STYLE_MOTIF) {
    ;[need, unneed] = DataValidation.isStyleNeeded(link)
  } else if (it === ITEMTYPE_RECIPE) {
    if (
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_ALCHEMY_FORMULA_FURNISHING ||
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_BLACKSMITHING_DIAGRAM_FURNISHING ||
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_CLOTHIER_PATTERN_FURNISHING ||
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_ENCHANTING_SCHEMATIC_FURNISHING ||
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_DESIGN_FURNISHING ||
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_WOODWORKING_BLUEPRINT_FURNISHING ||
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_JEWELRYCRAFTING_SKETCH_FURNISHING
    ) {
      ;[need, unneed] = DataValidation.isBlueprintNeeded(link)
    } else {
      ;[need, unneed] = DataValidation.isRecipeNeeded(link)
    }
  } else if (it === ITEMTYPE_LURE) {
    need = DataValidation.isBait(link)
  } else if (it === ITEMTYPE_ENCHANTING_RUNE_POTENCY) {
    if (account.options.displayrunelevel) {
      need = DataValidation.isPotency(link) ?? ""
    }
  } else if (DataValidation.isValidEquip(GetItemLinkEquipType(link))) {
    const [craft, line, trait] = DataValidation.getTrait(link)
    if (account.options.displaystyles) {
      let name = zo_strformat("<<C:1>>", GetItemStyleName(GetItemLinkItemStyle(link)))
      const [unusedStart] = string.find(name, "Unused")
      if (unusedStart !== undefined) {
        for (const [index, data] of pairs(STATE.Loc.styleNames)) {
          if (string.lower(index) === string.lower(name)) {
            name = zo_strformat("<<C:1>>", data)
          }
        }
      }
      control.AddLine(`\n|cC5C29E${zo_strformat("<<ZC:1>>", name)}|r`, "ZoFontGameSmall")
    }
    if (craft !== false && line !== undefined && trait !== undefined) {
      const [itemNeed, itemUnneed] = DataValidation.isItemNeeded(craft, line, trait, id, link)
      need = itemNeed ?? ""
      unneed = itemUnneed ?? ""
    }
  }
  if (need !== "" && account.options.displayunknown) {
    control.AddLine(need, "TemperCraftingFont")
  }
  if (unneed !== "" && account.options.displayknown) {
    control.AddLine(unneed, "TemperCraftingFont")
  }
  const ownStorage = account.storage[stripedLink]
  if (account.options.showstock && ownStorage !== undefined) {
    const pairedInfo = account.materials[stripedLink]
    const pairedStorage = pairedInfo !== undefined ? account.storage[pairedInfo.link] : undefined
    if (pairedInfo !== undefined && pairedStorage !== undefined) {
      let prefix1 = ""
      let prefix2 = ""

      if (pairedInfo.raw) {
        prefix1 = "Raw: "
        prefix2 = "Refined: "
      } else {
        prefix1 = "Refined: "
        prefix2 = "Raw: "
      }
      for (const [x, stock] of pairs(ownStorage)) {
        if (stock !== undefined && stock > 0) {
          store.push(`|c8085FF${localizeStorage(x)}:|r |cC0C5FF${stock}|r`)
        }
      }
      if (store.length > 0) {
        control.AddLine(prefix1 + table.concat(store, ", "), "TemperCraftingFont")
      }
      store = []
      for (const [x, stock] of pairs(pairedStorage)) {
        if (stock !== undefined && stock > 0) {
          store.push(`|c8085FF${localizeStorage(x)}:|r |cC0C5FF${stock}|r`)
        }
      }
      if (store.length > 0) {
        control.AddLine(prefix2 + table.concat(store, ", "), "TemperCraftingFont")
      }
    } else {
      for (const [x, stock] of pairs(ownStorage)) {
        if (stock !== undefined && stock > 0) {
          store.push(`|c8085FF${localizeStorage(x)}:|r |cC0C5FF${stock}|r`)
        }
      }
      if (store.length > 0) {
        control.AddLine(table.concat(store, ", "), "TemperCraftingFont")
      }
    }
  }
}
