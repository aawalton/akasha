export const summary =
  "Every file in the code repository carrying a comment that stands outside the approved code comment forms, taken over the tree as it stands. Was `check-code-comments`, which read the forms, the required reading naming its population and the classifier itself out of the instructions repository, so a line off a list document here turned code-repo branches red with no commit near the cause, and narrowing that reading here emptied the population while the check still printed green. Reports and never refuses on a finding: a comment outside the forms may want deleting or may want its content moved to a domain, and only a reading tells which. Refuses where it could not look at all — nothing tracked, no file among them the code comment domain is required reading for, no readable forms list, or nothing left to read after the set-aside — because a run that read no file must not print like a run that found nothing (--repo-root, --json)"

import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { type Comment, commentsIn, UnscannableFile } from "../../code-comment/comments.ts"
import { classify, DOMAIN_DOC, FORMS_DOC, type Form, formsFrom, type Klass } from "../../code-comment/forms.ts"
import { reachedIn, reasonSaid, SET_ASIDE, type SetAside, setAside, tracked } from "../../code-comment/tree.ts"
import { codeModule } from "../../lib/code-import.ts"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { renderAuditReading, summarizeAudit } from "../../lib/audit-reading.ts"
import { codeRoot } from "../../lib/code-root.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import type { CommandHelp } from "../../ops/surface.ts"

const SUBJECT = "code-repo files carrying a comment outside the code comment forms"

const MAX_REPORTED = 20

const MAX_SITES = 5

export const help: CommandHelp = {
  flags: [
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      description: "Which code checkout to read for comments; defaults to $CODE_ROOT or $HOME/repos/code",
    },
    {
      name: "--json",
      description: "Emit the audit as single-line JSON instead of the human report",
    },
  ],
  exits: [
    { code: 0, meaning: "the audit ran and printed its reading, findings or none" },
    {
      code: 3,
      meaning:
        "operational error — nothing tracked, no file among them the code comment domain is required reading for, no readable forms list, or no file left to read, so nothing was measured",
    },
  ],
  examples: ["ops audit code-comments", "ops audit code-comments --json"],
}

interface Site {
  readonly line: number
  readonly klass: Klass
  readonly said: string
}

