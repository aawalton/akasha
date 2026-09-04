import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const heavyWeapons = {
  id: "019e6226-00fa-71c2-b576-93bed9fe5ad1",
  pageTypeSlug: "temper-skill",
  slug: "heavy-weapons",
  title: "Heavy Weapons",
  key: "heavy-weapons",
  baseName: "Heavy Weapons",
  description:
    '"Grants a bonus based on the type of weapon equipped:\\n\\nSwords increase your Weapon and Spell Damage by 258.\\n\\nAxes increase your Critical Damage done by 12%.\\n\\nMaces increase your Offensive Penetration by 2974."',
  icon: "/esoui/art/icons/passive_dragonknight_026.dds",
  esoSkillId: 45430,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-two-handed",
  skillType: "passive",
  subcategoryId: "weapon-two-handed",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
