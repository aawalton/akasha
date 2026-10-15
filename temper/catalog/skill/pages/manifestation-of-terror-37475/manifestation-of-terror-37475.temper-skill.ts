import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const manifestationOfTerror37475 = {
  id: "019e6f53-a453-7ede-b012-277e01cd4d0a",
  type: "page-type/temper-skill",
  slug: "manifestation-of-terror-37475",
  title: "Manifestation of Terror",
  key: "manifestation-of-terror-37475",
  baseName: "Aspect of Terror",
  description:
    "Conceal a sinister trap at the target location, which takes |cffffff2|r seconds to arm and lasts for |cffffff20|r seconds.\n\nWhen the trap is triggered, up to |cffffff6|r enemies in the area become terrified, causing them to cower in fear for |cffffff2|r seconds and be afflicted with Major Cowardice for |cffffff10|r seconds, reducing their Weapon and Spell Damage by |cffffff430|r.",
  icon: "/esoui/art/icons/ability_nightblade_016_b.dds",
  esoSkillId: 37475,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 800,
  createdAt: "2026-05-28T16:03:33.075Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = Major Cowardice (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 430 (Constant)",
  ],
} as const satisfies TemperSkill
