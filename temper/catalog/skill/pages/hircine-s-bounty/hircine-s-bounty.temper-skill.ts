import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hircineSBounty = {
  id: "019e6f53-a31b-7fe9-94e1-e94e6a0ef8e6",
  type: "page-type/temper-skill",
  slug: "hircine-s-bounty",
  title: "Hircine's Bounty",
  key: "hircine-s-bounty",
  baseName: "Hircine's Bounty",
  description:
    "Invoke the Huntsman's blessing, healing you for |cffffff6528|r Health, scaling off your Max Health. You also restore |cffffff10|r% Stamina, increasing by up to |cffffff100|r% based on how high your current Health is. \nCurrent Restore: |cffffff4882|r\n\nWhile slotted you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%.",
  icon: "/esoui/art/icons/ability_werewolf_004_a.dds",
  esoSkillId: 58310,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/world-werewolf",
  skillType: "temper-skill-type/active",
  hashPlace: 635,
  createdAt: "2026-05-28T16:03:32.763Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3 Health (Health, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 10% (Constant)",
    "<<3>> = 100% (Constant)",
    "<<4>> = 0.1 Stamina (Stamina, Dmg, Generic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<5>> = Major Brutality (Constant)",
    "<<6>> = 20% (Constant)",
  ],
} as const satisfies TemperSkill
