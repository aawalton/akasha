import { asNumber, asNumberArray, asRecord, asString } from "../casts"
import { LCCC } from "../lccc"
import type { AccountRecord, ChunkedData, MasterList, SavedVars } from "../types"
import { Internal, Public } from "./state"
import "./init-chardata"

const Diagnostics = Internal.diagnostics

function asSavedVars(value: unknown): SavedVars {
  return value as SavedVars
}

type RefIdStore = Record<number, number>
function asRefIdStore(value: unknown): RefIdStore {
  return value as RefIdStore
}

type ScribingData = [string, number]
function asScribingData(value: ScribingData | undefined): ScribingData {
  return value as ScribingData
}

function asAccountRecord(value: Record<string, unknown>): AccountRecord {
  return value as AccountRecord
}

type MaybeChunkedData = ChunkedData | undefined
function asMaybeChunkedData(value: unknown): MaybeChunkedData {
  return value as MaybeChunkedData
}
type Cache = Record<number, boolean>
function asCache(value: unknown): Cache {
  return value as Cache
}

Internal.Initialize = function (this: void): undefined {
  Diagnostics.Stopwatch(true)

  Public.RegisterForCallback(
    Internal.name,
    Public.EVENT_INITIALIZED,
    Internal.RegisterSettingsPanel
  )

  const existing = globalThis.LibCharacterKnowledgeData
  if (existing === undefined || asSavedVars(existing).formatVersion !== Internal.FORMAT_VERSION) {
    globalThis.LibCharacterKnowledgeData = {
      formatVersion: Internal.FORMAT_VERSION,
    }
  }
  Internal.vars = asSavedVars(globalThis.LibCharacterKnowledgeData)

  if (Internal.vars.diagnostics === undefined) {
    Internal.vars.diagnostics = {}
  }
  Diagnostics.vars = Internal.vars.diagnostics

  if (Internal.vars.defaults === undefined) {
    const defaults = asRecord({})
    defaults[Internal.CATEGORY_RECIPE] = 4
    defaults[Internal.CATEGORY_PLAN] = 4
    defaults[Internal.CATEGORY_MOTIF] = 4
    defaults[Internal.CATEGORY_SCRIBING] = 2
    defaults[Internal.CATEGORY_RESEARCH] = 2
    defaults["priority"] = Internal.PRIORITY_RANK_DEFAULT
    Internal.vars.defaults = asAccountRecord(defaults)
  }

  const defaults = asRecord(Internal.vars.defaults)
  if (defaults[Internal.CATEGORY_SCRIBING] === undefined) {
    defaults[Internal.CATEGORY_SCRIBING] = 2
  }
  if (defaults[Internal.CATEGORY_RESEARCH] === undefined) {
    defaults[Internal.CATEGORY_RESEARCH] = 2
  }

  const vars = asRecord(Internal.vars)
  const internal = asRecord(Internal)
  for (const [_index, key] of ipairs(["accounts", "characters"])) {
    if (vars[key] === undefined) {
      vars[key] = {}
    }
    const section = asRecord(vars[key])
    if (section[Internal.server] === undefined) {
      section[Internal.server] = {}
    }
    internal[key] = vars[key]
  }

  Internal.LoadMotifData()

  Diagnostics.Stopwatch()
  if (Internal.GetMasterListParam("api") > 0 && Internal.GetMasterListParam("fieldSize") > 0) {
    Internal.ReadMasterList()
  } else {
    Internal.Datamine()
  }
}

Internal.ReadMasterList = function (this: void, finalizeBaseDataLoad?: boolean): undefined {
  const fieldSize = Internal.GetMasterListParam("fieldSize")

  for (const [_index, category] of ipairs(Internal.ItemIdStores)) {
    const encoded = LCCC.Unchunk(asMaybeChunkedData(asRecord(Internal.vars.masterList)[category]))
    const length = zo_strlen(encoded)
    const decoded: number[] = []
    let i = 1
    while (i < length) {
      const [itemId, nextPos] = LCCC.ReadAndDecode(encoded, i, fieldSize)
      i = nextPos
      decoded.push(itemId)
    }
    Internal.ids[category] = decoded
  }

  let validMaxIds = true
  for (const [key] of pairs(Internal.ScribingTypes)) {
    Internal.maxIds[key] = Internal.GetMasterListParam("maxId_" + key)
    if (Internal.maxIds[key] <= 0) {
      validMaxIds = false
    }
  }

  if (finalizeBaseDataLoad === true) {
    Internal.MsgTag(GetString(SI_LCK_SCAN_COMPLETE))
    Internal.MigrateData("flush")
    Internal.InitializeCharacterData()
  } else if (
    Internal.GetMasterListParam("api") === GetAPIVersion() &&
    !Internal.DoesNewerBaseDataExist() &&
    validMaxIds
  ) {
    Internal.InitializeCharacterData()
  } else {
    Internal.MigrateData("start")
  }
}

