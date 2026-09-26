import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
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
  heldSkillCatalog,
  holdSkillCatalog,
  type SkillCatalog,
  skillCatalogOf,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

const EVERY = 5000

export async function loadSkillCatalog(): Promise<SkillCatalog> {
  const already = heldSkillCatalog()
  if (already !== null) return already
  const asked: readonly (readonly [string, readonly string[]])[] = [
    [temperSkill.slug, SKILL_FIELDS],
    [temperScribedSkill.slug, SCRIBED_SKILL_FIELDS],
    ...SKILL_KEYED_BY.map(([pageTypeSlug, field]) => [pageTypeSlug, ["slug", field]] as const),
  ]
  const [skills, scribed, ...keyed] = await Promise.all(
    asked.map(async ([pageTypeSlug, select]) => {
      const answered = await getPages({ pageTypeSlug, select: [...select], limit: EVERY })
      return answered.rows
    })
  )
  const byType = new Map(SKILL_KEYED_BY.map(([pageTypeSlug], at) => [pageTypeSlug, keyed[at]]))
  const keys = skillKeysIn((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
  return holdSkillCatalog(skillCatalogOf(skillTemplatesOf(skills ?? [], scribed ?? [], keys)))
}
