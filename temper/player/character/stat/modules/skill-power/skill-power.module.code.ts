import { mighty } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/mighty.temper-champion-star.ts"
import { warMage } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/war-mage.temper-champion-star.ts"

export type PowerHeld = {
  readonly buffs: ReadonlySet<string>
  readonly championPoints: Readonly<Record<string, number>>
  readonly mediumPieces: number
}

const POWER_BUFFS: Readonly<Record<string, number>> = {
  "Major Brutality": 0.2,
  "Minor Brutality": 0.1,
}

const POWER_PER_MEDIUM_PIECE = { held: "agility", share: 0.02 }

const POWER_STARS = [
  { star: warMage.slug, types: ["Magic", "Flame", "Frost", "Shock"] },
  { star: mighty.slug, types: ["Physical", "Poison", "Disease", "Bleed"] },
]

const POWER_STAR = { points: 30, power: 100 }

const WRATHFUL_STRIKES = { held: "wrathful-strikes", power: 205 }

function powerShareOf(held: ReadonlySet<string>, active: PowerHeld, slotted: number): number {
  const buffs = [...active.buffs].reduce((sum, one) => sum + (POWER_BUFFS[one] ?? 0), 0)
  const medium = held.has(POWER_PER_MEDIUM_PIECE.held)
    ? POWER_PER_MEDIUM_PIECE.share * active.mediumPieces
    : 0
  return buffs + medium + slotted
}

export function damagePowerOf(
  tags: readonly string[],
  power: number,
  held: ReadonlySet<string>,
  active: PowerHeld,
  slotted: number
): number {
  const star = POWER_STARS.find((one) => one.types.some((type) => tags.includes(type)))
  const points = star === undefined ? 0 : (active.championPoints[star.star] ?? 0)
  const flat =
    (points >= POWER_STAR.points ? POWER_STAR.power : 0) +
    (held.has(WRATHFUL_STRIKES.held) ? WRATHFUL_STRIKES.power : 0)
  if (flat === 0) return power
  const grown = 1 + powerShareOf(held, active, slotted)
  const base = Math.round(power / grown)
  return power + Math.round((base + flat) * grown) - Math.round(base * grown)
}
