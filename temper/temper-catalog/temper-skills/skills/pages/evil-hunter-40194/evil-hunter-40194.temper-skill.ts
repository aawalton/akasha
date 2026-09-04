import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const evilHunter40194 = {
  id: "019e6f53-a1ae-7c39-9e3d-ad85f72fdf55",
  pageTypeSlug: "temper-skill",
  slug: "evil-hunter-40194",
  title: "Evil Hunter",
  key: "evil-hunter-40194",
  baseName: "Expert Hunter",
  description:
    '"Invoke your expertise in anatomy and enemy behavior to detect stealthed and invisible enemies around you for |cffffff5|r seconds. Exposed enemies cannot return to stealth or invisibility for |cffffff4|r seconds. \\n\\nWhile active, increases the damage of your Stamina costing Fighters Guild abilities by |cffffff25|r%.\\n\\nWhile slotted you gain Major Savagery and Prophecy, increasing your Weapon and Spell Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_fightersguild_002_a.dds",
  esoSkillId: 40194,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
