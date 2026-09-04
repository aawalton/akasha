import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mercilessResolve = {
  id: "019e6245-a6cf-756b-97b6-ba216402bae2",
  pageTypeSlug: "temper-skill",
  slug: "merciless-resolve",
  title: "Merciless Resolve",
  key: "merciless-resolve",
  baseName: "Grim Focus",
  description:
    '"When slotted on either bar, you gain Major Prophecy and Major Savagery, increasing your Spell and Weapon Critical rating by 2629.\\n\\nYour Light and Heavy Attacks now generate a stack of Merciless Resolve, up to 10 times. Fully-charged Heavy Attacks grant two stacks.\\n\\nWhen at 5 or more stacks, you can consume 5 to fire a spectral arrow to deal 4752 Magic Damage and heal for 50% of the damage dealt, if you are in melee range."',
  icon: "/esoui/art/icons/ability_nightblade_005_b.dds",
  esoSkillId: 62117,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
  effects: "jsonl",
} as const satisfies TemperSkill
