
export const summary = "Download every photo from an iCloud shared album to disk"

import { mkdir } from "node:fs/promises"
import type { PhotoAsset } from "@media/cli/media/pull-icloud-core"
import {
  buildQueryRequest,
  buildResolveRequest,
  dedupePaths,
  nextStartRank,
  parseQueryPage,
  parseResolveResponse,
  parseShareToken,
  resolveOutputDir,
} from "@media/cli/media/pull-icloud-core"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--url",
      argLabel: "<share-url>",
      valueShape: "token",
      required: true,
      description: "iCloud shared-album URL (or pass as the positional)",
    },
    {
      name: "--out",
      argLabel: "<dir>",
      valueShape: "token",
      aliases: ["--output"],
      description: "Destination directory (created if absent). Default: current directory.",
    },
    {
      name: "--json",
      description: 'Emit one {"path":"…"} object per line instead of a path per line',
    },
  ],
  positionals: [
    {
      name: "share-url",
      required: false,
      aliasOfFlag: "--url",
      description: "iCloud shared-album URL",
    },
  ],
  exits: [
    { code: 0, meaning: "all photos written" },
    { code: 1, meaning: "input error — bad flag or non-iCloud-share URL" },
    { code: 2, meaning: "data error — malformed CloudKit response or empty album" },
    { code: 3, meaning: "operational error — network failure or non-200 from iCloud" },
  ],
  examples: [
    "ops icloud fetch https://share.icloud.com/photos/0ABCdef",
    "ops icloud fetch --url https://share.icloud.com/photos/0ABCdef --out ~/Pictures/share/",
    "ops icloud fetch https://share.icloud.com/photos/0ABCdef --out ./album --json",
  ],
}

function errText(e: unknown): string {
  return e instanceof Error ? e.message : String(e)
}

async function postJson(url: string, body: unknown): Promise<unknown> {
  let res: Response
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch (e) {
    throw operationalError(`iCloud request failed: ${errText(e)}`)
  }
  if (!res.ok) {
    throw operationalError(`iCloud responded ${res.status} ${res.statusText}`)
  }
  try {
    return await res.json()
  } catch {
    throw operationalError("iCloud response was not valid JSON")
  }
}

async function downloadTo(url: string, dest: string): Promise<void> {
  let res: Response
  try {
    res = await fetch(url)
  } catch (e) {
    throw operationalError(`download failed for ${dest}: ${errText(e)}`)
  }
  if (!res.ok) {
    throw operationalError(`download responded ${res.status} ${res.statusText} for ${dest}`)
  }
  await Bun.write(dest, await res.arrayBuffer())
}

async function fetchAllAssets(rawResolve: unknown): Promise<readonly PhotoAsset[]> {
  const ctx = parseResolveResponse(rawResolve)
  const assets: PhotoAsset[] = []
  let startRank = 0
  for (;;) {
    const req = buildQueryRequest(ctx, startRank)
    const page = parseQueryPage(await postJson(req.url, req.body))
    assets.push(...page)
    const next = nextStartRank(startRank, page.length)
    if (next === undefined) break
    startRank = next
  }
  return assets
}

export default async function mediaPullIcloud(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const shareUrl = parsed.requireString("--url")
  const outFlag = parsed.string("--out")
  const json = parsed.boolean("--json")

  const token = parseShareToken(shareUrl)
  const resolveReq = buildResolveRequest(token)
  const assets = await fetchAllAssets(await postJson(resolveReq.url, resolveReq.body))

  if (assets.length === 0) {
    throw dataError(`no photos found in shared album: ${shareUrl}`)
  }

  const dir = resolveOutputDir(outFlag, process.cwd())
  await mkdir(dir, { recursive: true })

  const targets = dedupePaths(assets, dir)
  for (const target of targets) {
    await downloadTo(target.asset.downloadURL, target.path)
  }

  const lines = targets.map((t) => (json ? JSON.stringify({ path: t.path }) : `path\t${t.path}`))
  process.stdout.write(`${lines.join("\n")}\n`)
}
