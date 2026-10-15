import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const enchantedForest85804 = {
  id: "019e6f53-a15c-7bdb-9dc6-82a89923c277",
  type: "page-type/temper-skill",
  slug: "enchanted-forest-85804",
  title: "Enchanted Forest",
  key: "enchanted-forest-85804",
  baseName: "Secluded Grove",
  description:
    "Swell a healing forest at the target location, instantly healing the most injured friendly target for |cffffff9057|r Health. The forest continues to heal you and your allies in the area for |cffffff3017|r Health every |cffffff1|r second for |cffffff6|r seconds.\n\nYou generate |cffffff20|r Ultimate if the initial heal is used on a friendly target under |cffffff50|r% Health.",
  icon: "/esoui/art/icons/ability_warden_012_a.dds",
  esoSkillId: 85804,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 427,
  createdAt: "2026-05-28T16:03:32.316Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12396 MaxStat + 1.30158 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.04132 MaxStat + 0.43386 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 6 seconds (Constant)",
    "<<5>> = 20 (Constant)",
  ],
} as const satisfies TemperSkill
