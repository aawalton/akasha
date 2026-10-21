import {
  type CombatCase,
  type Hit,
  hitLanded,
  workedHitOf,
} from "akasha/temper/player/character/stat/modules/combat-case/combat-case.module.code.ts"

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
