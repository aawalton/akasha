export interface ReachabilityGraph {
  readonly nodes: (types: readonly string[]) => Iterable<{ readonly id: string }>
}

export interface ReachabilityHelpers {
  readonly tsFileNodeTypes: readonly string[]
  readonly importEdgeTypes: readonly string[]
  readonly tsFileNodeId: (relPath: string) => string
  readonly tsFileNodeIdToCodeRepoRel: (nodeId: string) => string | null
  readonly transitiveClosure: (
    graph: ReachabilityGraph,
    from: string,
    opts: { readonly edgeTypes: readonly string[] }
  ) => Iterable<string>
}

export interface TestReachability {
  readonly testFile: string
  readonly reachedFiles: readonly string[]
}

export function computeTestReachability(
  graph: ReachabilityGraph,
  isTestFile: (relPath: string) => boolean,
  helpers: ReachabilityHelpers
): readonly TestReachability[] {
  const out: TestReachability[] = []
  for (const node of graph.nodes(helpers.tsFileNodeTypes)) {
    const relPath = helpers.tsFileNodeIdToCodeRepoRel(node.id)
    if (relPath === null) continue
    if (!isTestFile(relPath)) continue
    const reachable = helpers.transitiveClosure(graph, helpers.tsFileNodeId(relPath), {
      edgeTypes: helpers.importEdgeTypes,
    })
    const reachedFiles: string[] = []
    for (const reachedId of reachable) {
      const reachedRel = helpers.tsFileNodeIdToCodeRepoRel(reachedId)
      if (reachedRel === null) continue
      reachedFiles.push(reachedRel)
    }
    out.push({ testFile: relPath, reachedFiles })
  }
  return out
}
