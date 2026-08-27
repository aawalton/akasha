import ts from "typescript"
import { z } from "zod"
import {
  collectFileDecls,
  collectSpecifierBindings,
  type DelegationContext,
  delegationBases,
  isFactoryDelegatingValue,
  wrapperBindings,
} from "./parse-mock-module-delegation.ts"
import {
  isMockModuleCall,
  lineOf,
  literalSpecifier,
  objectLiteralBody,
  specifierSourceText,
} from "./parse-mock-module-helpers.ts"

export type MockModuleFactoryAnalysis =
  | {
      readonly kind: "object-literal"
      readonly factoryKeys: readonly string[]
      readonly delegatedKeys: readonly string[]
    }
  | { readonly kind: "unanalyzable"; readonly reason: string }

export type ParsedMockModuleFactory = MockModuleFactoryAnalysis

export type ParsedMockModuleCall =
  | {
      readonly specifierKind: "literal"
      readonly specifier: string
      readonly line: number
      readonly factory: MockModuleFactoryAnalysis
    }
  | {
      readonly specifierKind: "unreadable"
      readonly specifierText: string
      readonly line: number
    }

export type MockModuleAttrs = {
  readonly specifier: string
  readonly resolved: string | null
  readonly line: number
  readonly factory: MockModuleFactoryAnalysis
}

export const MockModuleAttrsSchema = z
  .object({
    specifier: z.string(),
    resolved: z.string().nullable(),
    line: z.number(),
    factory: z.discriminatedUnion("kind", [
      z.object({
        kind: z.literal("object-literal"),
        factoryKeys: z.array(z.string()),
        delegatedKeys: z.array(z.string()),
      }),
      z.object({ kind: z.literal("unanalyzable"), reason: z.string() }),
    ]),
  })
  .passthrough()

export type MockModuleUnreadableSpecifierAttrs = {
  readonly specifierText: string
  readonly line: number
}

export const MockModuleUnreadableSpecifierAttrsSchema = z
  .object({
    specifierText: z.string(),
    line: z.number(),
  })
  .passthrough()

const analyzeFactory = (
  factoryArg: ts.Expression,
  ctx: DelegationContext
): ParsedMockModuleFactory => {
  if (!ts.isArrowFunction(factoryArg)) {
    return { kind: "unanalyzable", reason: "factory-not-arrow-function" }
  }
  const literal = objectLiteralBody(factoryArg)
  if (literal === null) {
    return { kind: "unanalyzable", reason: "factory-body-not-object-literal" }
  }
  const seen = new Set<string>()
  const keys: string[] = []
  const delegated: string[] = []
  const recordKey = (name: string, isDelegated: boolean): undefined => {
    if (seen.has(name)) return
    seen.add(name)
    keys.push(name)
    if (isDelegated) delegated.push(name)
  }
  for (const prop of literal.properties) {
    if (ts.isSpreadAssignment(prop)) {
      return { kind: "unanalyzable", reason: "factory-has-spread" }
    }
    if (ts.isGetAccessorDeclaration(prop) || ts.isSetAccessorDeclaration(prop)) {
      return { kind: "unanalyzable", reason: "factory-has-accessor" }
    }
    const name = prop.name
    if (name !== undefined && ts.isComputedPropertyName(name)) {
      return { kind: "unanalyzable", reason: "factory-has-computed-key" }
    }
    if (ts.isPropertyAssignment(prop)) {
      if (name === undefined || !(ts.isIdentifier(name) || ts.isStringLiteral(name))) {
        return { kind: "unanalyzable", reason: "factory-property-shape-unsupported" }
      }
      recordKey(name.text, isFactoryDelegatingValue(prop.initializer, ctx))
      continue
    }
    if (ts.isMethodDeclaration(prop)) {
      if (name === undefined || !(ts.isIdentifier(name) || ts.isStringLiteral(name))) {
        return { kind: "unanalyzable", reason: "factory-property-shape-unsupported" }
      }
      recordKey(name.text, false)
      continue
    }
    if (ts.isShorthandPropertyAssignment(prop)) {
      if (!ts.isIdentifier(prop.name)) {
        return { kind: "unanalyzable", reason: "factory-property-shape-unsupported" }
      }
      recordKey(prop.name.text, ctx.bases.has(prop.name.text))
      continue
    }
    return { kind: "unanalyzable", reason: "factory-property-shape-unsupported" }
  }
  return { kind: "object-literal", factoryKeys: keys, delegatedKeys: delegated }
}

export const visitForMockModuleCalls = (
  sourceFile: ts.SourceFile
): readonly ParsedMockModuleCall[] => {
  const specifierBindings = collectSpecifierBindings(sourceFile)
  const fileDecls = collectFileDecls(sourceFile)
  const contexts = new Map<string, DelegationContext>()
  const contextFor = (specifier: string): DelegationContext => {
    const cached = contexts.get(specifier)
    if (cached !== undefined) return cached
    const bases = delegationBases(
      specifierBindings.get(specifier) ?? new Set(),
      fileDecls.constInits
    )
    const ctx = { bases, wrappers: wrapperBindings(bases, fileDecls) }
    contexts.set(specifier, ctx)
    return ctx
  }
  const out: ParsedMockModuleCall[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node) && isMockModuleCall(node)) {
      if (node.arguments.length >= 2) {
        const first = node.arguments[0]
        const second = node.arguments[1]
        if (first !== undefined && second !== undefined) {
          const line = lineOf(sourceFile, node.getStart(sourceFile))
          const specifier = literalSpecifier(first)
          if (specifier !== null) {
            out.push({
              specifierKind: "literal",
              specifier,
              line,
              factory: analyzeFactory(second, contextFor(specifier)),
            })
          } else {
            out.push({
              specifierKind: "unreadable",
              specifierText: specifierSourceText(first, sourceFile),
              line,
            })
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sourceFile, visit)
  return out
}
