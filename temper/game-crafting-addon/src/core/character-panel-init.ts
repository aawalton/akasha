import { state } from "../state"
import * as CharacterPanel from "./character-panel"
import * as Characters from "./characters"
import * as Options from "./options"
import type { CsTooltipOwner } from "./tooltips"
import * as Tooltips from "./tooltips"

const trackingFlag = (tracking: Record<string, boolean>, char: string): boolean => {
  const current = tracking[char]
  if (current === undefined) {
    tracking[char] = false
    return false
  }
  return current
}

export function CharacterInitialize(): undefined {
  if (TemperCrafting_CharacterFrame1 !== undefined) {
    return
  }
  const account = state.Account

  let overviewHeight = 83
  if (account.options.overviewstyle === 1) {
    overviewHeight = overviewHeight + 58
  }
  if (account.options.overviewstyle !== 3) {
    overviewHeight = overviewHeight + 58
  }

  const tex = (checked: boolean): string =>
    checked
      ? "|t16:16:esoui/art/buttons/checkbox_checked.dds|t"
      : "|t16:16:esoui/art/buttons/checkbox_unchecked.dds|t"
  for (const [x, char] of ipairs(Characters.GetCharacters())) {
    const frame = WINDOW_MANAGER.CreateControl(
      `TemperCrafting_CharacterFrame${x}`,
      TemperCrafting_CharacterPanelBoxScrollChild,
      CT_CONTROL
    )
    frame.SetAnchor(
      TOPLEFT,
      TemperCrafting_CharacterPanelBoxScrollChild,
      TOPLEFT,
      0,
      (x - 1) * overviewHeight
    )
    let offsetPos = 0

    let bg = WINDOW_MANAGER.CreateControl(`TemperCrafting_Character${x}NameBG`, frame, CT_BACKDROP)
    bg.SetAnchor(TOPLEFT, frame, TOPLEFT, 0, 0)
    offsetPos = 60
    bg.SetDimensions(563, offsetPos)
    bg.SetCenterColor(0.06, 0.06, 0.06, 1)
    bg.SetEdgeColor(0.12, 0.12, 0.12, 1)
    bg.SetEdgeTexture("", 1, 1, 1)

    let btn = WINDOW_MANAGER.CreateControl(`TemperCrafting_Character${x}Name`, frame, CT_BUTTON)
    btn.SetAnchor(TOPLEFT, frame, TOPLEFT, 10, 1)
    btn.SetDimensions(450, 35)
    btn.SetHorizontalAlignment(0)
    btn.SetVerticalAlignment(1)
    btn.SetClickSound("Click")
    btn.EnableMouseButton(2, true)
    btn.EnableMouseButton(3, true)
    btn.SetFont("ZoFontWinH3")
    btn.SetNormalFontColor(1, 1, 1, 1)
    btn.SetMouseOverFontColor(1, 0.66, 0.3, 1)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.Tooltip(self, true, false, self, "bl")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))
    btn.SetHandler("OnMouseDown", (self: ButtonControl, button: number) =>
      CharacterPanel.LoadCharacter(self, button)
    )

    btn = WINDOW_MANAGER.CreateControl(
      `TemperCrafting_Character${x}InfoSkillPoints`,
      frame,
      CT_BUTTON
    )
    btn.SetAnchor(TOPLEFT, frame, TOPLEFT, 8, 30)
    btn.SetDimensions(80, 25)
    btn.SetHorizontalAlignment(0)
    btn.SetVerticalAlignment(1)
    btn.SetFont("ZoFontGame")
    btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.Tooltip(self, true, false, self, "bl")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))

    btn = WINDOW_MANAGER.CreateControl(
      `TemperCrafting_Character${x}InfoSkyShards`,
      frame,
      CT_BUTTON
    )
    btn.SetAnchor(TOPLEFT, frame, TOPLEFT, 88, 30)
    btn.SetDimensions(80, 25)
    btn.SetHorizontalAlignment(0)
    btn.SetVerticalAlignment(1)
    btn.SetFont("ZoFontGame")
    btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.Tooltip(self, true, false, self, "bl")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))

    btn = WINDOW_MANAGER.CreateControl(`TemperCrafting_Character${x}Info`, frame, CT_BUTTON)
    btn.SetAnchor(TOPLEFT, frame, TOPLEFT, 176, 30)
    btn.SetDimensions(400, 25)
    btn.SetHorizontalAlignment(0)
    btn.SetVerticalAlignment(1)
    btn.SetFont("ZoFontGame")
    btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.Tooltip(self, true, false, self, "bl")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))

    btn = WINDOW_MANAGER.CreateControl(`TemperCrafting_Character${x}Trait`, frame, CT_BUTTON)
    btn.SetAnchor(TOPLEFT, frame, TOPLEFT, 307, 7)
    btn.SetDimensions(80, 25)
    btn.SetHorizontalAlignment(2)
    btn.SetVerticalAlignment(1)
    btn.SetFont("ZoFontGame")
    btn.SetClickSound("Click")
    btn.SetText(
      `${tex(trackingFlag(account.trait.tracking, char))} |t22:22:esoui/art/icons/crafting_potent_nirncrux_dust.dds|t`
    )
    btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.Tooltip(self, true, false, self, "bc")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))
    btn.SetHandler("OnMouseDown", (self: ButtonControl) => {
      account.trait.tracking[char] = Options.TraitToggle(
        self,
        char,
        "|t22:22:esoui/art/icons/crafting_potent_nirncrux_dust.dds|t"
      )
    })
    btn.data = { info: state.Loc.TT[24] }

    btn = WINDOW_MANAGER.CreateControl(`TemperCrafting_Character${x}Style`, frame, CT_BUTTON)
    btn.SetAnchor(TOPLEFT, frame, TOPLEFT, 362, 7)
    btn.SetDimensions(80, 25)
    btn.SetHorizontalAlignment(2)
    btn.SetVerticalAlignment(1)
    btn.SetFont("ZoFontGame")
    btn.SetClickSound("Click")
    btn.SetText(
      `${tex(trackingFlag(account.style.tracking, char))} |t22:22:esoui/art/icons/quest_book_001.dds|t`
    )
    btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.Tooltip(self, true, false, self, "bc")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))
    btn.SetHandler("OnClicked", (self: ButtonControl) => {
      account.style.tracking[char] = Options.OptionSelect(
        self,
        account.style.tracking[char],
        "|t22:22:esoui/art/icons/quest_book_001.dds|t"
      )
    })
    btn.data = { info: state.Loc.TT[12] }

    btn = WINDOW_MANAGER.CreateControl(`TemperCrafting_Character${x}Recipe`, frame, CT_BUTTON)
    btn.SetAnchor(TOPLEFT, frame, TOPLEFT, 417, 7)
    btn.SetDimensions(80, 25)
    btn.SetHorizontalAlignment(2)
    btn.SetVerticalAlignment(1)
    btn.SetFont("ZoFontGame")
    btn.SetClickSound("Click")
    btn.SetText(
      `${tex(trackingFlag(account.cook.tracking, char))} |t22:22:esoui/art/icons/quest_scroll_001.dds|t`
    )
    btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.Tooltip(self, true, false, self, "bc")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))
    btn.SetHandler("OnClicked", (self: ButtonControl) => {
      account.cook.tracking[char] = Options.OptionSelect(
        self,
        account.cook.tracking[char],
        "|t22:22:esoui/art/icons/quest_scroll_001.dds|t"
      )
    })
    btn.data = { info: state.Loc.TT[13] }

    btn = WINDOW_MANAGER.CreateControl(`TemperCrafting_Character${x}Furnisher`, frame, CT_BUTTON)
    btn.SetAnchor(TOPLEFT, frame, TOPLEFT, 472, 7)
    btn.SetDimensions(80, 25)
    btn.SetHorizontalAlignment(2)
    btn.SetVerticalAlignment(1)
    btn.SetFont("ZoFontGame")
    btn.SetClickSound("Click")
    btn.SetText(
      `${tex(trackingFlag(account.furnisher.tracking, char))} |t22:22:EsoUI/Art/Crafting/provisioner_indexIcon_furnishings_up.dds|t`
    )
    btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
    btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
      Tooltips.Tooltip(self, true, false, self, "bc")
    )
    btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))
    btn.SetHandler("OnClicked", (self: ButtonControl) => {
      account.furnisher.tracking[char] = Options.OptionSelect(
        self,
        account.furnisher.tracking[char],
        "|t22:22:EsoUI/Art/Crafting/provisioner_indexIcon_furnishings_up.dds|t"
      )
    })
    btn.data = { info: state.Loc.TT[31] }

    offsetPos = offsetPos + 1
    const skills = [5, 4, 3, 0, 2, 1, 6, 7]
    let xpos = 0
    let ypos = offsetPos
    const res = [2, 1, 6, 7]

    if (account.options.overviewstyle !== 3) {
      for (const [y, z] of ipairs(skills)) {
        bg = WINDOW_MANAGER.CreateControl(
          `TemperCrafting_Character${x}Skill${z}BG`,
          frame,
          CT_BACKDROP
        )
        bg.SetAnchor(TOPLEFT, frame, TOPLEFT, xpos, ypos)
        bg.SetDimensions(140, 28)
        bg.SetCenterColor(0.06, 0.06, 0.06, 1)
        bg.SetEdgeColor(0.12, 0.12, 0.12, 1)
        bg.SetEdgeTexture("", 1, 1, 1)

        btn = WINDOW_MANAGER.CreateControl(
          `TemperCrafting_Character${x}Skill${z}`,
          frame,
          CT_BUTTON
        )
        btn.SetAnchor(TOPLEFT, frame, TOPLEFT, xpos + 5, ypos)
        btn.SetDimensions(165, 28)
        btn.SetFont("TemperCraftingFont")
        btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
        btn.SetHorizontalAlignment(0)
        btn.SetVerticalAlignment(1)
        btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
          Tooltips.Tooltip(self, true, false, self, "bl")
        )
        btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))
        xpos = xpos + 141
        if (y === 4) {
          xpos = 0
          ypos = ypos + 29
        }
      }
    }

    xpos = 0

    if (account.options.overviewstyle === 1) {
      for (const [, z] of ipairs(res)) {
        bg = WINDOW_MANAGER.CreateControl(
          `TemperCrafting_Character${x}Research${z}BG`,
          frame,
          CT_BACKDROP
        )
        bg.SetAnchor(TOPLEFT, frame, TOPLEFT, xpos, offsetPos + 58)
        bg.SetDimensions(140, 70)
        bg.SetCenterColor(0.06, 0.06, 0.06, 1)
        bg.SetEdgeColor(0.12, 0.12, 0.12, 1)
        bg.SetEdgeTexture("", 1, 1, 1)
        xpos = xpos + 141
        for (let i = 1; i <= 3; i++) {
          btn = WINDOW_MANAGER.CreateControl(
            `TemperCrafting_Character${x}Research${z}Slot${i}`,
            bg,
            CT_BUTTON
          )
          btn.SetAnchor(TOPLEFT, bg, TOPLEFT, 5, 1 + (i - 1) * 22)
          btn.SetDimensions(137, 22)
          btn.SetFont("TemperCraftingFont")
          btn.SetNormalFontColor(0.9, 0.87, 0.68, 1)
          btn.SetHorizontalAlignment(0)
          btn.SetVerticalAlignment(1)
          btn.SetHandler("OnMouseEnter", (self: CsTooltipOwner) =>
            Tooltips.Tooltip(self, true, false, self, "bl")
          )
          btn.SetHandler("OnMouseExit", (self: CsTooltipOwner) => Tooltips.Tooltip(self, false))
          const lbl = WINDOW_MANAGER.CreateControl(
            `TemperCrafting_Character${x}Research${z}Slot${i}Time`,
            bg,
            CT_LABEL
          )
          lbl.SetAnchor(TOPRIGHT, bg, TOPRIGHT, -5, 1 + (i - 1) * 22)
          lbl.SetDimensions(90, 22)
          lbl.SetFont("TemperCraftingFont")
          lbl.SetColor(0.9, 0.87, 0.68, 1)
          lbl.SetHorizontalAlignment(2)
          lbl.SetVerticalAlignment(1)
        }
      }
    }
  }
}
