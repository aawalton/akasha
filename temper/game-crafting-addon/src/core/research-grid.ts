import { CraftIcon } from "../data/icons"
import { Chat, ToChat } from "../helpers"
import { Lang } from "../lang"
import { state } from "../state"
import * as Characters from "./characters"
import * as Inventory from "./inventory"
import { NeedAppend, UpdateTrackingStatus } from "./research-tracking"
import type { CsTooltipOwner } from "./tooltips"
import * as Tooltips from "./tooltips"
import * as Utilities from "./utilities"


const WM = WINDOW_MANAGER

export function DrawTraitColumn(craft: number, line: number): undefined {
  const [name, icon] = GetSmithingResearchLineInfo(craft, line)
  const [craftSkillType, craftSkillLineIndex] = GetCraftingSkillLineIndices(craft)
  const [craftname] = GetSkillLineInfo(craftSkillType, craftSkillLineIndex)
  const p = WM.GetControlByName(`TemperCrafting_PanelCraft${craft}Line${line}`)
  let c = WM.CreateControl(`TemperCrafting_PanelCraft${craft}Line${line}Header`, p, CT_BUTTON)
  c.SetAnchor(3, p, 3, -1, 0)
  c.SetDimensions(27, 27)
  c.SetClickSound("Click")
  c.EnableMouseButton(2, true)
  c.SetHandler("OnMouseEnter", (self: CsTooltipOwner) => {
    Tooltips.Tooltip(self, true, true, self, "bc")
  })
  c.SetHandler("OnMouseExit", (self: CsTooltipOwner) => {
    Tooltips.Tooltip(self, false, true)
  })
  c.SetHandler("OnMouseDown", (_self: Control, button: number) => {
    const studies = state.Account.crafting.studies[state.SelectedPlayer]
    if (studies === undefined) {
      return
    }
    let value = false
    for (let trait = 1; trait <= state.MaxTraits; trait++) {
      if (studies[craft]?.[line]?.[trait] === false) {
        value = true
        break
      }
    }
    if (button === 2) {
      const panel = WM.GetControlByName(`TemperCrafting_PanelCraft${craft}`)
      if (panel !== undefined) {
        for (let col = 1; col <= panel.GetNumChildren(); col++) {
          const colTable = studies[craft]?.[col]
          if (colTable !== undefined) {
            for (let trait = 1; trait <= state.MaxTraits; trait++) {
              colTable[trait] = value
            }
          }
          UpdateStudyLine(panel.GetChild<Control>(col), value)
        }
      }
    } else {
      const lineTable = studies[craft]?.[line]
      if (lineTable !== undefined) {
        for (let trait = 1; trait <= state.MaxTraits; trait++) {
          lineTable[trait] = value
        }
      }
      UpdateStudyLine(p, value)
    }
    if (value === false) {
      state.Account.trait.tracking[state.SelectedPlayer] = false
    } else {
      UpdateTrackingStatus(state.SelectedPlayer)
    }
  })
  c.data = { info: zo_strformat(state.Loc.TT[0], name, CraftIcon[craft], craftname) }
  const headerTexture = WM.CreateControl(
    `TemperCrafting_PanelCraft${craft}Line${line}HeaderTexture`,
    c,
    CT_TEXTURE
  )
  headerTexture.SetAnchor(128, c, 128, 0, 0)
  headerTexture.SetDimensions(26, 26)
  headerTexture.SetTexture(icon)
  for (let trait = 1; trait <= state.MaxTraits; trait++) {
    const bg = WM.CreateControl(
      `TemperCrafting_PanelCraft${craft}Line${line}Trait${trait}Bg`,
      p,
      CT_BACKDROP
    )
    bg.SetAnchor(3, p, 3, -1, 2 + trait * 26)
    bg.SetDimensions(27, 25)
    bg.SetCenterColor(0.06, 0.06, 0.06, 1)
    bg.SetEdgeTexture("", 1, 1, 1, 1)
    bg.SetEdgeColor(1, 1, 1, 0.12)
    c = WM.CreateControl(`TemperCrafting_PanelCraft${craft}Line${line}Trait${trait}`, bg, CT_BUTTON)
    c.SetAnchor(128, bg, 128, 0, 0)
    c.SetDimensions(25, 25)
    c.SetClickSound("Click")
    c.EnableMouseButton(2, true)
    c.EnableMouseButton(3, true)
    c.SetHandler("OnMouseEnter", (self: CsTooltipOwner) => {
      Tooltips.Tooltip(self, true)
    })
    c.SetHandler("OnMouseExit", (self: CsTooltipOwner) => {
      Tooltips.Tooltip(self, false)
    })
    c.SetHandler("OnMouseDown", (self: Control, button: number) => {
      const research = self.data?.research
      if (button === 3 && research !== undefined && state.SelectedPlayer === state.CurrentPlayer) {
        const account = state.Account
        let researchBag: number | undefined
        let researchSlot: number | undefined
        if (research[3] === state.CurrentPlayer || research[3] === Lang.en.bank) {
          const id = account.crafting.stored[research[0]]?.[research[1]]?.[research[2]]?.id
          const uid = typeof id === "string" ? id : false
          if (uid !== false) {
            const [bag, slot] = Inventory.ScanUidBag(uid)
            if (
              bag !== false &&
              CanItemBeSmithingTraitResearched(bag, slot, research[0], research[1], research[2]) &&
              Inventory.IsLocked(bag, slot) !== true
            ) {
              researchBag = bag
              researchSlot = slot
            }
          }
        }
        if (researchBag === undefined || researchSlot === undefined) {
          const [bag, slot] = Inventory.ScanBagResearch(
            research[0],
            research[1],
            research[2],
            false,
            true
          )
          if (
            bag !== false &&
            CanItemBeSmithingTraitResearched(bag, slot, research[0], research[1], research[2])
          ) {
            researchBag = bag
            researchSlot = slot
          }
        }
        if (researchBag !== undefined && researchSlot !== undefined) {
          ResearchSmithingTrait(researchBag, researchSlot)
        } else {
          Chat.Print(state.Loc.noSlot)
        }
      } else if (button === 2) {
        const [tnr] = GetSmithingResearchLineTraitInfo(craft, line, trait)
        ToChat(zo_strformat(state.Loc.itemsearch, name, GetString("SI_ITEMTRAITTYPE", tnr)))
      } else if (button === 1) {
        const lineTable = state.Account.crafting.studies[state.SelectedPlayer]?.[craft]?.[line]
        if (lineTable !== undefined) {
          lineTable[trait] = !lineTable[trait]
          UpdateStudyLine(
            WM.GetControlByName(`TemperCrafting_PanelCraft${craft}Line${line}`),
            lineTable
          )
          UpdateTrackingStatus(state.SelectedPlayer)
        }
      }
    })
    const traitTexture = WM.CreateControl(
      `TemperCrafting_PanelCraft${craft}Line${line}Trait${trait}Texture`,
      c,
      CT_TEXTURE
    )
    traitTexture.SetAnchor(128, c, 128, 0, 0)
    traitTexture.SetDimensions(25, 25)
  }
  const countBg = WM.CreateControl(
    `TemperCrafting_PanelCraft${craft}Line${line}CountBg`,
    p,
    CT_BACKDROP
  )
  countBg.SetAnchor(3, p, 3, -1, 262)
  countBg.SetDimensions(27, 25)
  countBg.SetCenterColor(0.06, 0.06, 0.06, 1)
  countBg.SetEdgeTexture("", 1, 1, 1, 1)
  countBg.SetEdgeColor(1, 1, 1, 0.12)
  const count = WM.CreateControl(
    `TemperCrafting_PanelCraft${craft}Line${line}Count`,
    countBg,
    CT_BUTTON
  )
  count.SetAnchor(128, countBg, 128, 0, 0)
  count.SetDimensions(25, 25)
  count.SetHorizontalAlignment(1)
  count.SetVerticalAlignment(1)
  count.SetFont("TemperCraftingFont")
  count.SetNormalFontColor(0.9, 0.87, 0.68, 1)
}

