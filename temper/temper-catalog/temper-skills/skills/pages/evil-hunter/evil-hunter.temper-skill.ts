import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const evilHunter = {
  id: "019e6238-c2bb-7ba6-89cf-b3005afd14ab",
  pageTypeSlug: "temper-skill",
  slug: "evil-hunter",
  title: "Evil Hunter",
  key: "evil-hunter",
  baseName: "Expert Hunter",
  description:
    '"Invoke your expertise in anatomy and enemy behavior to detect stealthed and invisible enemies around you for 5 seconds. Exposed enemies cannot return to stealth or invisibility for 4 seconds. \\n\\nWhile active, increases the damage of your Stamina costing Fighters Guild abilities by 25%.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by 2629."',
  icon: "/esoui/art/icons/ability_fightersguild_002_a.dds",
  esoSkillId: 42624,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
  effects: "jsonl",
} as const satisfies TemperSkill
