export const summary = "File one finding, keyed and sited from one statement"

import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { defaultMessage } from "../../lib/command.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import {
  declaredDomains,
  filingFor,
  findingRepo,
  kebabRefusal,
  addressRefusal,
  undeclaredRefusal,
} from "../../lib/finding.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { AKASHA, resolveRoots, rootFor, targetRoot } from "@akasha/pages-system/checkout-roots"
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
      description: "The file name, without `.finding.ts`, kebab-case.",
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
    "ops finding create --domain domain/ops-cli --slug reaches-uncredited --claim-file /var/tmp/claim.md --evidence-file /var/tmp/evidence.md",
    "ops finding create --domain domain/ops-cli --slug irreversible-spelled-twice --claim-file /var/tmp/claim.md --evidence-file /var/tmp/evidence.md --dry-run",
  ],
}

const CLI = "akasha/command-system/cli/cli.module.code.ts"

/**
 * The finding handed to `akasha write`, which is the only door into `akasha/`.
 *
 * This used to compose markdown and commit it itself, through a landing that runs no check, no
 * warrant and no minting on the akasha repo. The gate is what mints the page's `id`, judges the
 * claim against its 500-character limit and the evidence against its 2000, and asks for the readings
 * a write is owed — so a finding that went around it was a page no reader of findings could trust.
 *
 * The body goes to a scratch file outside the root because the verb takes a file and never text said
 * in an argument. Output is inherited rather than captured: when the gate refuses for want of a
 * reading it names each file to read, and a refusal cut in half is one nobody can act on.
 */
function landed(root: string, relPath: string, body: string, message: string, dryRun: boolean): void {
  const dir = mkdtempSync(join(tmpdir(), "finding-"))
  try {
    const at = join(dir, "body.ts")
    writeFileSync(at, body, "utf8")
    const args = ["write", "--file-path", relPath, "--content-file", at, "--message", message]
    if (dryRun) args.push("--dry-run")
    const ran = Bun.spawnSync([process.execPath, `${root}/${CLI}`, ...args], { stdio: ["inherit", "inherit", "inherit"] })
    if (ran.exitCode !== 0) {
      throw operationalError(
        `\`akasha write\` exited ${ran.exitCode ?? "on a signal"} and ${relPath} was not written — ` +
          "what it refused for is said above, whole"
      )
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
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

  const { relPath, body } = filingFor(
    root,
    domain,
    slug,
    authored(parsed.requireString("--claim-file"), "claim").trim(),
    authored(parsed.requireString("--evidence-file"), "evidence").trim()
  )
  if (existsSync(`${root}/${relPath}`)) {
    throw inputError(
      `${relPath} already holds a finding — filing never overwrites a claim somebody else made`
    )
  }
  process.stdout.write(`file:   ${relPath}\n`)

  const stated = parsed.string("--message")?.trim()
  const message =
    stated === undefined || stated === "" ? defaultMessage(roots, "file", [relPath]) : stated
  landed(root, relPath, body, message, parsed.boolean("--dry-run"))
}
