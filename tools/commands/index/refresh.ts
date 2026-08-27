
export const summary = "Refresh the page index, writing it again from every page in every repository"

import { buildOver } from "../../../page/index/build.ts"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { REPOS, resolveRoots } from "../../../repo/roots/roots"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  exits: [
    { code: 0, meaning: "the index was written, and what it came to is printed" },
    { code: 3, meaning: "operational error: the index came out holding no page at all" },
  ],
  examples: ["ops index refresh"],
}

function rootsHere(): Readonly<Record<string, string>> {
  const held = resolveRoots()
  const made: Record<string, string> = {}
  for (const repo of REPOS) {
    const root = held[repo]
    if (typeof root === "string") made[repo] = root
  }
  return made
}

export default async function indexRefresh(args: readonly string[]): Promise<void> {
  parseArgs(help, args)
  const roots = rootsHere()
  const named = Object.keys(roots)
  const built = buildOver(roots)
  if (built.pages === 0) {
    throw operationalError(
      `the index came out over ${String(named.length)} repositories holding 0 pages, which reads ` +
        "exactly like repositories with no page in them. Something stopped the walk reaching them."
    )
  }
  process.stdout.write(
    `index refreshed over ${named.join(", ")}\n` +
      `  ${String(built.pages)} page(s)\n` +
      `  ${String(built.handles)} identity handle(s) over ${String(built.buckets)} bucket(s)\n` +
      `  ${String(built.entries)} relation entry(s) over ${String(built.files)} relation file(s)\n`
  )
}
