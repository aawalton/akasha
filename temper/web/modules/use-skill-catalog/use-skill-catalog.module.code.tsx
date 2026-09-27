"use client"

import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import { temperCurse } from "akasha/temper/catalog/effect/temper-curse/temper-curse.page-type.ts"
import { temperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.ts"
import { temperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.ts"
import { temperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.ts"
import { temperVampireStage } from "akasha/temper/catalog/effect/temper-vampire-stage/temper-vampire-stage.page-type.ts"
import { temperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.ts"
import { temperSkillLineCategory } from "akasha/temper/catalog/skill/line-category/temper-skill-line-category.page-type.ts"
import { catalogTemplatesOf } from "akasha/temper/catalog/skill/modules/skill-templates-reading/skill-templates-reading.module.code.ts"
import { temperAffixScript } from "akasha/temper/catalog/skill/temper-affix-script/temper-affix-script.page-type.ts"
import { temperClass } from "akasha/temper/catalog/skill/temper-class/temper-class.page-type.ts"
import { temperFocusScript } from "akasha/temper/catalog/skill/temper-focus-script/temper-focus-script.page-type.ts"
import { temperGrimoire } from "akasha/temper/catalog/skill/temper-grimoire/temper-grimoire.page-type.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import { temperSignatureScript } from "akasha/temper/catalog/skill/temper-signature-script/temper-signature-script.page-type.ts"
import { temperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.ts"
import { temperSkillType } from "akasha/temper/catalog/skill/type/temper-skill-type.page-type.ts"
import { temperAlliance } from "akasha/temper/catalog/world/temper-alliance/temper-alliance.page-type.ts"
import {
  holdSkillCatalog,
  type SkillCatalog,
  skillCatalogOf,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { temperAttribute } from "akasha/temper/player/character/source/temper-attribute/temper-attribute.page-type.ts"
import { temperEsoPlus } from "akasha/temper/player/character/source/temper-eso-plus/temper-eso-plus.page-type.ts"
import { temperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.ts"
import { temperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"
import { useMemo } from "react"

const EVERY = 5000

export function useSkillCatalog(): SkillCatalog | null {
  const skills = usePages({ pageTypeSlug: temperSkill.slug, limit: EVERY })
  const scribed = usePages({ pageTypeSlug: temperScribedSkill.slug, limit: EVERY })
  const focuses = usePages({ pageTypeSlug: temperFocusScript.slug, limit: EVERY })
  const signatures = usePages({ pageTypeSlug: temperSignatureScript.slug, limit: EVERY })
  const affixes = usePages({ pageTypeSlug: temperAffixScript.slug, limit: EVERY })
  const lines = usePages({ pageTypeSlug: temperSkillLine.slug, limit: EVERY })
  const types = usePages({ pageTypeSlug: temperSkillType.slug, limit: EVERY })
  const grimoires = usePages({ pageTypeSlug: temperGrimoire.slug, limit: EVERY })
  const major = usePages({ pageTypeSlug: temperBuffMajor.slug, limit: EVERY })
  const minor = usePages({ pageTypeSlug: temperBuffMinor.slug, limit: EVERY })
  const other = usePages({ pageTypeSlug: temperBuffOther.slug, limit: EVERY })
  const metrics = usePages({ pageTypeSlug: temperMetricTree.slug, limit: EVERY })
  const classes = usePages({ pageTypeSlug: temperClass.slug, limit: EVERY })
  const categories = usePages({ pageTypeSlug: temperSkillLineCategory.slug, limit: EVERY })
  const esoPlus = usePages({ pageTypeSlug: temperEsoPlus.slug, limit: EVERY })
  const mundusStones = usePages({ pageTypeSlug: temperMundusStone.slug, limit: EVERY })
  const alliances = usePages({ pageTypeSlug: temperAlliance.slug, limit: EVERY })
  const curses = usePages({ pageTypeSlug: temperCurse.slug, limit: EVERY })
  const stages = usePages({ pageTypeSlug: temperVampireStage.slug, limit: EVERY })
  const attributes = usePages({ pageTypeSlug: temperAttribute.slug, limit: EVERY })
  const foodsAndDrinks = usePages({ pageTypeSlug: temperFoodOrDrink.slug, limit: EVERY })
  const majorDebuffs = usePages({ pageTypeSlug: temperDebuffMajor.slug, limit: EVERY })
  const minorDebuffs = usePages({ pageTypeSlug: temperDebuffMinor.slug, limit: EVERY })
  const otherDebuffs = usePages({ pageTypeSlug: temperDebuffOther.slug, limit: EVERY })
  const read = [
    majorDebuffs,
    minorDebuffs,
    otherDebuffs,
    foodsAndDrinks,
    attributes,
    stages,
    curses,
    alliances,
    esoPlus,
    mundusStones,
    skills,
    scribed,
    focuses,
    signatures,
    affixes,
    lines,
    types,
    grimoires,
    major,
    minor,
    other,
    metrics,
    classes,
    categories,
  ]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading)
  const catalog = useMemo(() => {
    if (loading) return null
    const byType = new Map<string, Iterable<Value>>([
      [temperSkill.slug, skills.rows],
      [temperScribedSkill.slug, scribed.rows],
      [temperFocusScript.slug, focuses.rows],
      [temperSignatureScript.slug, signatures.rows],
      [temperAffixScript.slug, affixes.rows],
      [temperSkillLine.slug, lines.rows],
      [temperSkillType.slug, types.rows],
      [temperGrimoire.slug, grimoires.rows],
      [temperBuffMajor.slug, major.rows],
      [temperBuffMinor.slug, minor.rows],
      [temperBuffOther.slug, other.rows],
      [temperMetricTree.slug, metrics.rows],
      [temperClass.slug, classes.rows],
      [temperSkillLineCategory.slug, categories.rows],
      [temperEsoPlus.slug, esoPlus.rows],
      [temperMundusStone.slug, mundusStones.rows],
      [temperAlliance.slug, alliances.rows],
      [temperCurse.slug, curses.rows],
      [temperVampireStage.slug, stages.rows],
      [temperAttribute.slug, attributes.rows],
      [temperFoodOrDrink.slug, foodsAndDrinks.rows],
      [temperDebuffMajor.slug, majorDebuffs.rows],
      [temperDebuffMinor.slug, minorDebuffs.rows],
      [temperDebuffOther.slug, otherDebuffs.rows],
    ])
    return holdSkillCatalog(
      skillCatalogOf(catalogTemplatesOf((pageTypeSlug) => byType.get(pageTypeSlug) ?? []))
    )
  }, [
    loading,
    skills.rows,
    scribed.rows,
    focuses.rows,
    signatures.rows,
    affixes.rows,
    lines.rows,
    types.rows,
    grimoires.rows,
    major.rows,
    minor.rows,
    other.rows,
    metrics.rows,
    classes.rows,
    categories.rows,
    esoPlus.rows,
    mundusStones.rows,
    alliances.rows,
    curses.rows,
    stages.rows,
    attributes.rows,
    foodsAndDrinks.rows,
    majorDebuffs.rows,
    minorDebuffs.rows,
    otherDebuffs.rows,
  ])
  if (failed !== null) throw failed
  return catalog
}
