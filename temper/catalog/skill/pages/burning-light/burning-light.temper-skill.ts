import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const burningLight = {
  id: "019e6245-a60b-7d2a-a217-eb8deed6213a",
  type: "page-type/temper-skill",
  slug: "burning-light",
  title: "Burning Light",
  key: "burning-light",
  baseName: "Burning Light",
  description:
    "When you deal damage you generate a stack of Burning Light for 3 seconds. After reaching 4 stacks, you deal 500 Magic Damage to your target. This effect can stack once every half second and scales off the higher of your Weapon or Spell Damage.",
  icon: "/esoui/art/icons/ability_templar_028.dds",
  esoSkillId: 44730,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 174,
  createdAt: "2026-05-26T03:13:12.203Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Burning Light (Constant)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 2.67E-5 Magicka + 0.499772 SD - 0.130658 (Magicka, ratio = 18718.05, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 0.999999)",
  ],
} as const satisfies TemperSkill
