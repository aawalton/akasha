import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const concealedWeapon25267 = {
  id: "019e6f53-a00c-7e9e-b9d9-2da77ff44993",
  type: "page-type/temper-skill",
  slug: "concealed-weapon-25267",
  title: "Concealed Weapon",
  key: "concealed-weapon-25267",
  baseName: "Veiled Strike",
  description:
    "Slash an enemy, dealing |cffffff8885|r Magic Damage. \n\nIf you strike an enemy from their flank you set them Off Balance.\n\nWhen you leave Sneak or invisibility while in combat, increase your damage done with this ability by |cffffff10|r% for |cffffff15|r seconds.\n\nWhile slotted on either bar, you gain Minor Expedition, increasing your Movement Speed by |cffffff15|r%.",
  icon: "/esoui/art/icons/ability_nightblade_002_b.dds",
  esoSkillId: 25267,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 234,
  createdAt: "2026-05-28T16:03:31.980Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = 0.11361261 MaxStat + 1.1929324 MaxPower (Ultimate, Dmg, Magic, SingleTarget, Direct, Melee)",
    "<<2>> = 10% (Constant)",
    "<<3>> = 15 seconds (Constant)",
    "<<4>> = Minor Expedition (Constant)",
    "<<5>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
