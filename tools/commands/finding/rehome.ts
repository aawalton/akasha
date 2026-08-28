export const summary = "Move a finding to another domain, key and folder together"

import { existsSync, readFileSync, statSync } from "node:fs"
import { land, toRelPath } from "../../lib/command.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import {
  declaredDomains,
  findingPathIn,
  findingRepo,
  findingsDirIn,
  addressRefusal,
  undeclaredRefusal,
  withDomainKey,
} from "../../lib/finding.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { repoOf } from "../../lib/payload.ts"
import { pageNameOf } from "../../../page/name/name.ts"
import { type Roots } from "../../../page/page.ts"
import { AKASHA, resolveRoots, rootFor, targetRepo, targetRoot } from "../../../repo/roots/roots.ts"
import { landMoves } from "../../../move/move.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--file-path",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      required: true,
      description: "The finding, exactly one domain folder deep.",
    },
    {
      name: "--domain",
      argLabel: "<address>",
      valueShape: "token",
      required: true,
      description: "The domain it belongs to. Written `<page-type>/<slug>`.",
    },
    {
      name: "--message",
      argLabel: "<msg>",
      valueShape: "prose",
      description: "Commit message. Defaults to one naming both ends.",
    },
    { name: "--dry-run", description: "Gate and report; move and commit nothing." },
  ],
  exits: [
    { code: 0, meaning: "gated, moved, committed, and the push handed off (or dry-run)" },
    {
      code: 1,
      meaning:
        "input error — a path outside the repository findings stand in, a path that names no finding, " +
        "a domain written as a bare slug rather than an address, " +
        "a domain no document declares, a finding declaring no `domain-slug:`, or one already sitting " +
        "under the domain it declares — or a gate or the escaped-spelling survey refused. " +
        "Nothing was moved",
    },
    { code: 3, meaning: "operational: the write or the commit failed" },
  ],
  examples: [
    "ops finding rehome --file-path pages/finding/ops-cli/bounds-unsized.md --domain domain/ops-namespace",
    "ops finding rehome --file-path pages/finding/ops-cli/bounds-unsized.md --domain domain/ops-namespace --dry-run",
  ],
}

function rekeyed(body: string, domain: string): string {
  const spliced = withDomainKey(body, domain)
  if ("refusal" in spliced) {
    throw operationalError(`the body about to land no longer carries a \`domain-slug:\` — ${spliced.refusal}`)
  }
  return spliced.body
}

function landKeyOnly(relPath: string, body: string, roots: Roots, message: string, dryRun: boolean): void {
  const entries = [{ relPath, body }]
  land(roots, entries, message, dryRun)
}

export default async function findingRehome(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const filePath = parsed.requireString("--file-path")
  const domain = parsed.requireString("--domain")

  const stands = findingRepo(rootFor(resolveRoots(), AKASHA))
  const held = repoOf(["--file-path", filePath])
  if (held !== stands) {
    throw inputError(
      `${filePath} is inside the ${held} repo, and a finding stands in the ${stands} repo — ` +
        "`pages/page-type/finding.page-type.md` files them there and nowhere else, and no flag here overrides it"
    )
  }
  const roots = resolveRoots(stands)
  const root = targetRoot(roots)
  if (!existsSync(`${root}/.git`)) throw operationalError(`${root} is not a git repo`)

  const declared = declaredDomains(rootFor(roots, AKASHA))
  const bare = addressRefusal(domain, declared)
  if (bare !== null) throw inputError(bare)
  const undeclared = undeclaredRefusal(domain, declared)
  if (undeclared !== null) throw inputError(undeclared)

  const at = toRelPath(filePath, roots)
  const findings = findingsDirIn(root)
  const under = at.startsWith(`${findings}/`) ? at.slice(findings.length + 1).split("/") : []
  const leaf = under.at(-1) ?? ""
  const absolute = `${root}/${at}`
  const deep = under.length === 1 || under.length === 2
  if (!deep || !leaf.endsWith(".md") || !existsSync(absolute) || !statSync(absolute).isFile()) {
    throw inputError(
      `${at} does not name a finding — one lives at \`${findings}/<domain>/<name>.md\`, and this takes ` +
        `one from there or one sitting directly under \`${findings}/\`, and moves nothing else`
    )
  }
  const spliced = withDomainKey(readFileSync(absolute, "utf8"), domain)
  if ("refusal" in spliced) throw inputError(`${at} cannot be rehomed: ${spliced.refusal}`)

  // THE STEM IS THE NAME WITHOUT ITS PAGE SUFFIXES, and `leaf.slice(0, -3)` was only taking `.md`
  // off. That left `<name>.finding`, which `findingPathIn` suffixed again, so every destination
  // this worked out was `<name>.finding.finding.md` and `to` could never equal `at`. The refusal
  // below could not fire, the key-only branch could not be reached, and a rehome asking for nothing
  // took the move branch and exited 0 having landed a doubled name.
  const stem = pageNameOf(leaf)?.stem
  if (stem === undefined) {
    throw inputError(
      `${at} is not named as a page — a finding's file is \`<name>.finding.md\`, and where it ` +
        "belongs is worked out from that name"
    )
  }
  const to = findingPathIn(root, stem)
  if (to === at && spliced.declared === domain) {
    throw inputError(
      `${at} already stands under \`${domain}\` and already declares it. Nothing was written: ` +
        "there is no move to make and no key to change"
    )
  }
  const stated = parsed.string("--message")?.trim()
  const message =
    stated === undefined || stated === "" ? `${targetRepo(roots)}: rehome ${at} to ${domain}` : stated
  const dryRun = parsed.boolean("--dry-run")

  if (to === at) {
    landKeyOnly(at, spliced.body, roots, message, dryRun)
    return
  }
  const where = { repo: targetRepo(roots), root }
  landMoves({
    moves: new Map([[at, to]]),
    source: where,
    destination: where,
    message,
    dryRun,
    transform: (_, moved) => rekeyed(moved, domain),
  })
}
