import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const frozenRetreat86183 = {
  id: "019e6f53-a25c-7487-a7e6-1562a898b637",
  pageTypeSlug: "temper-skill",
  slug: "frozen-retreat-86183",
  title: "Frozen Retreat",
  key: "frozen-retreat-86183",
  baseName: "Frozen Gate",
  description:
    '"Summon an ancient portal, which arms after |cffffff1.5|r seconds.\\n\\nWhen triggered the enemy is teleported to you if within range, immobilized for |cffffff3|r seconds, and dealt |cffffff6257|r Frost Damage.\\n\\nAn ally in the portal can activate the Icy Escape synergy, teleporting them to you and granting them Major Expedition, increasing their Movement Speed by |cffffff30|r% for |cffffff8|r seconds.\\n\\nYou can have up to |cffffff3|r Frozen Retreats active at a time."',
  icon: "/esoui/art/icons/ability_warden_005_b.dds",
  esoSkillId: 86183,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
