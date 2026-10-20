import { expect, test } from "bun:test"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import {
  extractSets,
  setPiecesWorn,
} from "akasha/temper/player/character/stat/modules/extract-sets/extract-sets.module.code.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()
holdMetricCatalogFromCheckout()

const VALETERISA_WILLPOWER_STAFF =
  "ATQIopWgAABjhRMGj6tuSFHnbciaGe0AEUM9oAIoZ7QATQz2gAihntAARmVaAAjMq0ABGZVoAHE1XWgDgAAAAAAAAKeT0AAAAAAAJkgAEUagkAIAygKSAFAAyAAgQgAgZOBFYAzAAcgAJQHFACIZJA7EciIWEAAAAQRmA5aECDpCAAcHGXRr1G5FiThlY8mWXMmzs-jTq17Z9CjSp1PFWssbK2Rs8fXL0DFkhaImyN07SJUyd-oUwVUJXHWGDhskbAlSwIwDCBQxk0HECTZwULGDRw8gRJHSYAIDIWMSBqHsqkQ"

function staffBuild(): CharacterState {
  const build = decodeBuild(buildHash(VALETERISA_WILLPOWER_STAFF))
  if (build === null) throw new Error("the Valeterisa build does not decode")
  return build
}

function setIdsOn(build: CharacterState, bar: "primary-weapon-bar" | "backup-weapon-bar") {
  return extractSets(build, { bar }).map((source) => source.id)
}

function withMainHand(build: CharacterState, type: "sword"): CharacterState {
  const bar = build.equipment["primary-weapon-bar"]
  const mainHand = bar["main-hand"]
  if (mainHand.itemType !== "weapon") throw new Error("the main hand holds no weapon")
  const swapped = { ...mainHand, data: { ...mainHand.data, type } }
  return {
    ...build,
    equipment: { ...build.equipment, "primary-weapon-bar": { ...bar, "main-hand": swapped } },
  }
}

test("a two-handed staff counts as two pieces of its set on its own bar", () => {
  expect(setIdsOn(staffBuild(), "primary-weapon-bar")).toContain("set-willpower-2")
})

test("a two-handed staff counts toward no set on the other bar", () => {
  const ids = setIdsOn(staffBuild(), "backup-weapon-bar")
  expect(ids.some((id) => id.startsWith("set-willpower-"))).toBe(false)
})

test("a one-handed weapon counts as one piece of its set", () => {
  const ids = setIdsOn(withMainHand(staffBuild(), "sword"), "primary-weapon-bar")
  expect(ids).toContain("set-willpower-1")
})

test("pieces other than weapons count once each beside a two-hander", () => {
  const ids = setIdsOn(staffBuild(), "primary-weapon-bar")
  expect(ids).toContain("set-grace-of-the-ancients-3")
  expect(ids).toContain("set-crafty-alfiq-5")
})

test("a set missing from the catalog is still counted among the pieces worn", () => {
  const build = staffBuild()
  const necklace = build.equipment.jewelry.necklace
  if (necklace.itemType !== "jewelry") throw new Error("the necklace slot holds no jewelry")
  const unknown = { ...necklace, data: { ...necklace.data, set: "no-such-set-in-catalog" } }
  const worn = {
    ...build,
    equipment: { ...build.equipment, jewelry: { ...build.equipment.jewelry, necklace: unknown } },
  } as CharacterState
  const pieces = setPiecesWorn(worn, { bar: "primary-weapon-bar" })
  expect(pieces.get("no-such-set-in-catalog")?.pieceCount).toBe(1)
  expect(pieces.get("willpower")?.pieceCount).toBe(2)
  expect(pieces.get("willpower")?.items.length).toBe(1)
  const ids = setIdsOn(worn, "primary-weapon-bar")
  expect(ids.some((id) => id.startsWith("set-no-such-set-in-catalog-"))).toBe(false)
})
