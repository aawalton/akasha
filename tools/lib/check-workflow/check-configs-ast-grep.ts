import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { parse } from "yaml"
import { z } from "zod"
import { findFiles } from "../../../akasha/checks/cluster-checks/modules/file-finding/file-finding.module.code.ts"
import {
  type AstGrepRule,
  type AstGrepWorkspace,
  parseRuleDoc,
  planAstGrepWatch,
} from "./ast-grep-rules.ts"
import type { CheckConfig } from "./check-configs-types"

const sgconfigSchema = z.looseObject({ ruleDirs: z.array(z.string()).default([]) })
const packageJsonSchema = z.looseObject({ name: z.string().optional() })

export function discoverSgconfigs(repoRoot: string): readonly string[] {
  return findFiles({
    cwd: repoRoot,
    patterns: ["**/sgconfig.yml", "**/sgconfig.yaml"],
    absolute: false,
  })
}

function ruleDirsOf(repoRoot: string, sgconfigPath: string): readonly string[] {
  const doc = sgconfigSchema.safeParse(
    parse(readFileSync(resolve(repoRoot, sgconfigPath), "utf-8"))
  )
  if (!doc.success) return []
  const configDir = sgconfigPath.includes("/")
    ? sgconfigPath.slice(0, sgconfigPath.lastIndexOf("/"))
    : ""
  return doc.data.ruleDirs.map((d) => (configDir === "" ? d : `${configDir}/${d}`))
}

export interface AstGrepRuleSource {
  readonly rule: AstGrepRule
  readonly source: string
}

export interface AstGrepRuleGap {
  readonly path: string
  readonly reason: string
}

export function discoverRuleFiles(repoRoot: string): readonly string[] {
  const paths: string[] = []
  for (const sgconfig of discoverSgconfigs(repoRoot)) {
    for (const ruleDir of ruleDirsOf(repoRoot, sgconfig)) {
      paths.push(
        ...findFiles({
          cwd: repoRoot,
          patterns: [`${ruleDir}/*.yml`, `${ruleDir}/*.yaml`],
          absolute: false,
        })
      )
    }
  }
  return paths
}

export function readAstGrepRules(repoRoot: string): {
  readonly rules: readonly AstGrepRuleSource[]
  readonly gaps: readonly AstGrepRuleGap[]
} {
  const rules: AstGrepRuleSource[] = []
  const gaps: AstGrepRuleGap[] = []
  for (const path of discoverRuleFiles(repoRoot)) {
    try {
      const source = readFileSync(resolve(repoRoot, path), "utf-8")
      rules.push({ rule: parseRuleDoc(source, path), source })
    } catch (err) {
      gaps.push({ path, reason: err instanceof Error ? err.message : String(err) })
    }
  }
  return { rules, gaps }
}

export function listAstGrepWorkspaces(repoRoot: string): readonly AstGrepWorkspace[] {
  const workspaces: AstGrepWorkspace[] = []
  for (const dir of listWorkspaceDirs(repoRoot)) {
    const pkg = packageJsonSchema.safeParse(
      JSON.parse(readFileSync(resolve(repoRoot, dir, "package.json"), "utf-8"))
    )
    if (!pkg.success) continue
    const { name } = pkg.data
    if (name !== undefined) workspaces.push({ name, dir })
  }
  return workspaces
}

export function astGrepWatchPlan(codeRoot: string): ReturnType<typeof planAstGrepWatch> {
  const { rules, gaps } = readAstGrepRules(codeRoot)
  const plan = planAstGrepWatch(
    rules.map((source) => source.rule),
    listAstGrepWorkspaces(codeRoot)
  )
  return gaps.length === 0 ? plan : { seeds: plan.seeds, repoWide: true }
}

export const astGrepCheck = (codeRoot: string): CheckConfig => {
  const plan = astGrepWatchPlan(codeRoot)
  return {
    name: "ast-grep",
    dispatchNodes: [
      ...plan.seeds,
      "ts-file:instructions:infra/cluster-checks/src/checks/check-ast-grep.ts",
      "ts-file:instructions:tools/lib/check-workflow/ast-grep-rules.ts",
      "ts-file:instructions:tools/lib/check-workflow/check-configs-ast-grep.ts",
    ],
    dispatchNodeTypes: ["yaml-file", "yml-file"],
    alwaysRun: plan.repoWide,
    script: "infra/cluster-checks/src/checks/check-ast-grep.ts",
  }
}
