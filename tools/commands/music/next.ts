
export const summary = "Pick the next thing for Alan to explore (Eppie exploration selector)"

import * as musicExploration from "@akasha/music-choosing/music-exploration"
import type { Catalog, Exploration } from "@akasha/music-choosing/music-exploration"
import * as ratingLadder from "@akasha/music-choosing/rating-ladder"
import type { MusicRating } from "@akasha/music-choosing/rating-ladder"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { answerNamed } from "../../lib/page-query.ts"
import { type Row } from "../../lib/page-derive-shape.ts"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"

const ARTISTS = "artists-all"

const SONGS = "music-songs-all"

export const help: CommandHelp = {
  flags: [{ name: "--json", description: "Emit a JSON envelope instead of human text" }],
  positionals: [],
  exits: [{ code: 0, meaning: "selection printed (including the exhausted state)" }],
  examples: ["ops music next", "ops music next --json"],
}

interface Named {
  readonly slug: string
  readonly title: string
}

interface SelectionView {
  readonly kind: Exploration["kind"]
  readonly artist?: Named
  readonly song?: Named
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

// `songType` and `performed` are required on a song, so a row naming neither still gets a reading.
// The selector offers only songs that are `original` and performed, and a row that names no type
// asserts no originality, so an unnamed type reads as `derivative` and an unnamed performance as
// false — both keep such a row out of the offer, which is where it sat before.
function catalogue(ladder: readonly MusicRating[]): Catalog {
  const artists = rowsOf(ARTISTS).map((row) => {
    const held = rating(row, ladder)
    return {
      slug: text(row, "slug") ?? "",
      title: text(row, "title") ?? "",
      genre: list(row, "genre"),
      ...(held === undefined ? {} : { rating: held }),
    }
  })
  const songs = rowsOf(SONGS).map((row) => {
    const held = rating(row, ladder)
    return {
      slug: text(row, "slug") ?? "",
      title: text(row, "title") ?? "",
      artistSlug: text(row, "artist-slug") ?? "",
      songType: oneOf(row, "song-type", ["original", "derivative"] as const) ?? "derivative",
      performed: text(row, "performed") === "true",
      ...(held === undefined ? {} : { rating: held }),
    }
  })
  return { artists, songs }
}

function toSelectionView(exploration: Exploration): SelectionView {
  if (exploration.kind === "exhausted") return { kind: "exhausted" }
  const song =
    exploration.kind === "song-in-liked-artist" ? exploration.song : exploration.firstSong
  const artist = exploration.artist
  return {
    kind: exploration.kind,
    artist: { slug: artist.slug, title: artist.title },
    song: { slug: song.slug, title: song.title },
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
  return `${label}: ${song} — ${artist}\n  artist slug ${view.artist?.slug}\n  song slug   ${view.song?.slug}`
}

export default async function musicNext(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const exploring = musicExploration
  const ladder = ratingLadder
  const view = toSelectionView(exploring.selectNextExploration(catalogue(ladder.MUSIC_RATINGS)))

  process.stdout.write(json ? `${JSON.stringify(view)}\n` : `${formatSelection(view)}\n`)
}
