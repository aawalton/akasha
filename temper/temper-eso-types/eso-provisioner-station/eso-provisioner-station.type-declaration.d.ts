interface SlideAnimation {
  SetStartOffsetX: (startX: number) => undefined
  SetStartOffsetY: (startY: number) => undefined
  SetEndOffsetX: (endX: number) => undefined
  SetEndOffsetY: (endY: number) => undefined
  SetAlphaValues: (startAlpha: number, endAlpha: number) => undefined
  SetDuration: (durationMs: number) => undefined
}

interface SlideTimeline {
  InsertAnimation: (
    animationType: number,
    animatedControl: Control,
    offsetMs?: number
  ) => SlideAnimation
  PlayFromStart: (offsetMs?: number) => undefined
}

declare const ZONE_STORIES_MANAGER: {
  GetActivityCompletionProgressValues: (
    this: void,
    zoneId: number,
    completionType: number
  ) => LuaMultiReturn<[numCompletedActivities: number, totalActivities: number]>
}

declare function ZO_Provisioner_IsSceneShowing(): boolean

declare const ZO_ProvisionerTopLevelTooltip: Control

declare const ZO_ProvisionerTopLevel: Control

declare const ZO_ProvisionerTopLevelDetailsDivider: Control

declare const ZO_ProvisionerTopLevelDetails: Control

interface InspirationContainer extends Control {
  CreateControl: <T extends Control = LabelControl>(name: string, controlType: number) => T
  c?: LabelControl
}
