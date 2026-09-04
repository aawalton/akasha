import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const swarmingScion38932 = {
  id: "019e6f53-a806-79d7-a6c6-bc8f46ebe548",
  pageTypeSlug: "temper-skill",
  slug: "swarming-scion-38932",
  title: "Swarming Scion",
  key: "swarming-scion-38932",
  baseName: "Blood Scion",
  description:
    '"Transform into a monstrous creature of the night, instantly healing to full Health.\\n\\nWhile transformed, your Max Health, Magicka, and Stamina are increased by |cffffff10000|r, you heal for |cffffff15|r% of all damage you deal, and you can see enemies through walls. \\n\\nBats also swarm around you and shred enemies that come close, dealing |cffffff3028|r Magic Damage every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_u26_vampire_06_a.dds",
  esoSkillId: 38932,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 5,
  skillLineId: "world-vampire",
  skillType: "ultimate",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
