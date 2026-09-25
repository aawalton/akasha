import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"

import { dirname, join } from "node:path"
import { bytes, ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { listAllAddons } from "akasha/temper/addon/build/resolve/modules/addon-roster/addon-roster.module.code.ts"
import {
  esoArtDir,
  esoClientDir,
  esouiSourceDir,
} from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"
import {
  type ArchiveRead,
  archiveName,
  openGameArchive,
} from "akasha/temper/eso/ui-harness/modules/game-archive/game-archive.module.code.ts"
import { oodleUnpack } from "akasha/temper/eso/ui-harness/modules/oodle-decoding/oodle-decoding.module.code.ts"
import {
  FACES_UNDER,
  gameFontStrings,
  TEMPER_FACES_UNDER,
} from "akasha/temper/eso/ui-harness/modules/ui-fonts/ui-fonts.module.code.ts"

type ArtAt = (texture: string) => string | null

const PICTURES = "png"

const FACE_KINDS: readonly string[] = ["otf", "ttf"]

const PLACEHOLDER = /\$\(([A-Za-z0-9_]+)\)/g

const SLUG = /\.slug$/i

const TEMPER_FACE = /^Temper\/bin\/fonts\/([A-Za-z-]+)\.slug$/

function webFace(face: string): string | null {
  const file = firstCapture(TEMPER_FACE.exec(face))
  if (file === null) return null
  const shipped = join(akashaRoot(), TEMPER_FACES_UNDER, `${file}.ttf`)
  if (!existsSync(shipped)) return null
  return `data:font/ttf;base64,${readFileSync(shipped).toString("base64")}`
}

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

function copied(read: ArchiveRead, path: string, kept: string): boolean {
  const stored = read(path)
  if (stored === null) return false
  mkdirSync(dirname(kept), { recursive: true })
  writeFileSync(kept, stored)
  return true
}

type Opened = { readonly art: string; readonly read: () => ArchiveRead }

async function opened(): Promise<Opened | null> {
  const client = esoClientDir()
  if (!existsSync(client)) return null
  const art = esoArtDir()
  const unpack = await oodleUnpack(art)
  let read: ArchiveRead | undefined
  return {
    art,
    read: () => {
      read ??= openGameArchive(client, unpack)
      return read
    },
  }
}

function remembered(answer: ArtAt): ArtAt {
  const answered = new Map<string, string | null>()
  return (named) => {
    const held = answered.get(named)
    if (held !== undefined) return held
    const found = answer(named)
    answered.set(named, found)
    return found
  }
}

function keptAt(kept: string, made: () => boolean, type: string): string | null {
  if (!existsSync(kept) && !made()) return null
  return `data:${type};base64,${readFileSync(kept).toString("base64")}`
}

function addonFile(texture: string): string | null {
  const [head, ...rest] = texture.replace(/^\/+/, "").split("/")
  if (head === undefined || rest.length === 0) return null
  const named = head.toLowerCase()
  const addon = listAllAddons({ repoRoot: akashaRoot() }).find(
    (one) => one.canonicalName.toLowerCase() === named
  )
  if (addon === undefined) return null
  const file = join(akashaRoot(), addon.repoRelDir, ...rest)
  return existsSync(file) ? file : null
}

function addonArt(texture: string): string | null {
  const file = addonFile(texture)
  if (file === null) return null
  const done = bytes(["magick", file, "png:-"])
  if (done.code !== 0) return null
  return `data:image/png;base64,${Buffer.from(done.out).toString("base64")}`
}

export async function gameArt(): Promise<ArtAt> {
  const archive = await opened()
  return remembered((texture) => {
    const own = addonArt(texture)
    if (own !== null) return own
    if (archive === null) return null
    const picture = join(archive.art, PICTURES, `${archiveName(texture).replace(/\.dds$/, "")}.png`)
    return keptAt(picture, () => drawn(archive.read(), texture, picture), "image/png")
  })
}

export async function gameTypefaces(): Promise<ArtAt> {
  const archive = await opened()
  if (archive === null) return remembered(webFace)
  const strings = gameFontStrings(esouiSourceDir())
  return remembered((face) => {
    const temper = webFace(face)
    if (temper !== null) return temper
    const path = face.replace(PLACEHOLDER, (whole, key: string) => strings[key] ?? whole)
    for (const kind of FACE_KINDS) {
      const named = path.replace(SLUG, `.${kind}`)
      const kept = join(archive.art, FACES_UNDER, archiveName(named))
      const found = keptAt(kept, () => copied(archive.read(), named, kept), `font/${kind}`)
      if (found !== null) return found
    }
    return null
  })
}

export async function keepGameTypefaces(): Promise<undefined> {
  const kept = await gameTypefaces()
  for (const face of Object.values(gameFontStrings(esouiSourceDir()))) {
    if (SLUG.test(face)) kept(face)
  }
  return undefined
}
