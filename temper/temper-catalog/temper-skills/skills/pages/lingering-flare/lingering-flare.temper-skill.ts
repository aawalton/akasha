import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lingeringFlare = {
  id: "019e6251-4cce-7085-8eff-321285c698da",
  pageTypeSlug: "temper-skill",
  slug: "lingering-flare",
  title: "Lingering Flare",
  key: "lingering-flare",
  baseName: "Revealing Flare",
  description:
    '"Launch a blinding flare, revealing stealthed and invisible enemies in the target area for 10 seconds. Exposed enemies cannot return to stealth or invisibility for 4 seconds.\\n\\nWhile slotted you gain Major Protection, reducing your damage taken by 10%."',
  icon: "/esoui/art/icons/ability_ava_lingering_flare.dds",
  esoSkillId: 63391,
  isMorph: true,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
  effects: "jsonl",
} as const satisfies TemperSkill
