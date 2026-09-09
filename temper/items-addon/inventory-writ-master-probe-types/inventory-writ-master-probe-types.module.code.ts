export interface MasterWritProbeCondition {
  conditionIndex: number
  condText: string
  current: number
  max: number
  complete: boolean
  masterItemId?: number
  materialItemId?: number
  craftingType?: number
  quality?: number
  templateId?: number
  setId?: number
  traitType?: number
  styleId?: number
  encodedAlchemyTraits?: number
}

export interface MasterWritProbeStep {
  stepIndex: number
  ending: boolean
  numConditions: number
  conditions: MasterWritProbeCondition[]
}

export interface MasterWritProbeQuest {
  questIndex: number
  name: string
  repeatType: number
  questType: number
  numSteps: number
  activeStepText: string
  steps: MasterWritProbeStep[]
}

export interface MasterWritProbe {
  timestamp: number
  quests: MasterWritProbeQuest[]
}
