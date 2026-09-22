import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lightsChampion = {
  id: "019e6226-00ff-706b-9dcf-76cf72928ee9",
  type: "page-type/temper-skill",
  slug: "lights-champion",
  title: "Light's Champion",
  key: "lights-champion",
  baseName: "Panacea",
  description:
    '"Release the rejuvenating energies of your staff to swirl around you, healing you or a nearby ally for 2904 Health every 1 second for 5 seconds.\\n\\nAny friendly target you heal gains Major Force for 8 seconds, increasing their Critical Damage by 20%."',
  icon: "/esoui/art/icons/ability_restorationstaff_006_b.dds",
  esoSkillId: 86475,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/ultimate",
} as const satisfies TemperSkill