export function UpdatePanelIcon(
  craft: number | undefined,
  line: number | undefined,
  trait: number | undefined
): undefined {
  if (craft === undefined || line === undefined || trait === undefined) {
    return
  }
  if (trait < 1) {
    return
  }
  const account = state.Account
  const [traitType] = GetSmithingResearchLineTraitInfo(craft, line, trait)
  const traitname = GetString("SI_ITEMTRAITTYPE", traitType)
  const control = WM.GetControlByName<TextureControl>(
    `TemperCrafting_PanelCraft${craft}Line${line}Trait${trait}Texture`
  )
  if (control === undefined) {
    return
  }
  const parent = control.GetParent()
  if (parent === undefined) {
    return
  }
  const known =
    state.Data.crafting.researched[state.SelectedPlayer]?.[craft]?.[line]?.[trait] ?? false
  const store = account.crafting.stored[craft]?.[line]?.[trait]
  const storeLink = store?.link
  const storeOwner = store?.owner
  const now = GetTimeStamp()
  let tip = ""
  const CountTraits = (): number => {
    let count = 0
    for (const [, t] of pairs(
      state.Data.crafting.researched[state.SelectedPlayer]?.[craft]?.[line] ?? {}
    )) {
      if (t === true) {
        count = count + 1
      }
    }
    return count
  }
  const need: string[] = []
  const unneed: string[] = []
  const researching: string[] = []
  for (const [, char] of ipairs(Characters.GetCharacters())) {
    const val = state.Data.crafting.researched[char]?.[craft]?.[line]?.[trait] ?? false
    if (val === true) {
      unneed.push(`|c00FF00${char}|r`)
    } else if (val === false) {
      need.push(`|cFF1010${char}|r`)
    } else if (val !== undefined && val > 0) {
      if (char === state.CurrentPlayer) {
        const [, remain] = GetSmithingResearchLineTraitTimes(craft, line, trait)
        researching.push(`|c66FFCC${char} (${Utilities.GetTime(remain)})|r`)
      } else {
        researching.push(
          `|c66FFCC${char} (${Utilities.GetTime(GetDiffBetweenTimeStamps(val, now))})|r`
        )
      }
    }
  }

  const [needTip, unneedTip, researchingTip] = NeedAppend(need, unneed, researching)

  if (researchingTip !== "") {
    tip = `\n${researchingTip}`
  }
  if (needTip !== "") {
    tip = `${tip}\n${needTip}`
  }
  if (unneedTip !== "") {
    tip = `${tip}\n${unneedTip}`
  }

  parent.data = {
    info: `|cFFFFFF${traitname}|r${tip}`,
    buttons: [state.Loc.TT[33], state.Loc.TT[5]],
  }

  if (known === false) {
    let altKnown = false
    if (account.options.advancedcolorgrid) {
      for (const [, char] of ipairs(Characters.GetCharacters())) {
        const v = state.Data.crafting.researched[char]?.[craft]?.[line]?.[trait]
        if (v !== undefined && v !== false) {
          altKnown = true
          break
        }
      }
    }
    control.SetColor(1, 0, 0, 1)
    if (altKnown) {
      control.SetColor(1, 170 / 255, 0, 1)
    }
    control.SetTexture("esoui/art/buttons/decline_up.dds")
    if (storeLink !== undefined && storeOwner !== false && storeOwner !== undefined) {
      const [isSet] = GetItemLinkSetInfo(storeLink, false)
      let mark = true
      if (!account.options.marksetitems && isSet) {
        mark = false
      }
      if (mark) {
        tip = `|t20:20:esoui/art/buttons/pointsplus_up.dds|t |cE8DFAF${storeOwner}|r${tip}`
        control.SetColor(1, 1, 1, 1)

        if (account.options.advancedcolorgrid) {
          if (storeOwner === Lang.en.bank) {
            control.SetColor(0, 0, 0.5, 1)
            if (altKnown) {
              control.SetColor(0.5, 0, 0.5, 1)
            }
          } else if (storeOwner === state.SelectedPlayer) {
            control.SetColor(0, 0, 1, 1)
            if (altKnown) {
              control.SetColor(0.5, 0, 1, 1)
            }
          } else if (storeOwner === state.CurrentPlayer) {
            control.SetColor(0, 1, 1, 1)
            if (altKnown) {
              control.SetColor(1, 0, 1, 1)
            }
          } else if (altKnown) {
            control.SetColor(1, 1, 0, 1)
          }
        }
        control.SetTexture("esoui/art/buttons/pointsplus_up.dds")
        parent.data = {
          link: storeLink,
          addline: [tip],
          research: [craft, line, trait, storeOwner],
          buttons: [state.Loc.TT[32], state.Loc.TT[33], state.Loc.TT[5]],
        }
      }
    }
  } else if (known === true) {
    control.SetColor(0, 1, 0, 1)
    control.SetTexture("esoui/art/buttons/accept_up.dds")
  } else {
    control.SetColor(0.4, 1, 0.8, 1)
    control.SetTexture("esoui/art/miscellaneous/timer_32.dds")
  }
  WM.GetControlByName(`TemperCrafting_PanelCraft${craft}Line${line}Count`)?.SetText(CountTraits())
}

