import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const howlOfAgony58798 = {
  id: "019e6f53-a328-7b8a-bb3d-25a9962ddcb3",
  pageTypeSlug: "temper-skill",
  slug: "howl-of-agony-58798",
  title: "Bloody Gnash",
  key: "howl-of-agony-58798",
  baseName: "Gnash",
  description:
    '"Bare your fangs and gnash your teeth into an enemy while ripping back, dealing |cffffff4085|r Physical Damage on the initial lunge and |cffffff4174|r Bleed Damage while ripping out. \\n\\nConsumes a stack of Blood Hunger to increase the initial damage done by |cffffff25|r%. There is a |cffffff50|r% chance to retain Blood Hunger each cast.\\n\\nThe second hit deals up to |cffffff200|r% more damage to enemies with less than |cffffff25|r% Health and applies the Hemorrhaging status effect."',
  icon: "/esoui/art/icons/ability_werewolf_002_rend_b.dds",
  esoSkillId: 58798,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
