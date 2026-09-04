import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const honorTheDead22253 = {
  id: "019e6f53-a325-773f-97b5-7bc9a041e3cf",
  pageTypeSlug: "temper-skill",
  slug: "honor-the-dead-22253",
  title: "Honor the Dead",
  key: "honor-the-dead-22253",
  baseName: "Rushed Ceremony",
  description:
    '"Beacon your inner light, healing yourself or a wounded ally in front of you for |cffffff10960|r Health. \\n\\nHealing anyone who is below |cffffff75|r% Health restores |cffffff18|r% of the ability\'s cost every |cffffff2|r seconds over |cffffff6|r seconds as Magicka."',
  icon: "/esoui/art/icons/ability_templar_honor_the_dead.dds",
  esoSkillId: 22253,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
