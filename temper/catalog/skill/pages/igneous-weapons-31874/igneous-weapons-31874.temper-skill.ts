import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const igneousWeapons31874 = {
  id: "019e6f53-a34c-741f-b5fb-63946e05c833",
  type: "page-type/temper-skill",
  slug: "igneous-weapons-31874",
  title: "Igneous Weapons",
  key: "igneous-weapons-31874",
  baseName: "Molten Weapons",
  description:
    "Charge you and your grouped allies' weapons with volcanic power to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff1|r minute.\n\nWhile active, dealing damage with Light and Heavy Attacks causes an additional |cffffff1562|r Flame Damage, up to once every |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_015_a.dds",
  esoSkillId: 31874,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/active",
  hashPlace: 657,
  createdAt: "2026-05-28T16:03:32.812Z",
  updatedAt: "2026-10-21T04:42:51.153Z",
  equations: [
    "<<1>> = Major Brutality (Constant)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 1 minute (Constant)",
    "<<4>> = 0.0199778 MaxStat + 0.210472 MaxPower - 1.95606 (Ultimate, ratio = 10.54, Dmg, Flame, SingleTarget, Direct, Melee, R2 = 0.999993)",
    "<<5>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
