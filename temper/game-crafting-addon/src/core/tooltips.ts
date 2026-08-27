import { MAXCRAFT } from "../constants"
import { StripLink } from "../helpers"
import { Lang } from "../lang"
import { state } from "../state"
import * as DataValidation from "./data-validation"
import * as Utilities from "./utilities"

export function SetTimer(control: ButtonControl, hour: number): undefined {
  const account = state.Account
  const seconds = hour * 3600
  if ((account.timer[hour] ?? 0) > 0) {
    control.SetText(`${hour}:00h`)
    account.timer[hour] = 0
  } else {
    control.SetText(Utilities.GetTime(seconds - 1))
    account.timer[hour] = seconds + GetTimeStamp()
  }
  Utilities.GetTimer()
}

export interface CsTooltipOwner extends Control {
  text?: TooltipControl
}

export function Tooltip(
  c: CsTooltipOwner | undefined,
  visible: boolean,
  scale?: boolean,
  parent?: Control,
  pos?: string | number
): undefined {
  if (c === undefined) {
    return
  }
  function IconScale(target: Control, from: number, to: number): undefined {
    const [a, t] = CreateSimpleAnimation(ANIMATION_SCALE, target)
    a.SetDuration(150)
    a.SetStartScale(from)
    a.SetEndScale(to)
    t.SetPlaybackType(ANIMATION_PLAYBACK_ONE_SHOT)
    t.PlayFromStart()
  }
  function TooltipCraft(
    data: TemperCraftingControlData,
    field: CsTooltipCraftField,
    maxval: number
  ): string[] {
    const TT: Record<number, string | string[]> = state.Loc.TT
    function tt(index: number): string {
      const entry = TT[index]
      return typeof entry === "string" ? entry : ""
    }
    if (state.Extern) {
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
        IconScale(texture, 1, 1.4)
      } else {
        IconScale(texture, 1.4, 1)
      }
    }
  }
  if (c.data === undefined) {
    return
  } else if (visible) {
    const account = state.Account
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
      tooltip.AddLine(first + table.concat(c.data.buttons, "\n"), "TemperCraftingFont")
      first = ""
    }

    if (c.data.crafting !== undefined) {
      let amount = account.options.bulkcraftlimit
      if (amount > c.data.crafting[1]) {
        amount = c.data.crafting[1]
      }
      tooltip.AddLine(
        first + table.concat(TooltipCraft(c.data, c.data.crafting[0], amount), "\n"),
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

export function TooltipShow(control: TooltipControl, link: string, id?: string): undefined {
  const account = state.Account
  function localizeStorage(storage: string): string {
    let localize = ""
    if (GetCVar("language.2") !== "en") {
      if (storage === Lang.en.bank) {
        localize = state.Loc.bank
      }
      const [housebankStart] = string.find(storage, Lang.en.housebank)
      if (housebankStart !== undefined) {
        const [localized] = string.gsub(storage, Lang.en.housebank, state.Loc.housebank)
        localize = localized
      }
      if (storage === Lang.en.guildbank) {
        localize = state.Loc.guildbank
      }
      if (storage === Lang.en.craftbag) {
        localize = state.Loc.craftbag
      }
    }
    if (localize === "") {
      localize = storage
    }
    return localize
  }
  const stripedLink = StripLink(link)
  const [it, specializedItemType] = GetItemLinkItemType(link)
  let store: string[] = []
  let need = ""
  let unneed = ""
  if (it === ITEMTYPE_RACIAL_STYLE_MOTIF) {
    ;[need, unneed] = DataValidation.IsStyleNeeded(link)
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
      ;[need, unneed] = DataValidation.IsBlueprintNeeded(link)
    } else {
      ;[need, unneed] = DataValidation.IsRecipeNeeded(link)
    }
  } else if (it === ITEMTYPE_LURE) {
    need = DataValidation.IsBait(link)
  } else if (it === ITEMTYPE_ENCHANTING_RUNE_POTENCY) {
    if (account.options.displayrunelevel) {
      need = DataValidation.IsPotency(link) ?? ""
    }
  } else if (DataValidation.IsValidEquip(GetItemLinkEquipType(link))) {
    const [craft, line, trait] = DataValidation.GetTrait(link)
    if (account.options.displaystyles) {
      let name = zo_strformat("<<C:1>>", GetItemStyleName(GetItemLinkItemStyle(link)))
      const [unusedStart] = string.find(name, "Unused")
      if (unusedStart !== undefined) {
        for (const [index, data] of pairs(state.Loc.styleNames)) {
          if (string.lower(index) === string.lower(name)) {
            name = zo_strformat("<<C:1>>", data)
          }
        }
      }
      control.AddLine(`\n|cC5C29E${zo_strformat("<<ZC:1>>", name)}|r`, "ZoFontGameSmall")
    }
    if (craft !== false && line !== undefined && trait !== undefined) {
      const [itemNeed, itemUnneed] = DataValidation.IsItemNeeded(craft, line, trait, id, link)
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
