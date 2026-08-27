export type SkillScalingStat =
  | "weapon-power"
  | "max-health"
  | "higher-resource"
  | "max-magicka"
  | "max-stamina"

export type SkillValueFormula =
  | {
      type: "stat-scaling"
      stat: SkillScalingStat
      coefficient: number
      scalingFactor?: number
    }
  | {
      type: "stat-percent"
      stat: SkillScalingStat
      percent: number
    }
  | {
      type: "fixed"
      value: number
    }
