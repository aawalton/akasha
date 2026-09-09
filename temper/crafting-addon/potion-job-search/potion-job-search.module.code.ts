import { libAsync } from "../craft-libraries/craft-libraries.module.code.ts"
import type { TraitEffect } from "../potion-constants/potion-constants.module.code.ts"
import { PAGE_SIZE } from "../potion-constants/potion-constants.module.code.ts"
import { getPlayerSettings } from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import { isThirdAlchemySlotUnlocked } from "../potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import type { Ingredient, Potion } from "../potion-types/potion-types.module.code.ts"
import {
  clearResultList,
  showFilterPage,
} from "../potion-window-helpers/potion-window-helpers.module.code.ts"

interface HideShowControlView {
  Hide: (this: HideShowControlView) => undefined
  Show: (this: HideShowControlView) => undefined
}
function asHideShowControlView(value: unknown): HideShowControlView {
  return value as HideShowControlView
}
const loadingControl = (): HideShowControlView => asHideShowControlView(PotMaker.loading)

type KeybindButtonGroupDescriptorArray = KeybindButtonGroupDescriptor[]
function asKeybindButtonGroupDescriptorArray(value: unknown): KeybindButtonGroupDescriptorArray {
  return value as KeybindButtonGroupDescriptorArray
}
const keybindDescriptor = (): KeybindButtonGroupDescriptor[] =>
  asKeybindButtonGroupDescriptorArray(PotMaker.keybindStripDescriptor)

function asUnknown(value: unknown): unknown {
  return value as unknown
}
type StringArray = string[]
function asStringArray(value: unknown): StringArray {
  return value as StringArray
}
type IngredientNewArg = Partial<Ingredient> & { itemId: number }
function asIngredientNewArg(value: unknown): IngredientNewArg {
  return value as IngredientNewArg
}
type IngredientSolventArg = Partial<Ingredient>
function asIngredientSolventArg(value: unknown): IngredientSolventArg {
  return value as IngredientSolventArg
}
type IdKeyedSearchTable = Record<string, unknown> & { count?: number }
function asIdKeyedSearchTable(value: unknown): IdKeyedSearchTable {
  return value as IdKeyedSearchTable
}

function sortFunc(this: void, a: Potion, b: Potion): boolean {
  if (a.solvent === b.solvent) {
    if (PotMaker.Potion.GetName(a) === PotMaker.Potion.GetName(b)) {
      if (a.quantity === b.quantity) {
        return a.samePotionId < b.samePotionId
      }
      return a.quantity > b.quantity
    }
    return PotMaker.Potion.GetUpperName(a) < PotMaker.Potion.GetUpperName(b)
  }
  if (a.solvent === undefined || asUnknown(a.solvent) === "") {
    return true
  }
  if (b.solvent === undefined || asUnknown(b.solvent) === "") {
    return false
  }
  return a.solvent.level < b.solvent.level
}

function sortPotions(this: void): undefined {
  table.sort(PotMaker.doablePotions, sortFunc)
}

const IDENTIFIER = "POTIONMAKER_JOBS"
const task = libAsync().Create(IDENTIFIER)

function updateKeybinds(this: void): undefined {
  KEYBIND_STRIP.UpdateKeybindButtonGroup(keybindDescriptor())
}
task.Finally(updateKeybinds)

function searchAgain(this: void): undefined {
  PotMaker.resultsMaxIndex = 0
  task.Call(clearResultList)
  task.Then(PotMaker.updateControls)
  task.Then(showFilterPage)
}

function showPage(this: void): undefined {
  PotMaker.resultsMaxIndex = math.max(
    0,
    math.min(
      math.floor((PotMaker.doablePotions.length - PAGE_SIZE + 1) / PAGE_SIZE) * PAGE_SIZE,
      PotMaker.resultsMaxIndex
    )
  )
  PotMaker.RenderPage()
  if (PotMaker.questPotionsOnly) {
    const potion = PotMaker.doablePotions[0]
    if (potion !== undefined) {
      PotMaker.SetSelected(potion)
      PotMaker.AddToCraftTable(potion)
    }
  }
  loadingControl().Hide()
}

function lastJob(this: void): undefined {
  task.Call(sortPotions).Then(showPage).Then(updateKeybinds)
}

function startJobs(this: void): undefined {
  TemperPotions.SetHidden(true)
  loadingControl().Show()
  PotMaker.resultListShown = true
  task.Call(updateKeybinds)
}

function stopJobs(this: void): undefined {
  task.Cancel()
  loadingControl().Hide()
}

