import ts from "typescript"
import { z } from "zod"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { collectTopLevelStringConsts, readStringProperty, unwrapExpression } from "../k8s/ts-literals.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { entryOf } from "./entry.ts"

export const SERVICE_REGISTRY_PATH = "packages/infra/scripts/src/generate-dockerfiles-registry.ts"

const REGISTRY_CONST = "SERVICES"

const BUN_SERVICE_TYPE = "bun-service"

const DEFAULT_EXTENSION_FILE = "dockerfile-extensions.json"

const ExtensionsSchema = z
  .object({
    no_tsconfig_base: z.boolean().optional(),
    single_stage: z.boolean().optional(),
    runtime_cmd: z.array(z.string()).optional(),
  })
  .loose()

export type ServiceImage = {
  readonly name: string
  readonly dir: string
  readonly carriesTsconfigBase: boolean
  readonly extensionsPath: string
  readonly entryPath: string
}

const registryObject = (sf: ts.SourceFile): ts.ObjectLiteralExpression | null => {
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue
      if (decl.name.text !== REGISTRY_CONST) continue
      if (decl.initializer === undefined) continue
      const unwrapped = unwrapExpression(decl.initializer)
      if (ts.isObjectLiteralExpression(unwrapped)) return unwrapped
    }
  }
  return null
}

const readExtensions = (ctx: BuildContext, path: string): z.infer<typeof ExtensionsSchema> => {
  const raw = readRepoFile(ctx, CODE_REPO, path)
  if (raw === null) return {}
  return ExtensionsSchema.parse(JSON.parse(raw))
}

export const discoverServiceImages = (ctx: BuildContext): readonly ServiceImage[] => {
  const source = readRepoFile(ctx, CODE_REPO, SERVICE_REGISTRY_PATH)
  if (source === null) return []
  const sf = ts.createSourceFile(SERVICE_REGISTRY_PATH, source, ts.ScriptTarget.Latest, true)
  const registry = registryObject(sf)
  if (registry === null) return []
  const consts = collectTopLevelStringConsts(sf)

  const images: ServiceImage[] = []
  for (const prop of registry.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    if (!ts.isIdentifier(prop.name) && !ts.isStringLiteral(prop.name)) continue
    const entry = unwrapExpression(prop.initializer)
    if (!ts.isObjectLiteralExpression(entry)) continue
    if (readStringProperty(entry, "type", consts) !== BUN_SERVICE_TYPE) continue
    const dir = readStringProperty(entry, "dir", consts)
    if (dir === null) continue
    const extensionFile = readStringProperty(entry, "extensionFile", consts) ?? DEFAULT_EXTENSION_FILE
    const extensionsPath = `${dir}/deploy/${extensionFile}`
    const extensions = readExtensions(ctx, extensionsPath)
    if (extensions.single_stage === true) continue
    images.push({
      name: prop.name.text,
      dir,
      carriesTsconfigBase: extensions.no_tsconfig_base !== true,
      extensionsPath,
      entryPath: entryOf(prop.name.text, dir, extensions.runtime_cmd),
    })
  }
  images.sort((a, b) => a.name.localeCompare(b.name))
  return images
}
