import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const volcanicRune40470 = {
  id: "019e6f53-a9cd-7109-b5aa-0a7a7e4b7664",
  type: "page-type/temper-skill",
  slug: "volcanic-rune-40470",
  title: "Volcanic Rune",
  key: "volcanic-rune-40470",
  baseName: "Fire Rune",
  description:
    "Inscribe a rune of cosmic fire on the earth, which takes |cffffff2|r seconds to arm and lasts for |cffffff20|r seconds.\n\nWhen triggered, the rune blasts all enemies in the target area for |cffffff8533|r Flame Damage, knocks them into the air, and stuns them for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_001_a.dds",
  esoSkillId: 40470,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1603,
  createdAt: "2026-05-28T16:03:34.477Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 0.10323 MaxStat + 1.08494 MaxPower - 0.77399 (Ultimate, ratio = 10.51, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
