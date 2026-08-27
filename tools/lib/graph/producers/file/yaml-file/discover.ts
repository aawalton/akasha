import { posix } from "node:path"
import { parse } from "yaml"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { repoFiles } from "../../lib/repo-files.ts"

const isYamlFileName = (name: string): boolean => name.endsWith(".yaml") || name.endsWith(".yml")

export const walkYamlFiles = (ctx: BuildContext): readonly string[] =>
  repoFiles(ctx, CODE_REPO).filter(isYamlFileName)

export type FlatRule = {
  readonly pathRegex: string
}

const isRecord = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null

const SOPS_CONFIG_BASENAME = ".sops.yaml"

const isSopsConfigBasename = (name: string): boolean => name === SOPS_CONFIG_BASENAME

export const parseFlatRules = (yamlText: string): readonly FlatRule[] => {
  let config: unknown
  try {
    config = parse(yamlText)
  } catch {
    return []
  }
  if (!isRecord(config)) return []
  const rules = config.creation_rules
  if (!Array.isArray(rules)) return []
  const out: FlatRule[] = []
  for (const rule of rules) {
    if (!isRecord(rule)) continue
    const pathRegex = rule.path_regex
    const encryptedRegex = rule.encrypted_regex
    if (
      typeof pathRegex === "string" &&
      pathRegex !== "" &&
      (encryptedRegex == null || encryptedRegex === "")
    ) {
      out.push({ pathRegex })
    }
  }
  return out
}

export const isManifestSopsFile = (relPath: string, flatRules: readonly FlatRule[]): boolean => {
  for (const rule of flatRules) {
    if (new RegExp(rule.pathRegex).test(relPath)) return false
  }
  return true
}

export const discoverSopsConfigs = (ctx: BuildContext): readonly FlatRule[] => {
  const out: FlatRule[] = []
  for (const relPath of repoFiles(ctx, CODE_REPO).filter((p) =>
    isSopsConfigBasename(posix.basename(p))
  )) {
    const text = readRepoFile(ctx, CODE_REPO, relPath)
    if (text === null) continue
    out.push(...parseFlatRules(text))
  }
  return out
}
