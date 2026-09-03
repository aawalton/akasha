import { classifyExtension, type FileKind } from "@akasha/code-system/file-kind"
import type { PopulationEntry, ScopedPopulation } from "../graph/queries/membership.ts"

export interface PopulationSeedSubject {
  readonly name: string
  readonly dispatchNodeTypes?: readonly (PopulationEntry | ScopedPopulation)[]
}

export type PopulationSeedRule = "bare-population" | "no-op-scope-term" | "orphan-allowlist-entry"

export interface PopulationSeedFinding {
  readonly rule: PopulationSeedRule
  readonly name: string
  readonly message: string
}

export const ALLOWLIST_PATH = "tools/lib/check-workflow/repo-wide-ts-scanners.ts"

export const SCOPE_TERM_REMEDIATION =
  "Either scope it to a path prefix that selects strictly fewer files than the unscoped population, or drop the scope and declare the wider population honestly."

const NODE_TYPE_BY_FILE_KIND: Readonly<Record<FileKind, string>> = {
  certificate: "certificate-file",
  conf: "conf-file",
  csv: "csv-file",
  css: "css-file",
  dockerfile: "dockerfile-file",
  env: "env-file",
  html: "html-file",
  ignore: "ignore-file",
  image: "image-file",
  js: "js-file",
  json: "json-file",
  jsonl: "jsonl-file",
  jsx: "jsx-file",
  lock: "lock-file",
  lua: "lua-file",
  md: "md-file",
  python: "python-file",
  rust: "rust-file",
  sh: "sh-file",
  "sops-config": "sops-config-file",
  "sops-secret": "sops-secret-file",
  sql: "sql-file",
  swift: "swift-file",
  "systemd-unit": "systemd-unit-file",
  toml: "toml-file",
  ts: "ts-file",
  tsx: "tsx-file",
  txt: "txt-file",
  xml: "xml-file",
  yaml: "yaml-file",
  yml: "yml-file",
}

const FILE_KIND_BY_NODE_TYPE: ReadonlyMap<string, FileKind> = new Map(
  Object.entries(NODE_TYPE_BY_FILE_KIND).map(([fileKind, nodeType]) => [
    nodeType,
    fileKind as FileKind,
  ])
)

const ALLOWLIST_GATED_KINDS: ReadonlySet<string> = new Set(["ts-file", "tsx-file"])

const isScopedPopulation = (entry: PopulationEntry | ScopedPopulation): entry is ScopedPopulation =>
  typeof entry === "object" && entry !== null

const isUnder = (path: string, under: string): boolean =>
  path === under || path.startsWith(`${under}/`)

interface PopulationSelection {
  readonly all: number
  readonly selected: number
}

const measure = (
  files: readonly string[],
  kind: string,
  under: string
): PopulationSelection | null => {
  const fileKind = FILE_KIND_BY_NODE_TYPE.get(kind)
  if (fileKind === undefined) return null
  let all = 0
  let selected = 0
  for (const path of files) {
    if (classifyExtension(path) !== fileKind) continue
    all += 1
    if (isUnder(path, under)) selected += 1
  }
  return { all, selected }
}

const bareEntries = (config: PopulationSeedSubject): readonly string[] => {
  const out: string[] = []
  for (const entry of config.dispatchNodeTypes ?? []) {
    if (isScopedPopulation(entry)) continue
    if (ALLOWLIST_GATED_KINDS.has(entry)) out.push(entry)
  }
  return out
}

const allowlistRemediation = (name: string): string =>
  `adding "${name}" to ALLOWLISTED_REPO_WIDE_TS_SCANNERS in ${ALLOWLIST_PATH} with a one-line justification`

const CANDIDATES_SHOWN = 5

interface NarrowingCandidate extends PopulationSelection {
  readonly under: string
}

