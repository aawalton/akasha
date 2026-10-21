import { duelistsRebuff } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/duelists-rebuff.temper-champion-star.ts"
import { elementalAegis } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/elemental-aegis.temper-champion-star.ts"
import { enduringResolve } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/enduring-resolve.temper-champion-star.ts"
import { hardy } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/hardy.temper-champion-star.ts"
import { ironclad } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/ironclad.temper-champion-star.ts"
import { preparation } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/preparation.temper-champion-star.ts"
import { damageTaken } from "akasha/temper/player/character/stat/temper-metric/pages/damage-taken/damage-taken.temper-metric.ts"
import { damageTakenMagical } from "akasha/temper/player/character/stat/temper-metric/pages/damage-taken-magical/damage-taken-magical.temper-metric.ts"
import { damageTakenMartial } from "akasha/temper/player/character/stat/temper-metric/pages/damage-taken-martial/damage-taken-martial.temper-metric.ts"
import { temperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.ts"

type Star = {
  readonly slug: string
  readonly esoChampionSkillId: number
  readonly isSlottable: boolean
  readonly jumpPoints?: readonly number[]
  readonly effects?: readonly { readonly metric: string; readonly value: number }[]
}

type StarSpent = {
  readonly championSkillId: number
  readonly points: number
  readonly maxPoints: number
}

type DamageTakenByType = { readonly martial: number; readonly magical: number }

export const EVERY = `${temperMetric.slug}/${damageTaken.slug}`

export const MARTIAL = `${temperMetric.slug}/${damageTakenMartial.slug}`

export const MAGICAL = `${temperMetric.slug}/${damageTakenMagical.slug}`

export const DAMAGE_TAKEN_STARS: readonly Star[] = [
  preparation,
  hardy,
  elementalAegis,
  ironclad,
  duelistsRebuff,
  enduringResolve,
]

export function starShareOf(
  jumpPoints: readonly number[],
  points: number,
  maxPoints: number
): number {
  if (jumpPoints.length === 0) return points / maxPoints
  const reached = jumpPoints.reduce(
    (best, jump) => (jump <= points && jump > best ? jump : best),
    0
  )
  return reached / maxPoints
}

export function starsDamageTaken(
  spent: readonly StarSpent[],
  slotted: readonly number[]
): DamageTakenByType {
  let martial = 0
  let magical = 0
  for (const star of DAMAGE_TAKEN_STARS) {
    const one = spent.find((each) => each.championSkillId === star.esoChampionSkillId)
    if (one === undefined) continue
    if (star.isSlottable && !slotted.includes(star.esoChampionSkillId)) continue
    const share = starShareOf(star.jumpPoints ?? [], one.points, one.maxPoints)
    for (const effect of star.effects ?? []) {
      const value = effect.value * share
      if (effect.metric === EVERY || effect.metric === MARTIAL) martial += value
      if (effect.metric === EVERY || effect.metric === MAGICAL) magical += value
    }
  }
  return { martial, magical }
}
