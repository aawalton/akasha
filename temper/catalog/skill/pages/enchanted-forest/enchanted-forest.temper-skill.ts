import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const enchantedForest = {
  id: "019e6245-a664-7dd5-bf55-e3be415974f5",
  type: "page-type/temper-skill",
  slug: "enchanted-forest",
  title: "Enchanted Forest",
  key: "enchanted-forest",
  baseName: "Secluded Grove",
  description:
    "Swell a healing forest at the target location, instantly healing the most injured friendly target for 2880 Health. The forest continues to heal you and your allies in the area for 958 Health every 1 second for 6 seconds.\n\nYou generate 20 Ultimate if the initial heal is used on a friendly target under 50% Health.",
  icon: "/esoui/art/icons/ability_warden_012_a.dds",
  esoSkillId: 93971,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 426,
  createdAt: "2026-05-26T03:13:12.292Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12805068 MaxStat + 1.34453214 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.04268356 MaxStat + 0.44817738 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 6 seconds (Constant)",
    "<<5>> = 20 (Constant)",
  ],
} as const satisfies TemperSkill
