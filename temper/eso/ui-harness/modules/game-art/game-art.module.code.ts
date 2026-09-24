import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import {
  esoArtDir,
  esoClientDir,
} from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"
import {
  type ArchiveRead,
  archiveName,
  openGameArchive,
} from "akasha/temper/eso/ui-harness/modules/game-archive/game-archive.module.code.ts"
import { oodleUnpack } from "akasha/temper/eso/ui-harness/modules/oodle-decoding/oodle-decoding.module.code.ts"

export type ArtAt = (texture: string) => string | null

const PICTURES = "png"

function drawn(read: ArchiveRead, texture: string, picture: string): boolean {
  const stored = read(texture)
  if (stored === null) return false
  mkdirSync(dirname(picture), { recursive: true })
  const packed = `${picture}.dds`
  writeFileSync(packed, stored)
  const done = ran(["magick", packed, picture])
  rmSync(packed, { force: true })
  return done.code === 0 && existsSync(picture)
}

export async function gameArt(): Promise<ArtAt> {
  const client = esoClientDir()
  if (!existsSync(client)) return () => null
  const art = esoArtDir()
  const unpack = await oodleUnpack(art)
  let read: ArchiveRead | undefined
  const answered = new Map<string, string | null>()
  return (texture) => {
    const held = answered.get(texture)
    if (held !== undefined) return held
    const picture = join(art, PICTURES, `${archiveName(texture).replace(/\.dds$/, "")}.png`)
    let found = existsSync(picture)
    if (!found) {
      read ??= openGameArchive(client, unpack)
      found = drawn(read, texture, picture)
    }
    const url = found ? `data:image/png;base64,${readFileSync(picture).toString("base64")}` : null
    answered.set(texture, url)
    return url
  }
}
