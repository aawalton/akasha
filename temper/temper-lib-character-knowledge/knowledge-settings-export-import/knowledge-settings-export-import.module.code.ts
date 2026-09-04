import { asRecord, asString } from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import type { ExportEntry, ExportEntryMeta } from "../knowledge-ldei/knowledge-ldei.module.code.ts"
import { LDEI } from "../knowledge-ldei/knowledge-ldei.module.code.ts"
import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"
import type {
  AccountMap,
  CharacterMap,
  CharacterRecord,
} from "../knowledge-types/knowledge-types.module.code.ts"

const SHARE_TAG = "K"
const SHARE_VERSION = 4
const SHARE_VERSION_COMPATIBILITY: Record<number, boolean> = {
  [SHARE_VERSION]: true,
}

function asCharacterMap(value: unknown): CharacterMap {
  return value as CharacterMap
}

function asAccountMap(value: unknown): AccountMap {
  return value as AccountMap
}

function asCharacterRecord(value: unknown): CharacterRecord {
  return value as CharacterRecord
}

interface ExportEditBoxInner {
  SelectAll: (this: ExportEditBoxInner) => void
  TakeFocus: (this: ExportEditBoxInner) => void
}

interface ExportEditBox {
  editbox?: ExportEditBoxInner
  UpdateValue: (this: ExportEditBox) => void
}

type MaybeExportEditBox = ExportEditBox | undefined
function asMaybeExportEditBox(value: unknown): MaybeExportEditBox {
  return value as MaybeExportEditBox
}

INTERNAL.CountExportSelection = function (this: void): number {
  let count = 0
  for (const [, server] of ipairs(PUBLIC.GetServerList())) {
    for (const [, character] of ipairs(PUBLIC.GetCharacterList(server))) {
      const record = asCharacterRecord(asCharacterMap(INTERNAL.characters[server])[character.id])
      if (record.export === true) {
        count = count + 1
      }
    }
  }
  return count
}

INTERNAL.GetExportSelectedText = function (this: void): string {
  return string.format(GetString(SI_LCK_SETTINGS_SHARE_EXPORTS), INTERNAL.CountExportSelection())
}

INTERNAL.ExportSelectText = function (this: void): undefined {
  const box = asMaybeExportEditBox(LCK_ExportBox)
  if (box !== undefined && box.editbox !== undefined) {
    zo_callLater(function (this: void): undefined {
      box.UpdateValue()
      const inner = box.editbox
      if (inner !== undefined) {
        inner.SelectAll()
        inner.TakeFocus()
      }
    }, 100)
  }
}

INTERNAL.CreateExportEntry = function (
  this: void,
  server,
  charId,
  ignoreExportFlag
): LuaMultiReturn<[string, ExportEntryMeta]> {
  const data = asCharacterMap(INTERNAL.characters[server])[charId]

  if (data !== undefined && (ignoreExportFlag === true || data.export === true)) {
    const knowledge: string[] = []
    for (const [, category] of ipairs(INTERNAL.DataStores)) {
      const payload = asRecord(data)[category]
      if (payload !== undefined) {
        knowledge.push(
          string.format("%s:%s", category, LCCC.Implode(LCCC.Unchunk(asString(payload))))
        )
      }
    }

    if (knowledge.length > 0) {
      return $multi(
        LDEI.Wrap(SHARE_TAG, SHARE_VERSION, [
          server,
          UndecorateDisplayName(data.account),
          data.name,
          charId,
          LCCC.Encode(GetAPIVersion(), 1),
          LCCC.Encode(data.timestamp ?? 0, 1),
          table.concat(knowledge, ";"),
        ]),
        { server: server, identifier: data.name, timestamp: data.timestamp }
      )
    }
  }

  return $multi("", { timestamp: 0 })
}

INTERNAL.ExportCurrent = function (this: void): undefined {
  const [text] = INTERNAL.CreateExportEntry(INTERNAL.server, INTERNAL.charId, true)
  INTERNAL.shareText = text + " "
  INTERNAL.ExportSelectText()
}

