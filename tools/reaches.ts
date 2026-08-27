export const tool = {
  summary: "Publish every code-repository module this repository reaches",
  repos: ["instructions"],
} as const

import { codeReaches, type Reach } from "./lib/code-reaches.ts"
import { resolveRoots } from "../repo/roots/roots"

const HELP = `bun tools/reaches.ts — every code-repository module this repository reaches

DERIVED AT READ TIME, never kept by hand. Nothing here lists a module name: the answer is
what this repository's TypeScript hands to \`codeModule\`, \`codeModuleSync\` and
\`runCodeCommand\` on this run, so a reach added appears without anybody remembering to add
it, and one removed goes the same way.

  bun ~/repos/instructions/tools/reaches.ts --json
  bun ~/repos/instructions/tools/reaches.ts | head

A REF IS NEVER RESOLVED HERE. This repository has no checkout of the code repository being
judged, and a pod's is not at \`~/code\`. Each ref is published as written, with the \`path\`
or \`specifier\` reading that \`codeModule\` itself would take of it, and whoever consumes this
resolves it in the tree they are judging.

FIVE SHAPES ARE FOLLOWED, each measured against this tree rather than assumed:
a string handed to the call; a top-level \`const\` holding a string, a concatenation, or a
template whose holes are consts already bound; a const imported from another file under
the tree; the elements of \`[A, B].map((ref) => codeModule(ref))\`; and a field on a
wrapper's request object, where the field NAMES come from the wrapper's own calls and the
literals from each file that imports it. A file defining one of those three calls is
skipped, forwarding a parameter and reaching nothing of its own, and a file that never
IMPORTS the seam is not read for calls at all — which is why prose naming the call, this
help among it, is not taken for one.

A SIXTH SWEEP READS EVERY FILE for a \`packages/….ts\` path wherever it stands in the text,
rather than only where quotes wrap the whole of it: a path sitting inside a shell command or
after an interpolation is named just as plainly as one written alone. A path spelled relative to
this tree, \`./\` or \`../\` ahead of it, names a file here rather than there, and is left out.

WHICH REPOSITORY A SWEPT PATH NAMES IS READ RATHER THAN ASSUMED. Both repositories carry a
\`packages/\` tree at mirrored paths, so a bare \`packages/….ts\` string no longer says which one
it means. Where the path stands behind a node id, the prefix says the repository outright, and
\`ts-file:instructions:packages/…\` names a file HERE — not this command's subject, and left out
rather than swept past. Where nothing says which repository, the two trees are asked which of
them holds that path: one holding it settles it, and a ref only this tree holds is still
published, because whoever consumes this resolves it and needs to see it. AMBIGUITY TAKES TWO
CANDIDATES: only where BOTH trees hold the path does this command refuse to pick, and such a
ref is published under \`ambiguous\` rather than counted as reached.

EVERY REF IS PRINTED WITH THE SITES THAT NAME IT, rather than with a count of them. A ref whose
only site is the file standing at that same path is a file saying where it writes, not a
consumer of anything — and it is printed with its site rather than filtered out, because a
filter that is ever wrong is invisible while a printed site can be checked.

WHAT IS NOT FOLLOWED IS PUBLISHED RATHER THAN DROPPED, under \`unfollowed\`, with the site and
the expression as written — the call sites no shape reached, every code file named with an
ending that cannot be published as a ref, and every node id whose key is a hole this tree
cannot fill, \`ts-file:code:\${app.configPath}\` among them, where the file meant is chosen
from disk on the run and no reading of the text can say which one it is. A reach dropped in silence reads downstream
as a module nothing reaches, which is a false accusation — the failure this publication exists
to remove.

EVERY \`.ts\` FILE IN THE TREE IS READ, wherever it stands — \`tools/\`, \`services/\`,
\`packages/\` and whatever directory is added next. A scan bounded to one directory reads a
reach from outside it as a module nothing reaches, which is the same false accusation.
THREE THINGS ARE LEFT OUT, each by a stated rule rather than by omission: anything under a
\`node_modules/\` directory, which is installed dependency code rather than this
repository's; anything under \`tools/tests/\`; and any file ending \`.test.ts\`. The last two
are read as fixtures rather than as reaches, and a fixture ref stands nowhere often enough
that publishing one would refuse a consumer's whole run. The count below says how many files were read, so the exclusions are visible rather
than inferred.

Usage:
  bun ~/repos/instructions/tools/reaches.ts [--json]

Flags:
  --json  One JSON object on stdout: \`scanned\`, \`reaches\` and \`ambiguous\` (each \`ref\`,
          \`kind\`, \`sites\`, \`handed\`) and \`unfollowed\`. Sorted and deduplicated, and
          \`sites\` is never empty.
  --help  This.

Exit codes:
  0  the tree was read and the answer printed
  2  the call could not be read, or no file was read at all. Nothing was printed: an empty
     publication is indistinguishable from a repository that reaches nothing.
`

function refuse(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(2)
}

function main(): void {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return
  }
  const asJson = argv.includes("--json")
  for (const one of argv) {
    if (one !== "--json") refuse(`\`${one}\` is not an argument this takes — run it with --help`)
  }

  const root = resolveRoots().akasha
  const found = codeReaches(root)
  if (found.scanned === 0) {
    refuse(`${root} holds no TypeScript to read, so this reached no population`)
  }

  process.stderr.write(
    `${found.scanned} file(s) read (node_modules, tools/tests/ and *.test.ts left out), ` +
      `${found.reaches.length} distinct ref(s) reached, ${found.ambiguous.length} ambiguous, ` +
      `${found.unfollowed.length} call site(s) not followed\n`
  )
  if (asJson) {
    process.stdout.write(`${JSON.stringify(found)}\n`)
    return
  }
  const said = (one: Reach): string => `${one.ref}\t${one.sites.length} site(s): ${one.sites.join(" ")}`
  const lines = found.reaches.map((one) => `${one.kind}\t${said(one)}`)
  for (const one of found.ambiguous) lines.push(`ambiguous\t${said(one)}`)
  for (const one of found.unfollowed) lines.push(`unfollowed\t${one.expression}\t${one.site}`)
  process.stdout.write(lines.length === 0 ? "" : `${lines.join("\n")}\n`)
}

if (import.meta.main) main()
