import { TEXTURE_TRAITUNKNOWN } from "../potion-constants/potion-constants.module.code.ts"
import {
  asIngredientRuntime,
  asVoidHolderMethod,
  type ResultControl,
  type TraitControl,
} from "../potion-result-controls/potion-result-controls.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import type {} from "../potion-types/potion-types.module.code.ts"

function refreshTraits(this: void): boolean {
  const resultList = TemperPotionsOutputResultsBG
  const numChildren = resultList.GetNumChildren()

  for (let i = 1; i <= numChildren; i++) {
    const control = resultList.GetChild<ResultControl>(i)
    if (control === undefined) {
      continue
    }
    const v = control.potion
    if (v !== undefined) {
      let count = 1
      for (const traitName in v.traits) {
        const effect = v.traits[traitName]
        if (effect === undefined) {
          continue
        }
        const traitColor = PotMaker.traitColor[effect]
        if (traitColor !== undefined) {
          let traitTexture: string | undefined
          for (const ingredientEntry of v.ingredients) {
            const ingredient =
              ingredientEntry === undefined ? undefined : asIngredientRuntime(ingredientEntry)
            if (ingredient === undefined) {
              continue
            }
            for (const rk in PotMaker.Inventory.reagents) {
              const reagentEntry = PotMaker.Inventory.reagents[rk]
              const k1 = reagentEntry === undefined ? undefined : asIngredientRuntime(reagentEntry)
              if (k1 !== undefined && k1.itemId === ingredient.itemId) {
                ingredient.traits = k1.traits
                ingredient.iconTraits = k1.iconTraits
                break
              }
            }

            const reagent = PotMaker.allReagents[ingredient.itemId]
            if (reagent !== undefined && reagent.traits[traitName] !== undefined) {
              if (
                ingredient.iconTraits[traitName] === undefined &&
                reagent.traits[traitName] !== true
              ) {
                traitTexture = TEXTURE_TRAITUNKNOWN
              } else {
                if (traitTexture === undefined) {
                  traitTexture = ingredient.iconTraits[traitName]
                }
              }
            }
          }
          const traitName2 = PotMaker.traitControlNames[count]
          const traitControl =
            traitName2 === undefined ? undefined : control.GetNamedChild<TraitControl>(traitName2)
          if (traitControl !== undefined) {
            traitControl.Trait = traitName
            const [tr, tg, tb] = traitColor.UnpackRGB()
            traitControl.SetColor(tr, tg, tb)
            traitControl.SetTexture(
              traitTexture !== undefined ? traitTexture : TEXTURE_TRAITUNKNOWN
            )
            traitControl.SetHidden(false)
          }
          count = count + 1
        }
        let amount = 0
        const solventEntry = v.solvent
        const solvent = solventEntry === undefined ? undefined : asIngredientRuntime(solventEntry)
        if (solvent !== undefined) {
          for (const p of solvent.pack) {
            if (p !== undefined) {
              const [, stack] = GetItemInfo(p.bagId, p.slotIndex)
              amount = amount + stack
            }
          }
        }
        for (const ingredient of v.ingredients) {
          if (ingredient === undefined) {
            continue
          }
          let stackSum = 0
          for (const p of ingredient.pack) {
            if (p !== undefined) {
              const [, stack] = GetItemInfo(p.bagId, p.slotIndex)
              stackSum = stackSum + stack
            }
          }
          amount = math.min(amount, stackSum)
        }
        if (amount === 0) {
          return true
        }
        v.quantity = amount
        const textControl = control.GetNamedChild<LabelControl>("Text")
        if (textControl !== undefined) {
          textControl.SetText(PotMaker.Potion.getIngredientString(v))
        }
        const inBagControl = control.GetNamedChild<LabelControl>("InBag")
        if (inBagControl !== undefined) {
          inBagControl.SetText(PotMaker.Potion.getInBagString(v))
        }
        control.SetHidden(false)
      }
    }
  }
  return false
}

PotMaker.refreshTraits = asVoidHolderMethod(refreshTraits)
