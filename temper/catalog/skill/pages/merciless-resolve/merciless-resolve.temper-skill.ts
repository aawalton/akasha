import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mercilessResolve = {
  id: "019e6245-a6cf-756b-97b6-ba216402bae2",
  type: "page-type/temper-skill",
  slug: "merciless-resolve",
  title: "Merciless Resolve",
  key: "merciless-resolve",
  baseName: "Grim Focus",
  description:
    "When slotted on either bar, you gain Major Prophecy and Major Savagery, increasing your Spell and Weapon Critical rating by 2629.\n\nYour Light and Heavy Attacks now generate a stack of Merciless Resolve, up to 10 times. Fully-charged Heavy Attacks grant two stacks.\n\nWhen at 5 or more stacks, you can consume 5 to fire a spectral arrow to deal 4752 Magic Damage and heal for 50% of the damage dealt, if you are in melee range.",
  icon: "/esoui/art/icons/ability_nightblade_005_b.dds",
  esoSkillId: 62117,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 819,
  createdAt: "2026-05-26T03:13:12.399Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Savagery (Constant)",
    "<<2>> = 12% (Constant)",
    "<<3>> = Merciless Resolve (Constant)",
    "<<4>> = 10 (Constant)",
    "<<5>> = 5 (Constant)",
    "<<6>> = 0.211283622 MaxStat + 2.21848113 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<7>> = 50% (Constant)",
  ],
} as const satisfies TemperSkill
