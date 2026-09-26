import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { heldReading } from "akasha/page/service/modules/held-reading/held-reading.module.code.ts"
import {
  CATALOG_READS,
  catalogTemplatesOf,
} from "akasha/temper/catalog/skill/modules/skill-templates-reading/skill-templates-reading.module.code.ts"
import {
  heldSkillCatalog,
  holdSkillCatalog,
  type SkillCatalog,
  skillCatalogOf,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

const EVERY = 5000

async function readSkillCatalog(): Promise<SkillCatalog> {
  const answered = await Promise.all(
    CATALOG_READS.map(async ([pageTypeSlug, select]) => {
      const { rows } = await getPages({ pageTypeSlug, select: [...select], limit: EVERY })
      return [pageTypeSlug, rows] as const
    })
  )
  const byType = new Map<string, readonly Value[]>(answered)
  return holdSkillCatalog(
    skillCatalogOf(catalogTemplatesOf((pageTypeSlug) => byType.get(pageTypeSlug) ?? []))
  )
}

const kept = heldReading(
  CATALOG_READS.map(([pageTypeSlug]) => pageTypeSlug),
  readSkillCatalog
)

export async function loadSkillCatalog(): Promise<SkillCatalog> {
  return heldSkillCatalog() ?? (await kept())
}