Internal.WriteMasterList = function (this: void, maxId: number): undefined {
  const fieldSize = zo_ceil(math.log(maxId) / math.log(64))

  const masterList: MasterList = {
    api: GetAPIVersion(),
    fieldSize: fieldSize,
    timestamp: GetTimeStamp(),
  }
  Internal.vars.masterList = masterList

  Diagnostics.vars.masterList = {}
  const diagMasterList = asRecord(Diagnostics.vars.masterList)
  const masterListRec = asRecord(masterList)

  for (const [_index, category] of ipairs(Internal.ItemIdStores)) {
    const encoded: string[] = []
    for (const [_i, id] of ipairs(asNumberArray(Internal.ids[category]))) {
      encoded.push(LCCC.Encode(id, fieldSize))
    }
    masterListRec[category] = LCCC.Chunk(table.concat(encoded, ""))
    diagMasterList[category] = encoded.length
  }

  for (const [key] of pairs(Internal.ScribingTypes)) {
    masterListRec["maxId_" + key] = Internal.maxIds[key]
  }

  Internal.MsgTag(GetString(SI_LCK_SCAN_COMPLETE))
  Internal.MigrateData("flush")
  Internal.InitializeCharacterData()
}

Internal.Datamine = function (this: void): undefined {
  Internal.MsgTag(GetString(SI_LCK_SCAN_START))

  if (Internal.DoesValidBaseDataExist()) {
    Internal.vars.masterList = Internal.BaseData
    Internal.ReadMasterList(true)
    return
  } else if (ZO_IsConsoleOrGameCoreUI()) {
    Internal.MsgTag(GetString(SI_LCK_SCAN_CONSOLE))
    return
  }

  const BLOCK_SIZE = 10000

  for (const [_index, category] of ipairs(Internal.ItemIdStores)) {
    Internal.ids[category] = []
  }

  for (const [key, data] of pairs(Internal.ScribingTypes)) {
    Internal.maxIds[key] = data.max()
    const store = asRefIdStore(asNumberArray(Internal.ids[key]))
    for (let i = 1; i <= Internal.maxIds[key]; i++) {
      store[i] = 0
    }
  }

  let startId = 1
  let invalidCount = 0
  let lastValidId = 0

  EVENT_MANAGER.RegisterForUpdate(
    Internal.name,
    Internal.scanThrottle,
    function (this: void): undefined {
      const stopId = startId + BLOCK_SIZE
      for (let i = startId; i <= stopId - 1; i++) {
        const [category, quality, data] = Internal.GetItemCategoryAndQuality(i)
        if (category === Internal.CATEGORY_INVALID) {
          invalidCount = invalidCount + 1
          if (invalidCount === BLOCK_SIZE) {
            EVENT_MANAGER.UnregisterForUpdate(Internal.name)
            Internal.WriteMasterList(lastValidId)
            return
          }
        } else {
          invalidCount = 0
          lastValidId = i
          if (category === Internal.CATEGORY_SCRIBING) {
            const scribeKey = asString(
              asRecord(Internal)[
                quality === SCRIBING_SLOT_NONE ? "SCRIBE_GRIMOIRE" : "SCRIBE_SCRIPT"
              ]
            )
            const tbl = asRefIdStore(asNumberArray(Internal.ids[scribeKey]))
            const scribingData = asScribingData(data)
            const bindType = GetItemLinkBindType(scribingData[0])
            const refId = scribingData[1]
            if (
              tbl[refId] === 0 ||
              (bindType !== BIND_TYPE_ON_PICKUP && bindType !== BIND_TYPE_ON_PICKUP_BACKPACK)
            ) {
              tbl[refId] = i
            }
          } else if (category !== Internal.CATEGORY_NONE) {
            asNumberArray(Internal.ids[asString(category)]).push(i)
          }
        }
      }
      startId = stopId
    }
  )
}

Internal.MigrateData = function (this: void, phase: string): undefined {
  if (phase === "start") {
    for (const [server, characters] of pairs(Internal.characters)) {
      for (const [id, data] of pairs(characters)) {
        for (const [_index, category] of ipairs(Internal.Categories)) {
          if (asRecord(data)[category] !== undefined) {
            Internal.GetKnowledge(server, id, category)
          }
        }
      }
    }
    Internal.Datamine()
  } else if (phase === "flush") {
    for (const [server, characters] of pairs(Internal.caches)) {
      for (const [id, data] of pairs(characters)) {
        for (const [_index, category] of ipairs(Internal.Categories)) {
          if (asRecord(data)[category] !== undefined) {
            Internal.ScanAndEncodeKnowledgeCategory(
              server,
              id,
              category,
              asCache(asRecord(data)[category])
            )
          }
        }
      }
    }
  }
}

Internal.DoesValidBaseDataExist = function (this: void): boolean {
  return type(Internal.BaseData) === "table" && asRecord(Internal.BaseData).api === GetAPIVersion()
}

Internal.DoesNewerBaseDataExist = function (this: void): boolean {
  return (
    Internal.DoesValidBaseDataExist() &&
    type(asRecord(Internal.BaseData).timestamp) === "number" &&
    asNumber(asRecord(Internal.BaseData).timestamp) > Internal.GetMasterListParam("timestamp")
  )
}

LCCC.RunAfterInitialLoadscreen(function (this: void): undefined {
  zo_callLater(() => Internal.Initialize(), Internal.scanThrottle)
})
