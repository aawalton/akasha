import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blightedBlastbones117690 = {
  id: "019e6f53-9f3a-729b-b8e0-3d00138a95d9",
  pageTypeSlug: "temper-skill",
  slug: "blighted-blastbones-117690",
  title: "Blighted Blastbones",
  key: "blighted-blastbones-117690",
  baseName: "Sacrificial Bones",
  description:
    '"Summon a decaying skeleton from the ground after |cffffff2.5|r seconds. The skeleton runs after the target and explodes when it gets close to them, dealing |cffffff13224|r Disease Damage to all enemies nearby and applying the Diseased status effect and Major Defile to them for |cffffff4|r seconds, reducing their healing received and damage shield strength by |cffffff12|r%.\\n\\nCreates a corpse on death."',
  icon: "/esoui/art/icons/ability_necromancer_002_a.dds",
  esoSkillId: 117690,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
