export interface LoreBooksPinTexture {
  type: number
  size: number
  level: number
}

export interface LoreBooksSavedVars {
  compassMaxDistance: number
  pinTexture: LoreBooksPinTexture
  pinGrayscale: boolean
  pinTextureEidetic: number
  pinGrayscaleEidetic: boolean
  filters: Record<string, boolean>
  unlockEidetic: boolean
  immersiveMode: number
  showClickMenu: boolean
  showDungeonTag: boolean
  showQuestName: boolean
}

export interface ShalidorPinEntry {
  readonly 1: number
  readonly 2: number
  readonly 3: number
  readonly 4: number
  readonly 5?: number
  readonly 6?: number
  readonly worldY?: number
  readonly ld?: readonly number[]
}

export type ShalidorMapData = readonly ShalidorPinEntry[]

export type ShalidorDataTable = Record<number, ShalidorMapData>

export type AchievementIdTable = Record<number, number | readonly number[]>

export interface EideticLibraryCollection {
  readonly d?: string
  readonly g?: string
  readonly h?: boolean
  readonly k?: number
  readonly n?: string
  readonly t?: number
}

export type EideticLibraryCategory = Record<number, EideticLibraryCollection>

export type EideticLibraryTable = Record<number, EideticLibraryCategory>

export interface EideticBookZoneEntry {
  pm?: number
  zm?: number
  px?: number
  py?: number
  gp?: boolean
  c?: number
  b?: number
  k?: number
  q?: number
  d?: boolean
  fp?: boolean
  i?: number
  l?: boolean
  ld?: number
  mn?: number
  pnx?: number
  pny?: number
  qc?: boolean
  qp?: boolean
  r?: boolean
  sm?: number
  x?: number
  y?: number
  z?: number
  zt?: number
  zx?: number
  zy?: number
  4?: EideticBookZoneEntry
}

export interface EideticBook {
  c?: boolean
  cn?: string
  e?: EideticBookZoneEntry[]
  m?: Record<number, number | boolean>
  n?: string | number
  r?: boolean
  k?: number
  q?: number
  l?: boolean
  en?: string
}

export type EideticBookTable = Record<number, EideticBook>

export interface BookshelfEntry {
  readonly x: number
  readonly y: number
  readonly z: number
}

export type BookshelfTable = Record<number, readonly BookshelfEntry[]>

export type LoreCollectionInfo = LuaMultiReturn<
  [string, string, number, number, boolean, string, number]
>
