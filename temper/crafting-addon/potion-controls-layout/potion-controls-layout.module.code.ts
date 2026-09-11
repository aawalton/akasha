import { COLOR_SELECT } from "../potion-constants/potion-constants.module.code.ts"
import { asFields } from "../potion-controls-helpers/potion-controls-helpers.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import type { TraitData } from "../potion-types/potion-types.module.code.ts"

interface HighlightLabel extends LabelControl {
  defaultHighlightColor?: ZoColorDef
}

type ControlHandler = (this: void, ...args: unknown[]) => undefined

export function asControlHandler(value: unknown): ControlHandler {
  return value as ControlHandler
}

function traitTipEnter(this: void, sender: Control): undefined {
  PotMaker.showTraitTip(sender, true)
}
function traitTipExit(this: void, sender: Control): undefined {
  PotMaker.showTraitTip(sender, false)
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
export const xPosMustNotFilter = X_POS_MUST_FILTER + 196

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
