import {
  COLOR_SELECT,
  COLOR_USEABLE,
  TEXTURE_REAGENTUNKNOWN,
} from "../potion-constants/potion-constants.module.code.ts"
import { asFields } from "../potion-controls-helpers/potion-controls-helpers.module.code.ts"
import { getAccountSettings } from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import { isScreenRightHalf } from "../potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import type { IngredientView, TraitData } from "../potion-types/potion-types.module.code.ts"

interface HighlightLabel extends LabelControl {
  defaultHighlightColor?: ZoColorDef
}

type ControlHandler = (this: void, ...args: unknown[]) => undefined

function asControlHandler(value: unknown): ControlHandler {
  return value as ControlHandler
}

type TooltipTextSetter = (
  this: void,
  tooltip: TooltipControl,
  text: string,
  color: ZoColorDef
) => undefined

function asTooltipTextSetter(value: unknown): TooltipTextSetter {
  return value as TooltipTextSetter
}

function traitTipEnter(this: void, sender: Control): undefined {
  PotMaker.showTraitTip(sender, true)
}
function traitTipExit(this: void, sender: Control): undefined {
  PotMaker.showTraitTip(sender, false)
}
function solventTipEnter(this: void, sender: Control): undefined {
  const solvent = asFields(sender).solvent
  if (solvent === undefined) {
    return
  }
  for (const p of solvent.pack) {
    const [, stack] = GetItemInfo(p.bagId, p.slotIndex)
    if (stack > 0) {
      if (isScreenRightHalf(sender)) {
        InitializeTooltip(ItemTooltip, sender, TOPRIGHT, -10, -96, TOPLEFT)
      } else {
        InitializeTooltip(ItemTooltip, sender, TOPLEFT, 10, -96, TOPRIGHT)
      }
      ItemTooltip.SetBagItem(p.bagId, p.slotIndex)
      return
    }
  }
  if (isScreenRightHalf(sender)) {
    InitializeTooltip(InformationTooltip, sender, TOPRIGHT, -10, 0, TOPLEFT)
  } else {
    InitializeTooltip(InformationTooltip, sender, TOPLEFT, 10, 0, TOPRIGHT)
  }
  asTooltipTextSetter(SetTooltipText)(
    InformationTooltip,
    solvent.name,
    ZO_TOOLTIP_INSTRUCTIONAL_COLOR
  )
}
function solventTipExit(this: void): undefined {
  ClearTooltip(ItemTooltip)
  ClearTooltip(InformationTooltip)
}
function reagentTipEnter(this: void, sender: Control): undefined {
  PotMaker.showReagentTip(sender, true)
}
function reagentTipExit(this: void, sender: Control): undefined {
  PotMaker.showReagentTip(sender, false)
}

function updateControl(
  this: void,
  trait: TraitData,
  posX: number,
  count: number
): TemperCraftingControl {
  const traitName = trait.name
  const localized = PotMaker.language.traitNames[traitName]
  if (localized === undefined) {
    throw new Error("TemperPotions: missing trait name for " + traitName)
  }
  trait.name = localized
  const checkBoxName = "TemperPotionsCheckBox_" + tostring(posX) + "_" + tostring(count)
  const control: TemperCraftingControl = CreateControlFromVirtual(
    checkBoxName,
    TemperPotionsSearchBG,
    "TemperPotionsTristateButton"
  )
  const height = control.GetHeight()
  const pos = count - 1

  control.SetSimpleAnchorParent(posX + height * (pos % 3), height * math.floor(pos / 3) + 8)

  const fields = asFields(control)
  fields.Trait = trait.name
  fields.trait = trait

  const iconControl = control.GetNamedChild<TextureControl>("Texture")
  if (iconControl !== undefined) {
    iconControl.SetTexture(trait.icon)
    const [r, g, b] = ZO_NORMAL_TEXT.UnpackRGB()
    iconControl.SetColor(r, g, b)
  }

  control.SetHandler("OnMouseEnter", asControlHandler(traitTipEnter))
  control.SetHandler("OnMouseExit", asControlHandler(traitTipExit))

  control.tristate = true

  return control
}

const X_POS_MUST_FILTER = 14
const xPosMustNotFilter = X_POS_MUST_FILTER + 196
const xPosSolventFilter = xPosMustNotFilter + 196

