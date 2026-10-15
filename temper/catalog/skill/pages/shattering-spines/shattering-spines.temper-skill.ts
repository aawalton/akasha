import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shatteringSpines = {
  id: "019e6245-a72c-7fd5-b798-eebf800b56e3",
  type: "page-type/temper-skill",
  slug: "shattering-spines",
  title: "Shattering Spines",
  key: "shattering-spines",
  baseName: "Encase",
  description:
    "Call forth Daedric shards from the earth to encase and immobilize all enemies in front of you for 4 seconds. After the effect ends the shards shatter, dealing 1979 Magic Damage to any enemy that was encased.\n\nEnemies hit are afflicted with Major Maim, reducing their damage done by 10% for 10 seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_twister.dds",
  esoSkillId: 30095,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 1162,
  createdAt: "2026-05-26T03:13:12.492Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4 seconds (Constant)",
    "<<2>> = 0.0881345 MaxStat + 0.924222 MaxPower - 2.74021 (Ultimate, ratio = 10.49, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = Major Maim (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
