import {
  Chunk,
  Decode,
  Encode,
  Explode,
  Implode,
  ReadAndDecode,
  ReadBitFromEncodedData,
  Unchunk,
} from "./codec"
import {
  HSLToRGB,
  Int24ToHSL,
  Int24ToInt32,
  Int24ToRGB,
  Int24ToRGBA,
  Int32ToHSLA,
  Int32ToInt24,
  Int32ToRGBA,
  RGBAToInt32,
  RGBToInt24,
} from "./color"
import { Clamp, CompareCharIds, FixNumber, FormatVersion, GetAddOnVersion, GetLibAddonMenu, GetLocalizedData, GetServerName, GetSortedGroupMembers, GetZoneId, GetZoneName, IsInDungeonTrialArena, MatchStrings, MonitorZoneChanges, RegisterLinkHandler, RegisterSlashCommands, RegisterString, RunAfterInitialLoadscreen, TokenizeSlashCommandParameters } from "./util"
import { ConcatTables, CountTable, GetSortedKeys, MergeTables, ProcessNumericTable, SetupOnDemandDataTable } from "./util-tables"

const VERSION = 36

export const LCCC = {
  version: VERSION,

  Int24ToRGB,
  Int24ToRGBA,
  Int32ToRGBA,
  RGBToInt24,
  RGBAToInt32,
  Int24ToInt32,
  Int32ToInt24,
  HSLToRGB,
  Int24ToHSL,
  Int32ToHSLA,

  Encode,
  Decode,
  ReadAndDecode,
  ReadBitFromEncodedData,
  Implode,
  Explode,
  Chunk,
  Unchunk,

  GetServerName,
  RunAfterInitialLoadscreen,
  MonitorZoneChanges,
  GetZoneId,
  GetZoneName,
  IsInDungeonTrialArena,
  RegisterSlashCommands,
  TokenizeSlashCommandParameters,
  CompareCharIds,
  FixNumber,
  MatchStrings,
  RegisterString,
  GetLocalizedData,
  GetSortedGroupMembers,
  GetAddOnVersion,
  FormatVersion,
  RegisterLinkHandler,
  GetLibAddonMenu,
  Clamp,

  GetSortedKeys,
  CountTable,
  ProcessNumericTable,
  MergeTables,
  ConcatTables,
  SetupOnDemandDataTable,
}

declare global {
  var LibCodesCommonCode: typeof LCCC
}
