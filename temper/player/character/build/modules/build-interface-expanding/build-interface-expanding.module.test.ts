import { expect, test } from "bun:test"
import { championPoints } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import {
  buildInterfaceHeldOf,
  withBuildInterfaces,
} from "akasha/temper/player/character/build/modules/build-interface-expanding/build-interface-expanding.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { foundations } from "akasha/temper/player/character/build-interface/pages/foundations/foundations.build-interface.ts"
import { werewolfSoloThreeColorStalker } from "akasha/temper/player/character/character-build/pages/werewolf-solo-three-color-stalker/werewolf-solo-three-color-stalker.character-build.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { getRacialSkillLineIdForRace } from "akasha/temper/player/character/skill/modules/passive-queries/passive-queries.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const FOUNDATIONS = [buildInterfaceHeldOf(foundations)]

const RIDING_STARS = ["master-gatherer", "steeds-blessing", "gifted-rider", "war-mount"]

function stalker(): CharacterState {
  const build = decodeBuild(buildHash(werewolfSoloThreeColorStalker.buildHash))
  if (build === null) throw new Error("the werewolf build does not decode")
  return build
}

function passivesOfLine(line: string): readonly string[] {
  return skills.list
    .filter((skill) => skill.skillLineId === line && skill.skillType === "passive")
    .map((skill) => skill.id)
}

test("Foundations is read from its page with its line kinds as catalog ids", () => {
  const [held] = FOUNDATIONS
  expect(held?.passiveLineCategories).toEqual(["racial", "class", "weapon", "armor"])
  expect(held?.passives).toContainEqual({ skill: "continuous-attack", rank: 1 })
  expect(held?.slottedStars).toEqual(RIDING_STARS)
})

test("a build including Foundations holds its race's passives and the crafting ones not left out", () => {
  const build = stalker()
  const expanded = withBuildInterfaces(build, FOUNDATIONS)
  const racial = getRacialSkillLineIdForRace(build.character.race)
  expect(racial).not.toBeNull()
  for (const id of passivesOfLine(racial ?? "")) expect(expanded.passives).toContain(id)
  expect(expanded.passives).toContain("tailoring")
  for (const id of ["metallurgy", "stitching", "carpentry", "lapidary-research", "snakeblood"]) {
    expect(expanded.passives.includes(id)).toBe(build.passives.includes(id))
  }
})

test("a passive the build leaves out is held anyway, and every passive the build holds stays", () => {
  const build = { ...stalker(), passives: [], passiveRanks: {} }
  const expanded = withBuildInterfaces(build, FOUNDATIONS)
  expect(expanded.passives).toContain("continuous-attack")
  expect(expanded.passiveRanks?.["continuous-attack"]).toBe(1)
  const own = stalker()
  const kept = withBuildInterfaces(own, FOUNDATIONS)
  for (const id of own.passives) expect(kept.passives).toContain(id)
})

test("a rank the build raises past the interface's is kept", () => {
  const build = { ...stalker(), passives: ["continuous-attack"], passiveRanks: {} }
  const expanded = withBuildInterfaces(build, FOUNDATIONS)
  expect(expanded.passiveRanks?.["continuous-attack"]).toBeUndefined()
})

test("every passive star is held, after the build's own", () => {
  const build = stalker()
  const expanded = withBuildInterfaces(build, FOUNDATIONS)
  const warfare = expanded.championPoints.warfare.passive
  expect(warfare.slice(0, build.championPoints.warfare.passive.length)).toEqual([
    ...build.championPoints.warfare.passive,
  ])
  for (const star of championPoints.list) {
    if (star.subcategoryId !== "warfare-passives" || star.esoChampionSkillId === 0) continue
    expect(warfare).toContain(star.id)
  }
})

test("a craft star the build slots keeps its slot, and Foundations fills the slots left empty", () => {
  const own = championPoints.list.find(
    (star) =>
      star.subcategoryId === "craft-slottables" &&
      star.esoChampionSkillId !== 0 &&
      !RIDING_STARS.includes(star.id)
  )
  if (own === undefined) throw new Error("no craft star outside Foundations")
  const base = stalker()
  const build: CharacterState = {
    ...base,
    championPoints: {
      ...base.championPoints,
      craft: {
        passive: [],
        slotted: [own.id, "no-craft-star", "no-craft-star", "no-craft-star"],
      },
    },
  }
  const slotted = withBuildInterfaces(build, FOUNDATIONS).championPoints.craft.slotted
  expect(slotted).toEqual([own.id, "master-gatherer", "steeds-blessing", "gifted-rider"])
})

test("a build including no interface is left as it is", () => {
  const build = stalker()
  expect(withBuildInterfaces(build, [])).toBe(build)
})
