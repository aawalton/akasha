import { dlopen, FFIType, ptr } from "bun:ffi"
import { createHash } from "node:crypto"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import type { Unpack } from "akasha/temper/eso/ui-harness/modules/game-archive/game-archive.module.code.ts"

const SOURCE_URL =
  "https://files.pythonhosted.org/packages/97/95/025dc21dbfe92855d6ab7b3c960159a682f647f71ac748714f0512695af6/pyooz-0.0.8.tar.gz"

const SOURCE_SHA256 = "98916331773493764483bc6448c9c6166bf2440939abe77cd140509038cc3adf"

const SOURCE_FOLDER = "pyooz-0.0.8/ooz/dep/ooz"

const SOURCE_FILES: readonly string[] = ["bitknit.cpp", "kraken.cpp", "lzna.cpp", "stdafx.cpp"]

const LIBRARY = "libooz.so"

const OVERRUN = 64

async function built(at: string): Promise<string> {
  const library = join(at, LIBRARY)
  if (existsSync(library)) return library
  const fetched = await fetch(SOURCE_URL)
  if (!fetched.ok) throw new Error(`the decoder's source would not download (${fetched.status})`)
  const bytes = new Uint8Array(await fetched.arrayBuffer())
  if (createHash("sha256").update(bytes).digest("hex") !== SOURCE_SHA256) {
    throw new Error("the decoder's source downloaded is not the source pinned")
  }
  const source = join(at, "decoder-source")
  mkdirSync(source, { recursive: true })
  const packed = join(source, "pyooz.tar.gz")
  writeFileSync(packed, bytes)
  said(["tar", "-xzf", packed, "-C", source])
  const folder = join(source, SOURCE_FOLDER)
  said([
    "g++",
    "-O2",
    "-shared",
    "-fPIC",
    "-DOOZ_BUILD_DLL=1",
    `-I${join(folder, "simde")}`,
    ...SOURCE_FILES.map((one) => join(folder, one)),
    "-o",
    library,
  ])
  return library
}

export async function oodleUnpack(at: string): Promise<Unpack> {
  mkdirSync(at, { recursive: true })
  const decoder = dlopen(await built(at), {
    Ooz_Decompress: {
      args: [FFIType.ptr, FFIType.i32, FFIType.ptr, FFIType.u64],
      returns: FFIType.i32,
    },
  })
  return (packed, size) => {
    const unpacked = new Uint8Array(size + OVERRUN)
    const made = decoder.symbols.Ooz_Decompress(ptr(packed), packed.length, ptr(unpacked), size)
    if (made !== size) throw new Error(`the decoder made ${made} bytes of ${size}`)
    return unpacked.subarray(0, size)
  }
}
