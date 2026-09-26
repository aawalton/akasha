"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  type CompanionCatalog,
  catalogOf,
  holdCompanionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { companionsFrom } from "akasha/temper/catalog/companion/companions-core/modules/companion-reading/companion-reading.module.code.ts"
import { companionSkillLinesFrom } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-line-reading/companion-skill-line-reading.module.code.ts"
import { companionSkillsFrom } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"
import { companionTraitsFrom } from "akasha/temper/catalog/companion/companions-core/modules/companion-trait-reading/companion-trait-reading.module.code.ts"
import { temperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.ts"
import { temperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"
import { temperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"
import { useMemo } from "react"

const EVERY = 500

export function useCompanionCatalog(): CompanionCatalog | null {
  const companions = usePages({ pageTypeSlug: temperEsoCompanion.slug, limit: EVERY })
  const skills = usePages({ pageTypeSlug: temperCompanionSkill.slug, limit: EVERY })
  const lines = usePages({ pageTypeSlug: temperCompanionSkillLine.slug, limit: EVERY })
  const traits = usePages({ pageTypeSlug: temperCompanionTrait.slug, limit: EVERY })
  const grades = usePages({ pageTypeSlug: temperCompanionTraitGrade.slug, limit: EVERY })
  const read = [companions, skills, lines, traits, grades]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading)
  const catalog = useMemo(() => {
    if (loading) return null
    return holdCompanionCatalog(
      catalogOf(
        companionsFrom(companions.rows),
        companionSkillsFrom(skills.rows),
        companionSkillLinesFrom(lines.rows),
        companionTraitsFrom(traits.rows, grades.rows)
      )
    )
  }, [loading, companions.rows, skills.rows, lines.rows, traits.rows, grades.rows])
  if (failed !== null) throw failed
  return catalog
}
