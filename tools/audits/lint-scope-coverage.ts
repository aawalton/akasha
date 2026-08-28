import { codeRoot } from "../lib/code-root.ts"
import { existsSync, readFileSync } from "node:fs"
import type { Check, CheckOutcome } from "../lib/check.ts"
import {
  type BiomeIncludes,
  biomeEffectiveLintedFiles,
  biomePositiveExtensions,
  parseBiomeIncludes,
} from "../../infra/cluster-checks/src/lib/biome-lint-scope.ts"
import { STATIC_CHECKS } from "../lib/check-workflow/check-configs.ts"
import { repoFilesAt } from "../lib/repo-files-at.ts"
import { CSS_FILE_NODE_TYPE } from "../lib/graph/producers/file/css-file/types.ts"
import { DOCKERFILE_FILE_NODE_TYPE } from "../lib/graph/producers/file/dockerfile-file/types.ts"
import { classifyExtension, type FileKind } from "../../file-kind/file-kind.ts"
import { JS_FILE_NODE_TYPE, JSX_FILE_NODE_TYPE } from "../lib/graph/producers/file/js-file/types.ts"
import { JSON_FILE_NODE_TYPE } from "../lib/graph/producers/file/json-file/types.ts"
import { LOCK_FILE_NODE_TYPE } from "../lib/graph/producers/file/lock-file/types.ts"
import { LUA_FILE_NODE_TYPE } from "../lib/graph/producers/file/lua-file/types.ts"
import { MD_FILE_NODE_TYPE } from "../lib/graph/producers/file/md-file/types.ts"
import { RUST_FILE_NODE_TYPE } from "../lib/graph/producers/file/rust-file/types.ts"
import { SH_FILE_NODE_TYPE } from "../lib/graph/producers/file/sh-file/types.ts"
import { SQL_FILE_NODE_TYPE } from "../lib/graph/producers/file/sql-file/types.ts"
import { SWIFT_FILE_NODE_TYPE } from "../lib/graph/producers/file/swift-file/types.ts"
import { SYSTEMD_UNIT_FILE_NODE_TYPE } from "../lib/graph/producers/file/systemd-unit-file/types.ts"
import { TOML_FILE_NODE_TYPE } from "../lib/graph/producers/file/toml-file/types.ts"
import { TS_FILE_NODE_TYPE, TSX_FILE_NODE_TYPE } from "../lib/graph/producers/file/ts-file/types.ts"
import { isTsconfigPath, TSCONFIG_FILE_NODE_TYPE } from "../lib/graph/producers/file/tsconfig-file/types.ts"
import { TXT_FILE_NODE_TYPE } from "../lib/graph/producers/file/txt-file/types.ts"
import { YAML_FILE_NODE_TYPE, YML_FILE_NODE_TYPE } from "../lib/graph/producers/file/yaml-file/types.ts"
import { IMAGE_FILE_NODE_TYPE } from "../lib/graph/producers/file/image-file/types.ts"
import { XML_FILE_NODE_TYPE } from "../lib/graph/producers/file/xml-file/types.ts"
import { HTML_FILE_NODE_TYPE } from "../lib/graph/producers/file/html-file/types.ts"
import { PYTHON_FILE_NODE_TYPE } from "../lib/graph/producers/file/python-file/types.ts"
import { CSV_FILE_NODE_TYPE } from "../lib/graph/producers/file/csv-file/types.ts"
import { CERTIFICATE_FILE_NODE_TYPE } from "../lib/graph/producers/file/certificate-file/types.ts"
import { ENV_FILE_NODE_TYPE } from "../lib/graph/producers/file/env-file/types.ts"
import { CONF_FILE_NODE_TYPE } from "../lib/graph/producers/file/conf-file/types.ts"
import { IGNORE_FILE_NODE_TYPE } from "../lib/graph/producers/file/ignore-file/types.ts"
import { SOPS_CONFIG_FILE_NODE_TYPE } from "../lib/graph/producers/file/sops-config-file/types.ts"
import { judge, over } from "../../outcome/outcome.ts"

const NAME = "lint-scope-coverage"

const UNIT = "biome-linted file and declared lint extension"

const BIOME_FILE = "biome.json"

const LINT = "lint"

const EXAMPLES = 3

const MAX_REPORTED = 20

const NODE_TYPES: Readonly<Record<FileKind, readonly string[]>> = {
  ts: [TS_FILE_NODE_TYPE],
  tsx: [TSX_FILE_NODE_TYPE],
  js: [JS_FILE_NODE_TYPE],
  jsx: [JSX_FILE_NODE_TYPE],
  css: [CSS_FILE_NODE_TYPE],
  md: [MD_FILE_NODE_TYPE],
  yaml: [YAML_FILE_NODE_TYPE],
  yml: [YML_FILE_NODE_TYPE],
  lua: [LUA_FILE_NODE_TYPE],
  sql: [SQL_FILE_NODE_TYPE],
  json: [JSON_FILE_NODE_TYPE],
  sh: [SH_FILE_NODE_TYPE],
  rust: [RUST_FILE_NODE_TYPE],
  toml: [TOML_FILE_NODE_TYPE],
  swift: [SWIFT_FILE_NODE_TYPE],
  dockerfile: [DOCKERFILE_FILE_NODE_TYPE],
  "systemd-unit": [SYSTEMD_UNIT_FILE_NODE_TYPE],
  txt: [TXT_FILE_NODE_TYPE],
  lock: [LOCK_FILE_NODE_TYPE],
  image: [IMAGE_FILE_NODE_TYPE],
  xml: [XML_FILE_NODE_TYPE],
  html: [HTML_FILE_NODE_TYPE],
  python: [PYTHON_FILE_NODE_TYPE],
  csv: [CSV_FILE_NODE_TYPE],
  certificate: [CERTIFICATE_FILE_NODE_TYPE],
  env: [ENV_FILE_NODE_TYPE],
  conf: [CONF_FILE_NODE_TYPE],
  ignore: [IGNORE_FILE_NODE_TYPE],
  "sops-config": [SOPS_CONFIG_FILE_NODE_TYPE],
}

