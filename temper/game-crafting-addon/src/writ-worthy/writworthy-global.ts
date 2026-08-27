import type { AlchemyNamespace } from "./alchemy-data"
import type { EnchantingNamespace } from "./enchanting-parser"
import type { KnowNamespace } from "./know"
import type { LogNamespace } from "./log"
import type { MatRowNamespace } from "./mat-row"
import type { ProfilerNamespace } from "./profiler"
import type { ProvisioningNamespace } from "./provisioning-data"
import type { RequiredSkillNamespace } from "./required-skill"
import type { SmithingNamespace } from "./smithing"
import type { GoldAmount } from "./types"
import type { UtilNamespace } from "./util"

export interface WritSavedChariable {
  state?: string | undefined
  use_mimic?: boolean
  last_seen_ts?: number | undefined
}

export interface TemperWritSavedVariables {
  filter_max_gold_per_voucher?: number | undefined
  enable_banked_vouchers?: boolean
  enable_station_colors?: boolean
  lang?: string | undefined
  enable_mat_price_tooltip?: boolean
  enable_mat_list_chat?: string | number
  enable_mm_price?: boolean
  enable_att_price?: boolean
  enable_ttc_price?: boolean
  enable_mat_list_tooltip?: string | number
  position?: Record<number, number>
  show_confirm_master_writ_duplicates?: boolean
  [key: string]: unknown
}

export interface TemperWritSavedChariables {
  writ_unique_id?: Record<string, WritSavedChariable | undefined>
  [key: string]: unknown
}

export interface TemperWritGlobal {
  name: string
  version: string

  Util?: UtilNamespace
  Log?: LogNamespace
  Logger?: typeof import("./log").logger
  LogOne?: typeof import("./log").logOne
  LogOneWarnError?: typeof import("./log").logOneWarnError
  Know?: KnowNamespace
  MatRow?: MatRowNamespace
  Profiler?: ProfilerNamespace

  Alchemy?: AlchemyNamespace
  Enchanting?: EnchantingNamespace
  Provisioning?: ProvisioningNamespace
  Smithing?: SmithingNamespace
  RequiredSkill?: RequiredSkillNamespace

  Str?: typeof import("./i18n").str
  SI?: typeof import("./i18n").si
  Gear?: typeof import("./i18n").gearName
  SetName?: typeof import("./i18n").setName
  Shorten?: typeof import("./i18n").shortenName
  Mat?: typeof import("./i18n").matName
  Motif?: typeof import("./i18n").motifName
  FoodDrink?: typeof import("./i18n").foodDrink
  LangList?: typeof import("./i18n").langList
  STR_HOW?: typeof import("./i18n").STR_HOW
  I18NStatic?: typeof import("./i18n").i18nStatic
  I18NClientSIDyn?: typeof import("./i18n").i18nClientSiDyn
  I18NFoodDrinkDyn?: typeof import("./i18n").i18nFoodDrinkDyn
  I18NGearDyn?: typeof import("./i18n").i18nGearDyn
  I18NMotifDyn?: typeof import("./i18n").i18nMotifDyn
  I18NMatDyn?: typeof import("./i18n").i18nMatDyn
  I18NSetDyn?: typeof import("./i18n").i18nSetDyn
  lang_list?: string[]
  LibSets?: (
    this: void
  ) => { GetSetName: (this: void, set_id: number) => string | undefined } | undefined

  LINK?: typeof import("./generated/link-data-table.generated").LINK
  FindLink?: typeof import("./link-data").findLink
  ToLinkKey?: typeof import("./link-data").toLinkKey
  FALLBACK_PRICE?: Record<string | number, number | boolean>
  FallbackPrice?: typeof import("./price").fallbackPrice
  PopulateTableWithItemIds?: typeof import("./price").populateTableWithItemIds

  ICON_TO_PARSER?: Record<string, unknown>
  CreateParser?: typeof import("./parser-dispatch").createParser
  ToMatKnowList?: typeof import("./parser-dispatch").toMatKnowList
  ToMatCost?: typeof import("./parser-dispatch").toMatCost
  ToVoucherCount?: typeof import("./parser-dispatch").toVoucherCount
  ToLinkBaseText?: typeof import("./parser-dispatch").toLinkBaseText
  ScanInventoryForMasterWrits?: (this: void) => import("./parser-dispatch").ScannedWrit[]
  UniqueID?: typeof import("./parser-dispatch").uniqueID

  TooltipInsertOurText?: typeof import("./tooltip").tooltipInsertOurText
  TooltipInterceptInstall?: typeof import("./tooltip").tooltipInterceptInstall
  MatTooltipText?: typeof import("./tooltip").matTooltipText
  KnowTooltipText?: typeof import("./tooltip").knowTooltipText
  MatHaveCtTooltipText?: typeof import("./tooltip").matHaveCtTooltipText
  CanShowCMWDuplicates?: typeof import("./tooltip").canShowCMWDuplicates
  KnowDump?: typeof import("./tooltip").knowDump

  Forget?: typeof import("./slash-commands").forget
  ServerName?: typeof import("./slash-commands").serverName
  Port?: typeof import("./slash-commands").port
  SlashCommand?: typeof import("./slash-commands").slashCommand
  RegisterSlashCommands?: typeof import("./slash-commands").registerSlashCommands
  server_name?: string
  DiscoverI18N?: (this: void) => void
  AQAddKeyBind?: unknown

  savedVariables?: TemperWritSavedVariables
  savedChariables?: TemperWritSavedChariables

  GOLD_UNKNOWN?: GoldAmount

  [key: string]: unknown
}
