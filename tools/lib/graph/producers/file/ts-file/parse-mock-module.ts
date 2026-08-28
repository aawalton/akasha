import type ts from "typescript"
import { goneRecord, oldGraphGone } from "../../../graph-gone.ts"

export type MockModuleFactoryAnalysis =
  | {
      readonly kind: "object-literal"
      readonly factoryKeys: readonly string[]
      readonly delegatedKeys: readonly string[]
    }
  | { readonly kind: "unanalyzable"; readonly reason: string }
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

export const MockModuleAttrsSchema = goneRecord("MockModuleAttrsSchema")
export const MockModuleUnreadableSpecifierAttrsSchema = goneRecord(
  "MockModuleUnreadableSpecifierAttrsSchema"
)
export const visitForMockModuleCalls: (
  sourceFile: ts.SourceFile
) => readonly ParsedMockModuleCall[] = () => oldGraphGone("visitForMockModuleCalls")
