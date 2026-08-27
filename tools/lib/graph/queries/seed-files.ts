import { attrText, closureFromSeeds, codeNodeId, importGraphClosureFromSeeds } from "./closure.ts"
import { type PopulationEntry, populationOf } from "./membership.ts"
import type { Graph, Node, NodeId } from "../types.ts"

type Repo = NonNullable<Node["repo"]>

const CODE_REPO = "code"

const PACKAGE_NODE = "package"
const WORKFLOW_NODE = "workflow"
const K8S_RESOURCE_NODE = "k8s-resource"

const ROOT_PACKAGE_FILES: readonly string[] = ["package.json", "bun.lock"]

export type SeedSet = {
  readonly nodes?: readonly NodeId[]
  readonly nodeTypes?: readonly PopulationEntry[]
}

export type SeedSource = SeedSet & {
  readonly name: string
  readonly package?: string
  readonly steps?: readonly SeedSet[]
  readonly policy?: "import-graph"
}

export type SeedFile = {
  readonly repo: Repo
  readonly path: string
}

export type SeedFiles = {
  readonly name: string
  readonly files: readonly SeedFile[]
}

const demanded = (node: Node, field: string): string => {
  const held = attrText(node.attrs, field)
  if (held === undefined) {
    throw new Error(`${node.type} node ${node.id} carries no \`${field}\`, so it names no file`)
  }
  return held
}

const repoOf = (node: Node): Repo => {
  if (node.repo === undefined) {
    throw new Error(
      `${node.type} node ${node.id} carries no repository, so nothing says which tree its file stands in`
    )
  }
  return node.repo
}

const pathsOfNode = (node: Node): { readonly paths: readonly SeedFile[]; readonly isPackage: boolean } => {
  const at = (path: string): readonly SeedFile[] => [{ repo: repoOf(node), path }]
  if (node.type === PACKAGE_NODE) return { paths: [], isPackage: true }
  if (node.type === WORKFLOW_NODE) {
    if (node.repo !== CODE_REPO) return { paths: [], isPackage: false }
    return { paths: at(demanded(node, "sourcePath")), isPackage: false }
  }
  if (node.type === K8S_RESOURCE_NODE) return { paths: at(demanded(node, "path")), isPackage: false }
  const path = attrText(node.attrs, "path")
  return { paths: path === undefined ? [] : at(path), isPackage: false }
}

const fileKey = (file: SeedFile): string => `${file.repo}:${file.path}`

const sortedFiles = (held: ReadonlyMap<string, SeedFile>): readonly SeedFile[] =>
  [...held.values()].sort((a, b) =>
    a.repo === b.repo ? a.path.localeCompare(b.path) : a.repo.localeCompare(b.repo)
  )

const seedsFrom = (graph: Graph, held: SeedSet, into: Set<NodeId>): undefined => {
  for (const id of held.nodes ?? []) into.add(id)
  for (const entry of held.nodeTypes ?? []) {
    for (const id of populationOf(graph, entry)) into.add(id)
  }
}

const declaredCount = (held: SeedSet): number =>
  (held.nodes?.length ?? 0) + (held.nodeTypes?.length ?? 0)

const declaresSeeds = (source: SeedSource): number => {
  let named = declaredCount(source)
  if (source.package !== undefined) named += 1
  for (const step of source.steps ?? []) named += declaredCount(step)
  return named
}

const seedsOf = (graph: Graph, source: SeedSource): ReadonlySet<NodeId> => {
  const seeds = new Set<NodeId>()
  if (source.package !== undefined) {
    const id = codeNodeId(PACKAGE_NODE, source.package)
    if (graph.node(id) !== undefined) seeds.add(id)
  }
  seedsFrom(graph, source, seeds)
  for (const step of source.steps ?? []) seedsFrom(graph, step, seeds)
  return seeds
}

const importGraphFiles = (graph: Graph, seeds: ReadonlySet<NodeId>): readonly SeedFile[] => {
  const files = new Map<string, SeedFile>()
  for (const id of importGraphClosureFromSeeds(graph, seeds)) {
    const node = graph.node(id)
    if (node === undefined) continue
    for (const file of pathsOfNode(node).paths) files.set(fileKey(file), file)
  }
  return sortedFiles(files)
}

const workflowSeedFiles = (graph: Graph, seeds: ReadonlySet<NodeId>): readonly SeedFile[] => {
  const reached = closureFromSeeds(graph, seeds)
  const files = new Map<string, SeedFile>()
  let sawPackage = false
  for (const id of reached) {
    const node = graph.node(id)
    if (node === undefined) continue
    const { paths, isPackage } = pathsOfNode(node)
    for (const file of paths) files.set(fileKey(file), file)
    if (isPackage) sawPackage = true
  }
  if (sawPackage) {
    for (const path of ROOT_PACKAGE_FILES) {
      files.set(fileKey({ repo: CODE_REPO, path }), { repo: CODE_REPO, path })
    }
  }
  return sortedFiles(files)
}

export const seedFilesFor = (
  graph: Graph,
  sources: readonly SeedSource[]
): readonly SeedFiles[] => {
  const answered: SeedFiles[] = []
  for (const source of sources) {
    const seeds = seedsOf(graph, source)
    if (source.policy === "import-graph") {
      answered.push({ name: source.name, files: importGraphFiles(graph, seeds) })
      continue
    }
    const named = declaresSeeds(source)
    if (seeds.size === 0) {
      if (named > 0) {
        throw new Error(
          `workflow \`${source.name}\` names ${named} thing(s) to watch and not one of them stands in the graph, so it would never be woken; a watch that resolves to nothing fails here rather than falling back to the commit`
        )
      }
      continue
    }
    const files = workflowSeedFiles(graph, seeds)
    if (files.length === 0) {
      throw new Error(
        `workflow \`${source.name}\` reaches ${seeds.size} node(s) and none of them names a file in either repository, so it would never be woken; a watch that resolves to nothing fails here rather than falling back to the commit`
      )
    }
    answered.push({ name: source.name, files })
  }
  return answered
}
