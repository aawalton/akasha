declare function AssignTargetMarkerToReticleTarget(targetMarkerType: number): void
declare function DoesUnitHaveResurrectPending(unitTag: string): boolean
declare function GetAchievementTimestamp(achievementId: number): number
declare function GetCurrentRaidLifeScoreBonus(): number
declare function GetCurrentRaidScore(): number
declare function GetCurrentRaidStartingReviveCounters(): number
declare function GetEndlessDungeonCounterValue(counterType: number): number
declare function GetRaidReviveCountersRemaining(): number
declare function GetUnitAttributeVisualizerEffectInfo(
  unitTag: string,
  unitAttributeVisual: number,
  statType: number,
  attributeType: number,
  powerType: number
): LuaMultiReturn<[value: number | undefined, maxValue: number | undefined]>
declare function GetUnitDifficulty(unitTag: string): number
declare function GetUnitReaction(unitTag: string): number
declare function GetUnitTargetMarkerType(unitTag: string): number
declare function GetWorldDimensionsOfViewFrustumAtDepth(
  depth: number
): LuaMultiReturn<[width: number, height: number]>
declare function GuiRender3DPositionToWorldPosition(
  x: number,
  y: number,
  z: number
): LuaMultiReturn<[worldX: number, worldY: number, worldZ: number]>
declare function WorldPositionToGuiRender3DPosition(
  worldX: number,
  worldY: number,
  worldZ: number
): LuaMultiReturn<[x: number, y: number, z: number]>
declare function IsGroupMemberInRemoteRegion(unitTag: string): boolean
declare function IsGroupMemberInSameWorldAsPlayer(unitTag: string): boolean
declare function IsPlayerInWerewolfForm(): boolean
declare function IsUnitBeingResurrected(unitTag: string): boolean
declare function IsUnitOnline(unitTag: string): boolean
declare function IsUnitPvPFlagged(unitTag: string): boolean
declare function Set3DRenderSpaceToCurrentCamera(controlName: string): void
declare function ZO_EaseOutCubic(progress: number): number
declare function ZO_StatusBar_SmoothTransition(
  statusBar: StatusBarControl,
  value: number,
  max: number,
  forceInit?: boolean,
  onStopCallback?: (this: void) => void,
  customApproachAmountMs?: number
): void
declare function zo_atan2(y: number, x: number): number
declare function zo_lerp(from: number, to: number, amount: number): number

declare const ATTRIBUTE_VISUAL_AUTOMATIC: number
declare const ATTRIBUTE_VISUAL_DECREASED_MAX_POWER: number
declare const ATTRIBUTE_VISUAL_DECREASED_REGEN_POWER: number
declare const ATTRIBUTE_VISUAL_DECREASED_STAT: number
declare const ATTRIBUTE_VISUAL_FORCE_INCREASED_POWER_STAT_VISUAL: number
declare const ATTRIBUTE_VISUAL_INCREASED_MAX_POWER: number
declare const ATTRIBUTE_VISUAL_INCREASED_REGEN_POWER: number
declare const ATTRIBUTE_VISUAL_INCREASED_STAT: number
declare const ATTRIBUTE_VISUAL_NONE: number
declare const ATTRIBUTE_VISUAL_NO_HEALING: number
declare const ATTRIBUTE_VISUAL_POSSESSION: number
declare const ATTRIBUTE_VISUAL_POWER_SHIELDING: number
declare const ATTRIBUTE_VISUAL_TRAUMA: number
declare const ATTRIBUTE_VISUAL_UNWAVERING_POWER: number
declare const BOSS_RANK_ITERATION_END: number
declare const CD_TIME_TYPE_TIME_UNTIL: number
declare const CD_TYPE_RADIAL: number
declare const ENDLESS_DUNGEON_COUNTER_TYPE_ARC: number
declare const EVENT_GROUP_MEMBER_CONNECTED_STATUS: number
declare const EVENT_LEADER_UPDATE: number
declare const EVENT_PLAYER_STUNNED_STATE_CHANGED: number
declare const EVENT_RAID_REVIVE_COUNTER_UPDATE: number
declare const EVENT_RAID_TRIAL_COMPLETE: number
declare const EVENT_RAID_TRIAL_SCORE_UPDATE: number
declare const EVENT_RAID_TRIAL_STARTED: number
declare const EVENT_UNIT_ATTRIBUTE_VISUAL_ADDED: number
declare const EVENT_UNIT_ATTRIBUTE_VISUAL_REMOVED: number
declare const EVENT_UNIT_ATTRIBUTE_VISUAL_UPDATED: number
declare const MONSTER_DIFFICULTY_HARD: number
declare const RAID_POINT_REASON_KILL_BANNERMEN: number
declare const RAID_POINT_REASON_KILL_BOSS: number
declare const RAID_POINT_REASON_KILL_CHAMPION: number
declare const RAID_POINT_REASON_KILL_NORMAL_MONSTER: number
declare const RAID_POINT_REASON_LIFE_REMAINING: number
declare const RAID_POINT_REASON_SOLO_ARENA_PICKUP_FOUR: number
declare const RAID_POINT_REASON_SOLO_ARENA_PICKUP_ONE: number
declare const RAID_POINT_REASON_SOLO_ARENA_PICKUP_THREE: number
declare const RAID_POINT_REASON_SOLO_ARENA_PICKUP_TWO: number
declare const SUB_SAMPLING_MODE_NORMAL: number
declare const TARGET_MARKER_TYPE_EIGHT: number
declare const TARGET_MARKER_TYPE_FIVE: number
declare const TARGET_MARKER_TYPE_FOUR: number
declare const TARGET_MARKER_TYPE_NONE: number
declare const TARGET_MARKER_TYPE_ONE: number
declare const TARGET_MARKER_TYPE_SEVEN: number
declare const TARGET_MARKER_TYPE_SIX: number
declare const TARGET_MARKER_TYPE_THREE: number
declare const TARGET_MARKER_TYPE_TWO: number
declare const UNIT_REACTION_HOSTILE: number
declare const ZO_XP_BAR_GRADIENT_COLORS: readonly [ZoColorDef, ZoColorDef]

