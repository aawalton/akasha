import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const remoteTotem118380 = {
  id: "019e6f53-a5f0-74f1-ad91-39c618007891",
  pageTypeSlug: "temper-skill",
  slug: "remote-totem-118380",
  title: "Remote Totem",
  key: "remote-totem-118380",
  baseName: "Bone Totem",
  description:
    '"Summon an effigy of bone for |cffffff11|r seconds that grants Minor Protection to you and your allies, reducing damage taken by |cffffff5|r%. Enemies in the area are afflicted with Major Cowardice, reducing their Weapon and Spell Damage by |cffffff430|r.\\n\\nAfter |cffffff2|r seconds, the totem begins fearing nearby enemies every |cffffff2|r seconds, causing them to cower in place for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_010_a.dds",
  esoSkillId: 118380,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
