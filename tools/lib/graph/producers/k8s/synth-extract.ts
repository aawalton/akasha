import ts from "typescript"
import type { SynthDiscoveredManifest } from "./synth-types.ts"
import {
  parameterNamesOf,
  readMappedList,
  returnedObjectLiteral,
  shapeOf,
} from "./synth-shapes.ts"
import {
  collectTopLevelArrayConsts,
  collectTopLevelObjectConsts,
  collectTopLevelStringConsts,
  findProperty,
  readObjectProperty,
  readStringProperty,
  resolveStringExpression,
  unwrapExpression,
} from "./ts-literals.ts"

const WORKLOAD_KINDS: ReadonlySet<string> = new Set([
  "Deployment",
  "StatefulSet",
  "DaemonSet",
  "Job",
  "CronJob",
])

const SYNTH_CALL_NAMES: ReadonlySet<string> = new Set(["synthOne", "synthMulti"])

type ManifestFactory = {
  readonly parameterNames: readonly string[]
  readonly manifest: ts.ObjectLiteralExpression
}

type ResolvedManifest = {
  readonly manifest: ts.ObjectLiteralExpression
  readonly consts: ReadonlyMap<string, string>
}

const collectManifestFactories = (sf: ts.SourceFile): ReadonlyMap<string, ManifestFactory> => {
  const out = new Map<string, ManifestFactory>()
  for (const statement of sf.statements) {
    if (!ts.isFunctionDeclaration(statement)) continue
    if (statement.name === undefined) continue
    const manifest = returnedObjectLiteral(statement.body)
    if (manifest === null) continue
    const parameterNames = parameterNamesOf(statement.parameters)
    if (parameterNames === null) continue
    out.set(statement.name.text, { parameterNames, manifest })
  }
  return out
}

const resolveManifest = (
  expr: ts.Expression,
  factories: ReadonlyMap<string, ManifestFactory>,
  consts: ReadonlyMap<string, string>,
  objectConsts: ReadonlyMap<string, ts.ObjectLiteralExpression>
): ResolvedManifest | null => {
  const unwrapped = unwrapExpression(expr)
  if (ts.isObjectLiteralExpression(unwrapped)) return { manifest: unwrapped, consts }
  if (ts.isIdentifier(unwrapped)) {
    const named = objectConsts.get(unwrapped.text)
    return named === undefined ? null : { manifest: named, consts }
  }
  if (!ts.isCallExpression(unwrapped)) return null
  if (!ts.isIdentifier(unwrapped.expression)) return null
  const factory = factories.get(unwrapped.expression.text)
  if (factory === undefined) return null
  const bound = new Map(consts)
  for (const [at, name] of factory.parameterNames.entries()) {
    const argument = unwrapped.arguments[at]
    const value = argument === undefined ? null : resolveStringExpression(argument, consts)
    if (value === null) bound.delete(name)
    else bound.set(name, value)
  }
  return { manifest: factory.manifest, consts: bound }
}

type ManifestReadout =
  | { readonly manifest: SynthDiscoveredManifest }
  | { readonly unreadable: string }

const extractManifestObject = (
  manifest: ts.ObjectLiteralExpression,
  sourcePath: string,
  topLevelStringConsts: ReadonlyMap<string, string>
): ManifestReadout => {
  const kind = readStringProperty(manifest, "kind", topLevelStringConsts)
  if (kind === null) {
    return { unreadable: "a manifest whose kind this could not read as a string" }
  }

  const apiVersion = readStringProperty(manifest, "apiVersion", topLevelStringConsts)

  const metadata = readObjectProperty(manifest, "metadata")
  if (metadata === null) {
    return { unreadable: `a ${kind} manifest with no metadata object literal in place` }
  }

  const name = readStringProperty(metadata, "name", topLevelStringConsts)
  if (name === null) {
    return { unreadable: `a ${kind} manifest whose metadata.name this could not read as a string` }
  }

  const namespace = readStringProperty(metadata, "namespace", topLevelStringConsts)

  let serviceAccountName: string | null = null
  if (WORKLOAD_KINDS.has(kind)) {
    const spec = readObjectProperty(manifest, "spec")
    let templateSpec: ts.ObjectLiteralExpression | null = null
    if (kind === "CronJob") {
      const jobTemplate = spec === null ? null : readObjectProperty(spec, "jobTemplate")
      const jobTemplateSpec = jobTemplate === null ? null : readObjectProperty(jobTemplate, "spec")
      const template =
        jobTemplateSpec === null ? null : readObjectProperty(jobTemplateSpec, "template")
      templateSpec = template === null ? null : readObjectProperty(template, "spec")
    } else {
      const template = spec === null ? null : readObjectProperty(spec, "template")
      templateSpec = template === null ? null : readObjectProperty(template, "spec")
    }
    if (templateSpec !== null) {
      serviceAccountName = readStringProperty(
        templateSpec,
        "serviceAccountName",
        topLevelStringConsts
      )
    }
  }

  return {
    manifest: {
      sourcePath,
      apiVersion,
      kind,
      namespace,
      name,
      serviceAccountName,
    },
  }
}

type UnreadableShape = {
  readonly sourcePath: string
  readonly what: string
}

