import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const deepSlash38268 = {
  id: "019e6f53-a0aa-7710-9bde-ca4242893c42",
  type: "page-type/temper-skill",
  slug: "deep-slash-38268",
  title: "Deep Slash",
  key: "deep-slash-38268",
  baseName: "Low Slash",
  description:
    "Surprise an enemy with a sweeping lunge, dealing |cffffff6611|r Physical Damage to them and other nearby enemies, afflicting them with Minor Maim, reducing their damage done by |cffffff5|r% for |cffffff15|r seconds.\n\nEnemies hit also have their Movement Speed reduced by |cffffff30|r% for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_1handed_001_b.dds",
  esoSkillId: 38268,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 342,
  createdAt: "2026-05-28T16:03:32.138Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 15 seconds (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
