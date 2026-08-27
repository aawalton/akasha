import { z } from "zod"
import type { ParsedImports } from "./parse.ts"
import type { ParsedMockModuleCall } from "./parse-mock-module.ts"
import type { TsFileAttrs } from "./types.ts"

const TsFileExportKindSchema = z.enum([
  "function",
  "const",
  "let",
  "var",
  "class",
  "interface",
  "type",
  "enum",
  "namespace",
  "reexport",
  "default",
])

export const TsFileExportSchema = z
  .object({
    name: z.string(),
    line: z.number(),
    kind: TsFileExportKindSchema,
    typeOnly: z.boolean(),
    signatureTypeRefs: z.array(z.string()).optional(),
  })
  .passthrough()

const TsFileImportKindSchema = z.enum([
  "static",
  "dynamic",
  "re-export",
  "jsdoc-import",
  "triple-slash-ref",
])

export const TsFileImportSchema = z
  .object({
    specifier: z.string(),
    typeOnly: z.boolean(),
    kind: TsFileImportKindSchema,
  })
  .passthrough()

export const TsFileAttrsSchema: z.ZodType<TsFileAttrs> = z
  .object({
    path: z.string(),
    ext: z.enum([".ts", ".tsx"]),
    package: z.string(),
    workspaceRoot: z.string(),
    discoveredVia: z.enum([
      "tsconfig",
      "tsconfig-include-only",
      "adapter",
      "entry-glob",
      "workspace-walk",
    ]),
    exports: z.array(TsFileExportSchema).readonly(),
    imports: z.array(TsFileImportSchema).readonly(),
    parsedImports: z.custom<ParsedImports>().optional(),
    mockModuleCalls: z.custom<readonly ParsedMockModuleCall[]>().optional(),
  })
  .passthrough()

export const ImportStaticAttrsSchema = z
  .object({
    specifier: z.string(),
    resolved: z.string().nullable(),
    typeOnly: z.boolean(),
    importedSymbols: z.array(z.union([z.string(), z.literal("*"), z.null()])),
  })
  .passthrough()

export const ImportDynamicAttrsSchema = z
  .object({
    specifier: z.string(),
    resolved: z.string().nullable(),
  })
  .passthrough()

export const ReExportAttrsSchema = z
  .object({
    specifier: z.string(),
    resolved: z.string().nullable(),
    typeOnly: z.boolean(),
    importedSymbols: z.array(z.union([z.string(), z.literal("*"), z.null()])),
    reexportLocalNames: z.array(z.union([z.string(), z.null()])).nullable(),
  })
  .passthrough()
