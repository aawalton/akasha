import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"
import { Glob } from "bun"
import { judge, over } from "../../outcome/outcome.ts"
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { AsyncCheck } from "../lib/check.ts"
import { buildFrom, readAt } from "../lib/graph/held-snapshot.ts"
import { nodeKey } from "../lib/graph/key.ts"
import { DOCKERFILE_RECIPE_INPUT_EDGE_TYPE } from "../lib/graph/producers/dockerfile-recipe/types.ts"
import {
  IMPORT_DYNAMIC_EDGE_TYPE,
  IMPORT_STATIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
  TS_FILE_NODE_TYPE,
  TSX_FILE_NODE_TYPE,
} from "../lib/graph/producers/file/ts-file/types.ts"
import { NAMESPACE_ROLE_NODE_TYPE } from "../lib/graph/producers/k8s/rbac-types.ts"
import {
  APPLYRBAC_USES_EDGE_TYPE,
  RBAC_APPLIES_EDGE_TYPE,
  SOPS_SECRET_EDGE_TYPE,
  SYNTH_EMITS_EDGE_TYPE,
} from "../lib/graph/producers/k8s/synth-types.ts"
import {
  K8S_USES_CONFIG_EDGE_TYPE,
  K8S_USES_PVC_EDGE_TYPE,
  K8S_USES_SECRET_EDGE_TYPE,
  K8S_USES_SERVICE_ACCOUNT_EDGE_TYPE,
} from "../lib/graph/producers/k8s/types.ts"
import {
  PACKAGE_NODE_TYPE,
  PKG_CONTAINS_FILE_EDGE_TYPE,
  PKG_DEPENDS_EDGE_TYPE,
} from "../lib/graph/producers/package/types.ts"
import {
  PIPELINE_REPO,
  WORKFLOW_DEPENDS_ON_EDGE_TYPE,
  WORKFLOW_NODE_TYPE,
} from "../lib/graph/producers/pipeline/types.ts"
import { TUNNEL_CONFIG_RECIPE_INPUT_EDGE_TYPE } from "../lib/graph/producers/tunnel-config-recipe/types.ts"
import type { Graph, Node, NodeId } from "../lib/graph/types.ts"

const NAME = "foundation-synth-watch"

const FOUNDATION = "foundation"

const UNIT = "synth source beside a foundation workflow"

const MAX_REPORTED = 20

const GIT_CEILING_MS = 10_000

const SYNTH_SOURCE = /^synth.*\.ts$/

const CLOSURE_EDGE_TYPES: readonly string[] = [
  APPLYRBAC_USES_EDGE_TYPE,
  DOCKERFILE_RECIPE_INPUT_EDGE_TYPE,
  K8S_USES_CONFIG_EDGE_TYPE,
  K8S_USES_PVC_EDGE_TYPE,
  K8S_USES_SECRET_EDGE_TYPE,
  K8S_USES_SERVICE_ACCOUNT_EDGE_TYPE,
  PKG_CONTAINS_FILE_EDGE_TYPE,
  PKG_DEPENDS_EDGE_TYPE,
  RBAC_APPLIES_EDGE_TYPE,
  SOPS_SECRET_EDGE_TYPE,
  SYNTH_EMITS_EDGE_TYPE,
  TUNNEL_CONFIG_RECIPE_INPUT_EDGE_TYPE,
  WORKFLOW_DEPENDS_ON_EDGE_TYPE,
]

const IMPORT_EDGE_TYPES: readonly string[] = [
  IMPORT_DYNAMIC_EDGE_TYPE,
  IMPORT_STATIC_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
]

const PKG_DEPENDS_CARRIED: ReadonlySet<string> = new Set(["dependencies", "devDependencies"])

function fieldOf(attrs: unknown, field: string): unknown {
  return typeof attrs === "object" && attrs !== null
    ? (attrs as Record<string, unknown>)[field]
    : undefined
}

function textOf(attrs: unknown, field: string): string | undefined {
  const held = fieldOf(attrs, field)
  return typeof held === "string" ? held : undefined
}

function listOf(attrs: unknown, field: string): readonly string[] {
  const held = fieldOf(attrs, field)
  return Array.isArray(held) ? held.filter((one): one is string => typeof one === "string") : []
}

const CODE_NODE_REPO = "code"

function codeNode(type: string, key: string): NodeId {
  return nodeKey({ type, repo: CODE_NODE_REPO, key })
}

function pathsOf(node: Node): { readonly paths: readonly string[]; readonly isPackage: boolean } {
  if (node.type === PACKAGE_NODE_TYPE) return { paths: [], isPackage: true }
  const field = node.type === WORKFLOW_NODE_TYPE ? "sourcePath" : "path"
  const path = textOf(node.attrs, field)
  return { paths: path === undefined ? [] : [path], isPackage: false }
}

