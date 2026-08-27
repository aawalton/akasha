interface SlideAnimation {
  SetStartOffsetX(startX: number): void
  SetStartOffsetY(startY: number): void
  SetEndOffsetX(endX: number): void
  SetEndOffsetY(endY: number): void
  SetAlphaValues(startAlpha: number, endAlpha: number): void
  SetDuration(durationMs: number): void
}

interface SlideTimeline {
  InsertAnimation(
    animationType: number,
    animatedControl: Control,
    offsetMs?: number
  ): SlideAnimation
  PlayFromStart(offsetMs?: number): void
}

declare const ANIMATION_MANAGER: {
  CreateTimeline(): SlideTimeline
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
  CreateControl(name: string, controlType: CtLabel): LabelControl
  c?: LabelControl
}

declare const TemperCrafting_QuestFrame: Control & {
  CreateControl(name: string, controlType: CtControl): InspirationContainer
}

declare const TemperCrafting_Alarm: {
  AddMessage(text: string, r: number, g: number, b: number, a: number): void
}

interface ObjectPool<T> {
  ReleaseObject(key: number): void
}
