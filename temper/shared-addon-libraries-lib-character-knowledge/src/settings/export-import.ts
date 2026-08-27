import { asRecord, asString } from "../casts"
import { Internal, Public } from "../internal/state"
import { LCCC } from "../lccc"
import type { ExportEntry, ExportEntryMeta } from "../ldei"
import { LDEI } from "../ldei"
import type { AccountMap, CharacterMap, CharacterRecord } from "../types"

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

Internal.CountExportSelection = function (this: void): number {
  let count = 0
  for (const [, server] of ipairs(Public.GetServerList())) {
    for (const [, character] of ipairs(Public.GetCharacterList(server))) {
      const record = asCharacterRecord(asCharacterMap(Internal.characters[server])[character.id])
      if (record.export === true) {
        count = count + 1
      }
    }
  }
  return count
}

Internal.GetExportSelectedText = function (this: void): string {
  return string.format(GetString(SI_LCK_SETTINGS_SHARE_EXPORTS), Internal.CountExportSelection())
}

Internal.ExportSelectText = function (this: void): undefined {
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

Internal.CreateExportEntry = function (
  this: void,
  server,
  charId,
  ignoreExportFlag
): LuaMultiReturn<[string, ExportEntryMeta]> {
  const data = asCharacterMap(Internal.characters[server])[charId]

  if (data !== undefined && (ignoreExportFlag === true || data.export === true)) {
    const knowledge: string[] = []
    for (const [, category] of ipairs(Internal.DataStores)) {
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

Internal.ExportCurrent = function (this: void): undefined {
  const [text] = Internal.CreateExportEntry(Internal.server, Internal.charId, true)
  Internal.shareText = text + " "
  Internal.ExportSelectText()
}

Internal.ExportMultiple = function (this: void, exportAll): undefined {
  const entries: ExportEntry[] = []

  for (const [, server] of ipairs(Public.GetServerList())) {
    for (const [, character] of ipairs(Public.GetCharacterList(server))) {
      const [text, meta] = Internal.CreateExportEntry(server, character.id, exportAll)
      entries.push([text, meta])
    }
  }

  Internal.shareText =
    LDEI.ExportMultiple(entries, function (this: void, ...args: unknown[]): undefined {
      Internal.Msg(zo_strformat(SI_LCK_SHARE_EXPORT_LIMIT, ...args))
    }) + " "
  Internal.ExportSelectText()
}

Internal.Import = function (this: void): undefined {
  if (!LDEI.Import(asString(Internal.shareText), SHARE_TAG)) {
    Internal.Msg(GetString(SI_LCK_SHARE_IMPORT_INVALID))
  }
}

Internal.ProcessImportData = function (
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

      if (Internal.accounts[asString(server)] === undefined) {
        Internal.accounts[asString(server)] = asAccountMap({})
      }
      if (Internal.characters[asString(server)] === undefined) {
        Internal.characters[asString(server)] = asCharacterMap({})
      }
      if (asCharacterMap(Internal.characters[asString(server)])[asString(charId)] === undefined) {
        asCharacterMap(Internal.characters[asString(server)])[asString(charId)] = asCharacterRecord(
          {}
        )
        newCharacter = true
      }
      const char = asCharacterRecord(
        asCharacterMap(Internal.characters[asString(server)])[asString(charId)]
      )

      if (char.timestamp !== undefined && char.timestamp >= timestamp) {
        Internal.Msg(zo_strformat(SI_LCK_SHARE_IMPORT_STALE, server, charName))
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

        Internal.Msg(
          zo_strformat(
            SI_LCK_SHARE_IMPORT_DONE,
            server,
            charName,
            os.date("%Y/%m/%d %H:%M", timestamp)
          )
        )
      }
    } else {
      Internal.Msg(zo_strformat(SI_LCK_SHARE_IMPORT_API, server, charName))
    }
  }

  return $multi(imported, undefined, newCharacter)
}

LCCC.RunAfterInitialLoadscreen(function (this: void): undefined {
  LDEI.RegisterProcessor(SHARE_TAG, function (this: void, dataset): undefined {
    const [importedCount, stringId, newCharacter] = Internal.ProcessImportData(dataset)

    if (importedCount > 0) {
      Internal.caches = {}
      Internal.NotifyRefresh(newCharacter)
    }

    if (stringId !== undefined) {
      Internal.Msg(GetString(stringId))
    }

    if (newCharacter) {
      Internal.Msg(GetString(SI_LCK_SHARE_IMPORT_NEWCHARACTER))
    }

    Internal.Msg(zo_strformat(SI_LCK_SHARE_IMPORT_TALLY, importedCount))
    Internal.shareText = ""
  })
})
