interface FcocsSkillStatusIcon {
  HasIcon: (this: FcocsSkillStatusIcon) => boolean
  ClearIcons: (this: FcocsSkillStatusIcon) => void
  AddIcon: (this: FcocsSkillStatusIcon, texture: string) => void
  SetColor: (this: FcocsSkillStatusIcon, r: number, g: number, b: number, a: number) => void
  Hide: (this: FcocsSkillStatusIcon) => void
  Show: (this: FcocsSkillStatusIcon) => void
}

interface FcocsSkillLineNodeData {
  isSubclassingNode?: boolean
  skillLineIndex?: number
  skillTypeData?: { skillType?: number }
}

interface FcocsSkillLineEntryControl extends Control {
  node?: { data?: FcocsSkillLineNodeData }
  data?: FcocsSkillLineNodeData
  enabled?: boolean
  statusIcon?: FcocsSkillStatusIcon
  SetEnabled: (this: FcocsSkillLineEntryControl, enabled: boolean) => void
}

interface FcocsSkillLinesTreeNode {
  control?: FcocsSkillLineEntryControl
  enabled?: boolean
  children?: FcocsSkillLinesTreeNode[]
}

interface KeyboardSkillsWindow {
  control: Control
  skillLinesTree?: { rootNode?: { children?: FcocsSkillLinesTreeNode[] } }
}

declare const ZO_ActionBarTimer: {
  ApplyAnchor(
    this: void,
    selfButtonTimer: unknown,
    target: Control,
    offsetY: number,
    offsetX: number
  ): void
}

declare const ActionButton: object

declare const ZO_ONE_MINUTE_IN_SECONDS: number
declare const ZO_EFFECT_EXPIRATION_IMMINENCE_THRESHOLD_S: number
declare function ZO_FormatTimeShowUnitOverThresholdShowDecimalUnderThreshold(
  this: void,
  timeS: number,
  showUnitOverThreshold: number,
  showDecimalUnderThreshold: number,
  timeFormatStyle: number
): string
