import { type CraftedSetEntry, Sets } from "../data/sets-data"
import { NilCheckSet, ToChat } from "../helpers"
import { state } from "../state"
import type { NameSortable } from "./player-state"
import * as PlayerState from "./player-state"
import * as ResearchGrid from "./research-grid"
import * as StyleTracking from "./style-tracking"
import type { CsTooltipOwner } from "./tooltips"
import * as Tooltips from "./tooltips"

const mustControl = <T extends Control = Control>(name: string): T =>
  WINDOW_MANAGER.GetControlByName<T>(name) ?? error(`TemperCrafting: missing control ${name}`)

const defined = <T>(value: T | undefined): T =>
  value ?? error("TemperCrafting: unexpected nil value")

const allNamed = (
  sets: Record<number, CraftedSetEntry>
): sets is Record<number, CraftedSetEntry & NameSortable> => {
  for (const [, set] of pairs(sets)) {
    if (set.name === undefined) {
      return false
    }
  }
  return true
}

export function OptionSetSelect(control: ButtonControl, button: number): undefined {
  const data = control.data
  if (data === undefined) {
    return
  }
  if (button === 2) {
    ToChat(defined(data.link))
  } else {
    for (let x = 1; x <= 3; x++) {
      const zoneName = GetZoneNameByIndex(defined(data.zone?.[x]))
      const [nodeKnown, nodeName] = GetFastTravelNodeInfo(defined(data.node?.[x]))
      const nr = defined(data.nr)
      let travel = true
      const zonename = zo_strformat("<<C:1>>", zoneName)
      let nodename: string = state.Loc.unknown
      if (defined(Sets[nr]).nodes[x] === -1) {
        nodename = state.Loc.TT[16]
      } else if (defined(Sets[nr]).nodes[x] === -2) {
        nodename = state.Loc.TT[17]
      } else if (defined(Sets[nr]).nodes[x] === -3) {
        nodename = ""
      }
      let cost = ` (|cFFFF00${GetRecallCost()}|r|t1:0:x.dds|t |t14:14:esoui/art/currency/currency_gold.dds|t)`
      if (nodeKnown) {
        nodename = zo_strformat("<<C:1>>", nodeName)
      } else {
        travel = false
        cost = ""
      }
      mustControl(`TemperCrafting_PanelButtonWayshrine${x}`).data = {
        set: nr,
        travel: travel,
        info: `${nodename}\n${zonename}${cost}`,
      }
    }
    TemperCrafting_PanelButtonCraftedSets.data = { link: data.link }
    TemperCrafting_PanelButtonCraftedSets.SetText(defined(data.name))
    TemperCrafting_SetPanel.SetHidden(true)
  }
}

export function OptionSelect(
  control: ButtonControl,
  condition: boolean | undefined,
  text: string
): boolean
export function OptionSelect(
  control: ButtonControl | undefined,
  condition: boolean | undefined,
  text: string
): boolean | undefined
export function OptionSelect(
  control: ButtonControl | undefined,
  condition: boolean | undefined,
  text: string
): boolean | undefined {
  if (control === undefined) {
    return
  }
  const newCondition = condition !== true
  let tex = "esoui/art/buttons/checkbox_unchecked.dds"
  if (newCondition) {
    tex = "esoui/art/buttons/checkbox_checked.dds"
  }
  control.SetText(`|t16:16:${tex}|t ${text}`)
  return newCondition
}

export function TraitToggle(control: ButtonControl, char: string, text: string): boolean {
  const crafts = [
    CRAFTING_TYPE_BLACKSMITHING,
    CRAFTING_TYPE_CLOTHIER,
    CRAFTING_TYPE_WOODWORKING,
    CRAFTING_TYPE_JEWELRYCRAFTING,
  ]
  const value = OptionSelect(control, defined(state.Account).trait.tracking[char], text)
  for (const [, craft] of ipairs(crafts)) {
    const numLines = GetNumSmithingResearchLines(craft)
    for (let line = 1; line <= numLines; line++) {
      const maxTraits = state.MaxTraits
      for (let trait = 1; trait <= maxTraits; trait++) {
        NilCheckSet(state.Account.crafting.studies, value, char, craft, line, trait)
      }
      if (state.SelectedPlayer === char) {
        ResearchGrid.UpdateStudyLine(
          mustControl(`TemperCrafting_PanelCraft${craft}`).GetChild<Control>(line),
          value
        )
      }
    }
  }
  return value
}

