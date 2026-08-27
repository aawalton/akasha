import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { discoverPackages } from "./discover.ts"
import { PACKAGE_NODE_TYPE, type PackageAttrs } from "./types.ts"

export const packageNodeProducer = defineNodeProducer({
  name: "package",
  nodeTypes: [PACKAGE_NODE_TYPE],
  build: (ctx) => {
    const packages = discoverPackages(ctx)
    const nodes: NodeInit<"package", PackageAttrs>[] = []
    for (const p of packages) {
      const dependencies: Record<string, PackageAttrs["dependencies"][string]> = {}
      for (const [name, kind] of p.dependencies) dependencies[name] = kind
      const externalDependencies: Record<string, readonly PackageAttrs["dependencies"][string][]> =
        {}
      for (const [name, kinds] of p.externalDependencies) {
        externalDependencies[name] = [...kinds]
      }
      const attrs: PackageAttrs = {
        name: p.name,
        path: p.path,
        exports: p.exports,
        hasTsconfig: p.hasTsconfig,
        binCommands: p.binCommands,
        commandUsages: p.commandUsages,
        nonTsSpecifiers: p.nonTsSpecifiers,
        configFileProtocols: p.configFileProtocols,
        configFileNames: p.configFileNames,
        sourceRoot: p.sourceRoot,
        dependencies,
        externalDependencies,
        tsconfigRefPaths: p.tsconfigRefPaths,
        tstl: p.tstl,
      }
      nodes.push({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: p.name, attrs })
    }
    return { nodes }
  },
})

export default packageNodeProducer