export function isCountedSynthSource(relPath: string): boolean {
  if (relPath.startsWith("node_modules/") || relPath.includes("/node_modules/")) return false
  if (relPath.includes("/dist/")) return false
  if (relPath.endsWith(".d.ts")) return false
  if (relPath.includes(".test.")) return false
  return SYNTH_SOURCE.test(relPath.slice(relPath.lastIndexOf("/") + 1))
}

function importsReached(graph: Graph, seeds: Iterable<NodeId>): ReadonlySet<NodeId> {
  const reached = new Set<NodeId>()
  const queue: NodeId[] = []
  const enqueue = (id: NodeId): undefined => {
    if (reached.has(id) || graph.node(id) === undefined) return
    reached.add(id)
    queue.push(id)
  }
  for (const id of seeds) enqueue(id)
  while (queue.length > 0) {
    const at = queue.shift()
    if (at === undefined) break
    const node = graph.node(at)
    if (node === undefined) continue
    if (node.type === PACKAGE_NODE_TYPE) {
      for (const edge of graph.outEdges(at, [PKG_CONTAINS_FILE_EDGE_TYPE])) enqueue(edge.to)
      continue
    }
    if (node.type === WORKFLOW_NODE_TYPE) {
      const sourcePath = textOf(node.attrs, "sourcePath")
      if (sourcePath !== undefined) {
        enqueue(nodeKey({ type: TS_FILE_NODE_TYPE, repo: node.repo, key: sourcePath }))
      }
      continue
    }
    if (node.type !== TS_FILE_NODE_TYPE && node.type !== TSX_FILE_NODE_TYPE) continue
    for (const edge of graph.outEdges(at, IMPORT_EDGE_TYPES)) {
      const typeOnly = fieldOf(edge.attrs, "typeOnly") === true
      if (typeOnly && edge.type !== IMPORT_DYNAMIC_EDGE_TYPE) continue
      enqueue(edge.to)
    }
  }
  return reached
}

function watchedFiles(graph: Graph, seeds: Iterable<NodeId>): ReadonlySet<string> {
  const reached = new Set<NodeId>()
  const emitted = new Set<string>()
  const queue: NodeId[] = []
  for (const id of seeds) {
    if (reached.has(id) || graph.node(id) === undefined) continue
    reached.add(id)
    queue.push(id)
  }
  while (queue.length > 0) {
    const at = queue.shift()
    if (at === undefined) break
    for (const edge of graph.outEdges(at, CLOSURE_EDGE_TYPES)) {
      if (edge.type === PKG_DEPENDS_EDGE_TYPE) {
        const kind = textOf(edge.attrs, "kind")
        if (kind === undefined || !PKG_DEPENDS_CARRIED.has(kind)) continue
      }
      if (edge.type === SYNTH_EMITS_EDGE_TYPE) {
        const sourcePath = textOf(edge.attrs, "sourcePath")
        if (sourcePath !== undefined) emitted.add(sourcePath)
      }
      if (reached.has(edge.to) || graph.node(edge.to) === undefined) continue
      reached.add(edge.to)
      queue.push(edge.to)
    }
  }

  const folded: NodeId[] = []
  for (const id of reached) {
    const node = graph.node(id)
    if (node === undefined) continue
    if (node.type === WORKFLOW_NODE_TYPE) {
      const sourcePath = textOf(node.attrs, "sourcePath")
      if (sourcePath !== undefined) {
        folded.push(nodeKey({ type: TS_FILE_NODE_TYPE, repo: node.repo, key: sourcePath }))
      }
      continue
    }
    if (node.type !== NAMESPACE_ROLE_NODE_TYPE) continue
    const declarations = fieldOf(node.attrs, "declarations")
    if (!Array.isArray(declarations)) continue
    for (const one of declarations) {
      const sourcePath = textOf(one, "sourcePath")
      if (sourcePath !== undefined) folded.push(codeNode(TS_FILE_NODE_TYPE, sourcePath))
    }
  }
  for (const id of folded) reached.add(id)
  for (const sourcePath of emitted) {
    const id = codeNode(TS_FILE_NODE_TYPE, sourcePath)
    reached.add(id)
    for (const also of importsReached(graph, [id])) reached.add(also)
  }

  const files = new Set<string>()
  let sawPackage = false
  for (const id of reached) {
    const node = graph.node(id)
    if (node === undefined) continue
    const { paths, isPackage } = pathsOf(node)
    for (const path of paths) files.add(path)
    if (isPackage) sawPackage = true
  }
  for (const sourcePath of emitted) files.add(sourcePath)
  if (sawPackage) {
    files.add("package.json")
    files.add("bun.lock")
  }
  return files
}

