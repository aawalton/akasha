import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  SCRIBED_SKILL_FIELDS,
  SKILL_FIELDS,
  SKILL_KEYED_BY,
  skillKeysIn,
  skillTemplatesOf,
} from "akasha/temper/catalog/skill/modules/skill-templates-reading/skill-templates-reading.module.code.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import { temperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.ts"
import {
  holdSkillCatalog,
  type SkillCatalog,
  skillCatalogOf,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

function checkoutPages(pageTypeSlug: string, keys: readonly string[]): readonly Value[] {
  const asked = asking(akashaRoot(), { pageTypeSlug, keys } as never)
  if ("rows" in asked) return asked.rows as readonly Value[]
  throw new Error(`the ${pageTypeSlug} pages went unread — ${asked.refused}`)
}

export function holdSkillCatalogFromCheckout(): SkillCatalog {
  const byType = new Map<string, readonly Value[]>(
    SKILL_KEYED_BY.map(([pageTypeSlug, field]) => [
      pageTypeSlug,
      checkoutPages(pageTypeSlug, ["slug", field]),
    ])
  )
  const keys = skillKeysIn((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
  const templates = skillTemplatesOf(
    checkoutPages(temperSkill.slug, SKILL_FIELDS),
    checkoutPages(temperScribedSkill.slug, SCRIBED_SKILL_FIELDS),
    keys
  )
  return holdSkillCatalog(skillCatalogOf(templates))
}
