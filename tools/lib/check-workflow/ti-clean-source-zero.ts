import { z } from "zod"
import { TERRITORY_MAP_PATH } from "../../../akasha/checks/cluster-checks/modules/territory-map/territory-map.module.code.ts"

export interface Issue {
  readonly file: string
  readonly line: number
  readonly message: string
}

export interface MarkerIssue {
  readonly addon: string
  readonly file: string
  readonly message: string
}

export interface AddonMarkerFacts {
  readonly addon: string
  readonly tiClean: boolean
  readonly tiCleanBlocked: boolean
  readonly siteCount: number
}

export function findMarkerIssues(facts: readonly AddonMarkerFacts[]): readonly MarkerIssue[] {
  const issues: MarkerIssue[] = []
  for (const f of facts) {
    if (f.tiClean && f.tiCleanBlocked) {
      throw new Error(
        `${f.addon}: marked both tiClean and tiCleanBlocked in ${TERRITORY_MAP_PATH} (mutually exclusive)`
      )
    }
    if (f.siteCount > 0 || f.tiClean) continue
    const stale = f.tiCleanBlocked
      ? " and its tiCleanBlocked exemption no longer holds — the call site that could not convert is gone, so drop tiCleanBlocked and tiCleanBlockedReason with it"
      : ""
    issues.push({
      addon: f.addon,
      file: TERRITORY_MAP_PATH,
      message: `${f.addon}: source-zero and not marked tiClean${stale}. Set tiClean: true on its node in ${TERRITORY_MAP_PATH}, so the ratchet holds this addon at zero rather than leaving it free to drift back.`,
    })
  }
  issues.sort((a, b) => (a.addon < b.addon ? -1 : a.addon > b.addon ? 1 : 0))
  return issues
}

function stripTsComments(source: string): string {
  const noBlocks = source.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
  return noBlocks.replace(/\/\/[^\n]*/g, "")
}

const RAW_TABLE_CALL = /\btable\.(insert|remove)\s*\(/g

const EXEC_MEMBER_SCHEMA = z
  .unknown()
  .nullable()
  .transform((raw): "insert" | "remove" | null => {
    if (raw === null) return null
    if (!Array.isArray(raw)) throw new Error("expected array from RegExp.exec")
    return z.enum(["insert", "remove"]).parse(raw[1])
  })

export function findRawTableCalls(source: string, file: string): readonly Issue[] {
  const clean = stripTsComments(source)
  const issues: Issue[] = []
  const lines = clean.split("\n")
  for (let ln = 0; ln < lines.length; ln++) {
    const lineText = lines[ln]
    if (lineText === undefined) continue
    const re = new RegExp(RAW_TABLE_CALL.source, "g")
    let member = EXEC_MEMBER_SCHEMA.parse(re.exec(lineText))
    while (member !== null) {
      issues.push({
        file,
        line: ln + 1,
        message: `${file}:${ln + 1}: raw table.${member}(...) call site — convert the Lua array-append idiom to an idiomatic JS array op (see Temper Addon Clean Standard), or drop tiClean for this addon.`,
      })
      member = EXEC_MEMBER_SCHEMA.parse(re.exec(lineText))
    }
  }
  issues.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line))
  return issues
}

export function isScannableSourceFile(path: string): boolean {
  if (path.endsWith(".d.ts")) return false
  if (/\.test\.tsx?$/.test(path)) return false
  return path.endsWith(".ts") || path.endsWith(".tsx")
}
