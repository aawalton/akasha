import { asNumber } from "../journal-casts/journal-casts.module.code.ts"
import {
  chunk,
  decode,
  encode,
  explode,
  implode,
  readAndDecode,
  readBitFromEncodedData,
  unchunk,
} from "../journal-lccc-codec/journal-lccc-codec.module.code.ts"
import {
  hslToRgb,
  int24ToHsl,
  int24ToInt32,
  int24ToRgb,
  int24ToRgba,
  int32ToHsla,
  int32ToInt24,
  int32ToRgba,
  rgbaToInt32,
  rgbToInt24,
} from "../journal-lccc-color/journal-lccc-color.module.code.ts"
import {
  clamp,
  compareCharIds,
  fixNumber,
  formatVersion,
  getAddOnVersion,
  getLibAddonMenu,
  getLocalizedData,
  getServerName,
  getSortedGroupMembers,
  getZoneId,
  getZoneName,
  isInDungeonTrialArena,
  matchStrings,
  monitorZoneChanges,
  registerLinkHandler,
  registerSlashCommands,
  registerString,
  runAfterInitialLoadscreen,
  tokenizeSlashCommandParameters,
} from "../journal-lccc-util/journal-lccc-util.module.code.ts"
import {
  concatTables,
  countTable,
  getSortedKeys,
  mergeTables,
  processNumericTable,
  setupOnDemandDataTable,
} from "../journal-lccc-util-tables/journal-lccc-util-tables.module.code.ts"

const NAME = "LibCodesCommonCode"
const VERSION = 36

type GlobalTable = Record<string, unknown>
function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

type Versioned = { version?: unknown } | undefined
function asVersioned(value: unknown): Versioned {
  return value as Versioned
}

export const LCCC = {
  version: VERSION,

  Int24ToRGB: int24ToRgb,
  Int24ToRGBA: int24ToRgba,
  Int32ToRGBA: int32ToRgba,
  RGBToInt24: rgbToInt24,
  RGBAToInt32: rgbaToInt32,
  Int24ToInt32: int24ToInt32,
  Int32ToInt24: int32ToInt24,
  HSLToRGB: hslToRgb,
  Int24ToHSL: int24ToHsl,
  Int32ToHSLA: int32ToHsla,

  Encode: encode,
  Decode: decode,
  ReadAndDecode: readAndDecode,
  ReadBitFromEncodedData: readBitFromEncodedData,
  Implode: implode,
  Explode: explode,
  Chunk: chunk,
  Unchunk: unchunk,

  GetServerName: getServerName,
  RunAfterInitialLoadscreen: runAfterInitialLoadscreen,
  MonitorZoneChanges: monitorZoneChanges,
  GetZoneId: getZoneId,
  GetZoneName: getZoneName,
  IsInDungeonTrialArena: isInDungeonTrialArena,
  RegisterSlashCommands: registerSlashCommands,
  TokenizeSlashCommandParameters: tokenizeSlashCommandParameters,
  CompareCharIds: compareCharIds,
  FixNumber: fixNumber,
  MatchStrings: matchStrings,
  RegisterString: registerString,
  GetLocalizedData: getLocalizedData,
  GetSortedGroupMembers: getSortedGroupMembers,
  GetAddOnVersion: getAddOnVersion,
  FormatVersion: formatVersion,
  RegisterLinkHandler: registerLinkHandler,
  GetLibAddonMenu: getLibAddonMenu,
  Clamp: clamp,

  GetSortedKeys: getSortedKeys,
  CountTable: countTable,
  ProcessNumericTable: processNumericTable,
  MergeTables: mergeTables,
  ConcatTables: concatTables,
  SetupOnDemandDataTable: setupOnDemandDataTable,
}

{
  const existing = asVersioned(asGlobalTable(_G)[NAME])
  if (
    !(
      type(existing) === "table" &&
      type(existing?.version) === "number" &&
      asNumber(existing?.version) >= VERSION
    )
  ) {
    asGlobalTable(_G)[NAME] = LCCC
  }
}
