import { str } from "../writ-i18n/writ-i18n.module.code.ts"
import { newKnow } from "../writ-know/writ-know.module.code.ts"
import { startNewEvent as logStartNewEvent } from "../writ-log/writ-log.module.code.ts"
import { findRecipe, type Recipe } from "../writ-prov-data/writ-prov-data.module.code.ts"
import { PR_DRINK_4X, PR_FOOD_4X } from "../writ-required-skill/writ-required-skill.module.code.ts"
import type { KnowList, MatList, Parser } from "../writ-types/writ-types.module.code.ts"
import { KNOW } from "../writ-types/writ-types.module.code.ts"
import { toWritFields } from "../writ-writ-fields/writ-writ-fields.module.code.ts"

interface ProvisioningParser extends Parser {
  recipe: Recipe | undefined
}

export function newProvisioningParser(): ProvisioningParser {
  const o: ProvisioningParser = {
    class: "provisioning",
    crafting_type: CRAFTING_TYPE_PROVISIONING,
    recipe: undefined,

    ParseItemLink(this: Parser, itemLink: string): Parser | undefined {
      logStartNewEvent("ParseItemLink: %s %s", o.class, itemLink)
      const fields = toWritFields(itemLink)
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
      if (recipe?.fooddrinkItemType === ITEMTYPE_FOOD) {
        const chef = PR_FOOD_4X.ToKnow()
        chef.is_warn = true
        r[r.length] = chef
      } else if (recipe?.fooddrinkItemType === ITEMTYPE_DRINK) {
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

const PROVISIONING_PARSER_NAMESPACE: ProvisioningParserNamespace = {
  class: "provisioning",
  New: newProvisioningParser,
}

const PROVISIONING_NAMESPACE = TemperWrit.Provisioning
if (PROVISIONING_NAMESPACE !== undefined) {
  PROVISIONING_NAMESPACE.Parser = PROVISIONING_PARSER_NAMESPACE
}
