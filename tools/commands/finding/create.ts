export const summary = "File one finding, keyed and sited from one statement"

import { existsSync, readFileSync } from "node:fs"
import { defaultMessage, land } from "../../lib/command.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import {
  composeFinding,
  declaredDomains,
  findingPathIn,
  findingRepo,
  kebabRefusal,
  addressRefusal,
  undeclaredRefusal,
} from "../../lib/finding.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { AKASHA, resolveRoots, rootFor, targetRoot } from "../../../repo/roots/roots.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { notUtf8 } from "../../lib/utf8-body.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--domain",
      argLabel: "<address>",
      valueShape: "token",
      required: true,
      description: "The domain the observation bears on. Written `<page-type>/<slug>`.",
    },
    {
      name: "--slug",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: "The file name, without `.md`, kebab-case.",
    },
    {
      name: "--title",
      argLabel: "<text>",
      valueShape: "line",
      required: true,
      description: "What the finding claims, in one line.",
    },
    {
      name: "--claim-file",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      required: true,
      description: "The Claim, authored outside the root it lands in.",
    },
    {
      name: "--evidence-file",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      required: true,
      description: "The Evidence, likewise.",
    },
    {
      name: "--message",
      argLabel: "<msg>",
      valueShape: "prose",
      description: "Commit message. Defaults to one naming the path.",
    },
    { name: "--dry-run", description: "Gate and report; write and commit nothing." },
  ],
  exits: [
    { code: 0, meaning: "gated, written, committed, and the push handed off (or dry-run)" },
    {
      code: 1,
      meaning:
        "input error — a slug that is not kebab-case, a domain written as a bare slug rather than an " +
        "address, a domain no document declares, a destination " +
        "already holding a finding, a claim or evidence file that cannot be read — or a gate refused. " +
        "Nothing was written",
    },
    { code: 3, meaning: "operational: the write or the commit failed" },
  ],
  examples: [
    'ops finding create --domain domain/ops-cli --slug reaches-uncredited --title "Modules the ops CLI reaches were deleted as unreferenced, though a guard credits those reaches" --claim-file /var/tmp/claim.md --evidence-file /var/tmp/evidence.md',
    'ops finding create --domain domain/ops-cli --slug irreversible-spelled-twice --title "Irreversibility is stated on the document and in the code, and only the code gates" --claim-file /var/tmp/claim.md --evidence-file /var/tmp/evidence.md --dry-run',
  ],
}

function authored(path: string, what: string): string {
  let bytes: Uint8Array
  try {
    bytes = readFileSync(path)
  } catch (err) {
    throw inputError(
      `the ${what} could not be read from ${path}: ${err instanceof Error ? err.message : String(err)}`
    )
  }
  const body = decodeUtf8(bytes)
  if (body === null) throw inputError(notUtf8(path, bytes))
  return body
}

export default async function findingCreate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const domain = parsed.requireString("--domain")
  const slug = parsed.requireString("--slug")

  const roots = resolveRoots(findingRepo(rootFor(resolveRoots(), AKASHA)))
  const root = targetRoot(roots)
  if (!existsSync(`${root}/.git`)) throw operationalError(`${root} is not a git repo`)

  const badSlug = kebabRefusal(slug)
  if (badSlug !== null) throw inputError(badSlug)
  const declared = declaredDomains(rootFor(roots, AKASHA))
  const bare = addressRefusal(domain, declared)
  if (bare !== null) throw inputError(bare)
  const undeclared = undeclaredRefusal(domain, declared)
  if (undeclared !== null) throw inputError(undeclared)

  const relPath = findingPathIn(root, slug)
  if (existsSync(`${root}/${relPath}`)) {
    throw inputError(
      `${relPath} already holds a finding — filing never overwrites a claim somebody else made`
    )
  }
  const body = composeFinding(
    domain,
    slug,
    parsed.requireString("--title"),
    authored(parsed.requireString("--claim-file"), "claim"),
    authored(parsed.requireString("--evidence-file"), "evidence")
  )
  const entries = [{ relPath, body }]
  process.stdout.write(`file:   ${relPath}\n`)

  const stated = parsed.string("--message")?.trim()
  const message =
    stated === undefined || stated === "" ? defaultMessage(roots, "file", [relPath]) : stated
  land(roots, entries, message, parsed.boolean("--dry-run"))
}
