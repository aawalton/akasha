import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hircineSBounty = {
  id: "019e6f53-a31b-7fe9-94e1-e94e6a0ef8e6",
  pageTypeSlug: "temper-skill",
  slug: "hircine-s-bounty",
  title: "Hircine's Bounty",
  key: "hircine-s-bounty",
  baseName: "Hircine's Bounty",
  description:
    '"Invoke the Huntsman\'s blessing, healing you for |cffffff6528|r Health, scaling off your Max Health. You also restore |cffffff10|r% Stamina, increasing by up to |cffffff100|r% based on how high your current Health is. \\nCurrent Restore: |cffffff4882|r\\n\\nWhile slotted you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%."',
  icon: "/esoui/art/icons/ability_werewolf_004_a.dds",
  esoSkillId: 58310,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
