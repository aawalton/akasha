import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const moltenArmaments31888 = {
  id: "019e6f53-a491-7821-abc6-58347e96eeb2",
  type: "page-type/temper-skill",
  slug: "molten-armaments-31888",
  title: "Molten Armaments",
  key: "molten-armaments-31888",
  baseName: "Molten Weapons",
  description:
    "Charge you and your grouped allies' weapons with volcanic power to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff30|r seconds.\n\nWhile active, dealing damage with Light and Heavy Attacks causes an additional |cffffff1562|r Flame Damage, up to once every |cffffff1.5|r seconds.\n\nYou also gain Empower for the duration, increasing the damage of your Heavy Attacks against monsters by |cffffff70|r%.",
  icon: "/esoui/art/icons/ability_dragonknight_015_b.dds",
  esoSkillId: 31888,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/dragonknight-earthen-heart",
  skillType: "temper-skill-type/active",
  hashPlace: 833,
  createdAt: "2026-05-28T16:03:33.137Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = Major Brutality (Constant)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 30 seconds (Constant)",
    "<<4>> = 0.019985657 MaxStat + 0.2098494 MaxPower (Ultimate, Dmg, Flame, SingleTarget, Direct, Melee)",
    "<<5>> = 1.5 seconds (Constant)",
    "<<6>> = Empower (Constant)",
    "<<7>> = 150% (Constant)",
  ],
} as const satisfies TemperSkill
