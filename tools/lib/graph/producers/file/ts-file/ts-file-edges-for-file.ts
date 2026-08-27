import { nodeKey } from "../../../key.ts"
import type { EdgeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { PACKAGE_NODE_TYPE } from "../../package/types.ts"
import type { ParsedImports } from "./parse.ts"
import type {
  MockModuleAttrs,
  MockModuleUnreadableSpecifierAttrs,
  ParsedMockModuleCall,
} from "./parse-mock-module.ts"
import type { Resolver } from "./resolve.ts"
import {
  IMPORT_DYNAMIC_EDGE_TYPE,
  IMPORT_STATIC_EDGE_TYPE,
  type ImportDynamicAttrs,
  type ImportedSymbol,
  type ImportStaticAttrs,
  MOCK_MODULE_EDGE_TYPE,
  MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
  type ReExportAttrs,
  tsFileNodeTypeOf,
} from "./types.ts"

const DYNAMIC_IMPORT_SUFFIX_PREFIX = "[dynamic-import-suffix]"

const tsFileKey = (relPath: string): string =>
  nodeKey({ type: tsFileNodeTypeOf(relPath), repo: CODE_REPO, key: relPath })

const packageKey = (name: string): string =>
  nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: name })

export const packageNamePrefix = (specifier: string): string | null => {
  if (specifier.length === 0) return null
  if (specifier.startsWith(".") || specifier.startsWith("/")) return null
  if (specifier.startsWith(DYNAMIC_IMPORT_SUFFIX_PREFIX)) return null
  if (specifier.startsWith("@")) {
    const firstSlash = specifier.indexOf("/")
    if (firstSlash === -1) return null
    const secondSlash = specifier.indexOf("/", firstSlash + 1)
    return secondSlash === -1 ? specifier : specifier.slice(0, secondSlash)
  }
  const firstSlash = specifier.indexOf("/")
  return firstSlash === -1 ? specifier : specifier.slice(0, firstSlash)
}

type StaticEmitInput = {
  specifier: string
  typeOnly: boolean
  importedSymbols: readonly ImportedSymbol[]
}
type ReExportEmitInput = {
  specifier: string
  typeOnly: boolean
  importedSymbols: readonly ImportedSymbol[]
  reexportLocalNames: readonly (string | null)[] | null
}

type ResolutionOutcome = {
  readonly tsFileResolvedRel: string | null
  readonly packageToId: string | null
  readonly targetPackage: string | null
}

const noResolution: ResolutionOutcome = {
  tsFileResolvedRel: null,
  packageToId: null,
  targetPackage: null,
}

export type PerFileInput = {
  readonly relPath: string
  readonly packageName: string
  readonly workspaceRoot: string
  readonly parsedImports: ParsedImports
  readonly mockModuleCalls: readonly ParsedMockModuleCall[]
}

