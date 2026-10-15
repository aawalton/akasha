import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonerSArmor = {
  id: "019e6f53-a7ef-79cc-9b2c-47348d17530e",
  type: "page-type/temper-skill",
  slug: "summoner-s-armor",
  title: "Summoner's Armor",
  key: "summoner-s-armor",
  baseName: "Bone Armor",
  description:
    "Wrap yourself in hardened bone, granting you Major Resolve and Minor Resolve for |cffffff30|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r and |cffffff2974|r.\n\nWhile active, reduce the cost of Blastbones, Skeletal Mage, and Spirit Mender by |cffffff15|r%.\n\nIf cast during combat, you can cast a corpse consuming ability on yourself. This effect can occur once every |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_necromancer_008_b.dds",
  esoSkillId: 118244,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 1301,
  createdAt: "2026-05-28T16:03:33.999Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Resolve (Constant)",
    "<<2>> = Minor Resolve (Constant)",
    "<<3>> = 30 seconds (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 2974 (Constant)",
    "<<6>> = 12% (Constant)",
    "<<7>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
