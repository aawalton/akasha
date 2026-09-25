import { existsSync, fstatSync, openSync, readFileSync, readSync } from "node:fs"
import { join } from "node:path"
import { inflateSync } from "node:zlib"

export type Unpack = (packed: Uint8Array, size: number) => Uint8Array

export type ArchiveRead = (path: string) => Uint8Array | null

type ArchiveEntry = {
  readonly id: number
  readonly group: number
  readonly size: number
  readonly packedSize: number
  readonly offset: number
  readonly packing: number
  readonly archive: number
}

type Block = { readonly tables: readonly Buffer[]; readonly end: number }

type ReadAt = (archive: number, offset: number, size: number) => Uint8Array | null

type DataFile = { readonly handle: number; readonly size: number }

const MANIFEST = "game.mnf"

const DATA = "game"

const DEPOT = join("..", "..", "depot")

const DEPOT_MANIFEST = "eso.mnf"

const DEPOT_DATA = "eso"

const DATA_DIGITS = 4

const DATA_TAIL = ".dat"

const MANIFEST_MARK = "MES2"

const ARCHIVES_AT = 6

const ARCHIVE_INDEX = 2

const SIGNED_MARK = 0x3082

const PACKING_AT = 18

const ARCHIVE_AT = 16

const FLAG = 0x80000000

const BLOCK_HEADER = 18

const COUNTS_AT = 6

const TABLES = 3

const WORD = 4

const ID_RECORD = 8

const PLACE_RECORD = 20

const NAME_RECORD = 16

const FILE_TABLE_KEYS: readonly string[] = ["0:2147483649", "16777215:0"]

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

function tablesAt(manifest: Buffer): number {
  if (manifest.toString("latin1", 0, WORD) !== MANIFEST_MARK) {
    throw new Error(`the manifest does not open with ${MANIFEST_MARK}`)
  }
  const archives = manifest.readUInt16LE(ARCHIVES_AT)
  const sizeAt = ARCHIVES_AT + ARCHIVE_INDEX + archives * ARCHIVE_INDEX + WORD
  if (manifest.readUInt32LE(sizeAt) !== manifest.length - sizeAt - WORD) {
    throw new Error("the manifest's header does not state the manifest's size")
  }
  const at = sizeAt + WORD
  if (manifest.readUInt16BE(at + 2 * WORD) !== SIGNED_MARK) return at
  const signature = at + 2 * WORD + manifest.readUInt32BE(at + WORD)
  return signature + WORD + manifest.readUInt32BE(signature)
}

function entriesIn(manifest: Buffer): readonly ArchiveEntry[] {
  const [, ids = Buffer.alloc(0), places = Buffer.alloc(0)] = blockAt(
    manifest,
    tablesAt(manifest),
    true
  ).tables
  const entries: ArchiveEntry[] = []
  for (let one = 0; one * PLACE_RECORD < places.length; one += 1) {
    const at = one * PLACE_RECORD
    entries.push({
      id: ids.readUInt32LE(one * ID_RECORD),
      group: ids.readUInt32LE(one * ID_RECORD + WORD),
      size: places.readUInt32LE(at),
      packedSize: places.readUInt32LE(at + WORD),
      offset: places.readUInt32LE(at + 3 * WORD),
      packing: places.readUInt8(at + PACKING_AT),
      archive: places.readUInt16LE(at + ARCHIVE_AT),
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
  const plain = new Map<number, ArchiveEntry>()
  const keyed = new Map<string, ArchiveEntry>()
  for (const entry of entriesIn(manifest)) {
    keyed.set(`${entry.id}:${entry.group}`, entry)
    if ((entry.group & ~FLAG) === 0) plain.set(entry.id, entry)
  }
  function stored(entry: ArchiveEntry): Uint8Array | null {
    const packed = readAt(entry.archive, entry.offset, entry.packedSize)
    if (packed === null) return null
    if (entry.packing === UNPACKED) return payloadOf(packed)
    if (entry.packing === ZLIB) return payloadOf(inflateSync(packed))
    if (OODLE.has(entry.packing)) return payloadOf(unpack(packed, entry.size))
    throw new Error(`the archive packs a file a way nothing here unpacks (${entry.packing})`)
  }
  const table = FILE_TABLE_KEYS.map((key) => keyed.get(key)).find((one) => one !== undefined)
  const held = table === undefined ? null : stored(table)
  if (held === null) throw new Error("the archive holds no file table")
  const names = namesIn(Buffer.from(held))
  const named = new Map<string, ArchiveEntry>()
  for (const [id, name] of names) {
    const entry = plain.get(id)
    if (entry !== undefined) named.set(name.toLowerCase(), entry)
  }
  return (path) => {
    const entry = named.get(archiveName(path))
    return entry === undefined ? null : stored(entry)
  }
}

function archiveIn(dir: string, manifest: string, data: string, unpack: Unpack): ArchiveRead {
  const opened = new Map<number, DataFile>()
  const readAt: ReadAt = (archive, offset, size) => {
    let file = opened.get(archive)
    if (file === undefined) {
      const index = String(archive).padStart(DATA_DIGITS, "0")
      const handle = openSync(join(dir, `${data}${index}${DATA_TAIL}`), "r")
      file = { handle, size: fstatSync(handle).size }
      opened.set(archive, file)
    }
    if (offset + size > file.size) return null
    const packed = new Uint8Array(size)
    readSync(file.handle, packed, 0, size, offset)
    return packed
  }
  return archiveOf(readFileSync(join(dir, manifest)), readAt, unpack)
}

export function openGameArchive(client: string, unpack: Unpack): ArchiveRead {
  const own = archiveIn(client, MANIFEST, DATA, unpack)
  const depot = join(client, DEPOT)
  let fromDepot: ArchiveRead | null | undefined
  return (path) => {
    const found = own(path)
    if (found !== null) return found
    fromDepot ??= existsSync(join(depot, DEPOT_MANIFEST))
      ? archiveIn(depot, DEPOT_MANIFEST, DEPOT_DATA, unpack)
      : null
    return fromDepot === null ? null : fromDepot(path)
  }
}
