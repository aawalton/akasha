import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const relentlessFocus61927 = {
  id: "019e6f53-a5e6-7c5a-b0cd-869038ad495c",
  type: "page-type/temper-skill",
  slug: "relentless-focus-61927",
  title: "Relentless Focus",
  key: "relentless-focus-61927",
  baseName: "Grim Focus",
  description:
    "When slotted on either bar, you gain Major Prophecy and Major Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r.\n\nYour Light and Heavy Attacks now generate a stack of Relentless Focus, up to |cffffff10|r times. Fully-charged Heavy Attacks grant two stacks.\n\nWhen at |cffffff4|r or more stacks, you can consume |cffffff4|r to fire a spectral arrow to deal |cffffff14539|r Disease Damage and heal for |cffffff34|r% of the damage dealt, if you are in melee range.",
  icon: "/esoui/art/icons/ability_nightblade_005_a.dds",
  esoSkillId: 61927,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 1014,
  createdAt: "2026-05-28T16:03:33.478Z",
  updatedAt: "2026-10-21T01:42:11.846Z",
  equations: [
    "<<1>> = Major Savagery (Constant)",
    "<<2>> = 12% (Constant)",
    "<<3>> = Relentless Focus (Constant)",
    "<<4>> = 10 (Constant)",
    "<<5>> = 4 (Constant)",
    "<<5>> = 4 (Constant, Repeat)",
    "<<6>> = 0.18594 MaxStat + 1.95237 MaxPower (Ultimate, ratio = 10.50, Dmg, Disease, SingleTarget, Direct, R2 = 1)",
    "<<7>> = 34% (Constant)",
  ],
} as const satisfies TemperSkill
