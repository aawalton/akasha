import { newAlchemyParser } from "./alchemy-parser"
import { newEnchantingParser } from "./enchanting-parser"
import { str } from "./i18n"
import { listTotal } from "./mat-row"
import { newProvisioningParser } from "./provisioning-parser"
import { newSmithingParser } from "./smithing-parser"
import type { GoldAmount, KnowList, MatList, Parser } from "./types"
import { fail, round, toWritFields } from "./util"
import type { TemperWritSavedVariables } from "./writworthy-global"

type ParserFactory = (this: void) => Parser

const ICON_TO_PARSER: Record<string, ParserFactory> = {
  "/esoui/art/icons/master_writ_blacksmithing.dds": newSmithingParser,
  "/esoui/art/icons/master_writ_clothier.dds": newSmithingParser,
  "/esoui/art/icons/master_writ_woodworking.dds": newSmithingParser,
  "/esoui/art/icons/master_writ_jewelry.dds": newSmithingParser,
  "/esoui/art/icons/master_writ_alchemy.dds": newAlchemyParser,
  "/esoui/art/icons/master_writ_enchanting.dds": newEnchantingParser,
  "/esoui/art/icons/master_writ_provisioning.dds": newProvisioningParser,
}

export function createParser(this: void, item_link: string): Parser | undefined {
  const [icon] = GetItemLinkInfo(item_link)
  const parser_factory = ICON_TO_PARSER[icon]
  if (parser_factory === undefined) {
    return undefined
  }
  return parser_factory()
}

export function toMatKnowList(
  this: void,
  item_link: string
): LuaMultiReturn<
  [mat_list: MatList | undefined, know_list: KnowList | undefined, parser: Parser | undefined]
> {
  const parser = createParser(item_link)
  if (parser === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  if (parser.ParseItemLink(item_link) === undefined) {
    fail("TemperWrit: " + (str("err_could_not_parse") ?? ""))
    return $multi(undefined, undefined, parser)
  }
  const mat_list = parser.ToMatList()
  const know_list: KnowList | undefined = parser.ToKnowList()
  return $multi(mat_list, know_list, parser)
}

export function toMatCost(this: void, item_link: string): number | undefined {
  const sv: TemperWritSavedVariables = TemperWrit.savedVariables ?? {}
  const save_mat_list_chat = sv["enable_mat_list_chat"]
  sv["enable_mat_list_chat"] = undefined

  const [mat_list] = toMatKnowList(item_link)
  const mat_total = listTotal(mat_list)

  sv["enable_mat_list_chat"] = save_mat_list_chat
  return round(mat_total)
}

export function toVoucherCount(this: void, item_link: string): number {
  const fields = toWritFields(item_link)
  const [quotient, remainder] = math.modf((fields.writ_reward ?? 0) / 10000)
  const writcount = quotient + math.floor(0.5 + remainder)
  return writcount
}

export function toLinkBaseText(this: void, item_link: string | undefined): string | undefined {
  if (item_link === undefined) {
    return undefined
  }
  const base_text = GenerateMasterWritBaseText(item_link)
  const writ_text = GenerateMasterWritRewardText(item_link)
  const [req_text] = string.gsub(base_text, ".*\n", "")
  return item_link + "\t" + req_text + "\t" + writ_text
}

export function uniqueID(this: void, bag_id: number, slot_index: number): string {
  const id64 = GetItemUniqueId(bag_id, slot_index)
  if (id64 === undefined) {
    return ""
  }
  const unique_id = Id64ToString(id64)
  return unique_id
}

export interface ScannedWrit {
  item_link: string
  parser: Parser
  unique_id: string
}

export function scanInventoryForMasterWrits(this: void): ScannedWrit[] {
  const result_list: ScannedWrit[] = []
  const sv = TemperWrit.savedVariables ?? {}
  let bag_list = [BAG_BACKPACK]
  if (sv.enable_banked_vouchers === true) {
    bag_list = [BAG_BACKPACK, BAG_BANK, BAG_SUBSCRIBER_BANK]
  }

  const save_mat_list_chat = sv.enable_mat_list_chat
  sv.enable_mat_list_chat = undefined

  for (const bag_id of bag_list) {
    const slot_ct = GetBagSize(bag_id)
    for (let slot_index = 0; slot_index <= slot_ct; slot_index = slot_index + 1) {
      const item_link = GetItemLink(bag_id, slot_index, LINK_STYLE_DEFAULT)
      let parser = createParser(item_link)
      if (parser === undefined || parser.ParseItemLink(item_link) === undefined) {
        parser = undefined
      }
      if (parser !== undefined) {
        const unique_id = uniqueID(bag_id, slot_index)
        const inventory_data: ScannedWrit = {
          item_link,
          parser,
          unique_id,
        }
        result_list[result_list.length] = inventory_data
      }
    }
  }

  sv.enable_mat_list_chat = save_mat_list_chat
  return result_list
}

TemperWrit.ICON_TO_PARSER = ICON_TO_PARSER
TemperWrit.CreateParser = createParser
TemperWrit.ToMatKnowList = toMatKnowList
TemperWrit.ToMatCost = toMatCost
TemperWrit.ToVoucherCount = toVoucherCount
TemperWrit.ToLinkBaseText = toLinkBaseText
TemperWrit.ScanInventoryForMasterWrits = scanInventoryForMasterWrits
TemperWrit.UniqueID = uniqueID

export type { GoldAmount }
