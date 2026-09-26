"use client"

import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import {
  skillKeysIn,
  skillTemplatesOf,
} from "akasha/temper/catalog/skill/modules/skill-templates-reading/skill-templates-reading.module.code.ts"
import { temperFocusScript } from "akasha/temper/catalog/skill/temper-focus-script/temper-focus-script.page-type.ts"
import { temperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import { temperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.ts"
import { temperSkillType } from "akasha/temper/catalog/skill/type/temper-skill-type.page-type.ts"
import {
  holdSkillCatalog,
  type SkillCatalog,
  skillCatalogOf,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"
import { useMemo } from "react"

const EVERY = 5000

export function useSkillCatalog(): SkillCatalog | null {
  const skills = usePages({ pageTypeSlug: temperSkill.slug, limit: EVERY })
  const scribed = usePages({ pageTypeSlug: temperScribedSkill.slug, limit: EVERY })
  const lines = usePages({ pageTypeSlug: temperSkillLine.slug, limit: EVERY })
  const types = usePages({ pageTypeSlug: temperSkillType.slug, limit: EVERY })
  const grimoires = usePages({ pageTypeSlug: temperGrimoire.slug, limit: EVERY })
  const focuses = usePages({ pageTypeSlug: temperFocusScript.slug, limit: EVERY })
  const major = usePages({ pageTypeSlug: temperBuffMajor.slug, limit: EVERY })
  const minor = usePages({ pageTypeSlug: temperBuffMinor.slug, limit: EVERY })
  const other = usePages({ pageTypeSlug: temperBuffOther.slug, limit: EVERY })
  const metrics = usePages({ pageTypeSlug: temperMetricTree.slug, limit: EVERY })
  const read = [skills, scribed, lines, types, grimoires, focuses, major, minor, other, metrics]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading)
  const catalog = useMemo(() => {
    if (loading) return null
    const byType = new Map<string, Iterable<Value>>([
      [temperSkillLine.slug, lines.rows],
      [temperSkillType.slug, types.rows],
      [temperGrimoire.slug, grimoires.rows],
      [temperFocusScript.slug, focuses.rows],
      [temperBuffMajor.slug, major.rows],
      [temperBuffMinor.slug, minor.rows],
      [temperBuffOther.slug, other.rows],
      [temperMetricTree.slug, metrics.rows],
    ])
    const keys = skillKeysIn((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
    return holdSkillCatalog(skillCatalogOf(skillTemplatesOf(skills.rows, scribed.rows, keys)))
  }, [
    loading,
    skills.rows,
    scribed.rows,
    lines.rows,
    types.rows,
    grimoires.rows,
    focuses.rows,
    major.rows,
    minor.rows,
    other.rows,
    metrics.rows,
  ])
  if (failed !== null) throw failed
  return catalog
}
