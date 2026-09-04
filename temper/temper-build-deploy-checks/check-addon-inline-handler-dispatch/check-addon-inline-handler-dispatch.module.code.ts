import { readFileSync } from "node:fs"
import { relative } from "node:path"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import {
  type DispatchFinding,
  detectNonDispatchHandlers,
} from "../addon-inline-handler-dispatch/addon-inline-handler-dispatch.module.code.ts"
import {
  addonRosterIsEmpty,
  EMPTY_ADDON_ROSTER_HINT,
} from "../addon-roster-guard/addon-roster-guard.module.code.ts"
import { addonMarkupFiles } from "../addon-source-files/addon-source-files.module.code.ts"
import { parseArgs as parseCliArgs, REPO_ROOT_FLAG } from "../cli-args/cli-args.module.code.ts"
import { errorMessage } from "../error-message/error-message.module.code.ts"
import { renderPopulationBound } from "../population-bound/population-bound.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"

const PREFIX = "[addon-inline-handler-dispatch]"

const GOVERNED_NAMESPACES: ReadonlySet<string> = new Set(["TemperCrafting"])

type Scan = {
  readonly findings: readonly DispatchFinding[]
  readonly markupHeld: number
  readonly markupJudged: number
  readonly addonsWalked: number
}

function scanRoster(repoRoot: string): Scan {
  const findings: DispatchFinding[] = []
  let markupHeld = 0
  let markupJudged = 0
  let addonsWalked = 0

  for (const addon of listAllAddons({ repoRoot })) {
    addonsWalked += 1
    const markup = addonMarkupFiles(addon.dir)
    markupHeld += markup.own.length + markup.copies.length
    for (const markupFile of markup.own) {
      const xml = readFileSync(markupFile, "utf8")
      markupJudged += 1
      findings.push(
        ...detectNonDispatchHandlers({
          xmlPath: relative(repoRoot, markupFile),
          xml,
          governed: GOVERNED_NAMESPACES,
        })
      )
    }
  }

  return { findings, markupHeld, markupJudged, addonsWalked }
}

function formatFinding(finding: DispatchFinding): string {
  return `${finding.xmlPath}:${finding.line} <${finding.handler}> — ${finding.message}\n      body: ${finding.snippet}`
}

function governedNote(): string {
  return `${PREFIX} governed: ${[...GOVERNED_NAMESPACES].sort().join(", ")}. A handler naming any other namespace is not judged.\n`
}

function reportHuman(scan: Scan): undefined {
  const bound = renderPopulationBound({
    examined: scan.markupJudged,
    declared: scan.markupHeld,
    unit: "XML files",
  })
  const walked = `(found by walking ${scan.addonsWalked} add-on(s))`
  if (scan.findings.length === 0) {
    process.stdout.write(
      `${PREFIX} every governed-namespace inline markup handler is a single named-global dispatch. ${bound} ${walked}\n`
    )
  } else {
    process.stdout.write(
      `${PREFIX} non-dispatch governed inline markup handler(s) — ${scan.findings.length} finding(s):\n\n`
    )
    for (const finding of scan.findings) process.stdout.write(`  - ${formatFinding(finding)}\n`)
    process.stdout.write(
      `\n${PREFIX} ${scan.findings.length} violation(s) found ${bound} ${walked}\n`
    )
  }
  process.stdout.write(governedNote())
}

function main(): 0 | 1 | 2 {
  let asJson = false
  try {
    const { flags } = parseCliArgs(
      process.argv.slice(2),
      { json: { kind: "boolean" } },
      { passthrough: true }
    )
    asJson = flags.json ?? false
  } catch {
    asJson = false
  }

  let scan: Scan
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    if (addonRosterIsEmpty(repoRoot)) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    scan = scanRoster(repoRoot)
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (scan.markupJudged === 0) {
    const bound = renderPopulationBound({
      examined: 0,
      declared: scan.markupHeld,
      unit: "XML files",
    })
    process.stderr.write(
      `${PREFIX} ${bound} — walked ${scan.addonsWalked} add-on(s) and judged no markup, so this gate ` +
        `certifies nothing; every add-on's own \`.xml\` under its own folder is what this run expects\n`
    )
    return 2
  }

  if (asJson) {
    for (const finding of scan.findings) process.stdout.write(`${JSON.stringify(finding)}\n`)
  } else {
    reportHuman(scan)
  }
  return scan.findings.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
