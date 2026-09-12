export interface ColorRGBAUpper {
  R: number
  G: number
  B: number
  A?: number
}

export interface ColorRGBALower {
  r: number
  g: number
  b: number
  a?: number
}

export interface Favorite {
  name: string
  houseId: number
  id?: number
}

export interface VisitCard {
  name: string
  houseId: number
  comment?: string
}

export interface LibraryEntry {
  name: string
  houseId: number
  description: string
  category: number[]
}

export interface VcChatAllowed {
  g1: boolean
  o1: boolean
  g2: boolean
  o2: boolean
  g3: boolean
  o3: boolean
  g4: boolean
  o4: boolean
  g5: boolean
  o5: boolean
  emote: boolean
  say: boolean
  yell: boolean
  group: boolean
  tell: boolean
  zone: boolean
  enzone: boolean
  frzone: boolean
  dezone: boolean
  jpzone: boolean
}

export interface VcSaved {
  allowSelf: boolean
  receivedCards: VisitCard[]
}

export interface WindowPosition {
  x: number
  y: number
}

export type MyHousesFavorites = Record<number, Record<number, number | undefined>>

export interface SavedVars {
  favorites: Favorite[]
  vc: VcSaved
  vc_chatAllowed: VcChatAllowed
  myHousesFavorites: MyHousesFavorites
  port_mode: number
  defaultTab: number
  position?: WindowPosition
  selectedMyHousesSort?: number
  selectedLibraryFilter?: number
  selectedLibrarySort?: number
}

export interface PurchasedHouse {
  name: string
  location: string
}

export interface SortedMyHouse {
  houseId: number
  houseName: string
  location: string
}