export function nodeTypesOf(relPath: string): readonly string[] {
  const kind = classifyExtension(relPath)
  if (kind === null) return []
  const types = NODE_TYPES[kind]
  if (kind === "json" && isTsconfigPath(relPath)) return [...types, TSCONFIG_FILE_NODE_TYPE]
  return types
}

interface DispatchSeed {
  readonly kind: string
}

interface CheckConfig {
  readonly name: string
  readonly dispatchNodeTypes?: readonly (string | DispatchSeed)[]
}

export function lintSeeds(configs: readonly CheckConfig[]): ReadonlySet<string> {
  const lint = configs.find((one) => one.name === LINT)
  if (lint === undefined) throw new Error(`no check named \`${LINT}\` in STATIC_CHECKS`)
  const seeds = lint.dispatchNodeTypes
  if (seeds === undefined || seeds.length === 0) {
    throw new Error(`the \`${LINT}\` check declares no dispatchNodeTypes, so its lint scope is unenforceable`)
  }
  return new Set(seeds.map((one) => (typeof one === "string" ? one : one.kind)))
}

interface Member {
  readonly label: string
  readonly path: string
  readonly probe: boolean
}

interface Gap {
  readonly key: string
  readonly types: readonly string[]
  readonly labels: string[]
}

function said(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

export const lintScopeCoverage: Check = (repo) => {
  const blind = (why: string): CheckOutcome => ({
    ...judge(NAME, `nothing measured — ${why}`, [
      `${NAME} could not look, so this verdict covers no file and no extension: ${why}`,
    ]),
    population: over(0, UNIT),
  })

  const root = codeRoot()
  const biomePath = `${root}/${BIOME_FILE}`

  if (!repo.exists(biomePath)) {
    return blind(`${biomePath} stands nowhere, so biome's own lint scope could not be read`)
  }

  let includes: BiomeIncludes
  let seeds: ReadonlySet<string>
  let linted: readonly string[]
  try {
    includes = parseBiomeIncludes(readFileSync(biomePath, "utf8"))
    seeds = lintSeeds(STATIC_CHECKS)
    linted = biomeEffectiveLintedFiles(
      repoFilesAt(root, { includeFixtures: true, includeGenerated: true }),
      includes
    )
  } catch (err) {
    return blind(said(err))
  }

  const members: Member[] = [
    ...biomePositiveExtensions(includes).map((ext) => ({
      label: `**/*.${ext}`,
      path: `probe.${ext}`,
      probe: true,
    })),
    ...linted.map((relPath) => ({ label: relPath, path: relPath, probe: false })),
  ]

  const gaps = new Map<string, Gap>()
  for (const member of members) {
    const types = nodeTypesOf(member.path)
    if (types.some((type) => seeds.has(type))) continue
    const key = types.length === 0 ? "" : types.join(", ")
    const gap = gaps.get(key) ?? { key, types, labels: [] }
    gap.labels.push(member.label)
    gaps.set(key, gap)
  }

  const messages = [...gaps.values()]
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((gap) => {
      const shown = gap.labels.slice(0, EXAMPLES).join(", ")
      const rest = gap.labels.length > EXAMPLES ? `, and ${gap.labels.length - EXAMPLES} more` : ""
      const where = `biome lints ${gap.labels.length} of these (${shown}${rest})`
      if (gap.types.length === 0) {
        return (
          `no file kind carries this extension, so no graph node stands for it and the CI \`${LINT}\` ` +
          `check can never be woken by one — ${where}. Three changes close it: have ` +
          `\`classifyExtension\` in \`file-kind/file-kind.ts\` return a kind for ` +
          `this extension, have the file producer emit a node type for that kind, then add the node ` +
          `type to the \`${LINT}\` check's \`dispatchNodeTypes\`.`
        )
      }
      return (
        `node type(s) [${gap.key}] are not among the \`${LINT}\` check's dispatch seeds, so a change ` +
        `to one of these files wakes no lint run — ${where}. One change closes it: add [${gap.key}] ` +
        `to the ` +
        `\`${LINT}\` check's \`dispatchNodeTypes\`.`
      )
    })

  const held = messages.length > MAX_REPORTED ? messages.length - MAX_REPORTED : 0
  const reported =
    held === 0 ? messages : [...messages.slice(0, MAX_REPORTED), `and ${held} further gap kind(s)`]

  return {
    ...judge(
      NAME,
      `${members.length - linted.length} extension(s) biome declares and ${linted.length} file(s) it ` +
        `lints, weighed against the \`${LINT}\` check's ${seeds.size} dispatch seed(s), ` +
        `${messages.length} gap kind(s)`,
      reported
    ),
    population: over(members.length, UNIT),
  }
}
