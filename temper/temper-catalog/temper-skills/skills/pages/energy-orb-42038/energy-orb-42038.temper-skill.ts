import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const energyOrb42038 = {
  id: "019e6f53-a18a-7edf-a3fa-f5636b423844",
  pageTypeSlug: "temper-skill",
  slug: "energy-orb-42038",
  title: "Energy Orb",
  key: "energy-orb-42038",
  baseName: "Necrotic Orb",
  description:
    '"Project a globe of regeneration that slowly floats forward, healing for |cffffff1542|r Health every |cffffff1|r second to you and nearby allies.\\n\\nAn ally near the globe can activate the Healing Combustion synergy, causing the orb to explode and heal for |cffffff7073|r Health to nearby allies and restoring |cffffff3960|r Magicka or Stamina to the activator, whichever maximum is higher."',
  icon: "/esoui/art/icons/ability_undaunted_004b.dds",
  esoSkillId: 42038,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 5,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
