import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runeCage = {
  id: "019e6245-a717-7510-985f-d25e2cee8631",
  type: "page-type/temper-skill",
  slug: "rune-cage",
  title: "Rune Cage",
  key: "rune-cage",
  baseName: "Rune Prison",
  description:
    "Imprison an enemy in a constricting sphere of dark magic. After a short duration they are stunned for 3 seconds. Deals 1799 Magic Damage if the stun lasts the full duration.\n\nThis stun cannot be blocked.",
  icon: "/esoui/art/icons/ability_sorcerer_dark_haze.dds",
  esoSkillId: 30177,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 1093,
  createdAt: "2026-05-26T03:13:12.471Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 seconds (Constant)",
    "<<2>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