export function OptionSet(): undefined {
  const account = defined(state.Account)
  TemperCrafting_ButtonFrame.SetHidden(!account.options.showbutton)
  TemperCrafting_ButtonFrameButtonBG.SetMovable(!account.options.lockbutton)
  TemperCrafting_ButtonFrameButtonBG.SetMouseEnabled(!account.options.lockbutton)

  TemperCrafting_Quest.SetMovable(!account.options.lockelements)
  TemperCrafting_Quest.SetMouseEnabled(!account.options.lockelements)

  TemperCrafting_Panel.SetMovable(!account.options.lockelements)
  TemperCrafting_Panel.SetMouseEnabled(!account.options.lockelements)

  TemperCrafting_Blueprint_Window.SetMovable(!account.options.lockelements)
  TemperCrafting_Blueprint_Window.SetMouseEnabled(!account.options.lockelements)

  TemperCrafting_Cook.SetMovable(!account.options.lockelements)
  TemperCrafting_Cook.SetMouseEnabled(!account.options.lockelements)

  TemperCrafting_Recipe_Window.SetMovable(!account.options.lockelements)
  TemperCrafting_Recipe_Window.SetMouseEnabled(!account.options.lockelements)

  TemperCrafting_Rune.SetMovable(!account.options.lockelements)
  TemperCrafting_Rune.SetMouseEnabled(!account.options.lockelements)

  TemperCrafting_Style_Window.SetMovable(!account.options.lockelements)
  TemperCrafting_Style_Window.SetMouseEnabled(!account.options.lockelements)
}

export function SetsSet(): undefined {
  const account = defined(state.Account)
  const character = defined(state.Character)
  const rawPreviewType = character.previewType
  const invalidPreview =
    typeof rawPreviewType !== "number" || rawPreviewType < 1 || rawPreviewType > 4
  if (invalidPreview) {
    character.previewType = 1
  }
  const previewType = invalidPreview ? 1 : rawPreviewType
  for (const [, set] of pairs(Sets)) {
    const link = `|H1:item:${set.item[previewType]}:370:50:0:370:50:0:0:0:0:0:0:0:0:0:${GetHighestItemStyleId()}:0:0:0:10000:0|h|h`
    const [, setName] = GetItemLinkSetInfo(link, false)
    set.name = setName
  }
  if (!allNamed(Sets)) {
    error("TemperCrafting: crafted-set names missing after preview refresh")
  }
  if (account.options.sortsets === 1) {
    table.sort(Sets, PlayerState.asort)
  } else if (account.options.sortsets === 2) {
    table.sort(Sets, PlayerState.traitsort)
  }
  for (const [x, set] of pairs(Sets)) {
    let btn = WINDOW_MANAGER.GetControlByName<ButtonControl>(
      `TemperCrafting_SetPanelScrollChildButton${x}`
    )
    if (btn === undefined) {
      btn = WINDOW_MANAGER.CreateControl(
        `TemperCrafting_SetPanelScrollChildButton${x}`,
        TemperCrafting_SetPanelScrollChild,
        CT_BUTTON
      )
      btn.SetAnchor(3, undefined, 3, 8, 5 + (x - 1) * 22)
      btn.SetDimensions(280, 22)
      btn.SetFont("TemperCraftingFont")
      btn.SetClickSound("Click")
      btn.EnableMouseButton(2, true)
      btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
      btn.SetMouseOverFontColor(1, 0.66, 0.2, 1)
      btn.SetHorizontalAlignment(0)
      btn.SetVerticalAlignment(1)
      btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
        Tooltips.Tooltip(self, true, false, TemperCrafting_SetPanel, "tl")
      )
      btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))
      btn.SetHandler("OnMouseDown", (self: ButtonControl, button: number) =>
        OptionSetSelect(self, button)
      )
    }
    const link = `|H1:item:${set.item[previewType]}:370:50:0:370:50:0:0:0:0:0:0:0:0:0:${GetHighestItemStyleId()}:0:0:0:10000:0|h|h`
    const [, rawSetName] = GetItemLinkSetInfo(link, false)
    const setName = zo_strformat("[<<1>>] <<C:2>>", set.traits, rawSetName)
    btn.SetText(setName)
    btn.data = {
      link: link,
      nr: x,
      zone: set.zone,
      node: set.nodes,
      name: setName,
      buttons: [state.Loc.TT[4], state.Loc.TT[5]],
    }
  }
}

