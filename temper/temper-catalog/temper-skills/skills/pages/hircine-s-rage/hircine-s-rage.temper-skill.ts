import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hircineSRage = {
  id: "019e6f53-a31e-7943-b325-f5b99564edc8",
  pageTypeSlug: "temper-skill",
  slug: "hircine-s-rage",
  title: "Hircine's Rage",
  key: "hircine-s-rage",
  baseName: "Hircine's Bounty",
  description:
    '"Invoke the Huntsman\'s blessing, healing you for |cffffff9313|r Health, granting double Fury, and increasing your damage done and taken by up to |cffffff12|r% for |cffffff20|r seconds, based on how high your current Health is. \\nCurrent Bonus: |cffffff12|r%\\n\\nYou also restore |cffffff10|r% Stamina, increasing by up to |cffffff100|r%, based on how high your current Health is. \\nCurrent Restore: |cffffff4882|r\\n\\nWhile slotted you gain Major Brutality and Sorcery and Minor Berserk."',
  icon: "/esoui/art/icons/ability_werewolf_004_b.dds",
  esoSkillId: 58317,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
