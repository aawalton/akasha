import { expect, test } from "bun:test"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { buildInterface } from "akasha/temper/player/character/build-interface/build-interface.page-type.ts"
import { foundations } from "akasha/temper/player/character/build-interface/pages/foundations/foundations.build-interface.ts"
import { maxMaxStamina } from "akasha/temper/player/character/character-build/pages/max-max-stamina/max-max-stamina.character-build.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import {
  characterTargetOf,
  compileCharacterTargets,
} from "akasha/temper/watcher/modules/watcher-export-character-targets/watcher-export-character-targets.module.code.ts"
import type { PageReader } from "akasha/temper/watcher/modules/watcher-settings-equipment/watcher-settings-equipment.module.code.ts"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()

function decoded() {
  const build = decodeBuild(buildHash(maxMaxStamina.buildHash))
  if (build === null) throw new Error("the max-max-stamina build does not decode")
  return build
}

const TARGET = characterTargetOf(decoded(), maxMaxStamina.title, maxMaxStamina.id)

test("a target carries its build's title and attribute points", () => {
  expect(TARGET.title).toBe("Max Max Stamina")
  expect(TARGET.attributes).toEqual({ health: 0, magicka: 0, stamina: 64 })
})

test("each discipline names its slotted stars by game id, an empty slot as 0", () => {
  const warfare = TARGET.champion.find((one) => one.discipline === "warfare")
  expect(warfare?.slotted.map((star) => star.id)).toEqual([5, 0, 0, 0])
  expect(warfare?.slotted[0]?.name).toBe("Endless Endurance")
})

test("a discipline's stars put the slotted ones first and name each star once", () => {
  const warfare = TARGET.champion.find((one) => one.discipline === "warfare")
  const ids = warfare?.stars.map((star) => star.id) ?? []
  expect(ids[0]).toBe(5)
  expect(new Set(ids).size).toBe(ids.length)
  expect(ids).not.toContain(0)
})

test("the disciplines come in warfare, fitness, craft order", () => {
  expect(TARGET.champion.map((one) => one.discipline)).toEqual(["warfare", "fitness", "craft"])
})

test("each bar names six slots, an empty slot by no name and ability 0", () => {
  expect(TARGET.bars.primary).toHaveLength(6)
  expect(TARGET.bars.primary[0]?.name).toBe("Swallow Soul")
  expect(TARGET.bars.primary[0]?.abilityId).toBeGreaterThan(0)
  expect(TARGET.bars.primary[2]).toEqual({ name: "", abilityId: 0 })
  expect(TARGET.bars.backup.every((slot) => slot.abilityId === 0)).toBe(true)
})

test("the mundus stone and food carry their names and game abilities", () => {
  expect(TARGET.mundus?.name).toBe("The Tower")
  expect(TARGET.mundus?.abilityId).toBeGreaterThan(0)
  expect(TARGET.food?.itemId).toBeGreaterThan(0)
  expect(TARGET.food?.abilityId).toBeGreaterThan(0)
})

test("each piece of gear names its slot, set and trait, and an empty slot is left out", () => {
  const head = TARGET.gear.find((one) => one.slot === "head")
  expect(head?.setName).toBe("Domihaus")
  expect(head?.setId).toBeGreaterThan(0)
  expect(head?.trait).toBeGreaterThan(0)
  expect(TARGET.gear.map((one) => one.slot)).not.toContain("backup-main-hand")
  expect(TARGET.gear.map((one) => one.slot)).toContain("primary-off-hand")
})

function readerOf(characters: readonly Record<string, unknown>[]): PageReader {
  return {
    collect: async () => [...characters],
    get: async (args) =>
      args.where[0]?.eq === maxMaxStamina.id
        ? { buildHash: maxMaxStamina.buildHash, title: maxMaxStamina.title }
        : null,
  }
}

const ACCOUNT = "the account page"

test("only a character with a target build that decodes has a target, keyed by its game id", async () => {
  const targets = await compileCharacterTargets(
    ACCOUNT,
    readerOf([
      { esoCharacterId: "1001", targetBuildId: maxMaxStamina.id },
      { esoCharacterId: "1002" },
      { esoCharacterId: "1003", targetBuildId: "no-such-build" },
    ]),
    async () => undefined
  )
  expect(Object.keys(targets)).toEqual(["1001"])
  expect(targets["1001"]?.map((one) => one.title)).toEqual(["Max Max Stamina"])
})

test("a character's targets list each target build that decodes, the one it is set up as first", async () => {
  const targets = await compileCharacterTargets(
    ACCOUNT,
    readerOf([
      {
        esoCharacterId: "1001",
        targetBuildId: maxMaxStamina.id,
        targetBuildIds: ["no-such-build", maxMaxStamina.id],
      },
      { esoCharacterId: "1002", targetBuildIds: [maxMaxStamina.id] },
    ]),
    async () => undefined
  )
  expect(targets["1001"]?.map((one) => one.buildId)).toEqual([maxMaxStamina.id])
  expect(targets["1002"]?.map((one) => one.buildId)).toEqual([maxMaxStamina.id])
})

test("a target holds the stars of the build interfaces its build includes", async () => {
  const reader: PageReader = {
    collect: async () => [{ esoCharacterId: "1001", targetBuildId: maxMaxStamina.id }],
    get: async (args) =>
      args.pageTypeSlug === buildInterface.slug
        ? args.where[0]?.eq === foundations.slug
          ? { ...foundations }
          : null
        : {
            buildHash: maxMaxStamina.buildHash,
            title: maxMaxStamina.title,
            buildInterfaces: [`${buildInterface.slug}/${foundations.slug}`],
          },
  }
  const targets = await compileCharacterTargets(ACCOUNT, reader, async () => undefined)
  const craft = targets["1001"]?.[0]?.champion.find((one) => one.discipline === "craft")
  expect(craft?.slotted.map((star) => star.name)).toEqual([
    "Master Gatherer",
    "Steed's Blessing",
    "Gifted Rider",
    "War Mount",
  ])
})

test("a target names each passive its build holds, with the rank it is held to", () => {
  const build = {
    ...decoded(),
    passives: ["continuous-attack", "tailoring"],
    passiveRanks: { "continuous-attack": 1 },
  }
  const passives = characterTargetOf(build, "", "").passives
  expect(passives.map((one) => [one.name, one.rank])).toEqual([
    ["Continuous Attack", 1],
    ["Tailoring", 10],
  ])
  expect(passives.every((one) => one.abilityId > 0)).toBe(true)
})

test("no character with a target reads no catalog", async () => {
  let read = 0
  await compileCharacterTargets(ACCOUNT, readerOf([{ esoCharacterId: "1" }]), async () => {
    read++
  })
  expect(read).toBe(0)
})
