import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const arcticBlast = {
  id: "019e6245-a5ed-70d1-9ff4-0e2fa36de829",
  pageTypeSlug: "temper-skill",
  slug: "arctic-blast",
  title: "Arctic Blast",
  key: "arctic-blast",
  baseName: "Arctic Wind",
  description:
    '"Envelop yourself in winter winds, instantly dealing 1799 Frost Damage to nearby enemies. If no enemies are hit, you heal for 2323 Health.\\n\\nThe winds persist for 20 seconds and chill your foes to the bone, dealing 298 Frost Damage every 2 seconds, after 2 seconds. The damage has a higher chance to apply the Chilled status effect.\\n\\nStuns enemies after the delay for 3 seconds."',
  icon: "/esoui/art/icons/ability_warden_003_b.dds",
  esoSkillId: 86159,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
