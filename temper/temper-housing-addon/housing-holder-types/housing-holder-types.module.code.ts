import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-language-extensions"
import type { PortToFriendConstants } from "../housing-constants/housing-constants.module.code.ts"
import type {
  Config,
  PortToFriendAddonState,
  PortToFriendControls,
  PortToFriendData,
  PortToFriendDefaults,
  PortToFriendHacks,
  PortToFriendMenuHolder,
} from "../housing-state-types/housing-state-types.module.code.ts"
import type {
  Favorite,
  LibraryEntry,
  PurchasedHouse,
  SavedVars,
  SortedMyHouse,
} from "../housing-types/housing-types.module.code.ts"

export interface PortToFriendHolder {
  addonName: string
  version: number
  versionString: string
  updateInterval: number
  author: string
  credits: string
  slashCmd: string
  callbackName: string
  libData: PortToFriendData
  config: Config
  constants: PortToFriendConstants
  controls: PortToFriendControls
  addonState: PortToFriendAddonState
  defaults: PortToFriendDefaults
  savedVars: SavedVars | undefined
  HOUSES: Record<number, string>
  purchasedHouses: Record<number, PurchasedHouse>
  menu: PortToFriendMenuHolder
  hacks: PortToFriendHacks

  PortToFriendOnInitialize: (this: void) => undefined
  OnPlayerDeactivated: (this: void) => void
  SaveWindowLocation: (this: void) => void

  CreateTabControl: (
    this: void,
    rootControl: Control,
    offset: number,
    index: number,
    title: string
  ) => Control
  TabSelected: (this: void, index: number) => void
  TabOnMouseEnter: (this: void, index: number) => void
  TabOnMouseExit: (this: void, index: number) => void

  ContextMenuHackOnUpdate: (this: void) => void
  AdjustContextMenus: (this: void) => void
  SendNameToPTF: (this: void, name: string) => void

  CreateHouseList: (this: void) => Record<number, string>
  GetNumPurchasedHouses: (this: void) => number

  LibraryPanelOnMouseWheel: (this: void, control: Control, delta: number) => void
  FavoritePanelOnMouseWheel: (this: void, control: Control, delta: number) => void
  VCPanelOnMouseWheel: (this: void, control: Control, delta: number) => void
  MyHousesPanelOnMouseWheel: (this: void, control: Control, delta: number) => void
  SearchBoxOnMouseWheel: (this: void, control: Control, delta: number) => void

  IsChatAllowed: (this: void, channelType: number) => boolean
  IsValidPTFString: (this: void, text: string) => boolean
  AddVisitCardFromString: (this: void, rawVisitCard: string) => void
  DoesVisitCardExist: (this: void, entry: { name: string; houseId: number }) => boolean
  AddVisitCard: (this: void, name: string, houseId: number | string, comment: string) => void
  ChatMessageReceived: (
    this: void,
    eventCode: number,
    channelType: number,
    fromName: string,
    text: string,
    isCustomerService: boolean,
    fromDisplayName: string
  ) => void
  CollectibleNotification: (
    this: void,
    eventCode: number,
    collectibleId: number,
    notificationId: number
  ) => void

  SortVisitCards: (this: void) => undefined
  VCBdOnMouseEnter: (this: void, index: number) => void
  VCBdOnMouseExit: (this: void, index: number) => void
  VCBdOnClick: (this: void, index: number) => void
  RefreshVisitCards: (this: void) => void
  AdjustVCSliderSize: (this: void) => void
  UpdateVisitCardList: (this: void) => void
  VCAddFavorite: (this: void) => void
  VCSendVC: (this: void) => void
  VCPort: (this: void) => void
  VCRemoveVC: (this: void) => void
  VCAdjustSlider: (this: void) => void
  CalculateVCLocation: (this: void) => void

  FavoriteToVC: (this: void, index: number) => void
  MyHousesToVC: (this: void, id: number) => void
  SendVisitCardOf: (this: void, name: string, houseId: number, comment: string) => void
  SendVisitCard: (this: void) => void

  SortMyHousesByHouse: (this: void, houseA: SortedMyHouse, houseB: SortedMyHouse) => boolean
  SortMyHousesByLocation: (this: void, houseA: SortedMyHouse, houseB: SortedMyHouse) => boolean
  GetSortedMyHousesList: (this: void) => SortedMyHouse[]
  UpdateMyHouses: (this: void) => void
  MyHousesAdjustSlider: (this: void) => void

  AdjustLibrarySlider: (this: void) => void
  AdjustSlider: (this: void) => void
  AdjustLibrarySliderSize: (this: void) => void
  AdjustMyHousesSliderSize: (this: void) => void
  AdjustSliderSize: (this: void) => void

  SortFriends: (this: void) => Favorite[] | undefined
  GetFavorites: (this: void) => Favorite[] | undefined
  ClearLibraryControls: (this: void, index: number) => void
  ClearFavoriteControls: (this: void, index: number) => void

