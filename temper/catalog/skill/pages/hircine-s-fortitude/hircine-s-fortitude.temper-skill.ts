import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hircineSFortitude = {
  id: "019e6f53-a31d-73d2-845d-49c21e75b1c7",
  type: "page-type/temper-skill",
  slug: "hircine-s-fortitude",
  title: "Hircine's Fortitude",
  key: "hircine-s-fortitude",
  baseName: "Hircine's Bounty",
  description:
    "Invoke the Huntsman's blessing, healing you for |cffffff7338|r Health, scaling off your Max Health. You also restore |cffffff12|r% Stamina, increasing by up to |cffffff100|r% based on how high your current Health is. \nCurrent Restore: |cffffff5858|r\n\nWhile slotted you gain Major Brutality, Sorcery, and Vitality increasing Weapon and Spell Damage by |cffffff20|r% and healing received and damage shield strength by |cffffff12|r%.",
  icon: "/esoui/art/icons/ability_werewolf_004_c.dds",
  esoSkillId: 58325,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/world-werewolf",
  skillType: "temper-skill-type/active",
  hashPlace: 636,
  createdAt: "2026-05-28T16:03:32.765Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.356385 Health (Health, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 12% (Constant)",
    "<<3>> = 100% (Constant)",
    "<<4>> = 0.12 Stamina (Stamina, Dmg, Generic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<5>> = Major Brutality (Constant)",
    "<<6>> = 20% (Constant)",
    "<<7>> = 12% (Constant)",
  ],
} as const satisfies TemperSkill
