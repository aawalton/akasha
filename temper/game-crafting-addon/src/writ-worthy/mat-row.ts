import { matName } from "./i18n"
import { findLink } from "./link-data"
import type { GoldAmount, MatList, MatRow } from "./types"
import { fail, matHaveCt, matPrice, toMoney } from "./util"

export function newMatRow(): MatRow {
  const o: MatRow = {
    name: undefined,
    link: undefined,
    ct: undefined,
    mm: undefined,

    Total(this: MatRow): GoldAmount {
      if (this.ct === undefined) {
        return TemperWrit.GOLD_UNKNOWN
      }
      if (this.mm === undefined) {
        return TemperWrit.GOLD_UNKNOWN
      }
      return this.ct * this.mm
    },
    HaveCt(this: MatRow): number {
      return matHaveCt(this.link ?? "")
    },
  }
  return o
}

export function matRowFromName(mat_name: string, ct?: number): MatRow | undefined {
  const o = newMatRow()
  o.name = mat_name
  o.link = findLink(mat_name)
  if (o.link === undefined) {
    return fail("link not found:" + tostring(mat_name))
  }
  o.name_tr = o.name
  o.item_id = GetItemLinkItemId(o.link)
  o.name = matName(o.item_id)
  if (ct !== undefined) {
    o.ct = tonumber(ct)
  } else {
    o.ct = 1
  }
  o.mm = matPrice(o.link)
  return o
}

export function matRowFromLink(mat_link: string, ct?: number): MatRow | undefined {
  const o = newMatRow()
  o.name = zo_strformat("<<1>>", GetItemLinkName(mat_link))
  o.link = mat_link
  if (o.link === undefined || o.link === "") {
    return fail("name not found:" + tostring(mat_link))
  }
  o.name_tr = o.name
  o.item_id = GetItemLinkItemId(o.link)
  o.name = matName(o.item_id)
  if (ct !== undefined) {
    o.ct = tonumber(ct)
  } else {
    o.ct = 1
  }
  o.mm = matPrice(o.link)
  return o
}

export function listDump(mat_list: MatList | undefined): undefined {
  if (mat_list === undefined) {
    return
  }
  for (const row of mat_list) {
    const row_total = row.Total()
    d(
      toMoney(row_total) +
        "g = " +
        tostring(row.ct) +
        "x " +
        toMoney(row.mm) +
        "g " +
        tostring(row.link)
    )
  }
  const total = listTotal(mat_list)
  d(toMoney(total) + "g total")
}

export function listTotal(mat_list: MatList | undefined): GoldAmount {
  if (mat_list === undefined) {
    return undefined
  }
  let total: GoldAmount = 0
  for (const row of mat_list) {
    const row_total = row.Total()
    if (row_total !== undefined && total !== undefined) {
      total = total + row_total
    } else {
      total = TemperWrit.GOLD_UNKNOWN
    }
  }
  return total
}

export interface MatRowNamespace {
  New: (this: MatRowNamespace) => MatRow
  FromName: (this: void, mat_name: string, ct?: number) => MatRow | undefined
  FromLink: (this: void, mat_link: string, ct?: number) => MatRow | undefined
  ListDump: (this: void, mat_list: MatList | undefined) => void
  ListTotal: (this: void, mat_list: MatList | undefined) => GoldAmount
}

const matRowNamespace: MatRowNamespace = {
  New: newMatRow,
  FromName: matRowFromName,
  FromLink: matRowFromLink,
  ListDump: listDump,
  ListTotal: listTotal,
}

TemperWrit.MatRow = matRowNamespace
