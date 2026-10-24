import { readFileSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  buildReadingsIn,
  type CombatCase,
  type Hit,
  hitLanded,
  workedHitOf,
} from "akasha/temper/player/character/stat/modules/combat-case/combat-case.module.code.ts"
import { pinnedReading } from "akasha/temper/player/character/stat/temper-combat-case/properties/pinned-reading.file-property.ts"
import { temperCombatCase } from "akasha/temper/player/character/stat/temper-combat-case/temper-combat-case.page-type.ts"

export function pinnedReadingOf(
  root: string,
  slug: string,
  combatCase: CombatCase
): ReturnType<typeof buildReadingsIn> {
  const found = listedAt(root, temperCombatCase.slug, slug)[0]
  if (found === undefined) throw new Error(`\`${slug}\` names no combat case page`)
  const at = besideAt(found.path, pinnedReading.propertySlug, "json")
  if (at === null) throw new Error(`\`${slug}\` sits where no pinned reading can`)
  return buildReadingsIn(readFileSync(join(root, at), "utf8"), combatCase.buildHash)
}

type HitMiss = {
  readonly fight: number
  readonly ms: number
  readonly game: number
  readonly temper: number | null
}

type CombatCaseJudgement = {
  readonly drifted: readonly HitMiss[]
  readonly closed: readonly HitMiss[]
}

function missOf(combatCase: CombatCase, hit: Hit): HitMiss {
  return {
    fight: hit.fight,
    ms: hit.ms,
    game: hitLanded(hit),
    temper: workedHitOf(combatCase, hit),
  }
}

export function judgeCombatCase(combatCase: CombatCase): CombatCaseJudgement {
  const drifted = combatCase.pinned
    .map((hit) => missOf(combatCase, hit))
    .filter((one) => one.temper !== one.game)
  const closed = combatCase.unexplained
    .map((hit) => missOf(combatCase, hit))
    .filter((one) => one.temper === one.game)
  return { drifted, closed }
}