INTERNAL.ExportMultiple = function (this: void, exportAll): undefined {
  const entries: ExportEntry[] = []

  for (const [, server] of ipairs(PUBLIC.GetServerList())) {
    for (const [, character] of ipairs(PUBLIC.GetCharacterList(server))) {
      const [text, meta] = INTERNAL.CreateExportEntry(server, character.id, exportAll)
      entries.push([text, meta])
    }
  }

  INTERNAL.shareText =
    LDEI.ExportMultiple(entries, function (this: void, ...args: unknown[]): undefined {
      INTERNAL.Msg(zo_strformat(SI_LCK_SHARE_EXPORT_LIMIT, ...args))
    }) + " "
  INTERNAL.ExportSelectText()
}

INTERNAL.Import = function (this: void): undefined {
  if (!LDEI.Import(asString(INTERNAL.shareText), SHARE_TAG)) {
    INTERNAL.Msg(GetString(SI_LCK_SHARE_IMPORT_INVALID))
  }
}

INTERNAL.ProcessImportData = function (
  this: void,
  dataset
): LuaMultiReturn<[number, number | undefined, boolean]> {
  let newCharacter = false
  let imported = 0

  for (const [, data] of ipairs(dataset)) {
    if (SHARE_VERSION_COMPATIBILITY[data.version] !== true) {
      return $multi(imported, SI_LCK_SHARE_IMPORT_BADVERSION, newCharacter)
    }

    const [server, account, charName, charId, apiVersion, rawTimestamp, knowledge] = zo_strsplit(
      ",",
      data.payload
    )

    if (LCCC.Decode(asString(apiVersion)) === GetAPIVersion()) {
      const timestamp = LCCC.Decode(asString(rawTimestamp))

      if (INTERNAL.accounts[asString(server)] === undefined) {
        INTERNAL.accounts[asString(server)] = asAccountMap({})
      }
      if (INTERNAL.characters[asString(server)] === undefined) {
        INTERNAL.characters[asString(server)] = asCharacterMap({})
      }
      if (asCharacterMap(INTERNAL.characters[asString(server)])[asString(charId)] === undefined) {
        asCharacterMap(INTERNAL.characters[asString(server)])[asString(charId)] = asCharacterRecord(
          {}
        )
        newCharacter = true
      }
      const char = asCharacterRecord(
        asCharacterMap(INTERNAL.characters[asString(server)])[asString(charId)]
      )

      if (char.timestamp !== undefined && char.timestamp >= timestamp) {
        INTERNAL.Msg(zo_strformat(SI_LCK_SHARE_IMPORT_STALE, server, charName))
      } else {
        char.account = DecorateDisplayName(asString(account))
        char.name = asString(charName)
        char.timestamp = timestamp

        const packedList: string[] = [...zo_strsplit(";", asString(knowledge))]
        for (const [, packed] of ipairs(packedList)) {
          const [category, splitData, splitData2] = zo_strsplit(":", packed)
          let payload = asString(splitData)
          if (splitData2 !== undefined) {
            payload = string.format("%s:%s", payload, splitData2)
          }
          asRecord(char)[asString(category)] = LCCC.Chunk(LCCC.Explode(payload))
        }

        imported = imported + 1

        INTERNAL.Msg(
          zo_strformat(
            SI_LCK_SHARE_IMPORT_DONE,
            server,
            charName,
            os.date("%Y/%m/%d %H:%M", timestamp)
          )
        )
      }
    } else {
      INTERNAL.Msg(zo_strformat(SI_LCK_SHARE_IMPORT_API, server, charName))
    }
  }

  return $multi(imported, undefined, newCharacter)
}

LCCC.RunAfterInitialLoadscreen(function (this: void): undefined {
  LDEI.RegisterProcessor(SHARE_TAG, function (this: void, dataset): undefined {
    const [importedCount, stringId, newCharacter] = INTERNAL.ProcessImportData(dataset)

    if (importedCount > 0) {
      INTERNAL.caches = {}
      INTERNAL.NotifyRefresh(newCharacter)
    }

    if (stringId !== undefined) {
      INTERNAL.Msg(GetString(stringId))
    }

    if (newCharacter) {
      INTERNAL.Msg(GetString(SI_LCK_SHARE_IMPORT_NEWCHARACTER))
    }

    INTERNAL.Msg(zo_strformat(SI_LCK_SHARE_IMPORT_TALLY, importedCount))
    INTERNAL.shareText = ""
  })
})