export function StyleInitialize(): undefined {
  const Style = defined(state.Style)
  let pre = 0
  const icons = [8, 5, 9, 12, 7, 3, 2, 1, 14, 10, 6, 13, 4, 11]
  StyleTracking.StyleSort()
  for (const [id, data] of ipairs(state.styleNames)) {
    const style = GetValidItemStyleId(data.id)
    const c = WINDOW_MANAGER.GetControlByName(`TemperCrafting_StyleRow${pre}`)
    let p: Control
    if (WINDOW_MANAGER.GetControlByName(`TemperCrafting_StyleRow${id}`) === undefined) {
      p = WINDOW_MANAGER.CreateControl(
        `TemperCrafting_StyleRow${id}`,
        TemperCrafting_StylePanelScrollChildStyles,
        CT_CONTROL
      )
      if (c !== undefined) {
        p.SetAnchor(3, c, 6, 0, 0)
      } else {
        p.SetAnchor(3, undefined, 3, 0, 3)
      }
      p.SetDimensions(750, 90)
    } else {
      p = mustControl(`TemperCrafting_StyleRow${id}`)
    }
    let bg: BackdropControl
    if (
      WINDOW_MANAGER.GetControlByName(`TemperCrafting_StylePanelScrollChildBgLine${id}`) ===
      undefined
    ) {
      bg = WINDOW_MANAGER.CreateControl(
        `TemperCrafting_StylePanelScrollChildBgLine${id}`,
        p,
        CT_BACKDROP
      )
      bg.SetAnchor(3, p, 3, 0, 0)
      bg.SetDimensions(750, 37)
      bg.SetCenterColor(0, 0, 0, 0.2)
      bg.SetEdgeColor(1, 1, 1, 0)
    } else {
      bg = mustControl<BackdropControl>(`TemperCrafting_StylePanelScrollChildBgLine${id}`)
    }

    let btn: ButtonControl
    const [icon, link, name, aName, aLink, popup] = Style.GetHeadline(style)
    if (
      WINDOW_MANAGER.GetControlByName(`TemperCrafting_StylePanelScrollChildMaterial${id}`) ===
      undefined
    ) {
      btn = WINDOW_MANAGER.CreateControl(
        `TemperCrafting_StylePanelScrollChildMaterial${id}`,
        p,
        CT_BUTTON
      )
      btn.SetAnchor(2, bg, 2, 10, 0)
      btn.SetDimensions(30, 30)
    } else {
      btn = mustControl<ButtonControl>(`TemperCrafting_StylePanelScrollChildMaterial${id}`)
    }

    btn.SetNormalTexture(icon)
    btn.EnableMouseButton(2, true)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.Tooltip(self, true, false, TemperCrafting_Style, "tl")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))
    btn.SetHandler("OnMouseDown", (self: ButtonControl, button: number) => {
      if (button === 2) {
        ToChat(defined(self.data?.link))
      }
    })
    btn.data = { link: link, buttons: [state.Loc.TT[5]] }

    let lbl: LabelControl
    if (
      WINDOW_MANAGER.GetControlByName(`TemperCrafting_StylePanelScrollChildName${id}`) === undefined
    ) {
      lbl = WINDOW_MANAGER.CreateControl(
        `TemperCrafting_StylePanelScrollChildName${id}`,
        p,
        CT_LABEL
      )
      lbl.SetAnchor(2, bg, 2, 50, 0)
      lbl.SetDimensions(undefined, 32)
      lbl.SetFont("TemperCraftingFont")
      lbl.SetColor(1, 0.66, 0.2, 1)
      lbl.SetHorizontalAlignment(0)
      lbl.SetVerticalAlignment(1)
    } else {
      lbl = mustControl<LabelControl>(`TemperCrafting_StylePanelScrollChildName${id}`)
    }
    lbl.SetText(name)

    let av: ButtonControl
    if (
      WINDOW_MANAGER.GetControlByName(`TemperCrafting_StylePanelScrollChildAchievement${id}`) ===
      undefined
    ) {
      av = WINDOW_MANAGER.CreateControl(
        `TemperCrafting_StylePanelScrollChildAchievement${id}`,
        p,
        CT_BUTTON
      )
      av.SetAnchor(2, lbl, 8, 15, 0)
      av.SetDimensions(300, 32)
      av.SetFont("TemperCraftingFont")
      av.SetNormalFontColor(1, 0.66, 0.2, 0.5)
      av.SetMouseOverFontColor(1, 0.66, 0.2, 1)
      av.SetHorizontalAlignment(0)
      av.SetVerticalAlignment(1)
    } else {
      av = mustControl<ButtonControl>(`TemperCrafting_StylePanelScrollChildAchievement${id}`)
    }

    if (aName !== "crown") {
      av.EnableMouseButton(2, true)
      av.SetText(`[${aName}]`)
      av.SetHandler("OnMouseDown", (_self: ButtonControl, button: number) => {
        if (button === 2) {
          ToChat(defined(aLink))
        } else {
          const [popupAchievement, popupProgress, popupTimestamp] = unpack(popup)
          ACHIEVEMENTS.ShowAchievementPopup(popupAchievement, popupProgress, popupTimestamp)
          ZO_PopupTooltip_Hide()
        }
      })
    } else {
      av.SetText("|t32:32:esoui/art/currency/currency_crowns_32.dds|t")
    }
    for (const [z, y] of ipairs(icons)) {
      const [slotIcon, slotLink] = Style.GetIconAndLink(style, y)
      let slotBtn: ButtonControl
      const btnName = `TemperCrafting_StylePanelScrollChild${id}Button${y}`
      if (WINDOW_MANAGER.GetControlByName(btnName) === undefined) {
        slotBtn = WINDOW_MANAGER.CreateControl(btnName, p, CT_BUTTON)
        slotBtn.SetAnchor(3, bg, 6, 4 + (z - 1) * 52, 2)
        slotBtn.SetDimensions(52, 50)
        slotBtn.EnableMouseButton(2, true)
        slotBtn.SetClickSound("Click")
        slotBtn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
          Tooltips.Tooltip(self, true, true, TemperCrafting_Style, "tl")
        )
        slotBtn.SetHandler("OnMouseExit", (self: CsTooltipOwner) =>
          Tooltips.Tooltip(self, false, true)
        )
        slotBtn.SetHandler("OnMouseDown", (self: ButtonControl, button: number) => {
          if (button === 2) {
            ToChat(defined(self.data?.link))
          }
        })
      } else {
        slotBtn = mustControl<ButtonControl>(btnName)
      }
      slotBtn.data = { link: slotLink, buttons: [state.Loc.TT[5]] }
      let texControl: TextureControl
      if (WINDOW_MANAGER.GetControlByName(`${btnName}Texture`) === undefined) {
        texControl = WINDOW_MANAGER.CreateControl(`${btnName}Texture`, slotBtn, CT_TEXTURE)
        texControl.SetAnchor(128, slotBtn, 128, 0, 0)
        texControl.SetDimensions(45, 45)
        texControl.SetColor(1, 0, 0, 0.5)
      } else {
        texControl = mustControl<TextureControl>(`${btnName}Texture`)
      }
      texControl.SetTexture(slotIcon)
    }
    pre = id
  }
  StyleTracking.UpdateStyleKnowledge()
}
