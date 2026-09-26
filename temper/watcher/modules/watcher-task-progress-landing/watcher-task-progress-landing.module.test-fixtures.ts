import { holdCompanionCatalogFromCheckout } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.test-fixtures.ts"
import { holdRecipeCatalogFromCheckout } from "akasha/temper/catalog/pursuit/temper-recipe-list/modules/recipe-list-catalog/recipe-list-catalog.module.test-fixtures.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

export const PAGE = `import type { TemperTask } from "../../temper-task.page-type.types.ts"

export const craftingWrits = {
  id: "019db533-f381-761a-affb-ba493b613e2e",
  type: "page-type/temper-task",
  slug: "crafting-writs",
  progressTotal: 1,
  progressCurrent: 0,
} as const satisfies TemperTask
`

export async function catalogsHeld(): Promise<unknown> {
  return [
    holdSetCatalogFromCheckout(),
    holdRecipeCatalogFromCheckout(),
    holdCompanionCatalogFromCheckout(),
    holdSkillCatalogFromCheckout(),
  ]
}
