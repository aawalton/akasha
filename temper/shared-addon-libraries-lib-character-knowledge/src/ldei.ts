import { asCallback, asNumber, asString } from "./casts"
import { LCCC } from "./lccc"

const VERSION = 4

export interface ExportEntryMeta {
  server?: string
  identifier?: string
  timestamp?: number
}

export type ExportEntry = [string, ExportEntryMeta]

export interface ImportedDataset {
  version: number
  payload: string
}

export type Processor = (this: void, dataset: ImportedDataset[]) => void

export interface LdeiTable {
  version: number
  SHARE_LIMIT: number
  Wrap: (this: void, tag: string, version: number, payloadTable: string[]) => string
  Unwrap: (
    this: void,
    wrappedData: string
  ) => LuaMultiReturn<[string | undefined, number | undefined, string | undefined]>
  RegisterProcessor: (this: void, tag: string, func: Processor) => void
  Import: (this: void, input: string, invokerTag?: string) => boolean
  ExportMultiple: (
    this: void,
    entries: ExportEntry[],
    notifyLimit?: (this: void, server?: string, identifier?: string) => void
  ) => string
}

const SHARE_LIMIT = 29903 - 100

const Encode = LCCC.Encode
const Decode = LCCC.Decode

function GenerateHash(this: void, tag: string, payload: string): number {
  return BitAnd(HashString(tag + payload), 0xffffffff)
}

function Wrap(this: void, tag: string, version: number, payloadTable: string[]): string {
  const payload = table.concat(payloadTable, ",")
  return string.format(
    "<%s|%s|%s>\n",
    tag,
    payload,
    Encode(version * 0x100000000 + GenerateHash(tag, payload))
  )
}

function Unwrap(
  this: void,
  wrappedData: string
): LuaMultiReturn<[string | undefined, number | undefined, string | undefined]> {
  const [tag, payload, checkcode] = zo_strsplit("|", wrappedData)
  if (type(tag) === "string" && type(payload) === "string" && type(checkcode) === "string") {
    const decoded = Decode(asString(checkcode))
    if (decoded % 0x100000000 === GenerateHash(asString(tag), asString(payload))) {
      return $multi(tag, zo_floor(decoded / 0x100000000), payload)
    }
  }
  return $multi(undefined, undefined, undefined)
}

const Processors: Record<string, Processor> = {}

function RegisterProcessor(this: void, tag: string, func: Processor): undefined {
  Processors[tag] = func
}

function Import(this: void, input: string, invokerTag?: string): boolean {
  let result = true

  const datasets: Record<string, ImportedDataset[]> = {}
  if (invokerTag !== undefined) {
    datasets[invokerTag] = []
  }

  let start: number | undefined = 1
  while (start !== undefined) {
    const [foundStart] = string.find(input, "<", start)
    start = foundStart
    if (start !== undefined) {
      const [finish] = string.find(input, ">", start)
      if (finish !== undefined) {
        const [tag, version, payload] = Unwrap(zo_strsub(input, start + 1, finish - 1))
        if (tag !== undefined) {
          if (Processors[tag] !== undefined) {
            if (datasets[tag] === undefined) {
              datasets[tag] = []
            }
            datasets[tag].push({
              version: asNumber(version),
              payload: asString(payload),
            })
          }
        } else {
          result = false
          break
        }
      }
      start = finish
    }
  }

  for (const [tag, dataset] of pairs(datasets)) {
    asCallback(Processors[tag])(dataset)
  }

  return result
}

function ExportMultiple(
  this: void,
  entries: ExportEntry[],
  notifyLimit?: (this: void, server?: string, identifier?: string) => void
): string {
  const results: string[] = []
  let remaining = SHARE_LIMIT

  table.sort(entries, (a: ExportEntry, b: ExportEntry): boolean => {
    return asNumber(b[1].timestamp) < asNumber(a[1].timestamp)
  })

  for (const [, entry] of ipairs(entries)) {
    const length = zo_strlen(entry[0]) + 2

    if (length > 0) {
      if (length < remaining) {
        results.push(entry[0])
        remaining = remaining - length
      } else if (notifyLimit !== undefined) {
        notifyLimit(entry[1].server, entry[1].identifier)
      }
    }
  }

  return table.concat(results, "")
}

export const LDEI: LdeiTable = {
  version: VERSION,
  SHARE_LIMIT,
  Wrap,
  Unwrap,
  RegisterProcessor,
  Import,
  ExportMultiple,
}

declare global {
  var LibDataExportImport: LdeiTable
}
