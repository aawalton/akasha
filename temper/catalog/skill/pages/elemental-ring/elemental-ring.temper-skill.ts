import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elementalRing = {
  id: "019e6226-00ec-73ec-921a-633260519be7",
  type: "page-type/temper-skill",
  slug: "elemental-ring",
  title: "Elemental Ring",
  key: "elemental-ring",
  baseName: "Impulse",
  description:
    "Release a surge of elemental energy, dealing 1799 Magic Damage to enemies at the target location.\n\nFire Ring hits Burning enemies with Ring Afterburn, which deals more damage based on their missing Health.\n\nFrost Ring also provides Minor Protection.\n\nShock Ring's damage increases based on the number of enemies hit.",
  icon: "/esoui/art/icons/ability_destructionstaff_008_a.dds",
  esoSkillId: 42975,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 407,
  createdAt: "2026-05-26T02:38:38.316Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = Fire Ring (Constant)",
    "<<3>> = Ring Afterburn (Constant)",
  ],
} as const satisfies TemperSkill
