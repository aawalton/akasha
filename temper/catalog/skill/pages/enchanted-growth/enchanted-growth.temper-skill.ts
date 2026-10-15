import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const enchantedGrowth = {
  id: "019e6245-a666-73fd-b18d-ff5a9d3618d9",
  type: "page-type/temper-skill",
  slug: "enchanted-growth",
  title: "Enchanted Growth",
  key: "enchanted-growth",
  baseName: "Fungal Growth",
  description:
    "Seed a large area of mushrooms in front of you, healing you and your allies for 2700 Health. \n\nAny target healed gains Minor Intellect and Minor Endurance, increasing their Magicka and Stamina Recovery by 15% for 20 seconds.",
  icon: "/esoui/art/icons/ability_warden_008_b.dds",
  esoSkillId: 93774,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 428,
  createdAt: "2026-05-26T03:13:12.294Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.120048029 MaxStat + 1.26049759 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 15% (Constant)",
    "<<3>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
