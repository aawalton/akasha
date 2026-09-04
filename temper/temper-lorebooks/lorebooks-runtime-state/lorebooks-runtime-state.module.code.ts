import type {
  BookshelfEntry,
  EideticBookZoneEntry,
  ShalidorMapData,
} from "../lorebooks-types/lorebooks-types.module.code.ts"

export interface LoreBooksRuntimeState {
  lorebooks: ShalidorMapData | undefined
  bookshelves: readonly BookshelfEntry[] | undefined
  eideticBooks: EideticBookZoneEntry[] | undefined

  lastZoneShalidor: string
  lastMapIpShalidor: number
  lastZoneBookshelf: string
  lastMapIpBookshelf: number
  lastZoneEidetic: string
  lastMapIpEidetic: number

  shownBookId: number | undefined
  currentOpenBook: string | undefined
  lastReadBook: string | undefined

  currentBookshelfLocale: string

  collectionInfoCache: Record<
    string,
    readonly [string, string, number, number, boolean, string, number] | undefined
  >
}

export const STATE: LoreBooksRuntimeState = {
  lorebooks: undefined,
  bookshelves: undefined,
  eideticBooks: undefined,
  lastZoneShalidor: "",
  lastMapIpShalidor: 0,
  lastZoneBookshelf: "",
  lastMapIpBookshelf: 0,
  lastZoneEidetic: "",
  lastMapIpEidetic: 0,
  shownBookId: undefined,
  currentOpenBook: undefined,
  lastReadBook: undefined,
  currentBookshelfLocale: "en",
  collectionInfoCache: {},
}
