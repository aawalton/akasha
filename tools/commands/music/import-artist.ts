export const summary = "Import an artist and all of their songs from MusicBrainz"

import {
  importArtistFromMusicBrainz,
  type ImportArtistResult,
} from "@collections/music/musicbrainz/import"
import type { CommandHelp } from "../../ops/surface.ts"
import { todayYYYYMMDD } from "@shared/utils-sync/today"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--name",
      argLabel: "<name>",
      valueShape: "token",
      description: "Artist name to search for (or pass as the positional)",
    },
    {
      name: "--mbid",
      argLabel: "<mbid>",
      valueShape: "token",
      description: "MusicBrainz artist MBID (exact resolve)",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      description: "Cap the number of songs imported (for spike / smoke runs)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  positionals: [
    {
      name: "name",
      required: false,
      aliasOfFlag: "--name",
      description: "Artist name to search for",
    },
  ],
  exits: [
    { code: 0, meaning: "artist + songs imported" },
    { code: 1, meaning: "input error — neither --name nor --mbid supplied" },
  ],
  examples: [
    'ops music import-artist --name "Taylor Swift"',
    "ops music import-artist --mbid 20244d07-534f-4eff-b4d4-930878889970",
    'ops music import-artist --name "Taylor Swift" --limit 50 --json',
  ],
}

export default async function musicImportArtist(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const name = parsed.string("--name")
  const mbid = parsed.string("--mbid")
  const limit = parsed.nonNegativeInt("--limit")
  const json = parsed.boolean("--json")

  if ((name == null || name === "") && (mbid == null || mbid === "")) {
    throw inputError("supply --name or --mbid to identify the artist")
  }

  const result: ImportArtistResult = await importArtistFromMusicBrainz({
    name,
    mbid,
    limit,
    today: todayYYYYMMDD(),
  })

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        artist: { name: result.artistName, mbid: result.mbid, slug: result.artistSlug },
        songsTotal: result.songsTotal,
        songsWritten: result.songsWritten,
        songsWithLyrics: result.songsWithLyrics,
        derivedFrom: result.derivedFrom,
      })}\n`
    )
  } else {
    process.stdout.write(
      `artist\t${result.artistName}\t${result.mbid}\t${result.artistSlug}\n` +
        `songs\t${result.songsWritten}\n` +
        `lyrics\t${result.songsWithLyrics}\n` +
        `source\t${result.derivedFrom}\n`
    )
  }
}
