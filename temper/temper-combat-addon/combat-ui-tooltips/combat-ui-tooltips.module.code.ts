export interface SkillRowControl extends Control {
  id?: number
  delay?: number
  ignored?: boolean
}

export interface ScribedSkillControl extends Control {
  abilityId?: number
  scriptIds?: number[]
}

export interface CPLegacyControl extends Control {
  skillId?: number
  discipline?: number
}

export interface CPStarControl extends Control {
  starId?: number
  points?: number
  slotted?: boolean
}

export interface GearItemControl extends Control {
  itemLink?: string
  enchantDescription?: string
}

export function skillTooltipOnMouseEnter(this: void, control: Control): undefined {
  InitializeTooltip(SkillTooltip, control, TOPLEFT, 0, 5, BOTTOMLEFT)

  const rowControl = control.GetParent<SkillRowControl>()

  const id = rowControl?.id
  if (id == null) {
    return undefined
  }
  const delay = rowControl?.delay
  const font = string.format(
    "%s|%s|%s",
    GetString(SI_TEMPER_COMBAT_STD_FONT),
    16,
    "soft-shadow-thin"
  )

  const format = rowControl?.ignored === true ? "ID: %d (Off GCD)" : "ID: %d"

  SkillTooltip.SetAbilityId(id)
  SkillTooltip.AddVerticalPadding(15)
  SkillTooltip.AddLine(
    string.format(format, id),
    font,
    0.7,
    0.7,
    0.8,
    TOP,
    MODIFY_TEXT_TYPE_NONE,
    TEXT_ALIGN_CENTER
  )
  if (delay != null) {
    SkillTooltip.AddLine(
      string.format("Average delay: %d ms", delay),
      font,
      0.7,
      0.7,
      0.8,
      TOP,
      MODIFY_TEXT_TYPE_NONE,
      TEXT_ALIGN_CENTER
    )
  }
  return undefined
}

export function skillTooltipOnMouseExit(this: void, _control: Control): undefined {
  ClearTooltip(SkillTooltip)
  return undefined
}

export function scribedSkillTooltipOnMouseEnter(
  this: void,
  control: ScribedSkillControl
): undefined {
  if (control.scriptIds == null) {
    return undefined
  }
  const abilityId = control.abilityId
  const scriptIds = control.scriptIds
  if (abilityId == null) {
    return undefined
  }

  InitializeTooltip(SkillTooltip, control, TOPLEFT, 0, 5, BOTTOMLEFT)
  SetCraftedAbilityScriptSelectionOverride(
    GetAbilityCraftedAbilityId(abilityId),
    scriptIds[0] ?? 0,
    scriptIds[1] ?? 0,
    scriptIds[2] ?? 0
  )
  SkillTooltip.SetAbilityId(abilityId)
  return undefined
}

export function scribedSkillTooltipOnMouseExit(this: void, _control: Control): undefined {
  ClearTooltip(SkillTooltip)
  return undefined
}

export function cpTooltipOnMouseEnterLegacy(this: void, control: CPLegacyControl): undefined {
  if (control.skillId == null) {
    return undefined
  }

  InitializeTooltip(InformationTooltip, control, TOPLEFT, 0, 5, BOTTOMLEFT)
  return undefined
}

export function cpTooltipOnMouseEnter(this: void, starControl: CPStarControl): undefined {
  if (starControl.starId == null) {
    return undefined
  }

  InitializeTooltip(ChampionSkillTooltip, starControl, TOPLEFT, 0, 5, BOTTOMLEFT)

  ChampionSkillTooltip.SetChampionSkill(
    starControl.starId,
    starControl.points ?? 0,
    undefined,
    starControl.slotted
  )
  return undefined
}

export function cpTooltipOnMouseExitLegacy(this: void, _control: Control): undefined {
  ClearTooltip(InformationTooltip)
  return undefined
}

export function cpTooltipOnMouseExit(this: void, _control: Control): undefined {
  ClearTooltip(ChampionSkillTooltip)
  return undefined
}

export function itemTooltipOnMouseEnter(this: void, control: GearItemControl): undefined {
  const itemLink = control.itemLink
  const enchantDescription = control.enchantDescription
  const parent = control.GetParent()
  if (parent == null) {
    return undefined
  }

  if (itemLink !== "" && itemLink != null) {
    InitializeTooltip(ItemTooltip, parent, TOPLEFT, 5, 0, TOPRIGHT)
    ItemTooltip.SetLink(itemLink)
  } else if (enchantDescription !== "" && enchantDescription != null) {
    InitializeTooltip(SkillTooltip, parent, TOPLEFT, 5, 0, TOPRIGHT)
    SkillTooltip.AddVerticalPadding(5)
    SkillTooltip.AddLine(enchantDescription)
  }
  return undefined
}

export function itemTooltipOnMouseExit(this: void, _control: Control): undefined {
  ClearTooltip(ItemTooltip)
  ClearTooltip(SkillTooltip)
  return undefined
}

TemperCombat.SkillTooltip_OnMouseEnter = skillTooltipOnMouseEnter
TemperCombat.SkillTooltip_OnMouseExit = skillTooltipOnMouseExit
TemperCombat.ScribedSkillTooltip_OnMouseEnter = scribedSkillTooltipOnMouseEnter
TemperCombat.ScribedSkillTooltip_OnMouseExit = scribedSkillTooltipOnMouseExit
TemperCombat.CPTooltip_OnMouseEnter = cpTooltipOnMouseEnter
TemperCombat.CPTooltip_OnMouseEnterLegacy = cpTooltipOnMouseEnterLegacy
TemperCombat.CPTooltip_OnMouseExit = cpTooltipOnMouseExit
TemperCombat.CPTooltip_OnMouseExitLegacy = cpTooltipOnMouseExitLegacy
TemperCombat.ItemTooltip_OnMouseEnter = itemTooltipOnMouseEnter
TemperCombat.ItemTooltip_OnMouseExit = itemTooltipOnMouseExit