const collectFromCallExpressions = (
  sf: ts.SourceFile,
  sourcePath: string,
  topLevelStringConsts: ReadonlyMap<string, string>,
  topLevelArrayConsts: ReadonlyMap<string, ts.ArrayLiteralExpression>,
  topLevelObjectConsts: ReadonlyMap<string, ts.ObjectLiteralExpression>,
  factories: ReadonlyMap<string, ManifestFactory>,
  unreadable: UnreadableShape[]
): readonly SynthDiscoveredManifest[] => {
  const out: SynthDiscoveredManifest[] = []

  const take = (expr: ts.Expression, consts: ReadonlyMap<string, string>): undefined => {
    const resolved = resolveManifest(expr, factories, consts, topLevelObjectConsts)
    if (resolved === null) {
      unreadable.push({
        sourcePath,
        what: `a manifest written as ${shapeOf(unwrapExpression(expr))}, where this reads only an object literal in place, a top-level const object literal, or a call to a factory in the same service`,
      })
      return
    }
    const read = extractManifestObject(resolved.manifest, sourcePath, resolved.consts)
    if ("manifest" in read) out.push(read.manifest)
    else unreadable.push({ sourcePath, what: read.unreadable })
    return
  }

  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const callee = node.expression.text
      if (SYNTH_CALL_NAMES.has(callee)) {
        if (callee === "synthOne") {
          const manifestArg = node.arguments[2]
          if (manifestArg !== undefined) take(manifestArg, topLevelStringConsts)
        } else if (callee === "synthMulti") {
          const arrayArg = node.arguments[1]
          const list = arrayArg === undefined ? undefined : unwrapExpression(arrayArg)
          if (list !== undefined && ts.isArrayLiteralExpression(list)) {
            for (const elem of list.elements) {
              if (!ts.isObjectLiteralExpression(elem)) continue
              for (const prop of elem.properties) {
                if (!ts.isPropertyAssignment(prop)) continue
                if (!ts.isIdentifier(prop.name) && !ts.isStringLiteral(prop.name)) continue
                if (prop.name.text !== "manifest") continue
                take(prop.initializer, topLevelStringConsts)
              }
            }
          } else if (list !== undefined) {
            const mapped = readMappedList(list, topLevelArrayConsts, topLevelStringConsts)
            if (mapped === null) {
              unreadable.push({
                sourcePath,
                what: `a synthMulti whose manifest list is ${shapeOf(list)}, where this reads only an array literal in place or a top-level const array mapped to object literals`,
              })
            } else if ("unreadable" in mapped) {
              unreadable.push({ sourcePath, what: mapped.unreadable })
            } else {
              const manifestExpr = findProperty(mapped.returned, "manifest")
              if (manifestExpr === null) {
                unreadable.push({
                  sourcePath,
                  what: `a synthMulti mapping to an element with no manifest property`,
                })
              } else {
                for (const value of mapped.values) {
                  const bound = new Map(topLevelStringConsts)
                  bound.set(mapped.parameterName, value)
                  take(manifestExpr, bound)
                }
              }
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return out
}

type ServiceExtraction = {
  readonly manifests: readonly SynthDiscoveredManifest[]
  readonly unreadable: readonly UnreadableShape[]
}

export const extractSynthManifests = (
  sourcePath: string,
  sourceText: string
): readonly SynthDiscoveredManifest[] =>
  collectForService([{ sourcePath, text: sourceText }]).manifests

export const extractSynthManifestsForService = (
  sources: readonly { readonly sourcePath: string; readonly text: string }[]
): readonly SynthDiscoveredManifest[] => {
  const { manifests, unreadable } = collectForService(sources)
  if (manifests.length > 0) return manifests
  const where = sources.map((one) => one.sourcePath).join(", ")
  const why =
    unreadable.length === 0
      ? "it holds no synthOne or synthMulti call"
      : unreadable.map((one) => `${one.sourcePath} holds ${one.what}`).join("; ")
  throw new Error(
    `graph: ${where} yielded no manifests, so whatever it deploys would stand unrooted and unseen: ${why}`
  )
}

const collectForService = (
  sources: readonly { readonly sourcePath: string; readonly text: string }[]
): ServiceExtraction => {
  const parsed = sources.map((s) => ({
    sourcePath: s.sourcePath,
    sf: ts.createSourceFile(s.sourcePath, s.text, ts.ScriptTarget.Latest, true),
  }))
  const mergedConsts = new Map<string, string>()
  const mergedArrays = new Map<string, ts.ArrayLiteralExpression>()
  const mergedObjects = new Map<string, ts.ObjectLiteralExpression>()
  const mergedFactories = new Map<string, ManifestFactory>()
  for (const { sf } of parsed) {
    for (const [name, value] of collectTopLevelStringConsts(sf)) mergedConsts.set(name, value)
    for (const [name, array] of collectTopLevelArrayConsts(sf)) mergedArrays.set(name, array)
    for (const [name, object] of collectTopLevelObjectConsts(sf)) mergedObjects.set(name, object)
    for (const [name, factory] of collectManifestFactories(sf)) mergedFactories.set(name, factory)
  }
  const out: SynthDiscoveredManifest[] = []
  const unreadable: UnreadableShape[] = []
  for (const { sourcePath, sf } of parsed) {
    const found = collectFromCallExpressions(
      sf,
      sourcePath,
      mergedConsts,
      mergedArrays,
      mergedObjects,
      mergedFactories,
      unreadable
    )
    for (const m of found) out.push(m)
  }
  return { manifests: out, unreadable }
}

export const extractApplyRbacCalls = (
  sourcePath: string,
  sourceText: string
): readonly string[] => {
  const sf = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true)
  const topLevelStringConsts = collectTopLevelStringConsts(sf)
  const out: string[] = []
  const seen = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      if (node.expression.text === "applyRbac") {
        const configArg = node.arguments[0]
        if (configArg !== undefined && ts.isObjectLiteralExpression(configArg)) {
          const rbacFile = readStringProperty(configArg, "rbacFile", topLevelStringConsts)
          if (rbacFile !== null && !seen.has(rbacFile)) {
            seen.add(rbacFile)
            out.push(rbacFile)
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return out
}
