export const summary =
  "Verify every deployable app depending on @shared/pages-ui-store declares a code-sync sidecar memory limit"

import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import {
  MIN_CODE_SYNC_SIDECAR_MEMORY,
  mentionsSidecarHelper,
  parseK8sMemoryToBytes,
  scanCodeSyncSidecarCalls,
  type SidecarCall,
  SIDECAR_HELPER_NAME,
} from "../lib/check-workflow/code-sync-sidecar-memory.ts"
import { errorMessage } from "../lib/check-workflow/error-message.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import { loadWorkspaces } from "../lib/check-workflow/test-step-loader.ts"
import { exitOnResult, exitOnToolError } from "../lib/check-workflow/violation-reporter.ts"
import { computeTransitiveClosure, type WorkspaceInfo } from "../lib/check-workflow/workspace-deps.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { parseArgs } from "../lib/parse-args.ts"
import { loadWorkflowPage, workflowPages } from "../lib/workflow-dsl/discovery.ts"
import type { CommandHelp } from "../ops/surface.ts"

const PREFIX = "[pages-ui-store-sidecar-memory]"

const PAGES_UI_STORE_PACKAGE = "@shared/pages-ui-store"

const WORKSPACE_TS_GLOB = "/**/*.{ts,tsx}"

const EXCLUDED_SEGMENTS: ReadonlySet<string> = new Set([
  "node_modules",
  "dist",
  ".next",
  ".turbo",
  ".cache",
  "build",
  "coverage",
  "__fixtures__",
  "generated",
  "_generated",
])

const MIN_BYTES = parseK8sMemoryToBytes(MIN_CODE_SYNC_SIDECAR_MEMORY) ?? 0

export const help: CommandHelp = {
  flags: [
    {
      name: "--code-root",
      argLabel: "<dir>",
      valueShape: "token",
      description: "The checkout whose workspaces are read (defaults to this repository's root).",
    },
    {
      name: "--akasha-root",
      argLabel: "<dir>",
      valueShape: "token",
      description: "The akasha checkout whose workflow-template pages say what deploys.",
    },
  ],
  examples: ["ops check-pages-ui-store-sidecar-memory"],
}

interface Violation {
  readonly file: string
  readonly line: number
  readonly workspace: string
  readonly limit: string
  readonly message: string
}

function violationFor(call: SidecarCall, workspace: string): Violation | null {
  if (call.limit === null) {
    return {
      file: call.file,
      line: call.line,
      workspace,
      limit: "<non-literal>",
      message: `code-sync sidecar memory limit is not a static string literal — declare an explicit limit >= ${MIN_CODE_SYNC_SIDECAR_MEMORY}`,
    }
  }
  const bytes = parseK8sMemoryToBytes(call.limit)
  if (bytes === null) {
    return {
      file: call.file,
      line: call.line,
      workspace,
      limit: call.limit,
      message: `code-sync sidecar memory limit "${call.limit}" is not a parseable K8s quantity`,
    }
  }
  if (bytes < MIN_BYTES) {
    return {
      file: call.file,
      line: call.line,
      workspace,
      limit: call.limit,
      message: `code-sync sidecar memory limit ${call.limit} < ${MIN_CODE_SYNC_SIDECAR_MEMORY} (app depends on ${PAGES_UI_STORE_PACKAGE})`,
    }
  }
  return null
}

function owningWorkspaceRoot(relPath: string, roots: readonly string[]): string | null {
  let best: string | null = null
  for (const root of roots) {
    if (relPath === root || relPath.startsWith(`${root}/`)) {
      if (best === null || root.length > best.length) best = root
    }
  }
  return best
}

function examineDependent(args: {
  readonly codeRoot: string
  readonly workspace: WorkspaceInfo
  readonly ownerOf: (relPath: string) => string | null
  readonly deployable: boolean
}): readonly Violation[] {
  const { codeRoot, workspace, ownerOf, deployable } = args
  const found: Violation[] = []
  let declarations = 0

  const glob = new Bun.Glob(`${workspace.root}${WORKSPACE_TS_GLOB}`)
  for (const relPath of glob.scanSync({ cwd: codeRoot, absolute: false })) {
    if (relPath.split("/").some((seg) => EXCLUDED_SEGMENTS.has(seg))) continue
    if (ownerOf(relPath) !== workspace.root) continue
    const text = readFileSync(resolve(codeRoot, relPath), "utf-8")
    if (!mentionsSidecarHelper(text)) continue
    const source = ts.createSourceFile(relPath, text, ts.ScriptTarget.Latest, true)
    for (const call of scanCodeSyncSidecarCalls(source)) {
      declarations += 1
      const violation = violationFor(call, workspace.name)
      if (violation !== null) found.push(violation)
    }
  }

  if (declarations === 0 && deployable) {
    throw new Error(
      `deployable dependent declares no ${SIDECAR_HELPER_NAME} call in any TypeScript it owns — its code-sync memory limit was not read, so this run cannot certify it`
    )
  }
  return found
}

