import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import type { EdgeInit, Graph, Node } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { codeRepoRoot, readWorkspaces, workspaceTsconfigPath } from "./discover.ts"
import type { ParsedImports } from "./parse.ts"
import type { ParsedMockModuleCall } from "./parse-mock-module.ts"
import { createWorkspaceResolver, type Resolver } from "./resolve.ts"
import { edgesForFile, type PerFileInput } from "./ts-file-edges-for-file.ts"
import { IMPORT_DYNAMIC_EDGE_TYPE, IMPORT_STATIC_EDGE_TYPE, MOCK_MODULE_EDGE_TYPE, MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE, RE_EXPORT_EDGE_TYPE, TS_FILE_NODE_TYPES } from "./types.ts"
import { TsFileAttrsSchema } from "./types-schemas"

const EMPTY_PARSED_IMPORTS: ParsedImports = {
  staticImports: [],
  dynamicImports: [],
  reExports: [],
  augmentations: [],
  selfAugmentations: [],
  jsdocImports: [],
  tripleSlashRefs: [],
}

const richAttrsOf = (
  node: Node
): {
  readonly relPath: string
  readonly packageName: string
  readonly workspaceRoot: string
  readonly parsedImports: ParsedImports
  readonly mockModuleCalls: readonly ParsedMockModuleCall[]
} => {
  const attrs = TsFileAttrsSchema.parse(node.attrs)
  return {
    relPath: attrs.path,
    packageName: attrs.package,
    workspaceRoot: attrs.workspaceRoot,
    parsedImports: attrs.parsedImports ?? EMPTY_PARSED_IMPORTS,
    mockModuleCalls: attrs.mockModuleCalls ?? [],
  }
}

export const tsFileEdgeProducer = defineEdgeProducer({
  name: "ts-file-edge",
  edgeTypes: [
    IMPORT_STATIC_EDGE_TYPE,
    IMPORT_DYNAMIC_EDGE_TYPE,
    RE_EXPORT_EDGE_TYPE,
    MOCK_MODULE_EDGE_TYPE,
    MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE,
  ],
  dependsOn: ["file"],
  build: (ctx, upstream: Graph) => {
    const repoRoot = codeRepoRoot(ctx)
    const workspaces = readWorkspaces(ctx, CODE_REPO)

    const packageDirs = new Map<string, string>()
    const workspacePackageNames = new Set<string>()
    for (const ws of workspaces) {
      packageDirs.set(ws.packageName, ws.root)
      workspacePackageNames.add(ws.packageName)
    }

    const resolverByWs = new Map<string, Resolver>()
    for (const ws of workspaces) {
      const resolver = createWorkspaceResolver(
        ctx,
        CODE_REPO,
        repoRoot,
        workspaceTsconfigPath(ws.root),
        packageDirs
      )
      if (resolver !== null) resolverByWs.set(ws.root, resolver)
    }

    const tsFilePackageByRelPath = new Map<string, string>()
    const perFile: PerFileInput[] = []
    for (const node of upstream.nodes(TS_FILE_NODE_TYPES)) {
      if (node.repo !== CODE_REPO) continue
      const rich = richAttrsOf(node)
      tsFilePackageByRelPath.set(rich.relPath, rich.packageName)
      perFile.push({
        relPath: rich.relPath,
        packageName: rich.packageName,
        workspaceRoot: rich.workspaceRoot,
        parsedImports: rich.parsedImports,
        mockModuleCalls: rich.mockModuleCalls,
      })
    }

    const edges: EdgeInit[] = []
    for (const file of perFile) {
      edges.push(
        ...edgesForFile(
          file,
          resolverByWs.get(file.workspaceRoot),
          workspacePackageNames,
          tsFilePackageByRelPath
        )
      )
    }

    return { edges }
  },
})

export default tsFileEdgeProducer
