import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const remoteTotem118380 = {
  id: "019e6f53-a5f0-74f1-ad91-39c618007891",
  type: "page-type/temper-skill",
  slug: "remote-totem-118380",
  title: "Remote Totem",
  key: "remote-totem-118380",
  baseName: "Bone Totem",
  description:
    "Summon an effigy of bone for |cffffff11|r seconds that grants Minor Protection to you and your allies, reducing damage taken by |cffffff5|r%. Enemies in the area are afflicted with Major Cowardice, reducing their Weapon and Spell Damage by |cffffff430|r.\n\nAfter |cffffff2|r seconds, the totem begins fearing nearby enemies every |cffffff2|r seconds, causing them to cower in place for |cffffff4|r seconds.",
  icon: "/esoui/art/icons/ability_necromancer_010_a.dds",
  esoSkillId: 118380,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 1019,
  createdAt: "2026-05-28T16:03:33.488Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 11 seconds (Constant)",
    "<<2>> = 5% (Constant)",
    "<<3>> = Major Cowardice (Constant)",
    "<<4>> = 430 (Constant)",
    "<<5>> = 2 seconds (Constant)",
    "<<6>> = 2 seconds (Constant)",
    "<<7>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
