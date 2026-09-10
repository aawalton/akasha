type Id64 = string & { readonly __brand: "Id64" }
declare const ReloadUI: (this: void, guiName?: string) => void
declare function GetCVar(this: void, CVarName?: string): string
declare const SetCVar: (this: void, CVarName?: string, value?: string) => void
declare function GetString(this: void, stringVariablePrefix?: string, contextId?: number): string
declare function IsShiftKeyDown(this: void): boolean
declare function IsControlKeyDown(this: void): boolean
declare function IsAltKeyDown(this: void): boolean
declare function IsCommandKeyDown(this: void): boolean
declare const PlaySound: (this: void, soundName?: string) => void
declare function GetInterfaceColor(
  this: void,
  interfaceColorType?: InterfaceColorType,
  fieldValue?: number
): LuaMultiReturn<[red: number, green: number, blue: number, alpha: number]>
declare function GetErrorString(this: void, errorStringId?: number): string
declare function GetAllianceName(this: void, alliance?: Alliance): string
declare function GetNumClasses(this: void): number
declare function GetClassIdByIndex(this: void, index?: number): number
declare function GetClassIndexById(this: void, classId?: number): number | undefined
declare function GetClassInfo(
  this: void,
  index?: number
): LuaMultiReturn<
  [
    classId: number,
    lore: string,
    normalIconKeyboard: string,
    pressedIconKeyboard: string,
    mouseoverIconKeyboard: string,
    isSelectable: boolean,
    ingameIconKeyboard: string,
    ingameIconGamepad: string,
    normalIconGamepad: string,
    pressedIconGamepad: string,
  ]
>
declare function GetClassName(this: void, gender?: Gender, classId?: number): string
declare function GetRaceName(this: void, gender?: Gender, raceId?: number): string
declare function SplitString(
  this: void,
  delims?: string,
  stringToSplit?: string
): LuaMultiReturn<[strings: string, ...rest: string[]]>
declare function LocaleAwareToUpper(this: void, stringToUppercase?: string): string
declare function LocaleAwareToLower(this: void, stringToLowercase?: string): string
declare function IsMinSpecMachine(this: void): boolean
declare function IsPrivateFunction(this: void, functionName?: string): boolean
declare function IsProtectedFunction(this: void, functionName?: string): boolean
declare function GetAPIVersion(this: void): number
declare function Id64ToString(this: void, id?: Id64): string
declare function StringToId64(this: void, stringId?: string): Id64
declare function AreId64sEqual(this: void, firstId?: Id64, secondId?: Id64): boolean
declare function Id64ToNumber(
  this: void,
  id?: Id64
): LuaMultiReturn<[number: number, lostPrecisionUseId64ToString: boolean]>
declare function NumberToId64(
  this: void,
  number?: number
): LuaMultiReturn<[id: Id64, lostPrecisionUseStringToId64: boolean]>
declare function BitAnd(this: void, valueA?: number, valueB?: number): number
declare function BitOr(this: void, valueA?: number, valueB?: number): number
declare function BitLShift(this: void, value?: number, numBits?: number): number
declare function BitRShift(this: void, value?: number, numBits?: number): number
declare function GetFrameTimeSeconds(this: void): number
declare function GetFrameDeltaTimeSeconds(this: void): number
declare function GetDateStringFromTimestamp(this: void, timestamp?: number): string
declare function GetGameTimeMilliseconds(this: void): number
declare function GetGameTimeSeconds(this: void): number
declare function GetFramerate(this: void): number
declare function GetDiffBetweenTimeStamps(
  this: void,
  laterTime?: number,
  earlierTime?: number
): number
declare function FormatTimeSeconds(
  this: void,
  timeValueInSeconds?: number,
  formatType?: TimeFormatStyleCode,
  precisionType?: TimeFormatPrecisionCode,
  direction?: TimeFormatDirectionCode
): LuaMultiReturn<[formattedTimeString: string, nextUpdateTimeInSec: number]>
declare const SetGameCameraUIMode: (this: void, active?: boolean) => void
declare const SetCameraOptionsPreviewModeEnabled: (
  this: void,
  enabled?: boolean,
  option?: CameraOptionsPreview
) => void
declare function GetGamepadIconPathForKeyCode(
  this: void,
  key?: KeyCode,
  disabled?: boolean
): LuaMultiReturn<
  [gamepadIcon: string | undefined, width: number | undefined, height: number | undefined]
>
declare function GetMouseIconPathForKeyCode(
  this: void,
  key?: KeyCode
): LuaMultiReturn<
  [mouseIcon: string | undefined, width: number | undefined, height: number | undefined]
