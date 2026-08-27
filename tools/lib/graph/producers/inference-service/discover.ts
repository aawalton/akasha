import ts from "typescript"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { INSTRUCTIONS_REPO } from "../../../../../repo/scope/scope.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { createModuleReader, type SourceTree } from "../pipeline/workflow-modules.ts"
import { type ArgumentMap, createSourceReader, NO_ARGUMENTS } from "../pipeline/workflow-source.ts"
import type { InferenceServiceAttrs } from "./types.ts"

export const REGISTRY_SOURCE = "tools/lib/inference/registry.ts"

export const SERVICES_EXPORT = "SERVICES"

const registryTree = (ctx: BuildContext): SourceTree => ({
  files: repoFiles(ctx, INSTRUCTIONS_REPO, { includeFixtures: true, includeGenerated: true }),
  read: (path) => readRepoFile(ctx, INSTRUCTIONS_REPO, path),
})

export const discoverInferenceServices = (ctx: BuildContext): readonly InferenceServiceAttrs[] => {
  const tree = registryTree(ctx)
  const reader = createSourceReader(tree)
  const site = createModuleReader(tree).resolveExport(REGISTRY_SOURCE, SERVICES_EXPORT)
  if (site === null) {
    throw new Error(
      `graph: ${REGISTRY_SOURCE} is where the inference services are declared and the snapshot ` +
        `carries no \`${SERVICES_EXPORT}\` there, so which services a deploy carries cannot be read`
    )
  }

  const held = new Map<string, InferenceServiceAttrs>()

  const collect = (expr: ts.Expression, path: string, args: ArgumentMap, depth: number): void => {
    const scoped = reader.resolveArray(expr, path, args, depth)
    if (scoped === null) return
    for (const element of (scoped.site.node as ts.ArrayLiteralExpression).elements) {
      if (ts.isSpreadElement(element)) {
        collect(element.expression, scoped.site.path, scoped.args, depth + 1)
        continue
      }
      const target =
        ts.isCallExpression(element) && element.arguments.length > 0
          ? element.arguments[0]
          : element
      if (target === undefined) continue
      const fields = reader.declaredFields(target, scoped.site.path, scoped.args, depth + 1)
      if (fields === null) continue
      const nameField = fields.get("name")
      const hostField = fields.get("host")
      const rootField = fields.get("sourceDir")
      if (nameField === null || hostField === null || rootField === null) continue
      const name = reader.resolveString(nameField.expr, nameField.path, nameField.args)
      const hostname = reader.resolveString(hostField.expr, hostField.path, hostField.args)
      const sourceRoot = reader.resolveString(rootField.expr, rootField.path, rootField.args)
      if (name === null || hostname === null || sourceRoot === null) continue
      if (held.has(name)) continue
      held.set(name, { name, hostname, sourceRoot })
    }
  }

  collect(site.node as ts.Expression, site.path, NO_ARGUMENTS, 0)

  if (held.size === 0) {
    throw new Error(
      `graph: \`${SERVICES_EXPORT}\` in ${REGISTRY_SOURCE} does not read as a list of services, ` +
        "so which services a deploy carries cannot be read"
    )
  }

  return [...held.values()].sort((a, b) => a.name.localeCompare(b.name))
}