const UNIQUE_NAME: (string | undefined)[] = ["", "", ""]
function getUniqueName(this: void, ingredients: Ingredient[]): string {
  UNIQUE_NAME[2] = undefined
  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i]
    if (ingredient !== undefined) {
      UNIQUE_NAME[i] = ingredient.name
    }
  }
  table.sort(asStringArray(UNIQUE_NAME))
  return table.concat(asStringArray(UNIQUE_NAME))
}

const find = string.find
function createCombinationIngredient(
  this: void,
  ingredient1: Ingredient,
  ingredient2: Ingredient,
  matches: Record<string, TraitEffect>
): Ingredient {
  const combinationTraits: Record<string, TraitEffect> = {}
  for (const trait in matches) {
    const effect = matches[trait]
    if (effect !== undefined) {
      combinationTraits[trait] = effect
    }
  }
  for (const trait1 in ingredient1.traits) {
    const effect = ingredient1.traits[trait1]
    let matched = false
    for (const match1 in matches) {
      const [pos] = find(match1, trait1)
      if (pos === 1) {
        matched = true
        break
      }
    }
    if (!matched) {
      let oppositeTraitInIngredient2 = false
      for (const trait2 in ingredient2.traits) {
        if (PotMaker.oppositeTraits[trait1] === trait2) {
          oppositeTraitInIngredient2 = true
          break
        }
      }
      if (!oppositeTraitInIngredient2 && effect !== undefined) {
        combinationTraits[trait1] = effect
      }
    }
  }
  for (const trait2 in ingredient2.traits) {
    const effect = ingredient2.traits[trait2]
    let matched = false
    for (const match1 in matches) {
      const [pos] = find(match1, trait2)
      if (pos === 1) {
        matched = true
        break
      }
    }
    if (!matched) {
      let oppositeTraitInIngredient1 = false
      for (const trait1 in ingredient1.traits) {
        if (PotMaker.oppositeTraits[trait2] === trait1) {
          oppositeTraitInIngredient1 = true
          break
        }
      }
      if (!oppositeTraitInIngredient1 && effect !== undefined) {
        combinationTraits[trait2] = effect
      }
    }
  }

  return PotMaker.Ingredient.new(asIngredientNewArg({ traits: combinationTraits }))
}

function always(this: void): boolean {
  return true
}
function available(this: void, quantity: number): boolean {
  return quantity > 0
}