>
declare function HashString(this: void, text?: string): number
declare function GetESOVersionString(this: void): string
declare const TakeScreenshot: (this: void) => void
declare function GetStringWidthScaled(
  this: void,
  fontObject?: unknown,
  text?: string,
  scale?: number,
  space?: Space
): number
declare function ZoGetOfficialGameLanguageDescriptor(this: void): string
declare function GetTotalUserAddOnCPUTimeUsedNowMS(this: void): number
declare function GetTotalUserAddOnCPUTimeAvailableEachFrameMS(this: void): number
declare const SetSetting: (
  this: void,
  system?: SettingSystemType,
  settingId?: number,
  value?: string,
  setOptions?: SetOptions
) => void
declare const ApplySettings: (this: void) => void
declare function GetSetting(this: void, system?: SettingSystemType, settingId?: number): string
declare function GetSetting_Bool(
  this: void,
  system?: SettingSystemType,
  settingId?: number
): boolean
declare function GetPlatformServiceType(this: void): PlatformServiceType
declare function GetSecondsSinceMidnight(this: void): number
declare function GetFrameTimeMilliseconds(this: void): number
declare function GetTimeStamp(this: void): number
declare function GetDate(this: void): number
declare function GetTimeString(this: void): string
declare function GetDateElementsFromTimestamp(
  this: void,
  timestamp?: number
): LuaMultiReturn<[year: number, month: number, day: number]>
declare function GetTimestampForStartOfDate(
  this: void,
  year?: number,
  month?: number,
  day?: number,
  inLocalTime?: boolean
): number
declare function GetFormattedTime(this: void): number
declare function GetDisplayName(this: void): string
declare function DecorateDisplayName(this: void, displayName?: string): string
declare function IsDecoratedDisplayName(this: void, displayName?: string): boolean
declare function UndecorateDisplayName(this: void, displayName?: string): string
declare function GetNumFriends(this: void): number
declare function GetFriendInfo(
  this: void,
  friendIndex?: number
): LuaMultiReturn<
  [displayName: string, note: string, playerStatus: PlayerStatus, secsSinceLogoff: number]
>
declare function GetFriendCharacterInfo(
  this: void,
  friendIndex?: number
): LuaMultiReturn<
  [
    hasCharacter: boolean,
    characterName: string,
    zoneName: string,
    classType: number,
    alliance: Alliance,
    level: number,
    championRank: number,
    zoneId: number,
    consoleId: Id64,
  ]
>
declare function IsIgnored(this: void, charOrDisplayName?: string): boolean
declare const AddIgnore: (this: void, charOrDisplayName?: string) => void
declare function IsFriend(this: void, charOrDisplayName?: string): boolean
declare function GetGuildId(this: void, guildIndex?: number): number
declare function GetNumGuilds(this: void): number
declare function GetGuildName(this: void, guildId?: number): string
declare function GetGuildMotD(this: void, guildId?: number): string
declare function GetGuildAlliance(this: void, guildId?: number): Alliance
declare function GetNumGuildMembers(this: void, guildId?: number): number
declare function GetGuildMemberInfo(
  this: void,
  guildId?: number,
  memberIndex?: number
): LuaMultiReturn<
  [
    name: string,
    note: string,
    rankIndex: number,
    playerStatus: PlayerStatus,
    secsSinceLogoff: number,
  ]
>
declare function GetGuildMemberCharacterInfo(
  this: void,
  guildId?: number,
  memberIndex?: number
): LuaMultiReturn<
  [
    hasCharacter: boolean,
    characterName: string,
    zoneName: string,
    classType: number,
    alliance: Alliance,
    level: number,
    championRank: number,
    zoneId: number,
    consoleId: Id64,
  ]
>
declare function GetGuildMemberIndexFromDisplayName(
  this: void,
  guildId?: number,
  displayName?: string
): number | undefined
declare function GetPlayerGuildMemberIndex(this: void, guildId?: number): number
declare function DoesPlayerHaveGuildPermission(
  this: void,
  guildId?: number,
  permission?: GuildPermission
): boolean
declare function DoesGuildHavePrivilege(
  this: void,
  guildId?: number,
  privilege?: GuildPrivilege
): boolean
declare function GetNumGuildInvites(this: void): number
declare function GetGuildInviteInfo(
  this: void,
  index?: number
): LuaMultiReturn<
  [
    guildId: number,
    guildName: string,
    guildAlliance: Alliance,
    inviterDisplayName: string,
    note: string,
  ]
