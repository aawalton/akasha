import type { TableKey } from "../table-function-casts/table-function-casts.module.code.ts"
import { asMetatable } from "../table-function-casts/table-function-casts.module.code.ts"
import type { Lib } from "../table-function-types/table-function-types.module.code.ts"

const LIB_VERSION = 100

export const TABLE_FUNCTIONS: Lib = {
  version: LIB_VERSION,

  TableContains(this: Lib, origTable: unknown, searchValue: unknown, keySearch?: boolean): boolean {
    if (origTable == null) {
      return false
    }
    let valueFound = false
    if (type(origTable) !== "table") {
      return origTable === searchValue ? true : valueFound
    }
    const tbl = origTable as LuaTable
    if (keySearch === true) {
      for (const [k, v] of pairs(tbl)) {
        if (k === searchValue) {
          valueFound = true
        } else if (type(v) === "table") {
          valueFound = TABLE_FUNCTIONS.TableContains(v, searchValue, keySearch)
        }
        if (valueFound) {
          break
        }
      }
    } else {
      for (const [, v] of pairs(tbl)) {
        if (type(v) === "table") {
          valueFound = TABLE_FUNCTIONS.TableContains(v, searchValue, keySearch)
        } else if (v === searchValue) {
          valueFound = true
        }
        if (valueFound) {
          break
        }
      }
    }
    return valueFound
  },

  CopyTable(this: Lib, origTable: unknown): unknown {
    if (origTable == null) {
      return {}
    }
    if (type(origTable) === "table") {
      const orig = origTable as LuaTable
      const copy = new LuaTable()
      for (const [origKey, origValue] of pairs(orig)) {
        copy.set(
          TABLE_FUNCTIONS.CopyTable(origKey) as TableKey,
          TABLE_FUNCTIONS.CopyTable(origValue)
        )
      }
      setmetatable(copy, asMetatable(TABLE_FUNCTIONS.CopyTable(getmetatable(orig))))
      return copy
    }
    return origTable
  },

  PrintTable(this: Lib, origTable: unknown): string {
    if (origTable == null) {
      return ""
    }
    if (type(origTable) === "table") {
      let s = "{"
      for (const [k, v] of pairs(origTable as LuaTable)) {
        const keyStr = type(k) !== "number" ? '"' + tostring(k) + '"' : tostring(k)
        s = s + "[" + keyStr + "] = " + TABLE_FUNCTIONS.PrintTable(v) + ","
      }
      return s + "}"
    }
    if (type(origTable) === "boolean") {
      return origTable === true ? "true" : "false"
    }
    return tostring(origTable)
  },

  SortTable(this: Lib, origTable: unknown, column?: number): unknown {
    if (origTable == null) {
      return {}
    }
    if (type(origTable) !== "table") {
      return origTable
    }
    const sortCol = column == null || column < 1 ? 1 : column
    let sortedTable = TABLE_FUNCTIONS.CopyTable(origTable) as LuaTable
    const orig = origTable as LuaTable
    let numRows = 0
    let numElements = 0
    let numElementsLast = -1

    for (const [, v] of pairs(orig)) {
      numRows = numRows + 1
      numElementsLast = numElements > 0 ? numElements : numElementsLast
      numElements = 0
      for (const [, v1] of pairs(v as LuaTable)) {
        if (type(v1) === "table") {
          sortedTable = TABLE_FUNCTIONS.CopyTable(origTable) as LuaTable
          return sortedTable
        }
        numElements = numElements + 1
      }
      if (numElements === 0 || (numElements !== numElementsLast && numElementsLast !== -1)) {
        sortedTable = TABLE_FUNCTIONS.CopyTable(origTable) as LuaTable
        return sortedTable
      }
    }

    for (let sweep = 0; sweep < numRows; sweep = sweep + 1) {
      for (let i = 1; i <= numRows - 1; i = i + 1) {
        const rowA = sortedTable.get(i) as LuaTable
        const rowB = sortedTable.get(i + 1) as LuaTable
        if ((rowA.get(sortCol) as number) > (rowB.get(sortCol) as number)) {
          const tempRow = sortedTable.get(i)
          sortedTable.set(i, sortedTable.get(i + 1))
          sortedTable.set(i + 1, tempRow)
        }
      }
    }
    return sortedTable
  },

  DeepPrint(this: Lib, origTable: unknown): undefined {
    if (type(origTable) === "table") {
      for (const [k, v] of pairs(origTable as LuaTable)) {
        d(k)
        TABLE_FUNCTIONS.DeepPrint(v)
      }
    } else {
      d(tostring(origTable))
    }
  },

  SimpleResetTable(this: Lib, origTable: unknown, value: unknown): unknown {
    if (type(origTable) === "table") {
      const newTable = new LuaTable()
      for (const [k, v] of pairs(origTable as LuaTable)) {
        newTable.set(k, TABLE_FUNCTIONS.SimpleResetTable(v, value))
      }
      return newTable
    }
    return value
  },

  ResetTable(
    this: Lib,
    origTable: unknown,
    intVal: unknown,
    strVal: unknown,
    boolVal: unknown,
    otherVal: unknown
  ): unknown {
    if (type(origTable) === "table") {
      const newTable = new LuaTable()
      for (const [k, v] of pairs(origTable as LuaTable)) {
        newTable.set(k, TABLE_FUNCTIONS.ResetTable(v, intVal, strVal, boolVal, otherVal))
      }
      return newTable
    }
    if (type(origTable) === "number") {
      return intVal
    }
    if (type(origTable) === "string") {
      return '"' + (strVal as string) + '"'
    }
    if (type(origTable) === "boolean") {
      return boolVal
    }
    return otherVal
  },
}