async function deployablePackages(akashaRoot: string, codeRoot: string): Promise<ReadonlySet<string>> {
  const appPages = workflowPages(akashaRoot).filter((one) => one.kind === "apps")
  const loaded = await Promise.all(appPages.map((one) => loadWorkflowPage(one, { codeRoot })))
  const apps = loaded.flat()
  if (apps.length === 0) {
    throw new Error(
      `no workflow-template page under ${akashaRoot} states \`kind: apps\`, so nothing here says which app a deploy carries. Every dependent would read as undeployable and the coverage this run certifies would be vacuous.`
    )
  }
  const named = new Set<string>()
  const anonymous: string[] = []
  for (const one of apps) {
    if (typeof one.package === "string" && one.package !== "") named.add(one.package)
    else anonymous.push(one.name)
  }
  if (named.size === 0) {
    throw new Error(
      `${apps.length} workflow-template page(s) state \`kind: apps\` and none names a \`package\`, so which workspace each deploys is unknown rather than absent (${anonymous.join(", ")})`
    )
  }
  return named
}

export default async function checkPagesUiStoreSidecarMemory(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const roots = resolveRoots()
  const codeRoot = resolve(parsed.string("--code-root") ?? rootFor(roots, AKASHA))
  const akashaRoot = resolve(parsed.string("--akasha-root") ?? rootFor(roots, AKASHA))

  let workspaces: readonly WorkspaceInfo[]
  try {
    workspaces = loadWorkspaces(codeRoot)
  } catch (err) {
    exitOnToolError({ error: `the workspaces under ${codeRoot} could not be read: ${errorMessage(err)}`, prefix: PREFIX })
  }

  const uiStore = workspaces.find((one) => one.name === PAGES_UI_STORE_PACKAGE)
  if (uiStore === undefined) {
    exitOnToolError({
      error: `workspace ${PAGES_UI_STORE_PACKAGE} stands nowhere under ${codeRoot} — cannot compute dependents`,
      prefix: PREFIX,
    })
  }

  let deployed: ReadonlySet<string>
  try {
    deployed = await deployablePackages(akashaRoot, codeRoot)
  } catch (err) {
    exitOnToolError({ error: errorMessage(err), prefix: PREFIX })
  }

  const closure = computeTransitiveClosure(workspaces)
  const workspaceRoots = workspaces.map((one) => one.root)
  const ownerOf = (relPath: string): string | null => owningWorkspaceRoot(relPath, workspaceRoots)

  const dependents = workspaces.filter(
    (one) => one.root !== uiStore.root && (closure.get(one.root)?.has(uiStore.root) ?? false)
  )

  const { population, violations } = examinePopulation<WorkspaceInfo, Violation>({
    members: dependents,
    unit: `${PAGES_UI_STORE_PACKAGE} dependents`,
    membership: {
      kind: "enumerated",
      because:
        "the members ARE the dependents: `dependents` is filtered out of the workspace list already loaded and validated above, against a transitive closure computed from it in memory, so there is no second arrival to come back short of — a smaller set means fewer workspaces declare the dependency",
    },
    labelOf: (workspace) => workspace.name,
    siteOf: (workspace) => resolve(codeRoot, workspace.root),
    examine: (workspace) =>
      examineDependent({
        codeRoot,
        workspace,
        ownerOf,
        deployable: deployed.has(workspace.name),
      }),
  })

  exitOnResult({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header: `Apps depending on ${PAGES_UI_STORE_PACKAGE} must declare a code-sync sidecar memory limit >= ${MIN_CODE_SYNC_SIDECAR_MEMORY}`,
      successMessage: `Every ${PAGES_UI_STORE_PACKAGE} dependent declares a code-sync sidecar memory limit >= ${MIN_CODE_SYNC_SIDECAR_MEMORY}.`,
      groupBy: (one) => `${one.file}:${one.line}`,
      formatViolation: (one) => `${one.workspace}: ${one.message}`,
    },
  })
}
