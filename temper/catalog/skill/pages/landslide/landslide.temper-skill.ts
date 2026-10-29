import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const landslide = {
  id: "019e6f53-a3ba-73f6-9fd3-638d9df057f8",
  type: "page-type/temper-skill",
  slug: "landslide",
  title: "Landslide",
  key: "landslide",
  baseName: "Landslide",
  description:
    "Given time, the smallest rock on the mountain can cascade into pure devastation.\n\nWhenever you deal damage you gain a stack of Landslide which increases your damage done by |cffffff1|r% per stack, up to |cffffff10|r times. This effect can occur once every |cffffff10|r seconds.\n\nEvery |cffffff2|r seconds you do not deal damage, you lose a stack.",
  icon: "/esoui/art/icons/ability_weapon_005.dds",
  esoAbilityId: 29463,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/passive",
  hashPlace: 725,
  createdAt: "2026-05-28T16:03:32.922Z",
  updatedAt: "2026-10-29T20:50:35.740Z",
  equations: [
    "<<1>> = Landslide (Constant)",
    "<<2>> = 1% (Constant)",
    "<<3>> = 12 (Constant)",
    "<<4>> = 5 seconds (Constant)",
    "<<5>> = 6 seconds (Constant)",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Fight 194 gives 1,706 at stack 1, 1,754 at 3 and 1,803 at 5.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At power 3,571 the same bucket gives 2,092 at 7 and 2,119 at 8.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bucket of 2.34 makes a stack 0.0337, not the sheet's 0.01.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The buff is ability 29465 and its stack is field 6 of an effect line.",
    },
  ],
} as const satisfies TemperSkill
