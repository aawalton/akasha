import { buildInitialState } from "../media-data/media-data.module.code.ts"
import type { LibMediaProviderApi, ProviderState } from "../media-types/media-types.module.code.ts"

let state: ProviderState

function rebuildMediaList(mediatype: string): undefined {
  const mt = state.mediaTable[mediatype]
  if (mt === undefined) return
  let mlist = state.mediaList[mediatype]
  if (mlist === undefined) {
    mlist = []
    state.mediaList[mediatype] = mlist
  }
  let i = 0
  for (const k in mt) {
    mlist[i] = k
    i = i + 1
  }
  mlist.sort()
}

function register(mediatype: string, key: string, data: string): boolean {
  if (type(mediatype) !== "string") {
    error(
      `${state.name}:Register(mediatype, key, data) - mediatype must be string, got ${type(mediatype)}`
    )
  }
  if (type(key) !== "string") {
    error(`${state.name}:Register(mediatype, key, data) - key must be string, got ${type(key)}`)
  }
  const mt = mediatype.toLowerCase()
  let sub = state.mediaTable[mt]
  if (sub === undefined) {
    sub = {}
    state.mediaTable[mt] = sub
  }
  let shared = state.sharedMediaTable[mt]
  if (shared === undefined) {
    shared = {}
    state.sharedMediaTable[mt] = shared
  }
  if (sub[key] !== undefined) return false
  sub[key] = data
  shared[key] = data
  rebuildMediaList(mt)
  CALLBACK_MANAGER.FireCallbacks("LibMediaProvider_Registered", mt, key)
  return true
}

function fetch(mediatype: string, key: string): string | undefined {
  const mtt = state.mediaTable[mediatype]
  if (
    IsConsoleUI() &&
    mediatype === state.mediaType.FONT &&
    key !== undefined &&
    state.blacklistedFont[key] === true
  ) {
    return "$(MEDIUM_FONT)"
  }
  let result: string | undefined
  const fromKey = mtt !== undefined ? mtt[key] : undefined
  if (fromKey !== undefined) {
    result = fromKey
  } else {
    const def = state.defaultMedia[mediatype]
    result = def !== undefined && mtt !== undefined ? mtt[def] : undefined
  }
  return result !== undefined && result !== "" ? result : undefined
}

function isValid(mediatype: string, key?: string): boolean {
  if (
    IsConsoleUI() &&
    mediatype === state.mediaType.FONT &&
    key !== undefined &&
    state.blacklistedFont[key] === true
  ) {
    return false
  }
  const mtt = state.mediaTable[mediatype]
  if (mtt === undefined) return false
  if (key === undefined) return true
  return mtt[key] !== undefined
}

function hashTable(mediatype: string): Record<string, string> | undefined {
  return state.sharedMediaTable[mediatype]
}

function list(mediatype: string): string[] | undefined {
  if (state.mediaTable[mediatype] === undefined) {
    return undefined
  }
  if (state.mediaList[mediatype] === undefined) {
    rebuildMediaList(mediatype)
  }
  return state.mediaList[mediatype]
}

function getDefault(mediatype: string): string | undefined {
  return state.defaultMedia[mediatype]
}

function setDefault(mediatype: string, key: string): boolean {
  const mt = state.mediaTable[mediatype]
  if (mt !== undefined && mt[key] !== undefined && state.defaultMedia[mediatype] === undefined) {
    state.defaultMedia[mediatype] = key
    return true
  }
  return false
}

export function createProvider(): LibMediaProviderApi {
  state = buildInitialState()

  const mediaTableStub: Record<string, Record<string, never>> = {}
  for (const v of [
    state.mediaType.BACKGROUND,
    state.mediaType.BORDER,
    state.mediaType.FONT,
    state.mediaType.STATUSBAR,
    state.mediaType.SOUND,
  ]) {
    mediaTableStub[v] = {}
  }

  const external: LibMediaProviderApi = {
    Register(this: LibMediaProviderApi, mediatype, key, data) {
      return register(mediatype, key, data)
    },
    Fetch(this: LibMediaProviderApi, mediatype, key) {
      return fetch(mediatype, key)
    },
    IsValid(this: LibMediaProviderApi, mediatype, key) {
      return isValid(mediatype, key)
    },
    HashTable(this: LibMediaProviderApi, mediatype) {
      return hashTable(mediatype)
    },
    List(this: LibMediaProviderApi, mediatype) {
      return list(mediatype)
    },
    GetDefault(this: LibMediaProviderApi, mediatype) {
      return getDefault(mediatype)
    },
    SetDefault(this: LibMediaProviderApi, mediatype, key) {
      return setDefault(mediatype, key)
    },
    MediaType: state.mediaType,
    MediaTable: mediaTableStub,
  }
  return external
}
