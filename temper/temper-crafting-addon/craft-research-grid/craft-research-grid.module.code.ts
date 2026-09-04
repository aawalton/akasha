import * as Characters from "../craft-characters/craft-characters.module.code.ts"
import { CRAFT_ICON } from "../craft-icons/craft-icons.module.code.ts"
import * as Inventory from "../craft-inventory/craft-inventory.module.code.ts"
import { LANG } from "../craft-lang-index/craft-lang-index.module.code.ts"
import {
  needAppend,
  updateTrackingStatus,
} from "../craft-research-tracking/craft-research-tracking.module.code.ts"
import type { CsTooltipOwner } from "../craft-tooltips/craft-tooltips.module.code.ts"
import * as Tooltips from "../craft-tooltips/craft-tooltips.module.code.ts"
import * as Utilities from "../craft-utilities/craft-utilities.module.code.ts"
import { CHAT, toChat } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

const WM = WINDOW_MANAGER

export function drawTraitColumn(craft: number, line: number): undefined {
  const [name, icon] = GetSmithingResearchLineInfo(craft, line)
  const [craftSkillType, craftSkillLineIndex] = GetCraftingSkillLineIndices(craft)
  const [craftname] = GetSkillLineInfo(craftSkillType, craftSkillLineIndex)
  const p = WM.GetControlByName(`TemperCrafting_PanelCraft${craft}Line${line}`)
  let c: TemperCraftingButton = WM.CreateControl(
    `TemperCrafting_PanelCraft${craft}Line${line}Header`,
    p,
    CT_BUTTON
  )
  c.SetAnchor(3, p, 3, -1, 0)
  c.SetDimensions(27, 27)
  c.SetClickSound("Click")
  c.EnableMouseButton(2, true)
  c.SetHandler("OnMouseEnter", (self: CsTooltipOwner) => {
    Tooltips.tooltip(self, true, true, self, "bc")
  })
  c.SetHandler("OnMouseExit", (self: CsTooltipOwner) => {
    Tooltips.tooltip(self, false, true)
  })
  c.SetHandler("OnMouseDown", (_self: TemperCraftingControl, button: number) => {
    const studies = STATE.Account.crafting.studies[STATE.SelectedPlayer]
    if (studies === undefined) {
      return
    }
    let value = false
    for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
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
            for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
              colTable[trait] = value
            }
          }
          updateStudyLine(panel.GetChild<TemperCraftingControl>(col), value)
        }
      }
    } else {
      const lineTable = studies[craft]?.[line]
      if (lineTable !== undefined) {
        for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
          lineTable[trait] = value
        }
      }
      updateStudyLine(p, value)
    }
    if (value === false) {
      STATE.Account.trait.tracking[STATE.SelectedPlayer] = false
    } else {
      updateTrackingStatus(STATE.SelectedPlayer)
    }
  })
  c.data = { info: zo_strformat(STATE.Loc.TT[0], name, CRAFT_ICON[craft], craftname) }
  const headerTexture = WM.CreateControl(
    `TemperCrafting_PanelCraft${craft}Line${line}HeaderTexture`,
    c,
    CT_TEXTURE
  )
  headerTexture.SetAnchor(128, c, 128, 0, 0)
  headerTexture.SetDimensions(26, 26)
  headerTexture.SetTexture(icon)
  for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
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
      Tooltips.tooltip(self, true)
    })
    c.SetHandler("OnMouseExit", (self: CsTooltipOwner) => {
      Tooltips.tooltip(self, false)
    })
    c.SetHandler("OnMouseDown", (self: TemperCraftingControl, button: number) => {
      const research = self.data?.research
      if (button === 3 && research !== undefined && STATE.SelectedPlayer === STATE.CurrentPlayer) {
        const account = STATE.Account
        let researchBag: number | undefined
        let researchSlot: number | undefined
        if (research[3] === STATE.CurrentPlayer || research[3] === LANG.en.bank) {
          const id = account.crafting.stored[research[0]]?.[research[1]]?.[research[2]]?.id
          const uid = typeof id === "string" ? id : false
          if (uid !== false) {
            const [bag, slot] = Inventory.scanUidBag(uid)
            if (
              bag !== false &&
              CanItemBeSmithingTraitResearched(bag, slot, research[0], research[1], research[2]) &&
              Inventory.isLocked(bag, slot) !== true
            ) {
              researchBag = bag
              researchSlot = slot
            }
          }
        }
        if (researchBag === undefined || researchSlot === undefined) {
          const [bag, slot] = Inventory.scanBagResearch(
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
          CHAT.Print(STATE.Loc.noSlot)
        }
      } else if (button === 2) {
        const [tnr] = GetSmithingResearchLineTraitInfo(craft, line, trait)
        toChat(zo_strformat(STATE.Loc.itemsearch, name, GetString("SI_ITEMTRAITTYPE", tnr)))
      } else if (button === 1) {
        const lineTable = STATE.Account.crafting.studies[STATE.SelectedPlayer]?.[craft]?.[line]
        if (lineTable !== undefined) {
          lineTable[trait] = !lineTable[trait]
          updateStudyLine(
            WM.GetControlByName(`TemperCrafting_PanelCraft${craft}Line${line}`),
            lineTable
          )
          updateTrackingStatus(STATE.SelectedPlayer)
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

export function updatePanelIcon(
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
  const account = STATE.Account
  const [traitType] = GetSmithingResearchLineTraitInfo(craft, line, trait)
  const traitname = GetString("SI_ITEMTRAITTYPE", traitType)
  const control = WM.GetControlByName<TextureControl>(
    `TemperCrafting_PanelCraft${craft}Line${line}Trait${trait}Texture`
  )
  if (control === undefined) {
    return
  }
  const parent: TemperCraftingControl | undefined = control.GetParent()
  if (parent === undefined) {
    return
  }
  const known =
    STATE.Data.crafting.researched[STATE.SelectedPlayer]?.[craft]?.[line]?.[trait] ?? false
  const store = account.crafting.stored[craft]?.[line]?.[trait]
  const storeLink = store?.link
  const storeOwner = store?.owner
  const now = GetTimeStamp()
  let tip = ""
  const countTraits = (): number => {
    let count = 0
    for (const [, t] of pairs(
      STATE.Data.crafting.researched[STATE.SelectedPlayer]?.[craft]?.[line] ?? {}
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
  for (const [, char] of ipairs(Characters.getCharacters())) {
    const val = STATE.Data.crafting.researched[char]?.[craft]?.[line]?.[trait] ?? false
    if (val === true) {
      unneed.push(`|c00FF00${char}|r`)
    } else if (val === false) {
      need.push(`|cFF1010${char}|r`)
    } else if (val !== undefined && val > 0) {
      if (char === STATE.CurrentPlayer) {
        const [, remain] = GetSmithingResearchLineTraitTimes(craft, line, trait)
        researching.push(`|c66FFCC${char} (${Utilities.getTime(remain)})|r`)
      } else {
        researching.push(
          `|c66FFCC${char} (${Utilities.getTime(GetDiffBetweenTimeStamps(val, now))})|r`
        )
      }
    }
  }

  const [needTip, unneedTip, researchingTip] = needAppend(need, unneed, researching)

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
    buttons: [STATE.Loc.TT[33], STATE.Loc.TT[5]],
  }

  if (known === false) {
    let altKnown = false
    if (account.options.advancedcolorgrid) {
      for (const [, char] of ipairs(Characters.getCharacters())) {
        const v = STATE.Data.crafting.researched[char]?.[craft]?.[line]?.[trait]
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
          if (storeOwner === LANG.en.bank) {
            control.SetColor(0, 0, 0.5, 1)
            if (altKnown) {
              control.SetColor(0.5, 0, 0.5, 1)
            }
          } else if (storeOwner === STATE.SelectedPlayer) {
            control.SetColor(0, 0, 1, 1)
            if (altKnown) {
              control.SetColor(0.5, 0, 1, 1)
            }
          } else if (storeOwner === STATE.CurrentPlayer) {
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
          buttons: [STATE.Loc.TT[32], STATE.Loc.TT[33], STATE.Loc.TT[5]],
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
  WM.GetControlByName<LabelControl>(`TemperCrafting_PanelCraft${craft}Line${line}Count`)?.SetText(
    countTraits()
  )
}

export function updateStudyLine(
  control: TemperCraftingControl | undefined,
  tracking: boolean | Record<number, boolean>,
  _craft?: number,
  _line?: number
): undefined {
  if (control === undefined) {
    return
  }
  const trackingTable: Record<number, boolean> = {}
  if (tracking === true || tracking === false) {
    for (let trait = 1; trait <= STATE.MaxTraits; trait++) {
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
    control.GetNamedChild<TextureControl>("HeaderTexture")?.SetColor(1, 1, 1, 1)
    for (let x = 2; x <= control.GetNumChildren() - 1; x++) {
      const subcontrol = control.GetChild<BackdropControl>(x)
      subcontrol?.SetCenterColor(0.06, 0.06, 0.06, 1)
      subcontrol?.SetEdgeColor(1, 1, 1, 0.12)
    }
  } else {
    control.GetNamedChild<TextureControl>("HeaderTexture")?.SetColor(1, 0, 0, 1)
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
