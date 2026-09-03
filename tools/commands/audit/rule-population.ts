export const summary =
  "Every enforcement rule that weighed nothing across the whole repo — the case where a rule has stopped looking and its silence still reads as a rule that looked and was satisfied. A rule's population is what it WEIGHED, never what it FOUND, and the two coincide at zero, which is why a construct retired out from under a rule prints the same green as a clean tree. Reports and never refuses: an empty population may want the rule removed or may want it repaired, and only a reading tells which, so the call stays a person's. Reaches the syntax scanners, whose populations come from the dispatch loop itself; the ast-grep rules are already refused on this by `check-ast-grep`, and the rules inside a check step have no registry to walk. Both exclusions print every run. Two controls ride the real dispatch and exit 3 rather than clean: one rule that skips every file and must weigh none, one that skips nothing and must weigh all (--repo-root, --tree-sha, --cache-dir, --json)"

import { resolve } from "node:path"
import { getRepoRoot } from "../../../akasha/checks/cluster-checks/modules/repo-root/repo-root.module.code.ts"
import { renderRuleReading } from "../../../akasha/checks/cluster-checks/modules/rule-population/rule-population.module.code.ts"
import {
  BLIND_SPOTS,
  gatherRulePopulations,
} from "../../../akasha/checks/cluster-checks/modules/rule-population-audit/rule-population-audit.module.code.ts"
import { renderAuditReading } from "../../lib/audit-reading.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SUBJECT = "rules whose population came back empty"

export const help: CommandHelp = {
  flags: [
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      description: "Which checkout to read the rules over (default: this one)",
    },
    {
      name: "--tree-sha",
      argLabel: "<sha>",
      valueShape: "token",
      description: "Graph cache key; omit to force a fresh inline build",
    },
    {
      name: "--cache-dir",
      argLabel: "<path>",
      valueShape: "token",
      description: "Graph cache directory",
    },
    {
      name: "--json",
      description: "Emit the audit as single-line JSON instead of the human report",
    },
  ],
  exits: [
    { code: 0, meaning: "the audit ran and printed its reading, empty rules or none" },
    {
      code: 3,
      meaning:
        "operational error — a control did not behave, or the rules could not be read, so nothing was measured",
    },
  ],
  examples: ["ops audit rule-population", "ops audit rule-population --json"],
}

export default async function auditRulePopulation(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const repoRootFlag = parsed.string("--repo-root")
  const audit = await gatherRulePopulations({
    repoRoot: repoRootFlag === undefined ? getRepoRoot() : resolve(repoRootFlag),
    treeSha: parsed.string("--tree-sha"),
    cacheDir: parsed.string("--cache-dir"),
  })

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(audit)}\n`)
    return
  }

  const lines = [
    ...renderAuditReading(SUBJECT, audit.reading),
    `  over ${audit.filesExamined.toLocaleString()} of ${audit.filesDeclared.toLocaleString()} TS files examined`,
  ]
  if (audit.empty.length === 0) {
    lines.push("  Every rule read weighed a population — no rule is silent for want of one.")
  }
  for (const rule of audit.empty) lines.push(renderRuleReading(rule))
  lines.push("  NOT READ HERE:")
  for (const spot of BLIND_SPOTS) lines.push(`    - ${spot}`)
  process.stdout.write(`${lines.join("\n")}\n`)
}