export function UpdateStudyLine(
  control: Control | undefined,
  tracking: boolean | Record<number, boolean>,
  _craft?: number,
  _line?: number
): undefined {
  if (control === undefined) {
    return
  }
  const trackingTable: Record<number, boolean> = {}
  if (tracking === true || tracking === false) {
    for (let trait = 1; trait <= state.MaxTraits; trait++) {
      trackingTable[trait] = tracking
    }
  } else if (type(tracking) === "table") {
    for (const [index, data] of pairs(tracking)) {
      trackingTable[index] = data
    }
  }
  let allTracked = true
  for (const [, data] of pairs(trackingTable)) {
    if (data === false) {
      allTracked = false
      break
    }
  }

  if (allTracked) {
    control.GetNamedChild("HeaderTexture")?.SetColor(1, 1, 1, 1)
    for (let x = 2; x <= control.GetNumChildren() - 1; x++) {
      const subcontrol = control.GetChild<BackdropControl>(x)
      subcontrol?.SetCenterColor(0.06, 0.06, 0.06, 1)
      subcontrol?.SetEdgeColor(1, 1, 1, 0.12)
    }
  } else {
    control.GetNamedChild("HeaderTexture")?.SetColor(1, 0, 0, 1)
    for (let x = 2; x <= control.GetNumChildren() - 1; x++) {
      const subcontrol = control.GetChild<BackdropControl>(x)
      if (trackingTable[x - 1] === true) {
        subcontrol?.SetCenterColor(0.06, 0.06, 0.06, 1)
        subcontrol?.SetEdgeColor(1, 1, 1, 0.12)
      } else {
        subcontrol?.SetCenterColor(0.15, 0, 0, 1)
        subcontrol?.SetEdgeColor(1, 0, 0, 0.5)
      }
    }
  }
}
