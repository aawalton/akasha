import {
  type ChampionPointId,
  championPoints,
} from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { slugOf } from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import { passiveSkillIds } from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { armorWeights } from "akasha/temper/player/character/characters-equipment/modules/armor-weights/armor-weights.module.code.ts"
import {
  type SkillLineCategoryId,
  skillLineCategories,
} from "akasha/temper/player/character/skill/line/modules/skill-line-category-data/skill-line-category-data.module.code.ts"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import {
  type SkillId,
  skills,
} from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import {
  countArmorPiecesByWeight,
  getRacialSkillLineIdForRace,
  getSkillLineCategory,
} from "akasha/temper/player/character/skill/modules/passive-queries/passive-queries.module.code.ts"
import { getWeaponSkillLineIdsForBar } from "akasha/temper/player/character/skill/modules/skill-line-queries/skill-line-queries.module.code.ts"

export interface InterfacePassive {
  readonly skill: string
  readonly rank?: number
}

export interface BuildInterfaceHeld {
  readonly passiveLines: readonly string[]
  readonly passiveLineCategories: readonly SkillLineCategoryId[]
  readonly leftOutPassives: readonly string[]
  readonly passives: readonly InterfacePassive[]
  readonly everyPassiveStar: boolean
  readonly slottedStars: readonly string[]
}

type Row = Readonly<Record<string, unknown>>

type Discipline = keyof CharacterState["championPoints"]

const DISCIPLINES: readonly Discipline[] = ["warfare", "fitness", "craft"]

const SLOTS_PER_DISCIPLINE = 4

const CATEGORY_OF_PAGE: Readonly<Record<string, SkillLineCategoryId>> = {
  "character-class": "class",
}

function slugsIn(value: unknown): readonly string[] {
  return Array.isArray(value) ? value.map(slugOf).filter((slug) => slug !== "") : []
}

function categoryOf(slug: string): SkillLineCategoryId | null {
  const id = CATEGORY_OF_PAGE[slug] ?? slug
  return skillLineCategories.has(id) ? id : null
}

function passivesIn(value: unknown): readonly InterfacePassive[] {
  if (!Array.isArray(value)) return []
  const passives: InterfacePassive[] = []
  for (const entry of value as readonly Row[]) {
    const skill = slugOf(entry.skill)
    if (skill === "") continue
    passives.push(typeof entry.rank === "number" ? { skill, rank: entry.rank } : { skill })
  }
  return passives
}

export function buildInterfaceHeldOf(page: Row): BuildInterfaceHeld {
  return {
    passiveLines: slugsIn(page.passiveLines),
    passiveLineCategories: slugsIn(page.passiveLineCategories)
      .map(categoryOf)
      .filter((id): id is SkillLineCategoryId => id !== null),
    leftOutPassives: slugsIn(page.leftOutPassives),
    passives: passivesIn(page.interfacePassives),
    everyPassiveStar: page.everyPassiveStar === true,
    slottedStars: slugsIn(page.slottedStars),
  }
}

function armorLinesOf(build: CharacterState): readonly string[] {
  const counts = countArmorPiecesByWeight(build.equipment.armor)
  const lines: string[] = []
  for (const [weight, count] of Object.entries(counts)) {
    if (count === 0 || weight === "no-weight") continue
    const line = armorWeights.data[weight as keyof typeof counts].skillLineId
    if (line !== "no-skill-line") lines.push(line)
  }
  return lines
}

function linesOfCategory(build: CharacterState, category: SkillLineCategoryId): readonly string[] {
  switch (category) {
    case "racial": {
      const line = getRacialSkillLineIdForRace(build.character.race)
      return line === null ? [] : [line]
    }
    case "class":
      return build.character.skillLineIds.filter((id) => getSkillLineCategory(id) === "class")
    case "weapon":
      return [
        ...getWeaponSkillLineIdsForBar(build.equipment["primary-weapon-bar"]),
        ...getWeaponSkillLineIdsForBar(build.equipment["backup-weapon-bar"]),
      ]
    case "armor":
      return armorLinesOf(build)
    default:
      return skillLines.ids.filter((id) => getSkillLineCategory(id) === category)
  }
}