function seedsOf(graph: Graph, workflow: Node): ReadonlySet<NodeId> {
  const seeds = new Set<NodeId>()
  const owned = textOf(workflow.attrs, "package")
  if (owned !== undefined) {
    const id = codeNode(PACKAGE_NODE_TYPE, owned)
    if (graph.node(id) !== undefined) seeds.add(id)
  }
  for (const id of listOf(workflow.attrs, "dispatchNodes")) seeds.add(id)
  return seeds
}

function synthDirsOf(graph: Graph, workflow: Node): readonly string[] {
  const dirs = new Set<string>()
  for (const edge of graph.outEdges(workflow.id, [SYNTH_EMITS_EDGE_TYPE])) {
    const sourcePath = textOf(edge.attrs, "sourcePath")
    if (sourcePath !== undefined) dirs.add(dirname(sourcePath))
  }
  return [...dirs].sort()
}

function synthSourcesUnder(codeRoot: string, dir: string): readonly string[] {
  const found: string[] = []
  for (const absolute of new Glob("**/synth*.ts").scanSync({
    cwd: resolve(codeRoot, dir),
    absolute: true,
    onlyFiles: true,
  })) {
    const relPath = relative(codeRoot, absolute)
    if (isCountedSynthSource(relPath)) found.push(relPath)
  }
  return found.sort()
}

function capped(said: readonly string[]): readonly string[] {
  const shown = said.slice(0, MAX_REPORTED)
  const rest = said.length - shown.length
  return rest > 0 ? [...shown, `and ${rest} more`] : shown
}

function blind(detail: string): { readonly detail: string; readonly reported: readonly string[] } {
  return { detail, reported: [detail] }
}

export const foundationSynthWatch: AsyncCheck = async (repo) => {
  const nothing = over(0, UNIT)
  const codeRoot = rootFor(repo.roots, AKASHA)

  let commit: string
  try {
    commit = execFileSync("git", ["-C", codeRoot, "rev-parse", "HEAD"], {
      encoding: "utf-8",
      timeout: GIT_CEILING_MS,
    }).trim()
  } catch (error) {
    const said = blind(
      `${codeRoot} would not name a HEAD commit, so no snapshot could be taken and this ` +
        `verdict covers nothing: ${error instanceof Error ? error.message : String(error)}`
    )
    return { ...judge(NAME, said.detail, said.reported), population: nothing }
  }

  let graph: Graph
  try {
    graph = await buildFrom(readAt(commit).ctx)
  } catch (error) {
    const said = blind(
      `the snapshot at ${commit.slice(0, 7)} would not build, so nothing was asked of the graph ` +
        `and this verdict covers nothing: ${error instanceof Error ? error.message : String(error)}`
    )
    return { ...judge(NAME, said.detail, said.reported), population: nothing }
  }

  const workflows = graph
    .nodes(WORKFLOW_NODE_TYPE)
    .filter((node) => node.repo === PIPELINE_REPO && textOf(node.attrs, "kind") === FOUNDATION)
    .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))

  const unreadable: string[] = []
  const unwatched: string[] = []
  let sources = 0

  let emitting = 0

  for (const workflow of workflows) {
    const dirs = synthDirsOf(graph, workflow)
    if (dirs.length === 0) continue
    emitting += 1
    const beside = new Set<string>()
    for (const dir of dirs) {
      if (!existsSync(resolve(codeRoot, dir))) {
        unreadable.push(
          `\`${workflow.key}\` emits from \`${dir}\`, which is not a directory in ${codeRoot}, so ` +
            `the synth sources beside it were not looked at`
        )
        continue
      }
      for (const path of synthSourcesUnder(codeRoot, dir)) beside.add(path)
    }
    sources += beside.size
    if (beside.size === 0) continue
    const watched = watchedFiles(graph, seedsOf(graph, workflow))
    for (const path of beside) {
      if (watched.has(path)) continue
      unwatched.push(
        `${workflow.key} does not watch ${path} — seed it as a \`ts-file:<path>\` entry on the ` +
          `workflow's \`dispatchNodes\`, or an edit to it will not retrigger the workflow`
      )
    }
  }

  if (workflows.length > 0 && sources === 0) {
    const said = blind(
      `${workflows.length} foundation workflow(s) were weighed and ${emitting} of them emit from a ` +
        `synth source, yet no synth source was found beside any, so this verdict covers nothing`
    )
    return { ...judge(NAME, said.detail, said.reported), population: nothing }
  }

  return {
    ...judge(
      NAME,
      `${workflows.length} foundation workflow(s) on the snapshot at code ${commit.slice(0, 7)}; ` +
        `${sources} synth source(s) beside them, ${unwatched.length} watched by no workflow`,
      [...capped(unreadable), ...capped(unwatched)]
    ),
    population: over(sources, UNIT),
  }
}