const narrowingCandidates = (
  files: readonly string[],
  kind: string,
  under: string
): readonly NarrowingCandidate[] => {
  const fileKind = FILE_KIND_BY_NODE_TYPE.get(kind)
  if (fileKind === undefined) return []
  const members = files.filter((path) => classifyExtension(path) === fileKind)
  let prefix = under
  for (let depth = 0; depth < 64; depth += 1) {
    const selected = members.filter((path) => isUnder(path, prefix))
    const bySegment = new Map<string, number>()
    for (const path of selected) {
      const rest = path.slice(prefix.length + 1)
      const segment = rest.includes("/") ? rest.slice(0, rest.indexOf("/")) : rest
      if (segment === "") continue
      bySegment.set(segment, (bySegment.get(segment) ?? 0) + 1)
    }
    const narrowing = [...bySegment]
      .filter(([, count]) => count < members.length)
      .sort((a, b) => b[1] - a[1])
      .map(([segment, count]) => ({
        under: `${prefix}/${segment}`,
        selected: count,
        all: members.length,
      }))
    if (narrowing.length > 0) return narrowing.slice(0, CANDIDATES_SHOWN)
    const only = [...bySegment.keys()][0]
    if (only === undefined) return []
    prefix = `${prefix}/${only}`
  }
  return []
}

const renderCandidates = (candidates: readonly NarrowingCandidate[]): string => {
  if (candidates.length === 0) return ""
  const terms = candidates.map((c) => `"${c.under}" (${c.selected} of ${c.all})`).join(", ")
  return ` Prefixes that DO select fewer, measured on this run: ${terms} — each was put through this same rule before being printed, so any of them clears this finding; pick the one that matches what the check actually reads.`
}

const noOpScopeFindings = (
  config: PopulationSeedSubject,
  files: readonly string[]
): readonly PopulationSeedFinding[] => {
  const out: PopulationSeedFinding[] = []
  for (const entry of config.dispatchNodeTypes ?? []) {
    if (!isScopedPopulation(entry)) continue
    const selection = measure(files, entry.kind, entry.under)
    if (selection === null) continue
    if (selection.selected !== selection.all) continue
    const declaring = ALLOWLIST_GATED_KINDS.has(entry.kind)
      ? ` Declaring the wider "${entry.kind}" population means dropping the scope and ${allowlistRemediation(config.name)}.`
      : ""
    out.push({
      rule: "no-op-scope-term",
      name: config.name,
      message: `check "${config.name}" scopes its "${entry.kind}" population to "${entry.under}", which selects ${selection.selected} of ${selection.all} members — the same set the unscoped population selects, so it dispatches identically while reading as a narrowing. ${SCOPE_TERM_REMEDIATION}${renderCandidates(narrowingCandidates(files, entry.kind, entry.under))}${declaring}`,
    })
  }
  return out
}

const barePopulationFinding = (
  config: PopulationSeedSubject,
  allowlist: ReadonlyMap<string, string>
): PopulationSeedFinding | null => {
  const bare = bareEntries(config)
  if (bare.length === 0) return null
  if (allowlist.has(config.name)) return null
  return {
    rule: "bare-population",
    name: config.name,
    message: `check "${config.name}" declares bare population(s) ${bare.map((e) => `"${e}"`).join(" + ")} in dispatchNodeTypes. ${SCOPE_TERM_REMEDIATION} Here that means ${allowlistRemediation(config.name)}.`,
  }
}

const orphanAllowlistFindings = (
  configs: readonly PopulationSeedSubject[],
  allowlist: ReadonlyMap<string, string>
): readonly PopulationSeedFinding[] => {
  const byName = new Map(configs.map((c) => [c.name, c]))
  const out: PopulationSeedFinding[] = []
  for (const [name] of allowlist) {
    const config = byName.get(name)
    if (config === undefined) {
      out.push({
        rule: "orphan-allowlist-entry",
        name,
        message: `ALLOWLISTED_REPO_WIDE_TS_SCANNERS entry "${name}" does not correspond to any registered check — the check was renamed or removed. Drop the entry from ${ALLOWLIST_PATH}.`,
      })
      continue
    }
    if (bareEntries(config).length === 0) {
      out.push({
        rule: "orphan-allowlist-entry",
        name,
        message: `ALLOWLISTED_REPO_WIDE_TS_SCANNERS entry "${name}" no longer declares a bare "ts-file" / "tsx-file" population — the check was tightened. Drop the entry from ${ALLOWLIST_PATH}.`,
      })
    }
  }
  return out
}

export const findPopulationSeedFindings = (
  configs: readonly PopulationSeedSubject[],
  files: readonly string[],
  allowlist: ReadonlyMap<string, string>
): readonly PopulationSeedFinding[] => {
  const out: PopulationSeedFinding[] = []
  for (const config of configs) {
    const bare = barePopulationFinding(config, allowlist)
    if (bare !== null) out.push(bare)
    out.push(...noOpScopeFindings(config, files))
  }
  out.push(...orphanAllowlistFindings(configs, allowlist))
  return out
}
