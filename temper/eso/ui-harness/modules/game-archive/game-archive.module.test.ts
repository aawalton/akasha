import { expect, test } from "bun:test"
import { deflateSync } from "node:zlib"
import {
  type ArchiveRead,
  archiveName,
  archiveOf,
} from "akasha/temper/eso/ui-harness/modules/game-archive/game-archive.module.code.ts"

const ZLIB = 1

const OODLE = 8

function words(values: readonly number[], bigEndian: boolean): Buffer {
  const written = Buffer.alloc(values.length * 4)
  values.forEach((one, at) =>
    bigEndian ? written.writeUInt32BE(one, at * 4) : written.writeUInt32LE(one, at * 4)
  )
  return written
}

function block(tables: readonly Buffer[], bigEndian: boolean): Buffer {
  const counts = tables.length === 0 ? [0, 0, 0] : [1, 1, 1]
  const packed = tables.flatMap((one) => {
    const squeezed = deflateSync(one)
    return [words([one.length, squeezed.length], bigEndian), squeezed]
  })
  return Buffer.concat([Buffer.alloc(2), words([0, ...counts], bigEndian), ...packed])
}

function signed(file: Buffer): Buffer {
  return Buffer.concat([
    words([0, 2], true),
    Buffer.from("ss"),
    words([1], true),
    Buffer.from("h"),
    file,
  ])
}

function fileTable(named: readonly (readonly [number, string])[]): Buffer {
  const names = Buffer.from(named.map(([, name]) => `${name}\0`).join(""))
  let from = 0
  const records = named.map(([id, name]) => {
    const record = Buffer.concat([words([id, from], false), Buffer.alloc(8)])
    from += name.length + 1
    return record
  })
  const empty = Buffer.alloc(0)
  return Buffer.concat([
    Buffer.from("ZOSFT"),
    Buffer.alloc(14),
    block([empty, empty, empty], false),
    block([empty, empty, Buffer.concat(records)], false),
    block([], false),
    words([names.length], false),
    names,
  ])
}

type Stored = {
  readonly id: number
  readonly size: number
  readonly packing: number
  readonly bytes: Buffer
  readonly group?: number
  readonly archive?: number
}

type Shaped = { readonly archives?: number; readonly signedWith?: Buffer }

function archive(
  files: readonly Stored[],
  shaped: Shaped = {}
): { manifest: Buffer; data: Map<number, Buffer> } {
  const data = new Map<number, Buffer>()
  const places = files.map((one) => {
    const into = one.archive ?? 0
    const held = data.get(into) ?? Buffer.alloc(0)
    const place = words([one.size, one.bytes.length, 0, held.length, one.packing << 16], false)
    place.writeUInt16LE(into, 16)
    data.set(into, Buffer.concat([held, one.bytes]))
    return place
  })
  const ids = files.map((one) => words([one.id, one.group ?? 0], false))
  const body = block([Buffer.alloc(0), Buffer.concat(ids), Buffer.concat(places)], true)
  const archives = shaped.archives ?? 1
  const header = Buffer.alloc(8 + archives * 2 + 8)
  header.write("MES2", 0, "latin1")
  header.writeUInt16LE(archives, 6)
  const signing =
    shaped.signedWith === undefined
      ? Buffer.alloc(0)
      : Buffer.concat([
          words([0, shaped.signedWith.length], true),
          shaped.signedWith,
          words([2], true),
          Buffer.from("ss"),
        ])
  header.writeUInt32LE(signing.length + body.length, header.length - 4)
  return { manifest: Buffer.concat([header, signing, body]), data }
}

function opened(
  files: readonly Stored[],
  unpack = (packed: Uint8Array): Uint8Array => packed,
  shaped: Shaped = {}
): ArchiveRead {
  const { manifest, data } = archive(files, shaped)
  return archiveOf(
    manifest,
    (into, offset, size) => {
      const held = data.get(into) ?? Buffer.alloc(0)
      return offset + size > held.length ? null : held.subarray(offset, offset + size)
    },
    unpack
  )
}

function text(bytes: Uint8Array | null): string | null {
  return bytes === null ? null : Buffer.from(bytes).toString()
}

