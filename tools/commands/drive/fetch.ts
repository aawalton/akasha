export const summary = "Download a Drive file by URL or id to disk and print the written path"

import { mkdir } from "node:fs/promises"
import { basename, isAbsolute, join, resolve } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--source",
      argLabel: "<url-or-id>",
      valueShape: "token",
      required: true,
      description: "A Drive share URL or a bare Drive file id (also accepted positionally)",
    },
    {
      name: "--out",
      argLabel: "<dir>",
      valueShape: "token",
      description: "Directory to write the file into (created if absent). Defaults to the cwd.",
    },
  ],
  positionals: [
    {
      name: "url-or-id",
      required: false,
      aliasOfFlag: "--source",
      description: "A Drive share URL or a bare Drive file id",
    },
  ],
  envVars: [
    {
      name: "GOOGLE_GMAIL_OAUTH_CLIENT_ID",
      required: true,
      description: "OAuth client ID (Desktop-app credential, shared with the Gmail OAuth app)",
    },
    {
      name: "GOOGLE_GMAIL_OAUTH_CLIENT_SECRET",
      required: true,
      description: "OAuth client secret (shared with the Gmail OAuth app)",
    },
    {
      name: "GOOGLE_DRIVE_OAUTH_REFRESH_TOKEN",
      required: true,
      description: "Drive-scoped refresh token minted by `ops drive auth login`",
    },
  ],
  exits: [
    { code: 0, meaning: "file written; its absolute path is on stdout" },
    {
      code: 1,
      meaning:
        "input refusal — the source is neither a Drive URL nor a file id, or the file is a native Google format with no bytes to download",
    },
    { code: 2, meaning: "Drive holds no file of that id that this token can reach" },
    {
      code: 3,
      meaning:
        "operational — Drive refused the request, or the file's Drive name cannot be written to disk",
    },
  ],
  examples: [
    "ops drive fetch 'https://drive.google.com/file/d/1AbC.../view?usp=sharing'",
    "ops drive fetch 1AbC... --out ~/Pictures/inbound",
  ],
}

function refusalStatus(thrown: unknown): number | undefined {
  if (typeof thrown !== "object" || thrown === null) return undefined
  const status = (thrown as { readonly status?: unknown }).status
  return typeof status === "number" ? status : undefined
}

async function classify(thrown: unknown, fileId: string): Promise<unknown> {
  const status = refusalStatus(thrown)
  if (status === 404) {
    return dataError(
      `Drive holds no file ${fileId} that this token can reach — check the id, and that the ` +
        "file is shared with the account the consent was granted for"
    )
  }
  if (status === 401 || status === 403) {
    return operationalError(
      `Drive refused the request for ${fileId} with ${status} — the stored consent is ` +
        "missing or too narrow; mint a fresh one with `ops drive auth login`"
    )
  }
  return thrown
}

async function reaching<T>(fileId: string, act: () => Promise<T>): Promise<T> {
  try {
    return await act()
  } catch (thrown) {
    throw await classify(thrown, fileId)
  }
}

export default async function driveFetch(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const files = await import("@alanwalton/drive-google/files")
  const fileId = files.parseDriveFileId(parsed.requireString("--source"))

  const outRaw = parsed.string("--out")
  const outDir = outRaw === undefined ? process.cwd() : resolve(outRaw)

  const { makeDriveClient } = await import("@alanwalton/drive-google/client")
  const client = await makeDriveClient()
  const metadata = await reaching(fileId, () => files.fetchFileMetadata(client, fileId))

  if (files.isNativeGoogleDoc(metadata.mimeType))
    throw inputError(
      `"${metadata.name}" is a native Google ${metadata.mimeType ?? "app"} file with no binary ` +
        "bytes to download — export is out of scope for this read-only fetcher"
    )

  const bytes = await reaching(fileId, () => files.downloadFileBytes(client, fileId))

  const safeName = basename(metadata.name).trim()
  if (safeName === "" || safeName === "." || safeName === "..")
    throw operationalError(`Drive file ${fileId} has an unusable name: "${metadata.name}"`)

  const outPath = join(outDir, safeName)
  await mkdir(outDir, { recursive: true })
  await Bun.write(outPath, bytes)

  const absolute = isAbsolute(outPath) ? outPath : resolve(outPath)
  process.stdout.write(`${absolute}\n`)
}