>
declare const AcceptGuildInvite: (this: void, guildId?: number) => void
declare const RejectGuildInvite: (this: void, guildId?: number) => void
declare const JumpToGuildMember: (this: void, name?: string) => void
declare function GetGuildOwnedKioskInfo(this: void, guildId?: number): string | undefined
declare function GetGuildKioskCycleTimes(
  this: void
): LuaMultiReturn<[despawnTimestampS: number, bidEndTimestampS: number, respawnTimestampS: number]>
declare function GetMostRecentGamepadType(this: void): GamepadType
declare function GetKeyboardIconPathForKeyCode(
  this: void,
  key?: KeyCode,
  disabled?: boolean
): LuaMultiReturn<
  [keyboardIcon: string | undefined, width: number | undefined, height: number | undefined]
>
declare function IsConsoleUI(this: void): boolean
declare function IsMacUI(this: void): boolean
declare function IsKeyboardUISupported(this: void): boolean
declare function IsInGamepadPreferredMode(this: void): boolean
declare function IsKeyCodeGamepadKey(this: void, key?: KeyCode): boolean
declare function GetUIPlatform(this: void): UIPlatform
declare function GetKeyboardLayout(this: void): string
declare function IsCountSingularForm(this: void, number?: number): boolean
declare function FormatFloatRelevantFraction(this: void, num?: number): string
declare function IsESOPlusSubscriber(this: void): boolean
declare function GetTrialInfo(
  this: void
): LuaMultiReturn<[accountTypeId: number, title: string, description: string, version: number]>
declare function GetCollectibleName(this: void, collectibleId?: number): string
declare function GetCollectibleCategoryNameByCollectibleId(
  this: void,
  collectibleId?: number
): string
declare const RequestReadPendingNarrationTextToClient: (
  this: void,
  narrationType?: ScreenReaderNarrationType
) => void
declare const ClearActiveNarration: (this: void) => void
declare function GetCriticalStrikeChance(this: void, statValue?: number): number
declare function IsPlayerActivated(this: void): boolean
declare function GetLatency(this: void): number
declare function DoesUnitExist(this: void, unitTag?: string): boolean
declare function GetRawUnitName(this: void, unitTag?: string): string
declare function GetUnitDisplayName(this: void, unitTag?: string): string
declare function GetUnitGender(this: void, unitTag?: string): Gender
declare function GetUnitNameHighlightedByReticle(this: void): string
declare function GetUnitClassId(this: void, unitTag?: string): number
declare function GetUnitChampionPoints(this: void, unitTag?: string): number
declare function GetUnitEffectiveChampionPoints(this: void, unitTag?: string): number
declare function GetUnitZone(this: void, unitTag?: string): string
declare function GetUnitWorldPosition(
  this: void,
  unitTag?: string
): LuaMultiReturn<[zoneId: number, worldX: number, worldY: number, worldZ: number]>
declare function GetUnitRawWorldPosition(
  this: void,
  unitTag?: string
): LuaMultiReturn<[zoneId: number, worldX: number, worldY: number, worldZ: number]>
declare function IsUnitUsingVeteranDifficulty(this: void, unitTag?: string): boolean
declare function GetPlayerCurseType(this: void): CurseType
declare function GetPlayerChampionPointsEarned(this: void): number
declare function AreUnitsEqual(this: void, unitTag?: string, secondUnitTag?: string): boolean
declare function IsUnitGrouped(this: void, unitTag?: string): boolean
declare function IsUnitGroupLeader(this: void, unitTag?: string): boolean
declare function GetGroupLeaderUnitTag(this: void): string
declare function IsUnitPlayer(this: void, unitTag?: string): boolean
declare function GetUnitAlliance(this: void, unitTag?: string): number
declare function GetUnitRaceId(this: void, unitTag?: string): number
declare function GetUnitAvARank(
  this: void,
  unitTag?: string
): LuaMultiReturn<[rank: number, subRank: number]>
declare function IsUnitInCombat(this: void, unitTag?: string): boolean
declare function IsUnitDead(this: void, unitTag?: string): boolean
declare function IsUnitDeadOrReincarnating(this: void, unitTag?: string): boolean
declare function IsUnitSwimming(this: void, unitTag?: string): boolean
declare function GetUnitStealthState(this: void, unitTag?: string): number
declare function IsUnitInDungeon(this: void, unitTag?: string): boolean
declare function IsUnitGuildKiosk(this: void, unitTag?: string): boolean
declare function GetUnitPower(
  this: void,
  unitTag?: string,
  powerType?: CombatMechanicFlags
): LuaMultiReturn<[current: number, max: number, effectiveMax: number]>
declare function GetCurrentCharacterId(this: void): string
declare function GetPlayerStat(
  this: void,
  derivedStat?: DerivedStats,
  statBonusOption?: StatBonusOption
): number
declare function CancelCast(this: void): boolean
declare function GetPlayerCameraHeading(this: void): number
declare function GetPlayerWorldPositionInHouse(
  this: void
): LuaMultiReturn<[worldX: number, worldY: number, worldZ: number, rotationRadians: number]>
