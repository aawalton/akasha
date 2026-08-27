interface BankMenuBar extends Control {
  m_object: {
    m_clickedButton: {
      m_buttonData: {
        descriptor?: number
      }
    }
  }
}

declare const ZO_HouseBankMenuBar: BankMenuBar
declare const ZO_PlayerInventoryMenuBar: BankMenuBar
declare const ZO_PlayerBankMenuBar: BankMenuBar
declare const ZO_GuildBankMenuBar: BankMenuBar

declare const ZO_SelectGuildBankDialog: Control

declare const SI_BANK_DEPOSIT: number
declare const SI_BANK_WITHDRAW: number

declare const CHARACTER_WINDOW_FRAGMENT: SceneFragment
declare const CHARACTER_WINDOW_STATS_FRAGMENT: SceneFragment
declare const LEFT_PANEL_BG_FRAGMENT: SceneFragment

declare function ZO_MenuBar_SelectDescriptor(
  this: void,
  menuBar: object,
  descriptor: number,
  reselectIfSelected?: boolean
): void

interface SceneManager {
  IsShowing(scene: Scene): boolean
}

interface WindowManager {
  IsSecureRenderModeEnabled(): boolean
}

interface NotificationProvider {
  Accept?: (this: void, data: unknown) => void
  Decline?: (this: void, data: unknown) => void
}

interface NotificationsListRow {
  TypeId: number
  data?: {
    provider?: NotificationProvider
  }
}

interface NotificationsList {
  data: ReadonlyArray<NotificationsListRow>
}

interface NotificationManagerSingleton {
  totalNumNotifications: number
  sortFilterList?: {
    control?: Control
    list?: NotificationsList
  }
}

declare const NOTIFICATIONS_LFG_READY_CHECK_DATA: number

declare const ZO_MainMenuCategoryBarButton1: Control | undefined
declare const ZO_MainMenuCategoryBarButton1RemainingCrowns: Control | undefined
declare const ZO_MainMenuCategoryBarButton1Membership: Control | undefined
declare const ZO_MainMenuCategoryBarButton2: Control | undefined
declare const ZO_MainMenuCategoryBarPaddingBar1: Control

declare const SI_BINDING_NAME_FCOCS_ADDON_SETTINGS_MENU: number

interface LibAddonMenuHandle {
  OpenToPanel?: (this: LibAddonMenuHandle, panel: unknown) => void
  currentAddonPanel?: unknown
}

interface LibMainMenu2MenuItemData {
  binding?: string
  categoryName?: string | number
  callback?: (this: void) => void
  visible?: (this: void) => boolean
  normal?: string
  pressed?: string
  highlight?: string
  disabled?: string
}

interface LibMainMenu2 {
  Init: (this: LibMainMenu2) => void
  AddMenuItem: (this: LibMainMenu2, descriptor: string, data: LibMainMenu2MenuItemData) => void
}
