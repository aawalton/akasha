import { asLdeValue, asLuaArray, asLuaTable, asNumber } from "./casts"
import type { DictionaryClass, DictionaryInstance, LdeValue } from "./types"

const DictionaryObject = ZO_InitializingObject.Subclass<DictionaryClass>()

DictionaryObject.Initialize = function (
  this: DictionaryInstance,
  data: unknown,
  globalDictionary?: LdeValue[]
): undefined {
  this.globalDictReverse = {}
  if (globalDictionary !== undefined) {
    for (let k = 1; k <= globalDictionary.length; k++) {
      this.globalDictReverse[asLdeValue(globalDictionary[k - 1])] = k
    }
  }
  this.dictionary = []
  this.counts = [{}, {}, {}]
  this.ScanTable(data)

  const counts3 = this.counts[2]
  const keys: LdeValue[] = []
  for (const key in counts3) {
    keys.push(asLdeValue(key))
  }
  keys.sort((a, b) => asNumber(counts3[b]) - asNumber(counts3[a]))
  for (const key of keys) {
    this.dictionary.push(key)
  }
}

DictionaryObject.ScanTable = function (this: DictionaryInstance, data: unknown): undefined {
  const table = asLuaTable(data)
  const isArray = type(data) === "table" && asLuaArray(data).length === NonContiguousCount(table)
  for (const k in table) {
    const v = table[k]
    if (!isArray && this.ValidateValue(k)) {
      this.IncreaseCount(asLdeValue(k))
    }
    if (this.ValidateValue(v)) {
      this.IncreaseCount(asLdeValue(v))
    }
  }
}

DictionaryObject.ValidateValue = function (this: DictionaryInstance, value: unknown): boolean {
  if (this.globalDictReverse[asLdeValue(value)] !== undefined) {
    return false
  }
  if (type(value) === "number") {
    const num = asNumber(value)
    if (math.floor(num) === num) {
      return num > 100 || num < 0
    }
    return string.len(tostring(value)) > 2
  }
  if (type(value) === "string") {
    return string.len(tostring(value)) > 2
  }
  if (type(value) === "table") {
    this.ScanTable(value)
  }
  return false
}

DictionaryObject.IncreaseCount = function (this: DictionaryInstance, value: LdeValue): undefined {
  const counts = this.counts
  if (counts[0][value] === undefined) {
    counts[0][value] = true
  } else if (counts[1][value] === undefined) {
    counts[1][value] = true
  } else if (counts[2][value] === undefined) {
    counts[2][value] = 3
  } else {
    counts[2][value] = asNumber(counts[2][value]) + 1
  }
}

export function makeDictionary(
  this: void,
  data: unknown,
  globalDictionary?: LdeValue[]
): LdeValue[] {
  if (type(data) !== "table") {
    return []
  }
  const dict = DictionaryObject.New(data, globalDictionary)
  return dict.dictionary
}
