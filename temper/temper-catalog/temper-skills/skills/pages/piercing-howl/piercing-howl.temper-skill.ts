import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const piercingHowl = {
  id: "019e6f53-a505-7829-a7d7-640a4c94fdff",
  pageTypeSlug: "temper-skill",
  slug: "piercing-howl",
  title: "Gnash",
  key: "piercing-howl",
  baseName: "Gnash",
  description:
    '"Bare your fangs and gnash your teeth into an enemy while ripping back, dealing |cffffff4084|r Physical Damage on the initial lunge and |cffffff4084|r Bleed Damage while ripping out. \\n\\nConsumes a stack of Blood Hunger to increase the initial damage done by |cffffff25|r%. \\n\\nThe second hit deals up to |cffffff125|r% more damage to enemies with less than |cffffff25|r% Health."',
  icon: "/esoui/art/icons/ability_werewolf_002_rend.dds",
  esoSkillId: 58405,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