  BdOnMouseEnter: (this: void, index: number) => void
  BdOnMouseExit: (this: void, index: number) => void
  BdLibraryEntryOnMouseEnter: (this: void, index: number) => void
  BdLibraryEntryOnMouseExit: (this: void, index: number) => void
  BdMyHousesOnMouseEnter: (this: void, index: number) => void
  BdMyHousesOnMouseExit: (this: void, index: number) => void

  FavoriteCallback: (
    this: void,
    control: Control | undefined,
    text: string | number,
    choice: unknown,
    index: number
  ) => void
  MyHouseFavoriteCallback: (
    this: void,
    control: Control | undefined,
    text: string | number,
    choice: unknown,
    index: number,
    portType: number
  ) => void
  GetFavoriteIdFromMyHouseId: (this: void, id: number, portType: number) => number | undefined
  CreateFavoriteCombobox: (
    this: void,
    index: number,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    container: Control,
    value: number | undefined
  ) => void
  CreatePortMyHouseFavorite: (
    this: void,
    index: number,
    width: number,
    height: number,
    offsetX: number,
    container: Control,
    value: number | undefined,
    portType: number,
    id: number
  ) => void

  GetFilteredLibraryData: (this: void) => LibraryEntry[]
  SortFilteredLibraryData: (this: void, data: LibraryEntry[]) => LibraryEntry[]
  GetCategoryString: (this: void, categories: number[]) => string
  LibraryEntryNoteOnMouseEnter: (this: void, index: number, control: Control) => void
  LibraryEntryNoteOnMouseExit: (this: void, index: number) => void
  CreateLibraryEntries: (this: void) => void
  UpdateLibraryEntries: (this: void) => void

  CreateFavorites: (this: void) => void

  OpenWindowKeyBinding: (this: void) => void
  PortToFavoriteBinding: (this: void, favId: number) => boolean
  PortToMyHouseBinding: (this: void, id: number, portType: number) => boolean

  JumpToHouse: (this: void, name: string, id: number) => void
  Version12NameFix: (this: void, id: number) => void
  PortToLibraryEntry: (this: void, id: number) => void
  PortToFavorite: (this: void, id: number) => void
  PortToMyHousesById: (this: void, id: number, outside: boolean) => void
  PortToMainResidence: (this: void) => void
  JumpToDefaultHouse: (this: void, player: string) => void

  RemoveFavorite: (this: void, id: number) => void
  EntryExists: (this: void, name: string, houseId: number) => boolean
  AddFavorite: (this: void, name: string, houseId: number) => void
  AddToFavorite: (this: void) => void

  PortToFriend: (this: void) => void
  GetIdFromName: (this: void, name: string) => number

  DropdownCallback: (this: void, control: Control, text: string, choice: unknown) => void
  CategoryDropdownCallback: (
    this: void,
    control: Control,
    text: string,
    choice: { filterId: number }
  ) => void
  LibrarySortDropdownCallback: (
    this: void,
    control: Control,
    text: string,
    choice: { filterId: number }
  ) => void
  SortDropdownCallback: (
    this: void,
    control: Control,
    text: string,
    choice: { sortId: number }
  ) => void
  CloneTable: (
    this: void,
    origTable: Record<number | string, unknown>
  ) => Record<number | string, unknown>
  SortHouseList: (this: void, names: Record<number, string>) => string[] | undefined
  CreateSortedHouseList: (this: void) => string[] | undefined
  CreateCategoryFilterList: (this: void) => Record<number, string>
  CreateLibrarySortFilterList: (this: void) => Record<number, string>
  CreateDropdownEntries: (this: void, dropdown: unknown) => void
  CreateCategoryDropdownEntries: (this: void, dropdown: unknown) => void
  CreateLibrarySortDropdownEntries: (this: void, dropdown: unknown) => void
  CreateSortDropdownEntries: (this: void, dropdown: unknown) => void

  CreateEditbox: (this: void, container: Control) => LuaMultiReturn<[Control, Control]>
  CreateSearchBox: (
    this: void,
    container: Control,
    offsetX: number,
    offsetY: number,
    width: number
  ) => Control
  AdjustSearchSlider: (this: void) => void

  OpenWindow: (this: void, callback?: (this: void) => void) => void
  CloseWindow: (this: void) => void
  ShowHelp: (this: void) => void

  ClearNameList: (this: void) => void
  StringStartsWith: (this: void, theString: string, startsWith: string) => boolean
  SearchEntryOnClicked: (this: void, id: number) => void
  SearchEntryOnMouseEnter: (this: void, id: number) => void
  SearchEntryOnMouseExit: (this: void, id: number) => void
  SetSearchResults: (this: void, names: string[] | undefined) => void
  SearchTextChanged: (this: void) => void
  SortPairs: (this: void, names: Record<number, string> | undefined) => string[] | undefined
  SortSearchNames: (this: void, names: string[] | undefined) => string[] | undefined
  SearchNames: (this: void, name: string) => string[] | undefined
  AddNameToNameList: (this: void, name: string) => void
  CreateGuildAndFriendList: (this: void) => void

  ParseCmd: (this: void, cmd: string, param: string) => LuaMultiReturn<[string, string]>
}