function table(named: readonly (readonly [number, string])[]): Stored {
  const written = signed(fileTable(named))
  return { id: 0, size: written.length, packing: ZLIB, bytes: deflateSync(written) }
}

test("a file is read by the path the interface names it by", () => {
  const read = opened([
    table([[7, "/esoui/art/a.dds"]]),
    { id: 7, size: 0, packing: 0, bytes: signed(Buffer.from("art")) },
  ])
  expect(text(read("EsoUI/Art/A.dds"))).toBe("art")
})

test("a path the archive does not name answers nothing", () => {
  expect(opened([table([])])("EsoUI/Art/none.dds")).toBeNull()
})

test("a file packed by the decoder is handed to the decoder", () => {
  const handed: number[] = []
  const stored = signed(Buffer.from("art"))
  const read = opened(
    [table([[7, "/esoui/art/a.dds"]]), { id: 7, size: 9, packing: OODLE, bytes: stored }],
    (packed) => {
      handed.push(packed.length)
      return packed
    }
  )
  expect(text(read("esoui/art/a.dds"))).toBe("art")
  expect(handed).toEqual([stored.length])
})

test("a manifest signed before its tables is read past its signature", () => {
  const read = opened(
    [
      table([[7, "/esoui/art/a.dds"]]),
      { id: 7, size: 0, packing: 0, bytes: signed(Buffer.from("art")) },
    ],
    undefined,
    { archives: 3, signedWith: Buffer.from([0x30, 0x82, 0, 0]) }
  )
  expect(text(read("esoui/art/a.dds"))).toBe("art")
})

test("a file is read from the data file its manifest places it in", () => {
  const read = opened(
    [
      table([[7, "/esoui/art/a.dds"]]),
      { id: 7, size: 0, packing: 0, bytes: signed(Buffer.from("art")), archive: 2 },
    ],
    undefined,
    { archives: 3 }
  )
  expect(text(read("esoui/art/a.dds"))).toBe("art")
})

test("a later record of a file wins over an earlier one", () => {
  const read = opened([
    table([[7, "/esoui/art/a.dds"]]),
    { id: 7, size: 0, packing: 0, bytes: signed(Buffer.from("old")) },
    { id: 7, size: 0, packing: 0, bytes: signed(Buffer.from("new")) },
  ])
  expect(text(read("esoui/art/a.dds"))).toBe("new")
})

test("a depot names its files in the table under the last id", () => {
  const written = signed(fileTable([[7, "/esoui/art/a.dds"]]))
  const read = opened([
    { id: 0xffffff, size: written.length, packing: ZLIB, bytes: deflateSync(written) },
    { id: 7, size: 0, packing: 0, bytes: signed(Buffer.from("art")) },
    { id: 7, size: 0, packing: 0, bytes: signed(Buffer.from("other")), group: 0x60000000 },
  ])
  expect(text(read("esoui/art/a.dds"))).toBe("art")
})

test("a file its data file does not hold answers nothing", () => {
  const { manifest } = archive([
    table([[7, "/esoui/art/a.dds"]]),
    { id: 7, size: 0, packing: 0, bytes: signed(Buffer.from("art")), archive: 1 },
  ])
  const { data } = archive([table([[7, "/esoui/art/a.dds"]])])
  const read = archiveOf(
    manifest,
    (into, offset, size) => {
      const held = data.get(into) ?? Buffer.alloc(0)
      return offset + size > held.length ? null : held.subarray(offset, offset + size)
    },
    (packed) => packed
  )
  expect(read("esoui/art/a.dds")).toBeNull()
})

test("a manifest not opening with its mark is refused", () => {
  expect(() =>
    archiveOf(
      Buffer.alloc(40),
      () => new Uint8Array(0),
      (packed) => packed
    )
  ).toThrow()
})

test("an archive holding no file table is refused", () => {
  expect(() => opened([])).toThrow()
})

test("a path the interface names is the name the archive keeps", () => {
  expect(archiveName("EsoUI/Art/Buttons/ESO_buttonLarge_normal.dds")).toBe(
    "/esoui/art/buttons/eso_buttonlarge_normal.dds"
  )
  expect(archiveName("\\EsoUI\\Art\\x.dds")).toBe("/esoui/art/x.dds")
})
