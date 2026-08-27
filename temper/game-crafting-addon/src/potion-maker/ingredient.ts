import { asNumber } from "./casts"
import type { TraitEffect } from "./constants"
import { COLOR_SELECT, TEXTURE_HIGHLIGHT, TEXTURE_REAGENTUNKNOWN, traitEffect } from "./constants"
import { PotMaker } from "./state"
import type { Ingredient, IngredientFactory, MatchResult } from "./types"

function asIngredient(value: unknown): Ingredient {
  return value as Ingredient
}

function matchIngredient1(
  this: void,
  self: Ingredient,
  passiveIngredient: Ingredient
): MatchResult {
  const matched: Record<string, TraitEffect> = {}
  const badTraitMatches = PotMaker.badTraitMatches
  const oppositeTraits = PotMaker.oppositeTraits
  for (const trait in self.traits) {
    const opposite = oppositeTraits[trait]
    const oppositePresent =
      opposite !== undefined && passiveIngredient.traits[opposite] !== undefined
    if (passiveIngredient.traits[trait] !== undefined && !oppositePresent) {
      matched[trait] = badTraitMatches[trait] === true ? traitEffect.Bad : traitEffect.Good
    }
  }
  return { matched, passSingleTrait: false, count: 0 }
}

function matchIngredient(this: void, self: Ingredient, passiveIngredient: Ingredient): MatchResult {
  const matched: Record<string, TraitEffect> = {}
  let passSingleTrait = false
  let addsOpposite = false
  let addsBad = false
  const badTraitMatches = PotMaker.badTraitMatches
  const oppositeTraits = PotMaker.oppositeTraits
  const passiveTraits = passiveIngredient.traits
  let activeTraits = 0
  let count = 0
  for (const trait in self.traits) {
    const effect = self.traits[trait]
    const double = effect === traitEffect.Bad || effect === traitEffect.Good
    let doubleInserted = false
    if (double) {
      activeTraits = activeTraits + 1
    }
    const oppositeTrait = oppositeTraits[trait]
    const passiveHasOpposite =
      oppositeTrait !== undefined && passiveTraits[oppositeTrait] !== undefined
    if (double && passiveHasOpposite) {
      doubleInserted = true
      if (effect === traitEffect.Bad) {
        if (addsBad) {
          return { matched, passSingleTrait: false, count }
        }
        addsBad = true
        addsOpposite = true
      }
    }
    const oppositeAbsentOnPassive =
      oppositeTrait === undefined || passiveTraits[oppositeTrait] === undefined
    const oppositeAbsentOnSelf =
      oppositeTrait === undefined || self.traits[oppositeTrait] === undefined
    if (passiveTraits[trait] !== undefined && oppositeAbsentOnPassive && oppositeAbsentOnSelf) {
      if (badTraitMatches[trait] === true) {
        if (double) {
          matched[trait] = traitEffect.VeryBad
          count = count + 1
          doubleInserted = true
          passSingleTrait = true
        } else if (!addsBad) {
          matched[trait] = traitEffect.Bad
          count = count + 1
        }
      } else {
        if (double) {
          matched[trait] = traitEffect.VeryGood
          count = count + 1
          doubleInserted = true
          passSingleTrait = true
        } else {
          matched[trait] = traitEffect.Good
          count = count + 1
        }
      }
    }
    if (double && !doubleInserted && effect !== undefined) {
      matched[trait] = effect
      count = count + 1
    }
  }
  if (addsOpposite && addsBad && count === 1 && activeTraits > 1) {
    passSingleTrait = true
  }
  return { matched, passSingleTrait, count }
}

function ResetStack(this: void, self: Ingredient): undefined {
  self.pack = []
  self.stack = 0
}

