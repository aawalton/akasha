import { matName } from "../writ-i18n/writ-i18n.module.code.ts"
import { findLink } from "../writ-link-data/writ-link-data.module.code.ts"
import type { GoldAmount, MatList, MatRow } from "../writ-types/writ-types.module.code.ts"
import { fail, matHaveCt, matPrice, toMoney } from "../writ-util/writ-util.module.code.ts"

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

export function matRowFromName(matNameText: string, ct?: number): MatRow | undefined {
  const o = newMatRow()
  o.name = matNameText
  o.link = findLink(matNameText)
  if (o.link === undefined) {
    return fail("link not found:" + tostring(matNameText))
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

export function matRowFromLink(matLink: string, ct?: number): MatRow | undefined {
  const o = newMatRow()
  o.name = zo_strformat("<<1>>", GetItemLinkName(matLink))
  o.link = matLink
  if (o.link === undefined || o.link === "") {
    return fail("name not found:" + tostring(matLink))
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

export function listDump(matList: MatList | undefined): undefined {
  if (matList === undefined) {
    return
  }
  for (const row of matList) {
    const rowTotal = row.Total()
    d(
      toMoney(rowTotal) +
        "g = " +
        tostring(row.ct) +
        "x " +
        toMoney(row.mm) +
        "g " +
        tostring(row.link)
    )
  }
  const total = listTotal(matList)
  d(toMoney(total) + "g total")
}

export function listTotal(matList: MatList | undefined): GoldAmount {
  if (matList === undefined) {
    return undefined
  }
  let total: GoldAmount = 0
  for (const row of matList) {
    const rowTotal = row.Total()
    if (rowTotal !== undefined && total !== undefined) {
      total = total + rowTotal
    } else {
      total = TemperWrit.GOLD_UNKNOWN
    }
  }
  return total
}

export interface MatRowNamespace {
  New: (this: MatRowNamespace) => MatRow
  FromName: (this: void, matName: string, ct?: number) => MatRow | undefined
  FromLink: (this: void, matLink: string, ct?: number) => MatRow | undefined
  ListDump: (this: void, matList: MatList | undefined) => undefined
  ListTotal: (this: void, matList: MatList | undefined) => GoldAmount
}

const MAT_ROW_NAMESPACE: MatRowNamespace = {
  New: newMatRow,
  FromName: matRowFromName,
  FromLink: matRowFromLink,
  ListDump: listDump,
  ListTotal: listTotal,
}

TemperWrit.MatRow = MAT_ROW_NAMESPACE