function wantedPassives(
  build: CharacterState,
  held: readonly BuildInterfaceHeld[]
): ReadonlyMap<string, number | undefined> {
  const wanted = new Map<string, number | undefined>()
  for (const one of held) {
    const lines = new Set([
      ...one.passiveLines,
      ...one.passiveLineCategories.flatMap((category) => linesOfCategory(build, category)),
    ])
    const leftOut = new Set(one.leftOutPassives)
    for (const id of passiveSkillIds()) {
      const skill = skills.data[id]
      if (skill === undefined || leftOut.has(id) || !lines.has(skill.skillLineId)) continue
      wanted.set(id, undefined)
    }
    for (const passive of one.passives) {
      const before = wanted.has(passive.skill) ? wanted.get(passive.skill) : 0
      wanted.set(passive.skill, higherRank(before, passive.rank))
    }
  }
  return wanted
}

function higherRank(one: number | undefined, other: number | undefined): number | undefined {
  if (one === undefined || other === undefined) return undefined
  return Math.max(one, other)
}

function withPassives(
  build: CharacterState,
  wanted: ReadonlyMap<string, number | undefined>
): Pick<CharacterState, "passives" | "passiveRanks"> {
  const passives: SkillId[] = [...build.passives]
  const ranks: Partial<Record<SkillId, number>> = { ...build.passiveRanks }
  const held = new Set<string>(build.passives)
  for (const [id, rank] of wanted) {
    const skill = skills.data[id]
    if (skill === undefined) continue
    const top = skill.rank
    const own = held.has(id) ? (ranks[id] ?? top) : 0
    const want = rank ?? top
    if (!held.has(id)) passives.push(id)
    const rankHeld = Math.max(own, want)
    if (rankHeld === top) delete ranks[id]
    else ranks[id] = rankHeld
  }
  return Object.keys(ranks).length === 0 && build.passiveRanks === undefined
    ? { passives }
    : { passives, passiveRanks: ranks }
}

function isEmptyStar(id: string): boolean {
  return id.startsWith("no-")
}

function starsOf(discipline: Discipline, kind: "passives" | "slottables"): readonly ChampionPointId[] {
  return championPoints.list
    .filter((star) => star.subcategoryId === `${discipline}-${kind}` && star.esoChampionSkillId !== 0)
    .map((star) => star.id)
}

function withStars(
  build: CharacterState,
  held: readonly BuildInterfaceHeld[]
): CharacterState["championPoints"] {
  const everyPassive = held.some((one) => one.everyPassiveStar)
  const slotted = held.flatMap((one) => one.slottedStars)
  const disciplines = { ...build.championPoints }
  for (const discipline of DISCIPLINES) {
    const own = build.championPoints[discipline]
    const passive = everyPassive
      ? [...new Set([...own.passive, ...starsOf(discipline, "passives")])]
      : [...own.passive]
    const slots: ChampionPointId[] = [...own.slotted]
    const slottable = new Set<string>(starsOf(discipline, "slottables"))
    for (const star of slotted) {
      if (!slottable.has(star) || slots.includes(star as ChampionPointId)) continue
      const empty = slots.findIndex(isEmptyStar)
      if (empty !== -1) slots[empty] = star as ChampionPointId
      else if (slots.length < SLOTS_PER_DISCIPLINE) slots.push(star as ChampionPointId)
    }
    disciplines[discipline] = { passive, slotted: slots }
  }
  return disciplines
}

export function withBuildInterfaces(
  build: CharacterState,
  held: readonly BuildInterfaceHeld[]
): CharacterState {
  if (held.length === 0) return build
  return {
    ...build,
    ...withPassives(build, wantedPassives(build, held)),
    championPoints: withStars(build, held),
  }
}