function createControls(this: void): undefined {
  if (PotMaker.PositiveTraitControls.length === 0) {
    const positive: TraitData[] = [
      {
        name: "Restore Health",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_restorehealth.dds",
      },
      {
        name: "Restore Magicka",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_restoremagicka.dds",
      },
      {
        name: "Restore Stamina",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_restorestamina.dds",
      },
      {
        name: "Increase Armor",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_increasearmor.dds",
      },
      {
        name: "Unstoppable",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_unstoppable.dds",
      },
      { name: "Speed", icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_speed.dds" },
      {
        name: "Increase Weapon Power",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_increaseweaponpower.dds",
      },
      {
        name: "Increase Spell Power",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_increasespellpower.dds",
      },
      {
        name: "Weapon Crit",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_weaponcrit.dds",
      },
      { name: "Spell Crit", icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_spellcrit.dds" },
      {
        name: "Increase Spell Resist",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_increasespellresist.dds",
      },
      { name: "Invisible", icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_invisible.dds" },
      { name: "Detection", icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_detection.dds" },
      {
        name: "Sustained Restore Health",
        icon: "esoui/art/icons/alchemy/crafting_poison_trait_hot.dds",
      },
      {
        name: "Vitality",
        icon: "esoui/art/icons/alchemy/crafting_poison_trait_increasehealing.dds",
      },
      { name: "Protection", icon: "esoui/art/icons/alchemy/crafting_poison_trait_protection.dds" },
      { name: "Heroism", icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_heroism.dds" },
    ]
    let cnt = 1
    for (const trait of positive) {
      PotMaker.PositiveTraitControls[cnt - 1] = updateControl(trait, X_POS_MUST_FILTER, cnt)
      cnt = cnt + 1
    }

    const control = CreateControlFromVirtual(
      "TemperPotionsAllMustCheckBox",
      TemperPotionsSearchBG,
      "TemperPotionsCheckBox"
    )
    control.SetAnchor(BOTTOMLEFT, undefined, BOTTOMLEFT, X_POS_MUST_FILTER, -12)
    const highlight = control.GetNamedChild<HighlightLabel>("Text")
    if (highlight !== undefined) {
      highlight.defaultHighlightColor = COLOR_SELECT
    }
    ZO_CheckButton_SetToggleFunction(control, PotMaker.checkAll)
    const labelControl = control.GetNamedChild<LabelControl>("Text")
    if (labelControl !== undefined) {
      labelControl.SetText(PotMaker.language.check_all)
    }
    asFields(control).traitControls = PotMaker.PositiveTraitControls
  }
  if (PotMaker.NegativeTraitControls.length === 0) {
    const negative: TraitData[] = [
      {
        name: "Ravage Health",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_ravagehealth.dds",
      },
      {
        name: "Ravage Magicka",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_ravagemagicka.dds",
      },
      {
        name: "Ravage Stamina",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_ravagestamina.dds",
      },
      {
        name: "Lower Armor",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_lowerarmor.dds",
      },
      { name: "Stun", icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_stun.dds" },
      {
        name: "Reduce Speed",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_reducespeed.dds",
      },
      {
        name: "Lower Weapon Power",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_lowerweaponpower.dds",
      },
      {
        name: "Lower Spell Power",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_lowerspellpower.dds",
      },
      {
        name: "Lower Weapon Crit",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_lowerweaponcrit.dds",
      },
      {
        name: "Lower Spell Crit",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_lowerspellcrit.dds",
      },
      {
        name: "Lower Spell Resist",
        icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_lowerspellresist.dds",
      },
      {
        name: "Creeping Ravage Health",
        icon: "esoui/art/icons/alchemy/crafting_poison_trait_dot.dds",
      },
      { name: "Defile", icon: "esoui/art/icons/alchemy/crafting_poison_trait_decreasehealing.dds" },
      { name: "Vulnerability", icon: "esoui/art/icons/alchemy/crafting_poison_trait_damage.dds" },
      { name: "Timidity", icon: "esoui/art/icons/alchemy/crafting_alchemy_trait_timidity.dds" },
    ]
    let cnt = 1
    for (const trait of negative) {
      PotMaker.NegativeTraitControls[cnt - 1] = updateControl(trait, xPosMustNotFilter, cnt)
      cnt = cnt + 1
    }

    const control = CreateControlFromVirtual(
      "TemperPotionsAllMustNotCheckBox",
      TemperPotionsSearchBG,
      "TemperPotionsCheckBox"
    )
    control.SetAnchor(BOTTOMLEFT, undefined, BOTTOMLEFT, xPosMustNotFilter, -12)
    const highlight = control.GetNamedChild<HighlightLabel>("Text")
    if (highlight !== undefined) {
      highlight.defaultHighlightColor = COLOR_SELECT
    }
    ZO_CheckButton_SetToggleFunction(control, PotMaker.checkAll)
    const labelControl = control.GetNamedChild<LabelControl>("Text")
    if (labelControl !== undefined) {
      labelControl.SetText(PotMaker.language.check_all)
    }
    asFields(control).traitControls = PotMaker.NegativeTraitControls
  }
}
PotMaker.createControls = createControls

function updateControls(this: void): undefined {
  for (const v of PotMaker.SolventFilterControls) {
    v.SetHidden(true)
  }

  const solventOrder: IngredientView[] = []
  for (const [, solvent] of pairs(PotMaker.Inventory.solvents)) {
    if (solvent.stack > 0) {
      solventOrder[solventOrder.length] = solvent
    }
  }
  table.sort(solventOrder, function (this: void, a: IngredientView, b: IngredientView): boolean {
    if (a.level === b.level) {
      return a.itemId < b.itemId
    }
    return a.level < b.level
  })

  for (let index = 1; index <= solventOrder.length; index++) {
    let control = PotMaker.SolventFilterControls[index - 1]
    if (control === undefined) {
      const controlName = "TemperPotionsSolvent" + tostring(index)
      control = CreateControlFromVirtual(
        controlName,
        TemperPotionsSearchBG,
        "TemperPotionsToggleButton"
      )
      control.SetHandler("OnMouseEnter", asControlHandler(solventTipEnter))
      control.SetHandler("OnMouseExit", asControlHandler(solventTipExit))
      control.EnableMouseButton(MOUSE_BUTTON_INDEX_RIGHT, true)
      control.SetHandler("OnClicked", asControlHandler(PotMaker.SolventClicked))
      PotMaker.SolventFilterControls[index - 1] = control
    } else {
      control.SetHidden(false)
    }
    const solvent = solventOrder[index - 1]
    if (solvent === undefined) {
      continue
    }
    const iconControl = control.GetNamedChild<TextureControl>("Texture")
    if (iconControl !== undefined) {
      iconControl.SetTexture(solvent.icon)
      const [r, g, b] = (solvent.protected === true ? STAT_LOWER_COLOR : COLOR_USEABLE).UnpackRGB()
      iconControl.SetColor(r, g, b)
    }
    const numControl = control.GetNamedChild<LabelControl>("Number")
    if (numControl !== undefined) {
      numControl.SetText(solvent.stack)
    }
    const fields = asFields(control)
    fields.text = solvent.name
    fields.solvent = solvent
    const height = control.GetHeight() + 4
    const pos = index - 1
    control.SetSimpleAnchorParent(
      xPosSolventFilter + height * (pos % 3),
      8 + height * math.floor(pos / 3)
    )
  }

  const saveSelection: Record<number, boolean> = {}
  const numChildren = TemperPotionsReagentBG.GetNumChildren()
  for (let i = 1; i <= numChildren; i++) {
    const checkBox = TemperPotionsReagentBG.GetChild<TemperCraftingControl>(i)
    if (checkBox !== undefined) {
      const reagent = asFields(checkBox).reagent
      if (
        !checkBox.IsControlHidden() &&
        PotMaker.ToggleButtonIsChecked(checkBox) &&
        reagent !== undefined
      ) {
        saveSelection[reagent.itemId] = true
      }
      checkBox.SetHidden(true)
    }
  }

  const reagentOrder: IngredientView[] = []
  for (const [, ingredient] of pairs(PotMaker.Inventory.reagents)) {
    reagentOrder[reagentOrder.length] = ingredient
  }
  const accountSettings = getAccountSettings()
  if (accountSettings.reagentStackOrder) {
    table.sort(reagentOrder, function (this: void, a: IngredientView, b: IngredientView): boolean {
      if (a.stack === b.stack) {
        return a.name < b.name
      }
      return a.stack > b.stack
    })
  } else {
    table.sort(reagentOrder, function (this: void, a: IngredientView, b: IngredientView): boolean {
      return a.name < b.name
    })
  }

  for (let index = 1; index <= reagentOrder.length; index++) {
    let control = PotMaker.ReagentFilterControls[index - 1]
    if (control === undefined) {
      const controlName = "TemperPotionsReagent" + tostring(index)
      control = CreateControlFromVirtual(
        controlName,
        TemperPotionsReagentBG,
        "TemperPotionsReagent"
      )
      control.SetHandler("OnMouseEnter", asControlHandler(reagentTipEnter))
      control.SetHandler("OnMouseExit", asControlHandler(reagentTipExit))
      control.EnableMouseButton(MOUSE_BUTTON_INDEX_RIGHT, true)
      control.SetHandler("OnClicked", asControlHandler(PotMaker.ReagentClicked))
      PotMaker.ReagentFilterControls[index - 1] = control
    } else {
      control.SetHidden(false)
    }
    const ingredient = reagentOrder[index - 1]
    if (ingredient === undefined) {
      continue
    }
    control.SetSimpleAnchorParent(
      16 + 40 * ((index - 1) % 12),
      5 + (control.GetHeight() + 2) * math.floor((index - 1) / 12)
    )
    asFields(control).reagent = ingredient
    const iconControl = control.GetNamedChild<TextureControl>("Texture")
    if (iconControl !== undefined) {
      iconControl.SetTexture(ingredient.stack > 0 ? ingredient.icon : TEXTURE_REAGENTUNKNOWN)
      const [r, g, b] = (
        ingredient.protected === true ? STAT_LOWER_COLOR : COLOR_USEABLE
      ).UnpackRGB()
      iconControl.SetColor(r, g, b)
    }
    const numControl = control.GetNamedChild<LabelControl>("Number")
    if (numControl !== undefined) {
      numControl.SetText(ingredient.stack)
    }
    PotMaker.SetToggleButton(
      control,
      saveSelection[ingredient.itemId] === true
        ? TRISTATE_CHECK_BUTTON_CHECKED
        : TRISTATE_CHECK_BUTTON_UNCHECKED
    )
  }
}
PotMaker.updateControls = updateControls
