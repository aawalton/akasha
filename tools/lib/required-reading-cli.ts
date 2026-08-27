
import { existsSync } from "node:fs"
import type { RequiredReading } from "../required-reading.ts"
import type { Repo } from "../../page/document/types.ts"
import { type Roots } from "../../page/page"
import { locate, REPOS } from "../../repo/roots/roots"

export function locatePath(argv: readonly string[], roots: Roots): { relPath: string; repo: Repo } {
  const at = argv.findIndex((a) => a === "--file-path" || a === "--path")
  const relPath = at === -1 ? argv[0] : argv[at + 1]
  if (relPath === undefined || relPath.startsWith("-")) {
    process.stderr.write("usage: bun tools/required-reading.ts --file-path <path>\n")
    process.exit(1)
  }
  const located = locate(relPath.startsWith("/") ? relPath : `${process.cwd()}/${relPath}`, roots)
  if (located === null) {
    process.stderr.write(`${relPath} sits in no repo\n`)
    process.exit(1)
  }
  if (!relPath.startsWith("/") && !existsSync(`${process.cwd()}/${relPath}`)) {
    for (const repo of REPOS) {
      if (repo === located.repo) continue
      if (!existsSync(`${roots[repo]}/${relPath}`)) continue
      process.stderr.write(
        `${relPath} is not in the ${located.repo} repo your working directory puts it in, ` +
          `and IS a file in the ${repo} repo — answering here would name the ${located.repo} ` +
          `documents for a ${repo} path. Give the absolute path.\n`,
      )
      process.exit(1)
    }
  }
  return located
}

export function printed(
  relPath: string,
  repo: Repo,
  required: RequiredReading,
  pages: readonly string[]
): string {
  const lines = [
    ...required.whole.map((p) => `  ${p}`),
    ...[...required.sections]
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .flatMap(([section, at]) =>
        at
          .filter((p) => !required.whole.includes(p))
          .map((p) => `  ${p} — only where \`# ${section}\` changes`)
      ),
    ...pages.map((at, index) =>
      index === 0
        ? `  ${at} — specifies what a page here must hold`
        : `  ${at} — specifies it too, through \`${pages[0]}\`'s \`extends-slug\``
    ),
  ]
  return `${relPath} (${repo})\n${(lines.length === 0 ? ["  nothing is required for it"] : lines).join("\n")}\n`
}
