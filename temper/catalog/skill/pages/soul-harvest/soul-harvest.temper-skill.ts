import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulHarvest = {
  id: "019e6245-a739-7e88-9375-971c04c9ee52",
  type: "page-type/temper-skill",
  slug: "soul-harvest",
  title: "Soul Harvest",
  key: "soul-harvest",
  baseName: "Death Stroke",
  description:
    "Ravage an enemy with a spinning attack, dealing 3718 Magic Damage and increasing your damage against them by 20% for 8 seconds.\n\nAlso afflicts the enemy with Major Defile, reducing their healing received and damage shield strength by 12%.\n\nWhile slotted on either bar, any time you kill an enemy you gain 10 Ultimate.",
  icon: "/esoui/art/icons/ability_nightblade_007_b.dds",
  esoSkillId: 37545,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1224,
  createdAt: "2026-05-26T03:13:12.505Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.16528 MaxStat + 1.73544 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 12% (Constant)",
    "<<5>> = 10 (Constant)",
  ],
} as const satisfies TemperSkill
