import { str } from "./i18n"
import { KNOW, newKnow } from "./know"
import { startNewEvent as logStartNewEvent } from "./log"
import { findRecipe, type Recipe } from "./provisioning-data"
import { PR_DRINK_4X, PR_FOOD_4X } from "./required-skill"
import type { KnowList, MatList, Parser } from "./types"
import { toWritFields } from "./util"

interface ProvisioningParser extends Parser {
  recipe: Recipe | undefined
}

export function newProvisioningParser(): ProvisioningParser {
  const o: ProvisioningParser = {
    class: "provisioning",
    crafting_type: CRAFTING_TYPE_PROVISIONING,
    recipe: undefined,

    ParseItemLink(this: Parser, item_link: string): Parser | undefined {
      logStartNewEvent("ParseItemLink: %s %s", o.class, item_link)
      const fields = toWritFields(item_link)
      if (fields.writ1 === undefined) {
        return undefined
      }
      o.recipe = findRecipe(fields.writ1)
      if (o.recipe === undefined) {
        return undefined
      }
      return o
    },

    ToMatList(this: Parser): MatList {
      return o.recipe?.mat_list ?? []
    },

    ToKnowList(this: Parser): KnowList {
      logStartNewEvent("ToKnowList: %s", o.class)
      const recipe = o.recipe
      const k = newKnow({
        name: "recipe",
        is_known: recipe?.is_known ?? false,
        lack_msg: str("know_err_recipe") ?? "",
        how: KNOW.RECIPE,
      })
      const r: KnowList = [k]
      if (recipe?.fooddrink_item_type === ITEMTYPE_FOOD) {
        const chef = PR_FOOD_4X.ToKnow()
        chef.is_warn = true
        r[r.length] = chef
      } else if (recipe?.fooddrink_item_type === ITEMTYPE_DRINK) {
        const brewer = PR_DRINK_4X.ToKnow()
        brewer.is_warn = true
        r[r.length] = brewer
      }
      return r
    },
  }
  return o
}

export interface ProvisioningParserNamespace {
  class: string
  New: (this: ProvisioningParserNamespace) => ProvisioningParser
}

const provisioningParserNamespace: ProvisioningParserNamespace = {
  class: "provisioning",
  New: newProvisioningParser,
}

const provisioningNamespace = TemperWrit.Provisioning
if (provisioningNamespace !== undefined) {
  provisioningNamespace.Parser = provisioningParserNamespace
}
