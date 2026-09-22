import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const camouflagedHunter40195 = {
  id: "019e6f53-9fb0-7b68-a9e5-da6acf2f5f9f",
  type: "page-type/temper-skill",
  slug: "camouflaged-hunter-40195",
  title: "Camouflaged Hunter",
  key: "camouflaged-hunter-40195",
  baseName: "Expert Hunter",
  description:
    '"Invoke your expertise in anatomy and enemy behavior to detect stealthed and invisible enemies around you for |cffffff5|r seconds. Exposed enemies cannot return to stealth or invisibility for |cffffff4|r seconds.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by |cffffff2629|r. You also gain Minor Berserk for |cffffff5|r seconds after dealing Critical Damage from an enemy\'s flank."',
  icon: "/esoui/art/icons/ability_fightersguild_002_b.dds",
  esoSkillId: 40195,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
