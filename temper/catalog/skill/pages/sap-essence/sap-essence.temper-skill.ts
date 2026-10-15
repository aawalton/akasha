import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const sapEssence = {
  id: "019e6245-a722-7c26-84b8-8443dc1cc304",
  type: "page-type/temper-skill",
  slug: "sap-essence",
  title: "Sap Essence",
  key: "sap-essence",
  baseName: "Drain Power",
  description:
    "Siphon the vigor from your enemies' blood, dealing 1742 Magic Damage to all nearby enemies and healing you and your allies for 599 plus 20% more for each enemy hit.\n\nIf an enemy is hit, you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20% for 30 seconds.",
  icon: "/esoui/art/icons/ability_nightblade_013_a.dds",
  esoSkillId: 37950,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1126,
  createdAt: "2026-05-26T03:13:12.482Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.026677225 MaxStat + 0.280111379 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
    "<<3>> = 20 (Constant)",
    "<<4>> = 20% (Constant)",
    "<<5>> = 30 seconds (Constant)",
  ],
} as const satisfies TemperSkill
