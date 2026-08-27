import ts from "typescript"
import {
  type ParsedAugmentation,
  type ParsedSelfAugmentation,
  visitForAugmentations,
} from "./parse-augmentation.ts"
import { visitForExports } from "./parse-exports.ts"
import {
  DYNAMIC_IMPORT_SUFFIX_PREFIX,
  type ParsedReExport,
  type ParsedStaticImport,
  visitForImports,
} from "./parse-imports.ts"
import { extractJsdocImports, extractTripleSlashRefs } from "./parse-jsdoc-triple-slash.ts"
import { type ParsedMockModuleCall, visitForMockModuleCalls } from "./parse-mock-module.ts"
import type { TsFileExport, TsFileImport, TsFileImportKind } from "./types.ts"


export type ParsedImports = {
  readonly staticImports: readonly ParsedStaticImport[]
  readonly dynamicImports: readonly string[]
  readonly reExports: readonly ParsedReExport[]
  readonly augmentations: readonly ParsedAugmentation[]
  readonly selfAugmentations: readonly ParsedSelfAugmentation[]
  readonly jsdocImports: readonly string[]
  readonly tripleSlashRefs: readonly string[]
}

export type ParsedFile = {
  readonly imports: ParsedImports
  readonly exports: readonly TsFileExport[]
  readonly mockModuleCalls: readonly ParsedMockModuleCall[]
}

export const flatImportsFromParsed = (parsed: ParsedImports): readonly TsFileImport[] => {
  const out: TsFileImport[] = []
  const staticKind: TsFileImportKind = "static"
  const dynamicKind: TsFileImportKind = "dynamic"
  const reExportKind: TsFileImportKind = "re-export"
  const jsdocKind: TsFileImportKind = "jsdoc-import"
  const tripleSlashKind: TsFileImportKind = "triple-slash-ref"
  for (const s of parsed.staticImports) {
    out.push({ specifier: s.specifier, typeOnly: s.typeOnly, kind: staticKind })
  }
  for (const d of parsed.dynamicImports) {
    if (d.startsWith(DYNAMIC_IMPORT_SUFFIX_PREFIX)) continue
    out.push({ specifier: d, typeOnly: false, kind: dynamicKind })
  }
  for (const r of parsed.reExports) {
    out.push({ specifier: r.specifier, typeOnly: r.typeOnly, kind: reExportKind })
  }
  for (const j of parsed.jsdocImports) {
    out.push({ specifier: j, typeOnly: true, kind: jsdocKind })
  }
  for (const t of parsed.tripleSlashRefs) {
    out.push({ specifier: t, typeOnly: true, kind: tripleSlashKind })
  }
  return out
}

export const parseFileFromText = (path: string, text: string): ParsedFile => {
  const sourceFile = ts.createSourceFile(path, text, ts.ScriptTarget.ESNext, true)
  const importParts = visitForImports(sourceFile)
  const augmentationParts = visitForAugmentations(sourceFile)
  return {
    imports: {
      staticImports: importParts.staticImports,
      dynamicImports: importParts.dynamicImports,
      reExports: importParts.reExports,
      augmentations: augmentationParts.augmentations,
      selfAugmentations: augmentationParts.selfAugmentations,
      jsdocImports: extractJsdocImports(sourceFile),
      tripleSlashRefs: extractTripleSlashRefs(sourceFile),
    },
    exports: visitForExports(sourceFile),
    mockModuleCalls: visitForMockModuleCalls(sourceFile),
  }
}
