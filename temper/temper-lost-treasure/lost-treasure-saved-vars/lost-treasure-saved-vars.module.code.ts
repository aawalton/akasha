import {
  LOST_TREASURE_BLANK_SAVED_VARS,
  LOST_TREASURE_MARK_OPTIONS_INVENTORY,
  LOST_TREASURE_PIN_TYPE_CLUES,
  LOST_TREASURE_PIN_TYPE_SURVEYS,
  LOST_TREASURE_PIN_TYPE_TREASURE,
  type MarkOption,
  type PinType,
  SAVED_VARIABLES_ACCOUNT,
  SAVED_VARIABLES_CHARACTER,
} from "../lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "../lost-treasure-logger/lost-treasure-logger.module.code.ts"
import type { PinData } from "../lost-treasure-types/lost-treasure-types.module.code.ts"
import {
  doesPathContainsFileName,
  getFileNameFromPath,
} from "../lost-treasure-utilities/lost-treasure-utilities.module.code.ts"

const logger = createLogger("savedVars")

type StringRecord = Record<string, unknown>

function asStringRecord(value: unknown): StringRecord {
  return value as StringRecord
}

function asLostTreasureDb(value: unknown): LostTreasureDb {
  return value as LostTreasureDb
}

export interface PinTypeSettings {
  showOnMap: boolean
  showOnCompass: boolean
  texture: string
  size: number
  markOption: MarkOption
  pinLevel: number
  deletionDelay: number
}

export interface MiniMapSettings {
  enabled: boolean
  anchor: unknown
  size: number
  deletionDelay: number
}

export interface MiningData {
  APIVersion: number
  APITimeStamp: number
  data: Record<number, PinData[] | undefined>
}

export interface LostTreasureDefaults {
  pinTypes: Record<PinType, PinTypeSettings>
  miniMap: MiniMapSettings
  notifications: PinData[]
  mining: MiningData
  misc: { hasNewIconPath: boolean }
}

export interface LostTreasureDb extends LostTreasureDefaults {
  GetLibAddonMenuAccountCheckbox: (this: LostTreasureDb) => Record<string, unknown>
}

function getTexturePath(this: void, index?: number): string {
  const textures = LibTreasure_GetIcons()
  const numTextures = textures.length
  let resolved = index
  if (resolved === undefined || resolved < 1 || resolved > numTextures) {
    resolved = 1
  }
  const texture = textures[resolved] ?? ""
  logger.Debug('numTextures: %d, index: %d, texture: "%s"', numTextures, resolved, texture)
  return texture
}

function makePinTypeDefaults(this: void, textureIndex?: number): PinTypeSettings {
  return {
    showOnMap: true,
    showOnCompass: true,
    texture: getTexturePath(textureIndex),
    size: 32,
    markOption: LOST_TREASURE_MARK_OPTIONS_INVENTORY,
    pinLevel: 47,
    deletionDelay: 10,
  }
}

const DEFAULTS: LostTreasureDefaults = {
  pinTypes: {
    [LOST_TREASURE_PIN_TYPE_TREASURE]: makePinTypeDefaults(),
    [LOST_TREASURE_PIN_TYPE_SURVEYS]: makePinTypeDefaults(5),
    [LOST_TREASURE_PIN_TYPE_CLUES]: makePinTypeDefaults(5),
  },
  miniMap: {
    enabled: true,
    anchor: ZO_Anchor.New(TOPLEFT, undefined, TOPLEFT, 100, 100),
    size: 400,
    deletionDelay: 4,
  },
  notifications: [],
  mining: {
    APIVersion: LOST_TREASURE_BLANK_SAVED_VARS,
    APITimeStamp: LOST_TREASURE_BLANK_SAVED_VARS,
    data: {},
  },
  misc: {
    hasNewIconPath: false,
  },
}

const HOLDER: { db: LostTreasureDb | undefined } = { db: undefined }

export function getSavedVars(this: void): LostTreasureDb {
  if (HOLDER.db === undefined) {
    throw new Error("TemperLostTreasure savedVars accessed before initialization")
  }
  return HOLDER.db
}

export function getDefaults(this: void): LostTreasureDefaults {
  return DEFAULTS
}

export function getNewTexturePath(this: void, path: string, pinType: PinType): string {
  const textures = LibTreasure_GetIcons()
  const fileName = getFileNameFromPath(path)
  if (fileName !== undefined) {
    for (const [, value] of ipairs(textures)) {
      if (doesPathContainsFileName(value, fileName)) {
        const iconPath = value
        logger.Debug("Use new iconPath, path: %s", iconPath)
        getSavedVars().pinTypes[pinType].texture = iconPath
        return iconPath
      }
    }
  }

  const iconPath = DEFAULTS.pinTypes[pinType].texture
  logger.Debug("Use default iconPath, path: %s", iconPath)
  return iconPath
}

export function initializeSavedVars(this: void): undefined {
  HOLDER.db = asLostTreasureDb(
    LibSavedVars.NewAccountWide(SAVED_VARIABLES_ACCOUNT, asStringRecord(DEFAULTS))
      .AddCharacterSettingsToggle(SAVED_VARIABLES_CHARACTER)
      .Version(20, function (this: void, savedVarsTable: Record<string, unknown>): undefined {
        ZO_ClearTable(savedVarsTable)
      })
  )

  const db = HOLDER.db
  if (db.misc.hasNewIconPath === false) {
    logger.Debug("The addon has to update the old icon path to the new one. Update initializing...")
    for (const [pinType, settings] of pairs(db.pinTypes)) {
      db.pinTypes[pinType].texture = getNewTexturePath(settings.texture, pinType)
    }
    db.misc.hasNewIconPath = true
  } else {
    logger.Debug("The addon refers to LibTreasure already")
  }

  logger.Debug("initialized")
}
