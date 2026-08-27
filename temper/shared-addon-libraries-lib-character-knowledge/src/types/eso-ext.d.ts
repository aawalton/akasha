declare function ConvertRGBToHSL(
  r: number,
  g: number,
  b: number
): LuaMultiReturn<[number, number, number]>

declare function zo_strsplit(separator: string, str: string): LuaMultiReturn<string[]>

declare function zo_strlen(s: string): number

declare function zo_clamp(value: number, min: number, max: number): number

declare const SI_ZONE_NAME: number

declare const _G: Record<string, unknown>

declare function ZO_IsConsoleOrGameCoreUI(): boolean

declare const LibAddonMenu2: unknown

type LinkHandlerCallback = (this: void, ...args: unknown[]) => boolean | undefined

interface LinkHandler {
  LINK_CLICKED_EVENT: string
  LINK_MOUSE_UP_EVENT: string
  RegisterCallback(this: LinkHandler, eventName: string, callback: LinkHandlerCallback): void
}

declare const LINK_HANDLER: LinkHandler

interface EventManager {
  RegisterForEvent<T extends unknown[] = unknown[]>(
    namespace: string,
    event: number,
    callback: (eventCode: number, ...args: T) => void,
    registerOnce: boolean
  ): boolean
}

interface EventManager {
  RegisterForUpdate(
    namespace: string,
    interval: number,
    callback: (this: void, ...args: unknown[]) => void,
    registerOnce: boolean
  ): boolean
}

declare function GetItemLinkRecipeResultItemLink(itemLink: string): string

declare function IsCraftedAbilityScriptCompatibleWithSelections(
  checkScriptId: number,
  craftedAbilityId: number
): boolean

declare function ReloadUI(): void

declare function SafeAddString(this: void, id: number, text: string, numArgs: number): void

declare const ITEM_STYLE_CHAPTER_MAX_VALUE: number

declare var LCK_ExportBox: unknown

declare var LCK_ExportSelected: unknown

declare const SI_YES: number
declare const SI_NO: number
declare const SI_OPTIONS_DEFAULTS: number
declare const SI_OPTIONS_RESET: number
declare const SI_ANTIQUITY_EMPTY_LIST: number
declare const SI_ADDON_MANAGER_ENABLED: number
declare const SI_SCRIBING_TITLE: number
declare const SI_SMITHING_TAB_RESEARCH: number
declare const SI_TOOLTIP_ITEM_NAME: number
declare const SI_CRAFTED_ABILITY_NAME_FORMATTER: number

declare const SI_LCK_SCAN_START: number
declare const SI_LCK_SCAN_COMPLETE: number
declare const SI_LCK_SCAN_CONSOLE: number
declare const SI_LCK_SCAN_RESEARCH_BAD_TRAITS: number
declare const SI_LCK_SCAN_RESEARCH_BAD_SIG: number
declare const SI_LCK_SETTINGS_CHATCOMMAND: number
declare const SI_LCK_SETTINGS_USE_DEFAULT: number
declare const SI_LCK_SETTINGS_PRIORITY: number
declare const SI_LCK_SETTINGS_PRIORITY_DEFAULT: number
declare const SI_LCK_SETTINGS_PRIORITY_HELP: number
declare const SI_LCK_SETTINGS_EXPORT: number
declare const SI_LCK_SETTINGS_MAIN_SECTION: number
declare const SI_LCK_SETTINGS_RANKING_PREVIEW: number
declare const SI_LCK_SETTINGS_SYSTEM_DEFAULTS: number
declare const SI_LCK_SETTINGS_SERVER_DEFAULTS: number
declare const SI_LCK_SETTINGS_ACCOUNT_DEFAULTS: number
declare const SI_LCK_SETTINGS_SHARE_SECTION: number
declare const SI_LCK_SETTINGS_SHARE_CAPTION: number
declare const SI_LCK_SETTINGS_SHARE_CLEAR: number
declare const SI_LCK_SETTINGS_SHARE_IMPORT: number
declare const SI_LCK_SETTINGS_SHARE_EXPORTS: number
declare const SI_LCK_SETTINGS_SHARE_EXPORTST: number
declare const SI_LCK_SETTINGS_SHARE_EXPORTC: number
declare const SI_LCK_SETTINGS_SHARE_EXPORTCT: number
declare const SI_LCK_SETTINGS_SHARE_EXPORTA: number
declare const SI_LCK_SETTINGS_SHARE_EXPORTAT: number
declare const SI_LCK_SETTINGS_NOSAVE_SECTION: number
declare const SI_LCK_SETTINGS_NOSAVE_CAPTION: number
declare const SI_LCK_SETTINGS_RESET_SECTION: number
declare const SI_LCK_SETTINGS_RESET_WARNING: number
declare const SI_LCK_SHARE_EXPORT_LIMIT: number
declare const SI_LCK_SHARE_IMPORT_INVALID: number
declare const SI_LCK_SHARE_IMPORT_BADVERSION: number
declare const SI_LCK_SHARE_IMPORT_STALE: number
declare const SI_LCK_SHARE_IMPORT_DONE: number
declare const SI_LCK_SHARE_IMPORT_API: number
declare const SI_LCK_SHARE_IMPORT_NEWCHARACTER: number
declare const SI_LCK_SHARE_IMPORT_TALLY: number
