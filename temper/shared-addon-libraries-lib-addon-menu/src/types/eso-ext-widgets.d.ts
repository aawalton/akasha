interface TimelineAnimation {
  PlayFromStart(this: TimelineAnimation): void
  PlayFromEnd(this: TimelineAnimation): void
  PlayBackward(this: TimelineAnimation): void
  PlayForward(this: TimelineAnimation): void
  GetProgress(this: TimelineAnimation): number
  SetProgress(this: TimelineAnimation, progress: number): void
  IsPlaying(this: TimelineAnimation): boolean
  GetAnimation(this: TimelineAnimation, index: number): unknown
}

interface AnimationManager {
  CreateTimelineFromVirtual(
    this: AnimationManager,
    timelineName: string,
    animatedControl?: Control
  ): TimelineAnimation
}
declare const ANIMATION_MANAGER: AnimationManager

declare function ZO_Scroll_SetUseFadeGradient(scrollControl: Control, useFade: boolean): void
declare function ZO_Scroll_SetHideScrollbarOnDisable(scrollControl: Control, hide: boolean): void
declare function ZO_VerticalScrollbarBase_OnMouseExit(...args: unknown[]): void

declare const ZO_SORT_BY_NAME: Record<string, unknown>
declare const ZO_SORT_BY_NAME_NUMERIC: Record<string, unknown>

declare function ZO_PreHookHandler(
  control: Control,
  handlerName: string,
  hookFunction: (this: void, ...args: unknown[]) => unknown
): void