interface Finding {
  readonly relPath: string
  readonly count: number
  readonly sites: readonly Site[]
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

function said(raw: string): string {
  const flat = raw.replace(/\s+/g, " ").trim()
  return flat.length > 90 ? `${flat.slice(0, 87)}...` : flat
}

export default async function auditCodeComments(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const repoRootFlag = parsed.string("--repo-root")
  const repoRoot = repoRootFlag === undefined ? codeRoot() : resolve(repoRootFlag)
  const instructionsRoot = resolveRoots().instructions

  let trackedFiles: readonly string[]
  try {
    trackedFiles = tracked(repoRoot)
  } catch (error) {
    throw operationalError(
      `git could not list what ${repoRoot} tracks, so no population was acquired — ${messageOf(error)}`
    )
  }

  let reached: readonly string[]
  try {
    reached = reachedIn(instructionsRoot, repoRoot, "code")
  } catch (error) {
    throw operationalError(
      `what ${repoRoot} tracks could not be weighed against ${DOMAIN_DOC}, so nothing said which files ` +
        `to read and a clean run would mean only that nothing was asked about — ${messageOf(error)}`
    )
  }
  if (reached.length === 0) {
    throw operationalError(
      `none of the ${String(trackedFiles.length)} file(s) ${repoRoot} tracks is one ${DOMAIN_DOC} is ` +
        "required reading for, so no file was read for comments"
    )
  }

  let forms: readonly Form[]
  try {
    forms = formsFrom(readFileSync(`${instructionsRoot}/${FORMS_DOC}`, "utf8"))
  } catch (error) {
    throw operationalError(
      `${FORMS_DOC} did not yield the approved forms, so every comment would read as standing ` +
        `outside them rather than being weighed against them — ${messageOf(error)}`
    )
  }

  const asideBy = new Map<string, SetAside>()
  const unscannable: string[] = []
  const findings: Finding[] = []
  let compared = 0

  for (const relPath of reached) {
    let body: string
    try {
      body = readFileSync(`${repoRoot}/${relPath}`, "utf8")
    } catch {
      unscannable.push(relPath)
      continue
    }
    const held = setAside(relPath, () => body)
    if (held !== null) {
      asideBy.set(relPath, held)
      continue
    }
    let comments: readonly Comment[]
    try {
      comments = commentsIn(relPath, body)
    } catch (error) {
      if (!(error instanceof UnscannableFile)) throw error
      unscannable.push(relPath)
      continue
    }
    compared += 1
    const outside = comments
      .map((comment) => ({ comment, klass: classify(comment, relPath, forms) }))
      .filter((one) => one.klass !== "form")
    if (outside.length === 0) continue
    findings.push({
      relPath,
      count: outside.length,
      sites: outside.slice(0, MAX_SITES).map((one) => ({
        line: one.comment.line,
        klass: one.klass,
        said: said(one.comment.raw),
      })),
    })
  }

  if (compared === 0) {
    throw operationalError(
      `all ${String(reached.length)} file(s) ${DOMAIN_DOC} is required reading for in ${repoRoot} were set aside or ` +
        "could not be scanned, so no file was read for comments and a clean run would say only " +
        "that nothing was looked at"
    )
  }

  findings.sort((one, other) => other.count - one.count || one.relPath.localeCompare(other.relPath))
  const outsideTotal = findings.reduce((sum, one) => sum + one.count, 0)

  const audit = {
    reading: summarizeAudit({
      scanned: reached.length,
      compared,
      findings: findings.length,
      coverage: "complete" as const,
    }),
    instructionsRoot,
    repoRoot,
    tracked: trackedFiles.length,
    reached: reached.length,
    setAside: [...asideBy].map(([relPath, reason]) => ({ relPath, reason })),
    unscannable,
    compared,
    commentsOutside: outsideTotal,
    findings,
    observedAtMs: Date.now(),
  }

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(audit)}\n`)
    return
  }

  const lines = [...renderAuditReading(SUBJECT, audit.reading)]
  lines.push(
    `  POPULATION: ${String(reached.length)} of ${String(trackedFiles.length)} tracked file(s) in ` +
      `${repoRoot} are files ${DOMAIN_DOC} is required reading for, the forms coming ` +
      `from ${FORMS_DOC} in ${instructionsRoot}.`
  )
  const asideCounts = SET_ASIDE.map((reason) => {
    const these = [...asideBy.values()].filter((one) => one === reason)
    return `${String(these.length)} ${reason}`
  }).join(", ")
  lines.push(
    `  DENOMINATOR: ${String(compared)} file(s) were read for comments, after ${String(asideBy.size)} ` +
      `set aside (${asideCounts}) and ${String(unscannable.length)} nothing here knows how to scan.`
  )
  for (const reason of SET_ASIDE) {
    if ([...asideBy.values()].some((one) => one === reason)) {
      lines.push(`    ${reason} files are held out because ${reasonSaid(reason)}.`)
    }
  }
  if (findings.length === 0) {
    lines.push("    Every file read carries only comments in the approved forms.")
  } else {
    lines.push(
      `  OUTSIDE THE FORMS: ${String(outsideTotal)} comment(s) across ${String(findings.length)} file(s).`
    )
    for (const one of findings.slice(0, MAX_REPORTED)) {
      lines.push(`    ${one.relPath} — ${String(one.count)} comment(s)`)
      for (const site of one.sites) lines.push(`      :${String(site.line)} ${site.klass} — ${site.said}`)
      if (one.count > one.sites.length) {
        lines.push(`      and ${String(one.count - one.sites.length)} more in this file, not listed`)
      }
    }
    if (findings.length > MAX_REPORTED) {
      lines.push(
        `    and ${String(findings.length - MAX_REPORTED)} more file(s), not listed; --json carries every one`
      )
    }
  }
  process.stdout.write(`${lines.join("\n")}\n`)
}
