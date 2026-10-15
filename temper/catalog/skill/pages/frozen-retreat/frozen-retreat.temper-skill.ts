import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const frozenRetreat = {
  id: "019e6245-a68c-7bd9-adbc-83621d043590",
  type: "page-type/temper-skill",
  slug: "frozen-retreat",
  title: "Frozen Retreat",
  key: "frozen-retreat",
  baseName: "Frozen Gate",
  description:
    "Summon an ancient portal, which arms after 1.5 seconds.\n\nWhen triggered the enemy is teleported to you if within range, immobilized for 3 seconds, and dealt 1799 Frost Damage.\n\nAn ally in the portal can activate the Icy Escape synergy, teleporting them to you and granting them Major Expedition, increasing their Movement Speed by 30% for 8 seconds.\n\nYou can have up to 3 Frozen Retreats active at a time.",
  icon: "/esoui/art/icons/ability_warden_005_b.dds",
  esoSkillId: 86186,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 549,
  createdAt: "2026-05-26T03:13:12.332Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 15 seconds (Constant)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 0.0800509 MaxStat + 0.840607 MaxPower - 2.57197 (Ultimate, ratio = 10.50, Dmg, Frost, SingleTarget, Direct, Melee, R2 = 0.999999)",
    "<<4>> = Icy Escape (Constant)",
    "<<5>> = Major Expedition (Constant)",
    "<<6>> = 8 seconds (Constant)",
    "<<7>> = 3 Frozen (Constant)",
    "<<8>> = Retreat (Constant)",
  ],
} as const satisfies TemperSkill
