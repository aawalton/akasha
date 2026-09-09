import { asItemPriceRecord, asNumber, asString } from "../price-casts/price-casts.module.code.ts"
import { luaTruthy } from "../price-lua-truthy/price-lua-truthy.module.code.ts"
import { lib } from "../price-state/price-state.module.code.ts"
import type {
  FurCRecipeArray,
  FurCSubReturn,
  IngredientRow,
  RawPrice,
} from "../price-types/price-types.module.code.ts"

function parseFurCDigits(captured: string | undefined): string | undefined {
  return captured
}

lib.CanFurCPrice = function (this: void): boolean | undefined {
  return FurC !== undefined ? true : undefined
}

lib.From_FurC_Crafting = function (this: void, _itemLink: string, recipeArray): FurCSubReturn {
  if (FurC === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  if (!luaTruthy(recipeArray.blueprint)) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  let totalIngrGold = 0
  const ingrList: IngredientRow[] = []
  let notes = "Crafting cost"
  const blueprintLink = FurC.Utils.GetItemLink(asNumber(recipeArray.blueprint))
  const ingredientCt = GetItemLinkRecipeNumIngredients(blueprintLink)
  for (let ingrI = 1; ingrI <= ingredientCt; ingrI++) {
    const [, , ct] = GetItemLinkRecipeIngredientInfo(blueprintLink, ingrI)
    const ingrLink = GetItemLinkRecipeIngredientItemLink(blueprintLink, ingrI, LINK_STYLE_DEFAULT)
    const ingrName = GetItemLinkName(ingrLink)
    const [gold, sourceKey, fieldName] = lib.ItemLinkToPriceGold(ingrLink)
    const ingrRow: IngredientRow = {
      ingr_ct: ct,
      ingr_name: ingrName,
      ingr_link: ingrLink,
      ingr_gold_ea: gold,
      ingr_gold_source_key: sourceKey,
      ingr_gold_field_name: fieldName,
    }
    ingrList.push(ingrRow)
    if (gold !== undefined) {
      totalIngrGold = totalIngrGold + ct * gold
    } else {
      notes = "Partial crafting cost, missing some ingredient costs."
    }
  }
  return $multi(lib.CURRENCY_TYPE_GOLD, totalIngrGold, notes, ingrList)
}

lib.From_FurC_Rolis = function (this: void, itemLink: string, recipeArray): FurCSubReturn {
  if (FurC === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const itemId = FurC.Utils.GetItemId(itemLink)
  const sellers: [Record<string, number | undefined> | undefined, string][] = [
    [FurC.Rolis[recipeArray.version], "Rolis"],
    [FurC.Faustina[recipeArray.version], "Faustina"],
  ]
  let foundData: Record<string, number | undefined> | undefined
  let foundName: string | undefined
  for (const [versionData, name] of sellers) {
    if (versionData !== undefined && luaTruthy(versionData[itemId])) {
      foundData = versionData
      foundName = name
      break
    }
  }
  if (foundData === undefined || !luaTruthy(foundData[itemId])) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const ct = foundData[itemId]
  return $multi(lib.CURRENCY_TYPE_WRIT_VOUCHERS, ct, foundName, undefined)
}

lib.From_FurC_Luxury = function (this: void, itemLink: string, recipeArray): FurCSubReturn {
  if (FurC === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const versionData = FurC.LuxuryFurnisher[recipeArray.version]
  if (versionData === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const itemId = FurC.Utils.GetItemId(itemLink)
  const itemData = versionData[itemId]
  if (itemData === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  return $multi(lib.CURRENCY_TYPE_GOLD, itemData.itemPrice, "luxury vendor", undefined)
}

lib.From_FurC_AchievementVendor = function (
  this: void,
  itemLink: string,
  recipeArray
): FurCSubReturn {
  if (FurC === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const itemId = FurC.Utils.GetItemId(itemLink)
  const versionData = FurC.AchievementVendors[recipeArray.version]
  if (versionData === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  for (const locationName in versionData) {
    const zoneData = versionData[locationName]
    if (zoneData === undefined) {
      continue
    }
    for (const vendorName in zoneData) {
      const vendorData = zoneData[vendorName]
      if (vendorData === undefined) {
        continue
      }
      const entry = vendorData[itemId]
      if (entry !== undefined) {
        const notes = `${vendorName} in ${locationName}`
        return $multi(lib.CURRENCY_TYPE_GOLD, entry.itemPrice, notes, undefined)
      }
    }
  }
  return $multi(undefined, undefined, undefined, undefined)
}

lib.From_FurC_Generic = function (
  this: void,
  itemLink: string,
  recipeArray,
  currencyType: string
): FurCSubReturn {
  if (FurC === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const itemId = FurC.Utils.GetItemId(itemLink)
  const versionData = FurC.MiscItemSources[recipeArray.version]
  if (versionData === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const originData = versionData[recipeArray.origin]
  if (originData === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const entry = originData[itemId]
  if (type(entry) === "number") {
    return $multi(currencyType, asNumber(entry), undefined, undefined)
  }
  if (type(entry) === "string") {
    const [capture] = string.match(asString(entry), "%d+")
    const n = parseFurCDigits(capture)
    if (n !== undefined) {
      const num = tonumber(n)
      if (num !== undefined) {
        return $multi(currencyType, num, undefined, undefined)
      }
    }
  } else if (type(entry) === "table") {
    const leaf = asItemPriceRecord(entry)
    if (luaTruthy(leaf.itemPrice)) {
      return $multi(currencyType, asNumber(leaf.itemPrice), undefined, undefined)
    }
  }
  return $multi(undefined, undefined, undefined, undefined)
}

lib.From_FurC_Crown = function (this: void, itemLink: string, recipeArray): FurCSubReturn {
  return lib.From_FurC_Generic(itemLink, recipeArray, lib.CURRENCY_TYPE_CROWNS)
}

lib.From_FurC_Misc = function (this: void, itemLink: string, recipeArray): FurCSubReturn {
  return lib.From_FurC_Generic(itemLink, recipeArray, lib.CURRENCY_TYPE_GOLD)
}

lib.From_FurC_NoPrice = function (this: void, _itemLink: string, _recipeArray): FurCSubReturn {
  return $multi(undefined, undefined, undefined, undefined)
}

lib.From_FurC_PVP = function (this: void, itemLink: string, recipeArray): FurCSubReturn {
  if (FurC === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const itemId = FurC.Utils.GetItemId(itemLink)
  const versionData = FurC.PVP[recipeArray.version]
  if (versionData === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  let entry: { itemPrice?: number } | undefined
  let foundVendor: string | undefined
  let foundLocation: string | undefined
  for (const vendorName in versionData) {
    const vendorData = versionData[vendorName]
    if (vendorData === undefined) {
      continue
    }
    for (const locationName in vendorData) {
      const locationData = vendorData[locationName]
      if (locationData === undefined) {
        continue
      }
      entry = locationData[itemId]
      if (entry !== undefined) {
        foundVendor = vendorName
        foundLocation = locationName
        break
      }
    }
    if (entry !== undefined) {
      break
    }
  }
  if (entry === undefined) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  const notes = `${foundVendor ?? "?"} in ${foundLocation ?? "?"}`
  return $multi(lib.CURRENCY_TYPE_ALLIANCE_POINTS, entry.itemPrice, notes, undefined)
}

lib.FurCPrice = function (this: void, itemLink: string): RawPrice | undefined {
  if (itemLink === undefined) {
    return undefined
  }
  if (FurC === undefined) {
    return undefined
  }
  const itemId = FurC.Utils.GetItemId(itemLink)
  const recipeArray = FurC.Find(itemLink)
  if (recipeArray === undefined) {
    return undefined
  }
  const origin = recipeArray.origin
  if (!luaTruthy(origin)) {
    return undefined
  }
  const desc = FurC.GetItemDescription(itemId, recipeArray)
  const funcTable: Record<
    number,
    (this: void, itemLink: string, recipe: FurCRecipeArray) => FurCSubReturn
  > = {
    [FURC_CRAFTING]: lib.From_FurC_Crafting,
    [FURC_VENDOR]: lib.From_FurC_AchievementVendor,
    [FURC_PVP]: lib.From_FurC_PVP,
    [FURC_CROWN]: lib.From_FurC_Crown,
    [FURC_LUXURY]: lib.From_FurC_Luxury,
    [FURC_ROLIS]: lib.From_FurC_Rolis,
    [FURC_DROP]: lib.From_FurC_Misc,
    [FURC_JUSTICE]: lib.From_FurC_Misc,
    [FURC_RUMOUR]: lib.From_FurC_NoPrice,
    [FURC_FESTIVAL_DROP]: lib.From_FurC_NoPrice,
  }
  const func = funcTable[origin] ?? lib.From_FurC_Misc
  const [currencyType, currencyCt, currencyNotes, ingredientList] = func(itemLink, recipeArray)
  return {
    origin,
    desc,
    currency_type: currencyType,
    currency_ct: currencyCt,
    notes: currencyNotes,
    ingredient_list: ingredientList,
  }
}
