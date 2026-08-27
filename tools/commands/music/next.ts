
export const summary = "Pick the next thing for Alan to explore (Eppie exploration selector)"

import * as eppieSelect from "@collections/music/eppie/select"
import type { EppieCatalog, MusicRating } from "@collections/music/eppie/select"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { answerNamed, type Row } from "../../lib/page-query.ts"
import { resolveRoots } from "../../../repo/roots/roots"

const ARTISTS = "artists-all"

const SONGS = "music-songs-all"

export const help: CommandHelp = {
  flags: [{ name: "--json", description: "Emit a JSON envelope instead of human text" }],
  positionals: [],
  exits: [{ code: 0, meaning: "selection printed (including the exhausted state)" }],
  examples: ["ops music next", "ops music next --json"],
}

interface EppieEntity {
  readonly id: string
  readonly title: string
}

type EppieSelection =
  | { readonly kind: "song-in-liked-artist"; readonly artist: EppieEntity; readonly song: EppieEntity }
  | { readonly kind: "new-artist"; readonly artist: EppieEntity; readonly firstSong: EppieEntity }
  | { readonly kind: "exhausted" }

interface SelectionView {
  readonly kind: EppieSelection["kind"]
  readonly artist?: { readonly id: string; readonly title: string }
  readonly song?: { readonly id: string; readonly title: string }
  readonly playQuery?: string
}

function text(row: Row, key: string): string | undefined {
  const held = row.values[key]
  return typeof held === "string" && held !== "" ? held : undefined
}

function list(row: Row, key: string): readonly string[] {
  const held = row.values[key]
  if (Array.isArray(held)) return held
  return typeof held === "string" && held !== "" ? [held] : []
}

function rating(row: Row, ladder: readonly MusicRating[]): MusicRating | undefined {
  const held = text(row, "rating")
  return ladder.find((step) => step === held)
}

function oneOf<T extends string>(row: Row, key: string, admitted: readonly T[]): T | undefined {
  const held = text(row, key)
  return admitted.find((one) => one === held)
}

function rowsOf(name: string): readonly Row[] {
  const answered = answerNamed(resolveRoots(), name)
  if (answered === null || "refused" in answered) {
    throw new Error(`the \`${name}\` page query answered nothing, so the catalogue is unread`)
  }
  return answered.rows
}

function catalogue(ladder: readonly MusicRating[]): EppieCatalog {
  const artistRows = rowsOf(ARTISTS)
  const idBySlug = new Map<string, string>()
  const artists = artistRows.map((row) => {
    const id = text(row, "id") ?? ""
    const slug = text(row, "slug")
    if (slug !== undefined) idBySlug.set(slug, id)
    const held = rating(row, ladder)
    const externalId = text(row, "external-id")
    return {
      id,
      title: text(row, "title") ?? "",
      genres: list(row, "genre"),
      ...(held === undefined ? {} : { rating: held }),
      ...(externalId === undefined ? {} : { externalId }),
    }
  })
  const songs = rowsOf(SONGS).map((row) => {
    const held = rating(row, ladder)
    const songType = oneOf(row, "song-type", ["original", "derivative"] as const)
    const written = oneOf(row, "written", ["solo", "collab"] as const)
    const performed = text(row, "performed")
    return {
      id: text(row, "id") ?? "",
      title: text(row, "title") ?? "",
      artistId: idBySlug.get(text(row, "artist-slug") ?? "") ?? "",
      ...(songType === undefined ? {} : { songType }),
      ...(written === undefined ? {} : { written }),
      ...(performed === undefined ? {} : { performed: performed === "true" }),
      ...(held === undefined ? {} : { rating: held }),
    }
  })
  return { artists, songs }
}

function toSelectionView(selection: EppieSelection): SelectionView {
  if (selection.kind === "exhausted") return { kind: "exhausted" }
  const song = selection.kind === "song-in-liked-artist" ? selection.song : selection.firstSong
  const artist = selection.artist
  return {
    kind: selection.kind,
    artist: { id: artist.id, title: artist.title },
    song: { id: song.id, title: song.title },
    playQuery: `${artist.title} ${song.title}`,
  }
}

function formatSelection(view: SelectionView): string {
  if (view.kind === "exhausted") {
    return "Catalog exhausted — nothing new to surface right now."
  }
  const artist = view.artist?.title ?? "?"
  const song = view.song?.title ?? "?"
  const label = view.kind === "song-in-liked-artist" ? "more from a loved artist" : "a new artist"
  return `${label}: ${song} — ${artist}\n  artist ${view.artist?.id}\n  song   ${view.song?.id}`
}

export default async function musicNext(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const selectModule = eppieSelect
  const view = toSelectionView(selectModule.selectNextExploration(catalogue(selectModule.MUSIC_RATINGS)))

  process.stdout.write(json ? `${JSON.stringify(view)}\n` : `${formatSelection(view)}\n`)
}