function findDoablePotions(
  this: void,
  searchTerms?: Record<string, TraitEffect>,
  searchSolvent?: Ingredient,
  searchReagent?: Ingredient
): undefined {
  PotMaker.StopJobs()
  clearResultList()
  const terms: Record<string, TraitEffect> = searchTerms ?? {}
  const solventSearch = asIdKeyedSearchTable(searchSolvent ?? {})
  const reagentSearch = asIdKeyedSearchTable(searchReagent ?? {})

  const playerSettings = getPlayerSettings()
  const useThirdSlot =
    (isThirdAlchemySlotUnlocked() || playerSettings.fakeThirdSlot) &&
    PotMaker.potion2ReagentFilter !== true
  let useMissing = playerSettings.useMissing

  const processed: Record<string, boolean> = {}
  let reagentFilter: (this: void, reagentList: Ingredient[]) => boolean
  if (reagentSearch.count === 0 && PotMaker.onlyReagentFilter !== true) {
    reagentFilter = function (this: void, _reagentList: Ingredient[]): boolean {
      return true
    }
  } else if (PotMaker.onlyReagentFilter !== true) {
    reagentFilter = function (this: void, reagentList: Ingredient[]): boolean {
      for (let i = 0; i < reagentList.length; i++) {
        const r = reagentList[i]
        if (r !== undefined && reagentSearch[r.itemId] !== undefined) {
          return true
        }
      }
      return false
    }
  } else {
    reagentFilter = function (this: void, reagentList: Ingredient[]): boolean {
      for (let i = 0; i < reagentList.length; i++) {
        const r = reagentList[i]
        if (r !== undefined && reagentSearch[r.itemId] === undefined) {
          return false
        }
      }
      return true
    }
  }
  const potions = PotMaker.doablePotions
  const quantityFilter = useMissing ? always : available

  function createPotion(
    this: void,
    potionList: Potion[],
    traits: Record<string, TraitEffect>,
    ingredients: Ingredient[],
    solvent: Ingredient,
    quantity: number
  ): undefined {
    if (quantityFilter(quantity)) {
      const potion = PotMaker.Potion.new({ traits, ingredients, solvent, quantity })
      if (PotMaker.Potion.conformsToSearch(potion, terms)) {
        PotMaker.Potion.createFavoriteIdentifier(potion)
        PotMaker.Potion.GetUpperName(potion)
        potionList[potionList.length] = potion
      }
    }
  }

  const solvents: Ingredient[] = []
  for (const itemIdKey in solventSearch) {
    if (itemIdKey === "count") {
      continue
    }
    const itemId = tonumber(itemIdKey)
    if (itemId === undefined) {
      continue
    }
    let solvent = PotMaker.Inventory.solvents[itemId]
    if (solvent === undefined) {
      solvent = PotMaker.Ingredient.solvent(asIngredientSolventArg({ name: "" }))
      useMissing = true
    }
    solvents[solvents.length] = solvent
  }

  const allReagents = PotMaker.allReagents
  const reagents = PotMaker.Inventory.reagents
  const min = math.min

  function findTripleSlot(
    this: void,
    combinationIngredient: Ingredient,
    ingredient1: Ingredient,
    ingredient2: Ingredient,
    amount1: number,
    amount2: number,
    matching: number[]
  ): undefined {
    for (let j = 0; j < matching.length; j++) {
      const matchId = matching[j]
      const ingredient3 = matchId === undefined ? undefined : reagents[matchId]
      if (ingredient3 !== undefined && ingredient1 !== ingredient3 && ingredient2 !== ingredient3) {
        const ingredients = [ingredient1, ingredient2, ingredient3]
        if (reagentFilter(ingredients)) {
          const key = getUniqueName(ingredients)
          if (processed[key] === undefined) {
            const amount3 = ingredient3.stack
            const matchResult = combinationIngredient.matchIngredient(
              combinationIngredient,
              ingredient3
            )
            if (matchResult.count >= 2 || matchResult.passSingleTrait) {
              processed[key] = true
              for (let s = 0; s < solvents.length; s++) {
                const currentSolvent = solvents[s]
                if (currentSolvent !== undefined) {
                  createPotion(
                    potions,
                    matchResult.matched,
                    ingredients,
                    currentSolvent,
                    min(amount1, amount2, amount3, currentSolvent.stack)
                  )
                }
              }
            }
          }
        }
      }
    }
  }

  function findDoubleSlot(
    this: void,
    ingredient1: Ingredient,
    ingredient2: Ingredient,
    amount1: number
  ): undefined {
    const amount2 = ingredient2.stack
    const checkMatches = ingredient1.matchIngredient1(ingredient1, ingredient2)

    const ingredients = [ingredient1, ingredient2]
    const [firstMatchKey] = next(checkMatches.matched)
    if (firstMatchKey !== undefined && reagentFilter(ingredients)) {
      for (let s = 0; s < solvents.length; s++) {
        const currentSolvent = solvents[s]
        if (currentSolvent !== undefined) {
          createPotion(
            potions,
            checkMatches.matched,
            ingredients,
            currentSolvent,
            min(amount1, amount2, currentSolvent.stack)
          )
        }
      }
    }
    if (useThirdSlot) {
      const combinationIngredient = createCombinationIngredient(
        ingredient1,
        ingredient2,
        checkMatches.matched
      )
      const ref1 = allReagents[ingredient1.itemId]
      const ref2 = allReagents[ingredient2.itemId]
      task.Call(function (this: void): undefined {
        findTripleSlot(
          combinationIngredient,
          ingredient1,
          ingredient2,
          amount1,
          amount2,
          ref1?.matching ?? []
        )
      })
      task.Then(function (this: void): undefined {
        findTripleSlot(
          combinationIngredient,
          ingredient1,
          ingredient2,
          amount1,
          amount2,
          ref2?.matching ?? []
        )
      })
    }
  }

  task.Call(startJobs)
  for (const itemIdKey in reagents) {
    const reagentId = tonumber(itemIdKey)
    if (reagentId === undefined) {
      continue
    }
    const ingredient1 = reagents[reagentId]
    if (ingredient1 === undefined) {
      continue
    }
    const amount1 = ingredient1.stack
    const ref = allReagents[ingredient1.itemId]
    const matching1 = ref?.matching ?? []
    for (let k = 0; k < matching1.length; k++) {
      const matchId = matching1[k]
      const ingredient2 = matchId === undefined ? undefined : reagents[matchId]

      if (ingredient2 !== undefined && ingredient1.itemId < ingredient2.itemId) {
        task.Then(function (this: void): undefined {
          findDoubleSlot(ingredient1, ingredient2, amount1)
        })
      }
    }
  }
  task.Then(lastJob)
}

PotMaker.searchAgain = searchAgain
PotMaker.StopJobs = stopJobs
PotMaker.findDoablePotions = findDoablePotions
