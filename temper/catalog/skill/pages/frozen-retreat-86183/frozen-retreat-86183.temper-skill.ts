import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const frozenRetreat86183 = {
  id: "019e6f53-a25c-7487-a7e6-1562a898b637",
  type: "page-type/temper-skill",
  slug: "frozen-retreat-86183",
  title: "Frozen Retreat",
  key: "frozen-retreat-86183",
  baseName: "Frozen Gate",
  description:
    "Summon an ancient portal, which arms after |cffffff1.5|r seconds.\n\nWhen triggered the enemy is teleported to you if within range, immobilized for |cffffff3|r seconds, and dealt |cffffff6257|r Frost Damage.\n\nAn ally in the portal can activate the Icy Escape synergy, teleporting them to you and granting them Major Expedition, increasing their Movement Speed by |cffffff30|r% for |cffffff8|r seconds.\n\nYou can have up to |cffffff3|r Frozen Retreats active at a time.",
  icon: "/esoui/art/icons/ability_warden_005_b.dds",
  esoSkillId: 86183,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 550,
  createdAt: "2026-05-28T16:03:32.572Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 15 seconds (Constant)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 0.0774957 MaxStat + 0.813678 MaxPower - 1.85443 (Ultimate, ratio = 10.50, Dmg, Frost, SingleTarget, Direct, Melee, R2 = 1)",
    "<<4>> = Icy Escape (Constant)",
    "<<5>> = Major Expedition (Constant)",
    "<<6>> = 8 seconds (Constant)",
    "<<7>> = 3 Frozen (Constant)",
    "<<8>> = Retreat (Constant)",
  ],
} as const satisfies TemperSkill
