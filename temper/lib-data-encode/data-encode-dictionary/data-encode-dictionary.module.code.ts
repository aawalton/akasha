import { asLdeValue, asLuaArray } from "../data-encode-casts/data-encode-casts.module.code.ts"
import type {
  DictionaryClass,
  DictionaryInstance,
  LdeValue,
  LuaTable,
} from "../data-encode-types/data-encode-types.module.code.ts"

const DICTIONARY_OBJECT = ZO_InitializingObject.Subclass<DictionaryClass>()

DICTIONARY_OBJECT.Initialize = function (
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
  keys.sort((a, b) => (counts3[b] as number) - (counts3[a] as number))
  for (const key of keys) {
    this.dictionary.push(key)
  }
}

DICTIONARY_OBJECT.ScanTable = function (this: DictionaryInstance, data: unknown): undefined {
  const table = data as LuaTable
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

DICTIONARY_OBJECT.ValidateValue = function (this: DictionaryInstance, value: unknown): boolean {
  if (this.globalDictReverse[asLdeValue(value)] !== undefined) {
    return false
  }
  if (type(value) === "number") {
    const num = value as number
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

DICTIONARY_OBJECT.IncreaseCount = function (this: DictionaryInstance, value: LdeValue): undefined {
  const counts = this.counts
  if (counts[0][value] === undefined) {
    counts[0][value] = true
  } else if (counts[1][value] === undefined) {
    counts[1][value] = true
  } else if (counts[2][value] === undefined) {
    counts[2][value] = 3
  } else {
    counts[2][value] = (counts[2][value] as number) + 1
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
  const dict = DICTIONARY_OBJECT.New(data, globalDictionary)
  return dict.dictionary
}
