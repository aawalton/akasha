import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const skeletalArcanist = {
  id: "019e6245-a733-78e7-9960-288212aa88bf",
  type: "page-type/temper-skill",
  slug: "skeletal-arcanist",
  title: "Skeletal Arcanist",
  key: "skeletal-arcanist",
  baseName: "Skeletal Mage",
  description:
    "Unearth a skeletal mage from the dirt to fight by your side for 20 seconds, while granting you Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20%. The mage attacks the closest enemy every 2 seconds, dealing 478 Shock Damage to them and all other enemies nearby.\n\nCreates a corpse on death if you are in combat.",
  icon: "/esoui/art/icons/ability_necromancer_003_b.dds",
  esoSkillId: 40118726,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 1198,
  createdAt: "2026-05-26T03:13:12.499Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = Major Brutality (Constant)",
    "<<3>> = 20% (Constant)",
    "<<4>> = 0.02134178 MaxStat + 0.22408869 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Shock, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
