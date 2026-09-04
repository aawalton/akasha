import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const intensiveMender118840 = {
  id: "019e6f53-a385-777a-bbbc-d8686ec03e7a",
  pageTypeSlug: "temper-skill",
  slug: "intensive-mender-118840",
  title: "Intensive Mender",
  key: "intensive-mender-118840",
  baseName: "Spirit Mender",
  description:
    '"Conjure a ghostly spirit to do your bidding and stay by your side for |cffffff8|r seconds. The spirit heals you or lowest Health ally around you every |cffffff2|r seconds, restoring |cffffff4527|r Health to the target and |cffffff2|r allies nearby them.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_015_b.dds",
  esoSkillId: 118840,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
