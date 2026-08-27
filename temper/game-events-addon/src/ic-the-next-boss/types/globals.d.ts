declare const SI_ICTHENEXTBOSS_AMONCRUL: number
declare const SI_ICTHENEXTBOSS_THIRSK: number
declare const SI_ICTHENEXTBOSS_GLORGOLOCH: number
declare const SI_ICTHENEXTBOSS_CHARR: number
declare const SI_ICTHENEXTBOSS_KHROGO: number
declare const SI_ICTHENEXTBOSS_MALYGDA: number
declare const SI_ICTHENEXTBOSS_MAZALUHAD: number
declare const SI_ICTHENEXTBOSS_NUNATAK: number
declare const SI_ICTHENEXTBOSS_MATRON: number
declare const SI_ICTHENEXTBOSS_VOLGHASS: number
declare const SI_ICTHENEXTBOSS_YSENDA: number
declare const SI_ICTHENEXTBOSS_ZOAL: number
declare const SI_ICTHENEXTBOSS_MOLAG: number
declare const SI_ICTHENEXTBOSS_NOBLESDISTRICT: number
declare const SI_ICTHENEXTBOSS_ARENADISTRICT: number
declare const SI_ICTHENEXTBOSS_TEMPLEDISTRICT: number
declare const SI_ICTHENEXTBOSS_ARBORETUMDISTRICT: number
declare const SI_ICTHENEXTBOSS_MEMORIALDISTRICT: number
declare const SI_ICTHENEXTBOSS_ELVENGARDENSDISTRICT: number
declare const SI_ICTHENEXTBOSS_CAN: number
declare const SI_ICTHENEXTBOSS_GUI_WIDTH: number
declare const SI_ICTHENEXTBOSS_OPTION_DESCRIPTION: number
declare const SI_ICTHENEXTBOSS_OPTION_TIMETABLE: number
declare const SI_ICTHENEXTBOSS_OPTION_MAPTIMERS: number
declare const SI_ICTHENEXTBOSS_OPTION_MAPTIMERS_TOOLTIP: number
declare const SI_ICTHENEXTBOSS_OPTION_EVENT_TIMERS: number
declare const SI_ICTHENEXTBOSS_OPTION_RUN_DIRECTION: number

declare const ICTTimeTable: TopLevelWindow
declare const ICTMapTimers: TopLevelWindow
declare const ICTDistricLabel: LabelControl
declare const ICTTimerLabel: LabelControl
declare const ICTMemorialDistrictLabel: LabelControl
declare const ICTArenaDistrictLabel: LabelControl
declare const ICTArboretumDistrictLabel: LabelControl
declare const ICTTempleDistrictLabel: LabelControl
declare const ICTNoblesDistrictLabel: LabelControl
declare const ICTElvenGardensDistrictLabel: LabelControl
declare const ICTCanLabel: LabelControl

declare const ZO_WorldMapZoomSliderButton1: ButtonControl
declare const ZO_WorldMapZoomSliderButton2: ButtonControl
declare const ZO_WorldMapZoomSliderButton3: ButtonControl
declare const ZO_WorldMapZoomSliderButton4: ButtonControl
declare const ZO_WorldMapZoomSliderButton5: ButtonControl
declare const ZO_WorldMapZoomSliderButton6: ButtonControl
declare const ZO_WorldMapZoomSliderButton7: ButtonControl
declare const ZO_WorldMapZoomSliderButton8: ButtonControl
declare const ZO_WorldMapZoomSliderButton9: ButtonControl
declare const ZO_WorldMapZoomSliderButton10: ButtonControl
declare const ZO_WorldMapZoomSliderButton11: ButtonControl
declare const ZO_WorldMapZoomMinus: ButtonControl
declare const ZO_WorldMapZoomPlus: ButtonControl
declare function ZO_WorldMapZoom_OnMouseWheel(delta: number, arg2: unknown, force: boolean): void

interface IctLinkHandler {
  readonly LINK_MOUSE_UP_EVENT: number
  readonly LINK_CLICKED_EVENT: number
  RegisterCallback(
    event: number,
    callback: (
      this: void,
      rawLink: string,
      mouseButton: number,
      linkText: string,
      linkStyle: number,
      linkType: string,
      data: string
    ) => boolean | undefined
  ): void
}
declare const LINK_HANDLER: IctLinkHandler

interface IctNumericFieldOptions {
  minValue: number
  maxValue: number
}
interface IctBroadcastField {
  readonly __brand: "LibGroupBroadcastField"
}
interface IctBroadcastProtocol {
  AddField(field: IctBroadcastField): void
  OnData(callback: (this: void, bossId: number) => void): void
  Finalize(options: { isRelevantInCombat: boolean; replaceQueuedMessages: boolean }): boolean
  Send(payload: { bossId: number }): void
}
interface IctBroadcastHandler {
  SetDisplayName(name: string): void
  SetDescription(description: string): void
  DeclareProtocol(id: number, name: string): IctBroadcastProtocol
}
interface IctLibGroupBroadcast {
  RegisterHandler(name: string): IctBroadcastHandler
  CreateNumericField(name: string, options: IctNumericFieldOptions): IctBroadcastField
}
declare const LibGroupBroadcast: IctLibGroupBroadcast | undefined

interface ChatTextEntry {
  Open(text?: string): void
}
