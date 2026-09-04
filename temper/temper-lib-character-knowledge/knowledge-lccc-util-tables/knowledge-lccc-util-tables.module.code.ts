import { asNumber, asRecord, asTable } from "../knowledge-casts/knowledge-casts.module.code.ts"

export function getSortedKeys(
  this: void,
  tbl: Record<string | number, unknown>,
  first?: string | number,
  compare?: (this: void, a: string | number, b: string | number) => boolean
): Array<string | number> {
  const keys: Array<string | number> = []
  for (const [key] of pairs(tbl)) {
    keys.push(key)
  }
  table.sort(keys, (a: string | number, b: string | number): boolean => {
    if (a === first) {
      return true
    } else if (b === first) {
      return false
    } else if (compare !== undefined) {
      return compare(a, b)
    } else {
      return asNumber(a) < asNumber(b)
    }
  })
  return keys
}

export function countTable(this: void, tbl: Record<string | number, unknown>): number {
  let count = 0
  for (const [, value] of pairs(tbl)) {
    if (value !== undefined) {
      count = count + 1
    }
  }
  return count
}

export function processNumericTable(
  this: void,
  tbl: Array<number | unknown>,
  func: (this: void, value: number | unknown, index: number, ...extra: unknown[]) => void,
  ...extra: unknown[]
): undefined {
  let index = 0
  let prev = 0
  for (const i of tbl) {
    const isNumber = type(i) === "number"
    if (isNumber && asNumber(i) < 0) {
      for (let j = prev + 1; j <= -asNumber(i); j++) {
        index = index + 1
        func(j, index, ...extra)
      }
    } else {
      index = index + 1
      func(i, index, ...extra)
      if (isNumber) {
        prev = asNumber(i)
      }
    }
  }
}

export function mergeTables(
  this: void,
  dest: unknown,
  src: Record<string | number, unknown>,
  overwrite?: number
): Record<string | number, unknown> {
  let target = dest
  if (type(target) !== "table") {
    target = {}
  }
  const destRec = asRecord(target)
  for (const [k, v] of pairs(src)) {
    if (overwrite === 2 || destRec[k] === undefined) {
      if (type(v) === "table") {
        destRec[k] = mergeTables(destRec[k], asTable(v), overwrite)
      } else {
        destRec[k] = v
      }
    } else if (overwrite === 1 && type(destRec[k]) === "table" && type(v) === "table") {
      mergeTables(destRec[k], asTable(v), overwrite)
    }
  }
  return destRec
}

export function concatTables(this: void, dest: unknown[], src: unknown[]): unknown[] {
  for (const v of src) {
    dest.push(v)
  }
  return dest
}

export function setupOnDemandDataTable(
  this: void,
  dataTable: Record<string | number, unknown>,
  dataFunctions: Record<string | number, (this: void) => unknown>
): undefined {
  setmetatable(dataTable, {
    __index: (tbl: Record<string | number, unknown>, key: string | number): unknown => {
      const func = dataFunctions[key]
      if (func !== undefined) {
        tbl[key] = func()
        return tbl[key]
      }
      return undefined
    },
  })
}
