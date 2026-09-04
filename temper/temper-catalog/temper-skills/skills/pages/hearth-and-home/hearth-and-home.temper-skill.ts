import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hearthAndHome = {
  id: "019e6f53-a2fb-7e01-8bb3-219634fd59a5",
  pageTypeSlug: "temper-skill",
  slug: "hearth-and-home",
  title: "Hearth and Home",
  key: "hearth-and-home",
  baseName: "Hearthfire",
  description:
    '"Throw out a protective flame for |cffffff15|r seconds, healing you and allies inside for |cffffff778|r Health every |cffffff1|r second, scaling off your Max Health.\\n\\nHealed targets gain Minor Fortitude and Minor Heroism while inside, increasing Health Recovery by |cffffff15|r% and generating |cffffff1|r Ultimate every |cffffff1.5|r seconds. You gain Major Protection while inside, reducing damage taken by |cffffff10|r%.\\n\\nEnemies inside have their Movement Speed reduced by |cffffff70|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_016b.dds",
  esoSkillId: 32710,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
