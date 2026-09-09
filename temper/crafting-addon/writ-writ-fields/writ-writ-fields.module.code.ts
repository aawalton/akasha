import type { WritFields } from "../writ-types/writ-types.module.code.ts"

export function toWritFields(itemLink: string): WritFields {
  const x = [...ZO_LinkHandler_ParseLink(itemLink)]
  return {
    text: x[0],
    link_style: tonumber(x[1]),
    unknown3: tonumber(x[2]),
    item_id: tonumber(x[3]),
    sub_type: tonumber(x[4]),
    internal_level: tonumber(x[5]),
    enchant_id: tonumber(x[6]),
    enchant_sub_type: tonumber(x[7]),
    enchant_level: tonumber(x[8]),
    writ1: tonumber(x[9]),
    writ2: tonumber(x[10]),
    writ3: tonumber(x[11]),
    writ4: tonumber(x[12]),
    writ5: tonumber(x[13]),
    writ6: tonumber(x[14]),
    item_style: tonumber(x[15]),
    is_crafted: tonumber(x[16]),
    is_bound: tonumber(x[17]),
    is_stolen: tonumber(x[18]),
    charge_ct: tonumber(x[19]),
    unknown21: tonumber(x[20]),
    unknown22: tonumber(x[21]),
    unknown23: tonumber(x[22]),
    writ_reward: tonumber(x[23]),
  }
}
