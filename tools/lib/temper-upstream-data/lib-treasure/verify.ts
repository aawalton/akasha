import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { addonsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { BOOK_ID } from "@akasha/temper-lib-treasure/treasure-book-ids"
import { ICONS } from "@akasha/temper-lib-treasure/treasure-icons"
import { ALL_DATA } from "@akasha/temper-lib-treasure/treasure-pins-data"
import type { AllData } from "@akasha/temper-lib-treasure/treasure-types"
import { makeLuaVm } from "@akasha/temper-lua-runner/lua-vm"
import { PortMismatch } from "../libraries.ts"

const SOURCE_DIR = join(addonsDir(), "LibTreasure")

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function deepEqual(a: unknown, b: unknown, path: string): string | undefined {
  if (a === b) return undefined
  if (typeof a !== typeof b) return `${path}: type ${typeof a} !== ${typeof b}`
  if (!isRecord(a) || !isRecord(b)) {
    return `${path}: ${JSON.stringify(a)} !== ${JSON.stringify(b)}`
  }
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const k of keys) {
    if (!(k in a)) return `${path}.${k}: missing in TS`
    if (!(k in b)) return `${path}.${k}: missing in upstream`
    const sub = deepEqual(a[k], b[k], `${path}.${k}`)
    if (sub !== undefined) return sub
  }
  return undefined
}

function assertEqual(label: string, ts: unknown, upstream: unknown): undefined {
  const diff = deepEqual(ts, upstream, label)
  if (diff !== undefined) throw new PortMismatch(`MISMATCH ${diff}`)
  console.log(`ok ${label}`)
  return undefined
}

function derivedCounts(allData: AllData): {
  itemIds: number
  textures: number
  pins: number
} {
  const itemIds = new Set<number>()
  const textures = new Set<string>()
  let pins = 0
  for (const pinTypeData of Object.values(allData)) {
    for (const rows of Object.values(pinTypeData)) {
      if (rows === undefined) continue
      for (const [, , texture, itemId] of rows) {
        itemIds.add(itemId)
        textures.add(texture)
        pins += 1
      }
    }
  }
  return { itemIds: itemIds.size, textures: textures.size, pins }
}

export async function verify(): Promise<void> {
  const dataSrc = await readFile(join(SOURCE_DIR, "data.lua"), "utf-8")
  const iconsSrc = await readFile(join(SOURCE_DIR, "icons.lua"), "utf-8")
  const vm = await makeLuaVm()
  try {
    const script = `
      LibTreasure = { data = {} }
      local dataChunk = assert(loadstring(${JSON.stringify(`${dataSrc}\nLibTreasure.__ALL_DATA = ALL_DATA\n`)}))
      assert(pcall(dataChunk))
      local iconsChunk = assert(loadstring(${JSON.stringify(iconsSrc)}))
      assert(pcall(iconsChunk))
      return {
        allData = LibTreasure.__ALL_DATA,
        bookId = LibTreasure.data.BOOK_ID,
        icons = LibTreasure.icons,
        itemsData = LibTreasure.data.ITEMS_DATA,
        textureData = LibTreasure.data.TEXTURE_NAME_DATA,
      }
    `
    const raw = await vm.run(script)
    if (!isRecord(raw)) throw new Error(`vm returned ${typeof raw}, expected a table`)
    const upItemsData = raw.itemsData
    const upTextureData = raw.textureData
    if (!isRecord(upItemsData) || !isRecord(upTextureData)) {
      throw new Error("vm result missing ITEMS_DATA / TEXTURE_NAME_DATA tables")
    }

    assertEqual("ALL_DATA", ALL_DATA, raw.allData)
    assertEqual("BOOK_ID", BOOK_ID, raw.bookId)
    assertEqual("icons", ICONS, raw.icons)

    const tsCounts = derivedCounts(ALL_DATA)
    const upItemIds = Object.keys(upItemsData).length
    const upTextures = Object.keys(upTextureData).length
    if (tsCounts.itemIds !== upItemIds) {
      throw new PortMismatch(
        `MISMATCH distinct itemIds: TS ${tsCounts.itemIds} !== upstream ${upItemIds}`
      )
    }
    if (tsCounts.textures !== upTextures) {
      throw new PortMismatch(
        `MISMATCH distinct textures: TS ${tsCounts.textures} !== upstream ${upTextures}`
      )
    }
    console.log(
      `ok derived-counts (itemIds=${tsCounts.itemIds}, textures=${tsCounts.textures}, pins=${tsCounts.pins})`
    )
    console.log("LibTreasure data port verified.")
  } finally {
    await vm.close()
  }
}
