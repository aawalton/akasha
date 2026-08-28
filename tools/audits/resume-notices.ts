import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { sections } from "../lib/markdown.ts"
import { judge, over } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"

const NAME = "resume-notices"

const DOCUMENT = "pages/notice/resume.notice.md"

const ASKER = "tools/lib/supervisor-resume-notices.ts"

const HANDED: readonly string[] = ["restart-immediate", "restart-deferred"]

const CLAUSE = "restart-recovery-clause"

const OPENING = "[supervisor]"

const ON_ROW: Readonly<Record<string, string>> = {
  "limit-resume-nudge": "The limit-resume decision",
  "editor-revive": "The editor extension",
}

function declared(body: string): Map<string, string> {
  return new Map(sections(body, 2).map((section) => [section.title, section.body.trim()]))
}

export const resumeNotices: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  let body: string
  try {
    body = repo.read(DOCUMENT)
  } catch {
    return {
      ...judge(NAME, `${DOCUMENT} could not be read`, [
        refusalText("resume-notices-unreadable", {}, root),
      ]),
      population: over(0, "resume notice(s)"),
    }
  }

  const notices = declared(body)
  const findings: string[] = []
  for (const key of HANDED) {
    const text = notices.get(key)
    if (text === undefined || text === "") {
      findings.push(refusalText("resume-notice-absent", { key }, root))
      continue
    }
    if (!text.startsWith(OPENING)) {
      findings.push(refusalText("resume-notice-unstamped", { key }, root))
    }
  }
  for (const [key, caller] of Object.entries(ON_ROW)) {
    const text = notices.get(key)
    if (text === undefined || text === "") {
      findings.push(refusalText("notice-on-row-absent", { key, caller }, root))
      continue
    }
    if (text.startsWith(OPENING)) {
      findings.push(refusalText("notice-on-row-stamped", { key }, root))
    }
  }
  if (!notices.has(CLAUSE)) {
    findings.push(refusalText("restart-clause-absent", {}, root))
  }

  let asker: string | null
  try {
    asker = repo.read(ASKER)
  } catch {
    asker = null
  }
  if (asker !== null) {
    for (const key of [...HANDED, CLAUSE]) {
      if (!asker.includes(`"${key}"`)) {
        findings.push(refusalText("resume-notice-unasked", { asker: ASKER, key }, root))
      }
    }
  }

  const counted = HANDED.length + 1 + Object.keys(ON_ROW).length
  return {
    ...judge(
      NAME,
      `${counted} resume notice(s) held against ${DOCUMENT}` +
        (asker !== null
          ? ` and against ${ASKER}, which asks them`
          : `; ${ASKER} could not be read`),
      findings
    ),
    population: over(counted, "resume notice(s)"),
  }
}
