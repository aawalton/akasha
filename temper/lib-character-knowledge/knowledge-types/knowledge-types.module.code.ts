export type Server = string
export type CharId = string
export type Account = string
export type Category = string

export type Knowledge = number

export type ChunkedData = string | string[]

export interface MasterList {
  api: number
  fieldSize: number
  timestamp: number
  recipes?: ChunkedData
  plans?: ChunkedData
  motifs?: ChunkedData
  grimoires?: ChunkedData
  scripts?: ChunkedData
  maxId_grimoires?: number
  maxId_scripts?: number
}

export interface MotifData extends Array<string> {
  metadata: string
}

export interface StyleMotifItems {
  books: number[]
  chapters: Record<number, number>
  number?: number
  crown?: boolean
  achievementId?: number
}

export interface MotifAssociations {
  motifs: Record<number, [number, number]>
  styles: Record<number, StyleMotifItems>
  styleIds: number[]
}

export interface SettingsRecord {
  enabled?: number
  priority?: number
  [category: string]: number | undefined
}

export interface CharacterRecord {
  account: Account
  name: string
  timestamp?: number
  export?: boolean
  settings?: SettingsRecord
  recipes?: ChunkedData
  plans?: ChunkedData
  motifs?: ChunkedData
  sc?: ChunkedData
  rt?: ChunkedData
}

export type CharacterMap = Record<CharId, CharacterRecord>

export interface AccountRecord {
  enabled?: number
  priority?: number
  [param: string]: number | undefined
}

export type AccountMap = Record<Account, AccountRecord>

export interface SavedVars {
  formatVersion: number
  masterList?: MasterList
  diagnostics?: DiagnosticsVars
  defaults?: AccountRecord
  characters?: Record<Server, CharacterMap>
  accounts?: Record<Server, AccountMap>
  noSave?: Record<string, boolean>
}

export interface DiagnosticsVars {
  masterList?: Record<string, number>
  bookCorrections?: Record<CharId, string>
  researchTraits?: number
  researchSignature?: number
  [name: string]: unknown
}

export interface CharacterListEntry {
  id: CharId
  account: Account
  name: string
  knowledge?: Knowledge
  remaining?: number
}

export interface ItemDescriptor {
  itemId?: number
  itemLink?: string
  styleId?: number
  chapterId?: number
}

export type ItemInput = number | string | ItemDescriptor
