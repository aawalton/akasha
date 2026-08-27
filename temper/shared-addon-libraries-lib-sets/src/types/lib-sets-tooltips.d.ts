interface LibSetsLib {
  GetDropMechanicTexture: (this: void, dropMechanicId: number | undefined) => string | undefined
  IsLibSetsCustomTooltipEnabled: (this: void, value?: string) => boolean
  IsLibSetsTooltipEnabled: (this: void) => void
  ShowSettingsMenu: (this: void, panelToShow?: unknown) => void
  HookTooltipControls: (
    this: void,
    onlyAddonAdded?: boolean,
    customAddonTooltipCtrl?: unknown
  ) => void
  loadTooltipHooks: (this: void, wasInputModeChanged?: boolean) => void

  LAMsettingsPanel?: unknown

  GetZoneName: (this: void, zoneId: number | undefined, lang?: string) => string | undefined
  GetDLCName: (this: void, dlcId: number | undefined, lang?: string) => string | undefined
  GetDungeonZoneIdParentZoneId: (this: void, zoneId: number | undefined) => number | undefined
  GetPublicDungeonZoneIdParentZoneId: (this: void, zoneId: number | undefined) => number | undefined
  addUIButtons?: (this: void) => void
  addSetCollectionsSearchItemLinkContextMenuEntry?: (this: void) => void
  LCM?: unknown
}