function newIngredient(this: void, o: Partial<Ingredient> & { itemId: number }): Ingredient {
  const instance = asIngredient(o)
  instance.stack = 0
  if (instance.itemId > 0) {
    const ref = PotMaker.allReagents[instance.itemId]
    instance.itemLink = ref?.itemLink
  }
  if (instance.itemLink !== undefined) {
    instance.name = GetItemLinkName(instance.itemLink)
  }
  instance.matchIngredient1 = matchIngredient1
  instance.matchIngredient = matchIngredient
  instance.ResetStack = ResetStack
  return instance
}

function solventIngredient(this: void, o: Partial<Ingredient>): Ingredient {
  const instance = asIngredient(o)
  instance.stack = 0
  instance.matchIngredient1 = matchIngredient1
  instance.matchIngredient = matchIngredient
  instance.ResetStack = ResetStack
  return instance
}

const ingredientFactory: IngredientFactory = {
  name: "",
  itemId: 0,
  level: 0,
  icon: TEXTURE_REAGENTUNKNOWN,
  new: newIngredient,
  solvent: solventIngredient,
}

PotMaker.Ingredient = ingredientFactory

function ToggleButton(this: void, resultButton: Control, button: number): undefined {
  if (button !== MOUSE_BUTTON_INDEX_LEFT) {
    return
  }

  const checkState = resultButton.checkState ?? TRISTATE_CHECK_BUTTON_INDETERMINATE
  if (resultButton.tristate === true) {
    if (checkState === TRISTATE_CHECK_BUTTON_INDETERMINATE) {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_CHECKED)
    } else if (checkState === TRISTATE_CHECK_BUTTON_UNCHECKED) {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_INDETERMINATE)
    } else {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_UNCHECKED)
    }
  } else {
    if (checkState !== TRISTATE_CHECK_BUTTON_CHECKED) {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_CHECKED)
    } else {
      PotMaker.SetToggleButton(resultButton, TRISTATE_CHECK_BUTTON_UNCHECKED)
    }
  }
}

function SetToggleButton(
  this: void,
  resultButton: Control,
  checkState: number | boolean
): undefined {
  const control = resultButton.GetNamedChild<TextureControl>("Outline")
  resultButton.checkState = asNumber(checkState)
  if (control === undefined) {
    return
  }
  if (resultButton.tristate === true) {
    if (checkState === TRISTATE_CHECK_BUTTON_CHECKED) {
      const color = PotMaker.traitColor[traitEffect.VeryGood]
      if (color !== undefined) {
        const [r, g, b] = color.UnpackRGB()
        control.SetColor(r, g, b)
      }
      control.SetTexture("esoui/art/cadwell/check.dds")
    } else if (checkState === TRISTATE_CHECK_BUTTON_UNCHECKED) {
      const color = PotMaker.traitColor[traitEffect.VeryBad]
      if (color !== undefined) {
        const [r, g, b] = color.UnpackRGB()
        control.SetColor(r, g, b)
      }
      control.SetTexture("esoui/art/dye/gamepad/gp_disabled_x.dds")
    }
    control.SetHidden(checkState === TRISTATE_CHECK_BUTTON_INDETERMINATE)
  } else {
    if (checkState === TRISTATE_CHECK_BUTTON_CHECKED) {
      const [r, g, b] = COLOR_SELECT.UnpackRGB()
      control.SetColor(r, g, b)
      control.SetTexture(TEXTURE_HIGHLIGHT)
    }
    control.SetHidden(checkState !== TRISTATE_CHECK_BUTTON_CHECKED)
  }
}

function ToggleButtonIsChecked(this: void, resultButton: Control): boolean {
  return resultButton.checkState === TRISTATE_CHECK_BUTTON_CHECKED
}

function GetToggleButtonCheckState(this: void, resultButton: Control): number {
  return resultButton.checkState ?? TRISTATE_CHECK_BUTTON_INDETERMINATE
}

PotMaker.ToggleButton = ToggleButton
PotMaker.SetToggleButton = SetToggleButton
PotMaker.ToggleButtonIsChecked = ToggleButtonIsChecked
PotMaker.GetToggleButtonCheckState = GetToggleButtonCheckState