export const edgesForFile = (
  file: PerFileInput,
  resolver: Resolver | undefined,
  workspacePackageNames: ReadonlySet<string>,
  tsFilePackageByRelPath: ReadonlyMap<string, string>
): readonly EdgeInit[] => {
  const fromId = tsFileKey(file.relPath)
  const out: EdgeInit[] = []

  const resolveSpecifier = (specifier: string): ResolutionOutcome => {
    const resolvedRel = resolver ? resolver.resolve(specifier, file.relPath) : null
    if (resolvedRel !== null && tsFilePackageByRelPath.has(resolvedRel)) {
      return {
        tsFileResolvedRel: resolvedRel,
        packageToId: null,
        targetPackage: tsFilePackageByRelPath.get(resolvedRel) ?? null,
      }
    }
    const pkgPrefix = packageNamePrefix(specifier)
    if (pkgPrefix !== null && workspacePackageNames.has(pkgPrefix)) {
      return {
        tsFileResolvedRel: null,
        packageToId: packageKey(pkgPrefix),
        targetPackage: pkgPrefix,
      }
    }
    return noResolution
  }

  const resolveDynamicSuffix = (specifier: string): string | null => {
    const suffix = specifier.slice(DYNAMIC_IMPORT_SUFFIX_PREFIX.length)
    const normalizedSuffix = suffix.startsWith("/") ? suffix.slice(1) : suffix
    if (normalizedSuffix.length === 0) return null
    const trailingMatch = `/${normalizedSuffix}`
    for (const candidateRel of tsFilePackageByRelPath.keys()) {
      if (candidateRel === normalizedSuffix || candidateRel.endsWith(trailingMatch)) {
        return candidateRel
      }
    }
    return null
  }

  const emitStatic = (input: StaticEmitInput): undefined => {
    const outcome = resolveSpecifier(input.specifier)
    if (outcome.tsFileResolvedRel !== null) {
      const attrs: ImportStaticAttrs = {
        specifier: input.specifier,
        resolved: outcome.tsFileResolvedRel,
        typeOnly: input.typeOnly,
        importedSymbols: input.importedSymbols,
      }
      out.push({
        type: IMPORT_STATIC_EDGE_TYPE,
        from: fromId,
        to: tsFileKey(outcome.tsFileResolvedRel),
        attrs,
      })
      return
    }
    if (outcome.packageToId !== null) {
      const attrs: ImportStaticAttrs = {
        specifier: input.specifier,
        resolved: null,
        typeOnly: input.typeOnly,
        importedSymbols: input.importedSymbols,
      }
      out.push({ type: IMPORT_STATIC_EDGE_TYPE, from: fromId, to: outcome.packageToId, attrs })
    }
  }

  const emitDynamic = (specifier: string): undefined => {
    if (specifier.startsWith(DYNAMIC_IMPORT_SUFFIX_PREFIX)) {
      const resolvedRel = resolveDynamicSuffix(specifier)
      if (resolvedRel === null) return
      const attrs: ImportDynamicAttrs = { specifier, resolved: resolvedRel }
      out.push({
        type: IMPORT_DYNAMIC_EDGE_TYPE,
        from: fromId,
        to: tsFileKey(resolvedRel),
        attrs,
      })
      return
    }
    const outcome = resolveSpecifier(specifier)
    if (outcome.tsFileResolvedRel !== null) {
      const attrs: ImportDynamicAttrs = {
        specifier,
        resolved: outcome.tsFileResolvedRel,
      }
      out.push({
        type: IMPORT_DYNAMIC_EDGE_TYPE,
        from: fromId,
        to: tsFileKey(outcome.tsFileResolvedRel),
        attrs,
      })
      return
    }
    if (outcome.packageToId !== null) {
      const attrs: ImportDynamicAttrs = { specifier, resolved: null }
      out.push({ type: IMPORT_DYNAMIC_EDGE_TYPE, from: fromId, to: outcome.packageToId, attrs })
    }
  }

  const emitReExport = (input: ReExportEmitInput): undefined => {
    const outcome = resolveSpecifier(input.specifier)
    if (outcome.tsFileResolvedRel !== null) {
      const attrs: ReExportAttrs = {
        specifier: input.specifier,
        resolved: outcome.tsFileResolvedRel,
        typeOnly: input.typeOnly,
        importedSymbols: input.importedSymbols,
        reexportLocalNames: input.reexportLocalNames,
      }
      out.push({
        type: RE_EXPORT_EDGE_TYPE,
        from: fromId,
        to: tsFileKey(outcome.tsFileResolvedRel),
        attrs,
      })
      return
    }
    if (outcome.packageToId !== null) {
      const attrs: ReExportAttrs = {
        specifier: input.specifier,
        resolved: null,
        typeOnly: input.typeOnly,
        importedSymbols: input.importedSymbols,
        reexportLocalNames: input.reexportLocalNames,
      }
      out.push({ type: RE_EXPORT_EDGE_TYPE, from: fromId, to: outcome.packageToId, attrs })
    }
  }

  const emitAugmentationTarget = (input: {
    specifier: string
    augmentedInterfaceNames: readonly string[]
  }): undefined => {
    emitStatic({
      specifier: input.specifier,
      typeOnly: true,
      importedSymbols: input.augmentedInterfaceNames,
    })
  }

  const emitAugmentationSelf = (input: { localTypeRefs: readonly string[] }): undefined => {
    const attrs: ImportStaticAttrs = {
      specifier: file.relPath,
      resolved: file.relPath,
      typeOnly: true,
      importedSymbols: input.localTypeRefs,
    }
    out.push({ type: IMPORT_STATIC_EDGE_TYPE, from: fromId, to: fromId, attrs })
  }

  const emitMockModule = (call: ParsedMockModuleCall): undefined => {
    if (call.specifierKind === "unreadable") {
      const attrs: MockModuleUnreadableSpecifierAttrs = {
        specifierText: call.specifierText,
        line: call.line,
      }
      out.push({
        type: MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE,
        from: fromId,
        to: fromId,
        attrs,
      })
      return
    }
    const outcome = resolveSpecifier(call.specifier)
    if (outcome.tsFileResolvedRel !== null) {
      const attrs: MockModuleAttrs = {
        specifier: call.specifier,
        resolved: outcome.tsFileResolvedRel,
        line: call.line,
        factory: call.factory,
      }
      out.push({
        type: MOCK_MODULE_EDGE_TYPE,
        from: fromId,
        to: tsFileKey(outcome.tsFileResolvedRel),
        attrs,
      })
      return
    }
    if (outcome.packageToId !== null) {
      const attrs: MockModuleAttrs = {
        specifier: call.specifier,
        resolved: null,
        line: call.line,
        factory: call.factory,
      }
      out.push({ type: MOCK_MODULE_EDGE_TYPE, from: fromId, to: outcome.packageToId, attrs })
    }
  }

  for (const s of file.parsedImports.staticImports) emitStatic(s)
  for (const s of file.parsedImports.dynamicImports) emitDynamic(s)
  for (const s of file.parsedImports.reExports) emitReExport(s)
  for (const a of file.parsedImports.augmentations) emitAugmentationTarget(a)
  for (const a of file.parsedImports.selfAugmentations) emitAugmentationSelf(a)
  for (const call of file.mockModuleCalls) emitMockModule(call)

  return out
}