interface Control {
  Create3DRenderSpace: () => void
  Destroy3DRenderSpace: () => void
  Get3DLocalDimensions: () => LuaMultiReturn<[width: number, height: number]>
  Set3DLocalDimensions: (width: number, height: number) => void
  Get3DRenderSpaceOrigin: () => LuaMultiReturn<[x: number, y: number, z: number]>
  Set3DRenderSpaceOrigin: (x: number, y: number, z: number) => void
  Get3DRenderSpaceForward: () => LuaMultiReturn<[x: number, y: number, z: number]>
  Set3DRenderSpaceForward: (x: number, y: number, z: number) => void
  Get3DRenderSpaceRight: () => LuaMultiReturn<[x: number, y: number, z: number]>
  Set3DRenderSpaceRight: (x: number, y: number, z: number) => void
  Get3DRenderSpaceUp: () => LuaMultiReturn<[x: number, y: number, z: number]>
  Set3DRenderSpaceUp: (x: number, y: number, z: number) => void
  Set3DRenderSpaceOrientation: (pitch: number, yaw: number, roll: number) => void
  Set3DRenderSpaceUsesDepthBuffer: (usesDepthBuffer: boolean) => void
  SetSpace: (space: number) => void
  SetTransformNormalizedOriginPoint: (x: number, y: number) => void
  SetTransformOffset: (x: number, y: number, z: number) => void
  SetTransformRotation: (pitch: number, yaw: number, roll: number) => void
  SetTransformRotationX: (pitch: number) => void
  SetTransformRotationY: (yaw: number) => void
  SetTransformRotationZ: (roll: number) => void
  SetTransformScale: (scale: number) => void
}

interface TextureControl {
  SetTextureRotation: (
    angleInRadians: number,
    normalizedRotationPointX?: number,
    normalizedRotationPointY?: number
  ) => void
}

interface TextureCompositeControl extends Control {
  AddSurface: (left: number, right: number, top: number, bottom: number) => number
  ClearAllSurfaces: () => void
  GetNumSurfaces: () => number
  GetSurfaceAlpha: (surfaceIndex: number) => number
  SetSurfaceAlpha: (surfaceIndex: number, alpha: number) => void
  SetSurfaceHidden: (surfaceIndex: number, hidden: boolean) => void
  SetTexture: (texturePath: string) => void
  SetColor: (surfaceIndex: number, r: number, g: number, b: number, a?: number) => void
  SetInsets: (
    surfaceIndex: number,
    left: number,
    right: number,
    top: number,
    bottom: number
  ) => void
}

interface CooldownControl extends Control {
  StartCooldown: (
    remainingMs: number,
    durationMs: number,
    cooldownType?: number,
    timeType?: number,
    drainTime?: boolean
  ) => void
  ResetCooldown: () => void
  SetFillColor: (r: number, g: number, b: number, a?: number) => void
}

interface TranslateAnimation {
  SetDeltaOffsetX: (deltaX: number) => void
  SetDeltaOffsetY: (deltaY: number) => void
}

interface ZoPlatformStyleClass {
  New: <T>(
    this: ZoPlatformStyleClass,
    applyFunction: (this: void, style: T) => void,
    keyboardStyle: T,
    gamepadStyle: T
  ) => unknown
}

declare const ZO_PlatformStyle: ZoPlatformStyleClass
