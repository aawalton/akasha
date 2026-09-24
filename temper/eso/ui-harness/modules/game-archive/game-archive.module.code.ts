import { openSync, readFileSync, readSync } from "node:fs"
import { join } from "node:path"
import { inflateSync } from "node:zlib"

export type Unpack = (packed: Uint8Array, size: number) => Uint8Array

export type ArchiveRead = (path: string) => Uint8Array | null

type ArchiveEntry = {
  readonly id: number
  readonly size: number
  readonly packedSize: number
  readonly offset: number
  readonly packing: number
}

type Block = { readonly tables: readonly Buffer[]; readonly end: number }

type ReadAt = (offset: number, size: number) => Uint8Array

const MANIFEST = "game.mnf"

const DATA = "game0000.dat"

const MANIFEST_MARK = "MES2"

const MANIFEST_HEADER = 18

const SIZE_AT = 14

const BLOCK_HEADER = 18

const COUNTS_AT = 6

const TABLES = 3

const WORD = 4

const ID_RECORD = 8

const PLACE_RECORD = 20

const NAME_RECORD = 16

const PACKING_SHIFT = 16

const BYTE = 0xff

const FILE_TABLE_ID = 0

const FILE_TABLE_MARK = "ZOSFT"

const FILE_TABLE_HEADER = 19

const UNPACKED = 0

const ZLIB = 1

const OODLE: ReadonlySet<number> = new Set([4, 8])

function blockAt(bytes: Buffer, at: number, bigEndian: boolean): Block {
  const word = (from: number): number =>
    bigEndian ? bytes.readUInt32BE(from) : bytes.readUInt32LE(from)
  const counts = [0, 1, 2].map((one) => word(at + COUNTS_AT + one * WORD))
  let from = at + BLOCK_HEADER
  if (counts.every((one) => one === 0)) return { tables: [], end: from }
  const tables: Buffer[] = []
  for (let one = 0; one < TABLES; one += 1) {
    const size = word(from)
    const packed = word(from + WORD)
    const table = inflateSync(bytes.subarray(from + 2 * WORD, from + 2 * WORD + packed))
    if (table.length !== size) {
      throw new Error(`a table of the archive unpacks to ${table.length} bytes, not ${size}`)
    }
    tables.push(table)
    from += 2 * WORD + packed
  }
  return { tables, end: from }
}

function entriesIn(manifest: Buffer): readonly ArchiveEntry[] {
  if (manifest.toString("latin1", 0, WORD) !== MANIFEST_MARK) {
    throw new Error(`the manifest does not open with ${MANIFEST_MARK}`)
  }
  if (manifest.readUInt32LE(SIZE_AT) !== manifest.length - MANIFEST_HEADER) {
    throw new Error("the manifest's header does not state the manifest's size")
  }
  const [, ids = Buffer.alloc(0), places = Buffer.alloc(0)] = blockAt(
    manifest,
    MANIFEST_HEADER,
    true
  ).tables
  const entries: ArchiveEntry[] = []
  for (let one = 0; one * PLACE_RECORD < places.length; one += 1) {
    const at = one * PLACE_RECORD
    entries.push({
      id: ids.readUInt32LE(one * ID_RECORD),
      size: places.readUInt32LE(at),
      packedSize: places.readUInt32LE(at + WORD),
      offset: places.readUInt32LE(at + 3 * WORD),
      packing: (places.readUInt32LE(at + 4 * WORD) >>> PACKING_SHIFT) & BYTE,
    })
  }
  return entries
}

function payloadOf(stored: Uint8Array): Uint8Array {
  const view = new DataView(stored.buffer, stored.byteOffset, stored.byteLength)
  const signed = 2 * WORD + view.getUint32(WORD)
  return stored.subarray(signed + WORD + view.getUint32(signed))
}

function namesIn(fileTable: Buffer): ReadonlyMap<number, string> {
  if (fileTable.toString("latin1", 0, FILE_TABLE_MARK.length) !== FILE_TABLE_MARK) {
    throw new Error(`the file table does not open with ${FILE_TABLE_MARK}`)
  }
  const first = blockAt(fileTable, FILE_TABLE_HEADER, false)
  const second = blockAt(fileTable, first.end, false)
  const last = blockAt(fileTable, second.end, false)
  const size = fileTable.readUInt32LE(last.end)
  const names = fileTable.subarray(last.end + WORD, last.end + WORD + size)
  const records = second.tables[2] ?? Buffer.alloc(0)
  const found = new Map<number, string>()
  for (let at = 0; at < records.length; at += NAME_RECORD) {
    const from = records.readUInt32LE(at + WORD)
    found.set(records.readUInt32LE(at), names.toString("latin1", from, names.indexOf(0, from)))
  }
  return found
}

export function archiveName(path: string): string {
  return `/${path.replace(/\\/g, "/").replace(/^\/+/, "")}`.toLowerCase()
}

export function archiveOf(manifest: Buffer, readAt: ReadAt, unpack: Unpack): ArchiveRead {
  const entries = entriesIn(manifest)
  function stored(entry: ArchiveEntry): Uint8Array {
    const packed = readAt(entry.offset, entry.packedSize)
    if (entry.packing === UNPACKED) return payloadOf(packed)
    if (entry.packing === ZLIB) return payloadOf(inflateSync(packed))
    if (OODLE.has(entry.packing)) return payloadOf(unpack(packed, entry.size))
    throw new Error(`the archive packs a file a way nothing here unpacks (${entry.packing})`)
  }
  const table = entries.find((one) => one.id === FILE_TABLE_ID)
  if (table === undefined) throw new Error("the archive holds no file table")
  const names = namesIn(Buffer.from(stored(table)))
  const named = new Map<string, ArchiveEntry>()
  for (const entry of entries) {
    const name = names.get(entry.id)
    if (name !== undefined) named.set(name.toLowerCase(), entry)
  }
  return (path) => {
    const entry = named.get(archiveName(path))
    return entry === undefined ? null : stored(entry)
  }
}

export function openGameArchive(client: string, unpack: Unpack): ArchiveRead {
  const data = openSync(join(client, DATA), "r")
  const readAt: ReadAt = (offset, size) => {
    const packed = new Uint8Array(size)
    readSync(data, packed, 0, size, offset)
    return packed
  }
  return archiveOf(readFileSync(join(client, MANIFEST)), readAt, unpack)
}
