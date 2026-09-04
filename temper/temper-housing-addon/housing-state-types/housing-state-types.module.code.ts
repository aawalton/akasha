import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import type { LamDropdownData } from "@akasha/temper-settings-panel/dropdown"
import type {
  ColorRGBALower,
  ColorRGBAUpper,
  LibraryEntry,
  SavedVars,
  VcChatAllowed,
} from "../housing-types/housing-types.module.code.ts"

export interface ConfigSize {
  width: number
  height: number
  headerHeight: number
  headerHeightOffset: number
  gap: number
}

export interface ConfigSearch {
  max: number
  height: number
  width: number
  minChars: number
}

export interface ConfigColor {
  default: ColorRGBAUpper
  backdrop: ColorRGBAUpper
  backdropEdge: ColorRGBAUpper
  searchBackdrop: ColorRGBAUpper
  searchBackdropEdge: ColorRGBAUpper
  backDropLine: ColorRGBAUpper
  visitCardFontColor: ColorRGBAUpper
  selectedVisitCardColor: ColorRGBAUpper
  selectedVisitCardColorOnMouseOver: ColorRGBAUpper
  tabSelected: ColorRGBALower
  tabNotSelected: ColorRGBALower
  tabMouseOver: ColorRGBALower
  edgeColor: ColorRGBALower
  tabFontColor: ColorRGBALower
}

export interface ConfigVcSize {
  width: number
  height: number
  headerHeight: number
  headerHeightOffset: number
  gap: number
}

export interface ConfigVc {
  size: ConfigVcSize
}

export interface Config {
  size: ConfigSize
  isMovable: boolean
  isMouseEnabled: boolean
  isClampedToScreen: boolean
  fonts: { header: string }
  search: ConfigSearch
  color: ConfigColor
  vc: ConfigVc
  tabHeight: number
  tabWidth: number
  tabOffset: number
  tabFont: string
  houseDebug: boolean
}

export interface PortToFriendControls extends Record<string, unknown> {
  favorites: Record<number, unknown>[]
  searchResults: Record<number, unknown>[]
  searchResultsBackdrop: Control[]
  libraryEntries: Record<number, unknown>[]
  purchasedHouses: Record<number, unknown>[]
  TLW?: Control
}

export interface PortToFriendAddonState {
  houseId: number
  isScrollable: boolean
  isVCScrollable: boolean
  isMyHousesScrollable: boolean
  names: string[]
  searchResultClicked: boolean
  taintedVisitCards: boolean
  selectedVisitCard: number
  highlightedVisitCard: number | undefined
  windowCallback: ((this: void) => void) | undefined
  selectedTab: number
  selectedLibraryFilter: number
  selectedLibrarySort: number
  categoryFilterInitialized: boolean
  LibrarySortInitialized: boolean
  selectedMyHousesSort: number
  sortInitialized: boolean
  searchResult?: string[] | undefined
  VCLocationCalculated?: boolean
}

export interface PortToFriendDefaults {
  vc_chatAllowed: VcChatAllowed
  vc: { allowSelf: boolean }
  port_mode: number
  defaultTab: number
}

export interface PortToFriendHacks {
  callbackName: string
  callbackInterval: number
  contextMenuHackUpdated?: boolean
}

export interface PortToFriendData {
  euData: LibraryEntry[]
  naData: LibraryEntry[]
  currentData: LibraryEntry[]
  CreateEuDataList: (this: void) => void
  CreateNaDataList: (this: void) => void
  CreateDataList: (this: void) => void
  GetLibraryData: (this: void) => LibraryEntry[]
}

export type LamOption = LamDropdownData | Record<string, unknown>

export interface PortToFriendMenuLam extends Record<string, unknown> {
  panel?: unknown
  panelData: Record<string, unknown>
  optionsData?: LamOption[]
}

export interface PortToFriendMenuHolder {
  name: string
  lam: PortToFriendMenuLam
  Initialize: (this: void, menuName: string, vars: SavedVars) => void
  CreateMenuFromVars: (this: void, vars: SavedVars) => LamOption[]
}
