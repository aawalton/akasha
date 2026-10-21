import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { mighty } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/mighty.temper-champion-star.ts"
import { warMage } from "akasha/temper/catalog/champion-point/temper-champion-star/pages/war-mage.temper-champion-star.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import { temperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { countArmorPiecesByWeight } from "akasha/temper/player/character/skill/modules/passive-queries/passive-queries.module.code.ts"
import {
  equationStatsOf,
  tooltipPairingOf,
} from "akasha/temper/player/character/stat/modules/skill-equation/skill-equation.module.code.ts"
import { temperTooltipCase } from "akasha/temper/player/character/stat/temper-tooltip-case/temper-tooltip-case.page-type.ts"
import { z } from "zod"

export type Equations = ReadonlyMap<number, readonly string[]>

const numbersByName = z.record(z.string(), z.number())

const caseSkill = z.strictObject({
  abilityId: z.number(),
  name: z.string(),
  description: z.string(),
})

export const tooltipCaseShape = z.strictObject({
  character: z.string(),
  bar: z.enum(["primary-weapon-bar", "backup-weapon-bar"]),
  capturedAt: z.number(),
  esoVersion: z.string(),
  stats: numbersByName,
  passives: z.array(z.string()).optional(),
  stars: z.array(z.string()).optional(),
  buffs: z.array(z.string()).optional(),
  championPoints: numbersByName.optional(),
  mediumPieces: z.number().optional(),
  skills: z.array(caseSkill),
  pinned: numbersByName,
  gaps: numbersByName,
})

export type TooltipCase = z.infer<typeof tooltipCaseShape>

export type TooltipCaseRead = Omit<TooltipCase, "pinned" | "gaps">

export type Worked = { readonly game: number; readonly temper: number | null }

export function equationsIn(root: string): Equations {
  const found = new Map<number, readonly string[]>()
  for (const type of [temperSkill.slug, temperScribedSkill.slug]) {
    for (const one of valuesOfType(root, type)) {
      const { esoSkillId, equations } = one.value
      if (typeof esoSkillId !== "number" || !Array.isArray(equations)) continue
      found.set(
        esoSkillId,
        equations.filter((line): line is string => typeof line === "string")
      )
    }
  }
  return found
}

export type CaseListed = { readonly path: string; readonly slug: string }

export function everyTooltipCase(root: string): readonly CaseListed[] {
  return valuesOfType(root, temperTooltipCase.slug).map((one) => ({
    path: one.path,
    slug: String(one.value.slug),
  }))
}

export type BuildHeld = {
  readonly passives: string[]
  readonly stars: string[]
  readonly mediumPieces: number
}

export function heldOfBuild(hash: string): BuildHeld | undefined {
  let build: ReturnType<typeof decodeBuild> | undefined
  try {
    build = decodeBuild(buildHash(hash))
  } catch {
    return undefined
  }
  if (build === null || build === undefined) return undefined
  const { warfare, fitness, craft } = build.championPoints
  return {
    passives: [...build.passives],
    stars: [...warfare.slotted, ...fitness.slotted, ...craft.slotted],
    mediumPieces: countArmorPiecesByWeight(build.equipment.armor).medium,
  }
}

export type ReadingHeld = {
  readonly activeBuffs?: readonly { readonly name: string }[]
  readonly championPoints?: readonly { readonly championSkillId: number; readonly points: number }[]
}

const POINTS_KEPT = [warMage, mighty]

export function heldOfReading(
  reading: ReadingHeld
): Pick<TooltipCaseRead, "buffs" | "championPoints"> {
  const { activeBuffs, championPoints } = reading
  const pointsOf = (id: number) =>
    championPoints?.find((one) => one.championSkillId === id)?.points ?? 0
  return {
    ...(activeBuffs === undefined
      ? {}
      : { buffs: [...new Set(activeBuffs.map((one) => one.name))] }),
    ...(championPoints === undefined
      ? {}
      : {
          championPoints: Object.fromEntries(
            POINTS_KEPT.map((star) => [star.slug, pointsOf(star.esoChampionSkillId)])
          ),
        }),
  }
}

export function heldOfCase(
  build: BuildHeld | undefined,
  reading: ReadingHeld
): Pick<TooltipCaseRead, "passives" | "stars" | "buffs" | "championPoints" | "mediumPieces"> {
  return { ...(build ?? {}), ...heldOfReading(reading) }
}

export function heldSetOf(read: Pick<TooltipCaseRead, "passives" | "stars">): ReadonlySet<string> {
  return new Set([...(read.passives ?? []), ...(read.stars ?? [])])
}

export function formulaOf(abilityId: number, placeholder: number): string {
  return `${String(abilityId)} <<${String(placeholder)}>>`
}

export function workedOf(read: TooltipCaseRead, equations: Equations): ReadonlyMap<string, Worked> {
  const stats = equationStatsOf(read.stats)
  const built = heldSetOf(read)
  const found = new Map<string, Worked>()
  for (const skill of read.skills) {
    const held = equations.get(skill.abilityId)
    if (held === undefined) continue
    const pairing = tooltipPairingOf(skill.description, held, stats, built)
    if (!pairing.paired) continue
    for (const one of pairing.numbers) {
      const formula = formulaOf(skill.abilityId, one.placeholder)
      const before = found.get(formula)
      const agrees =
        before === undefined || (before.game === one.game && before.temper === one.temper)
      found.set(
        formula,
        agrees ? { game: one.game, temper: one.temper } : { game: before.game, temper: null }
      )
    }
  }
  return found
}

export function inNameOrder(numbers: Readonly<Record<string, number>>): Record<string, number> {
  return Object.fromEntries(Object.entries(numbers).sort(([one], [two]) => one.localeCompare(two)))
}

export function pinnedTooltipCaseOf(read: TooltipCaseRead, equations: Equations): TooltipCase {
  const pinned: Record<string, number> = {}
  const gaps: Record<string, number> = {}
  for (const [formula, worked] of workedOf(read, equations)) {
    if (worked.temper === worked.game) pinned[formula] = worked.game
    else gaps[formula] = worked.game
  }
  return tooltipCaseOf(read, pinned, gaps)
}

export function tooltipCaseOf(
  read: TooltipCaseRead,
  pinned: Readonly<Record<string, number>>,
  gaps: Readonly<Record<string, number>>
): TooltipCase {
  return {
    character: read.character,
    bar: read.bar,
    capturedAt: read.capturedAt,
    esoVersion: read.esoVersion,
    stats: inNameOrder(read.stats),
    ...(read.passives === undefined ? {} : { passives: [...read.passives].sort() }),
    ...(read.stars === undefined ? {} : { stars: [...read.stars].sort() }),
    ...(read.buffs === undefined ? {} : { buffs: [...read.buffs].sort() }),
    ...(read.championPoints === undefined
      ? {}
      : { championPoints: inNameOrder(read.championPoints) }),
    ...(read.mediumPieces === undefined ? {} : { mediumPieces: read.mediumPieces }),
    skills: read.skills.map(({ abilityId, name, description }) => ({
      abilityId,
      name,
      description,
    })),
    pinned: inNameOrder(pinned),
    gaps: inNameOrder(gaps),
  }
}

export function tooltipCaseText(tooltipCase: TooltipCase): string {
  return `${JSON.stringify(tooltipCase, null, 2)}\n`
}
