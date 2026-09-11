import { cookShowRecipe, getCookChild } from "../craft-cooking/craft-cooking.module.code.ts"
import * as Utilities from "../craft-utilities/craft-utilities.module.code.ts"
import { hideControl } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export function cookSearchRecipe(): undefined {
  const search = TemperCrafting_CookSearch.GetText()
  let inc = 1
  if (search !== "") {
    const numChildren = TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      hideControl(`TemperCrafting_CookFoodSectionScrollChildButton${x}`)
    }
    const numLists = GetNumRecipeLists()
    for (let list = 1; list <= numLists; list++) {
      const [, num] = GetRecipeListInfo(list)
      for (let id = num; id >= 1; id--) {
        const [known, name, , , , , tradeSkill] = GetRecipeInfo(list, id)
        if (tradeSkill === CRAFTING_TYPE_PROVISIONING) {
          const [found] = string.find(string.lower(name), string.lower(search))
          if (found !== undefined && known) {
            const control = getCookChild(inc)
            inc = cookShowRecipe(control, list, id, inc)
            if (inc > TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()) {
              break
            }
          }
        }
      }
    }
    TemperCrafting_CookFoodSectionScrollChild.SetHeight(inc * 23 - 10)
    TemperCrafting_CookHeadline.SetText(STATE.Loc.searchfor)
    TemperCrafting_CookInfo.SetText(search)
  }
}

export function cookShowCategory(list?: number, override?: boolean): undefined {
  const lang = GetCVar("language.2")
  const character = STATE.Character
  if (list === undefined || character === undefined) {
    return
  }
  const overrideSearch = override ?? true
  const search = TemperCrafting_CookSearch.GetText()
  if (
    search !== "" &&
    search !== `${GetString(SI_GAMEPAD_HELP_SEARCH)}...` &&
    overrideSearch === false
  ) {
    cookSearchRecipe()
  } else {
    TemperCrafting_CookSearch.SetText(`${GetString(SI_GAMEPAD_HELP_SEARCH)}...`)
    let inc = 1
    let name: string | undefined
    const numChildren = TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      hideControl(`TemperCrafting_CookFoodSectionScrollChildButton${x}`)
    }
    if (list === 17) {
      name = STATE.Loc.TT[10]
      const provisioningFavorites = character.favorites[CRAFTING_TYPE_PROVISIONING] ?? {}
      for (const [, val] of pairs(provisioningFavorites)) {
        const [, , , , , ingredientType] = GetRecipeInfo(val[1] ?? 0, val[2] ?? 0)
        if (ingredientType !== PROVISIONER_SPECIAL_INGREDIENT_TYPE_FURNISHING) {
          const control = getCookChild(inc)
          inc = cookShowRecipe(control, val[1] ?? 0, val[2] ?? 0, inc)
        }
        if (inc > TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()) {
          break
        }
      }
    } else if (list === 20) {
      name = `${STATE.Loc.TT[23]} ${STATE.Loc.TT[10]}`
      const provisioningFavorites = character.favorites[CRAFTING_TYPE_PROVISIONING] ?? {}
      for (const [, val] of pairs(provisioningFavorites)) {
        const [, , , , , ingredientType, tradeType] = GetRecipeInfo(val[1] ?? 0, val[2] ?? 0)
        if (
          ingredientType === PROVISIONER_SPECIAL_INGREDIENT_TYPE_FURNISHING &&
          tradeType === CRAFTING_TYPE_PROVISIONING
        ) {
          const control = getCookChild(inc)
          inc = cookShowRecipe(control, val[1] ?? 0, val[2] ?? 0, inc)
        }
        if (inc > TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()) {
          break
        }
      }
    } else if (list === 18) {
      name = STATE.Loc.TT[22]
      Utilities.getQuest()
      const quest = STATE.Quest[CRAFTING_TYPE_PROVISIONING]
      if (quest !== undefined) {
        const lists = [1, 2, 3, 8, 9, 10]
        for (const questList of lists) {
          const [, num, , , , , sound] = GetRecipeListInfo(questList)
          for (let id = num; id >= 1; id--) {
            const [, recipeName] = GetRecipeInfo(questList, id)
            for (const [, step] of pairs(quest.work)) {
              const [stepNoHyphens] = string.gsub(step, "-", " ")
              const [stepNoSuffix] = string.gsub(stepNoHyphens, "%^%a*", "")
              let tempStep = string.lower(stepNoSuffix)
              const [nameNoHyphens] = string.gsub(recipeName, "-", " ")
              const [nameNoSuffix] = string.gsub(nameNoHyphens, "%^%a*", "")
              let tempName = string.lower(nameNoSuffix)
              if (lang === "de") {
                const [nameNoTrailingS] = string.gsub(tempName, "s$", "")
                tempName = nameNoTrailingS
                let tempWord = ""
                let newTempStep = ""
                for (const [word] of string.gmatch(tempStep, "%a+")) {
                  const [stemmed] = string.gsub(word ?? "", ".$", ".")
                  tempWord = stemmed
                  newTempStep = `${newTempStep} ${tempWord}`
                }
                tempStep = newTempStep
                let newTempName = ""
                for (const [word] of string.gmatch(tempName, "%a+")) {
                  const [stemmed] = string.gsub(word ?? "", ".$", ".")
                  tempWord = stemmed
                  newTempName = `${newTempName} ${tempWord}`
                }
                tempName = newTempName
              }
              const [res1, res2] = string.find(tempStep, tempName)
              if (
                ((res1 === STATE.Loc.provisioningWritOffset && lang === "en") ||
                  (res1 !== undefined && lang !== "en")) &&
                res2 !== 0
              ) {
                const control = getCookChild(inc)
                inc = cookShowRecipe(control, questList, id, inc, sound)
              }
            }
          }
        }
      }
    } else if (list === 19) {
      name = STATE.Loc.TT[23]
      const numLists = GetNumRecipeLists()
      for (let cat = 17; cat <= numLists; cat++) {
        const [, num, , , , , sound] = GetRecipeListInfo(cat)
        for (let id = num; id >= 1; id--) {
          const [, , , , , , crafttype] = GetRecipeInfo(cat, id)
          if (crafttype === RECIPE_CRAFTING_SYSTEM_PROVISIONING_DESIGNS) {
            const control = getCookChild(inc)
            inc = cookShowRecipe(control, cat, id, inc, sound)
          }
        }
      }
    } else {
      const [, num, , , , , sound] = GetRecipeListInfo(list)
      for (let id = num; id >= 1; id--) {
        const control = getCookChild(inc)
        inc = cookShowRecipe(control, list, id, inc, sound)
      }
    }
    TemperCrafting_CookFoodSectionScrollChild.SetHeight(inc * 24 - 15)
    TemperCrafting_CookHeadline.SetText(zo_strformat("<<C:1>>", name))
    TemperCrafting_CookInfo.SetText(STATE.Cook.category[list] ?? "")
    character.recipe = list
  }
}
