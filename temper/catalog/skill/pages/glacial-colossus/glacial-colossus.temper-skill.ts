import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const glacialColossus = {
  id: "019e6245-a691-7c97-9185-0450381e6db0",
  type: "page-type/temper-skill",
  slug: "glacial-colossus",
  title: "Glacial Colossus",
  key: "glacial-colossus",
  baseName: "Frozen Colossus",
  description:
    "Unleash a frostbitten Flesh Colossus to pulverize enemies in the area. The Colossus smashes the ground three times over 3 seconds, dealing 3098 Frost Damage with each smash. The final smash stuns all enemies hit for 4 seconds.\n\nDealing damage applies Major Vulnerability to any enemy hit for 17 seconds, increasing their damage taken by 10%.",
  icon: "/esoui/art/icons/ability_necromancer_006_a.dds",
  esoSkillId: 40122388,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 565,
  createdAt: "2026-05-26T03:13:12.337Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.154901 MaxStat + 1.62725 MaxPower - 1.10979 (Ultimate, ratio = 10.51, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 17 seconds (Constant)",
    "<<5>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
