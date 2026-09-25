import { expect, test } from "bun:test"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { extractSkills } from "akasha/temper/player/character/stat/modules/extract-skills/extract-skills.module.code.ts"
import type { TranslationContext } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

const SAVED =
  "ATQH8MUAAIBghRP__AAABzbjELRPyWwR1wagAAAAQIA1BAAQBgAAkACAAEAAAhAAAycAIwBmEAZAAQgMCAASySBQIxEAMMAAAAgDAByAIQHAAAQwOcujXqNSLEnDKx5MsuZNnZ9GnVr2z6FGlTqeKqxtHZGzx9cvQMWSFoibI3TtIlTJ36hTBVQlcdYYOGyRsCVLAjAMIFDGTQcQJNnBQsYNHDyBEkdJgAgMhRBIGu1HmDA"

const TRAVELING_KNIFE = {
  skillId: "scribed-traveling-knife-magic-damage",
  grimoireId: "traveling-knife",
  focusScriptId: "magic-damage",
  signatureScriptId: "lingering-torment",
  affixScriptId: "brutality-and-sorcery",
} as const

const EMPTY_BAR = {
  "active-1": "no-skill",
  "active-2": "no-skill",
  "active-3": "no-skill",
  "active-4": "no-skill",
  "active-5": "no-skill",
  ultimate: "no-skill",
}

function travelingKnifeOnBackBar(): CharacterState {
  const saved = decodeBuild(buildHash(SAVED))
  if (!saved) throw new Error("the saved build hash reads back as no build")
  return {
    ...saved,
    skills: {
      "primary-skill-bar": EMPTY_BAR,
      "backup-skill-bar": { ...EMPTY_BAR, "active-1": TRAVELING_KNIFE.skillId },
    },
    scribing: [TRAVELING_KNIFE],
  }
}

function buffIds(context: TranslationContext): readonly string[] {
  return extractSkills(travelingKnifeOnBackBar(), context)
    .flatMap((source) => source.effects)
    .flatMap((effect) => ("buffId" in effect ? [effect.buffId] : []))
}

test("a scribed skill on the back bar grants its buffs while the front bar is active", () => {
  expect(buffIds({ bar: "primary-weapon-bar" })).toEqual(["major-brutality", "major-sorcery"])
})

test("a scribed skill grants its buffs on its own bar", () => {
  expect(buffIds({ bar: "backup-weapon-bar" })).toEqual(["major-brutality", "major-sorcery"])
})

test("a scribed skill grants its buffs where no bar is named", () => {
  expect(buffIds({})).toEqual(["major-brutality", "major-sorcery"])
})
