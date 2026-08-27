import { readRepoFile } from "../../../repos.ts"
import type { BuildContext, NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import {
  extractCodeFenceBlocks,
  extractImportSpecifiers,
  extractPackageName,
  isExcludedSpecifier,
  isTemplateSpecifier,
} from "./extract.ts"
import { MD_FILE_NODE_TYPE, type MdFileAttrs, type MdImportEntry } from "./types.ts"

const buildImportsInventory = (
  content: string,
  workspaceNames: ReadonlySet<string>
): readonly MdImportEntry[] => {
  const imports: MdImportEntry[] = []

  for (const block of extractCodeFenceBlocks(content)) {
    for (const { specifier, line, kind } of extractImportSpecifiers(block.code, block.startLine)) {
      if (isTemplateSpecifier(specifier)) {
        imports.push({ specifier, line, kind, disposition: "template" })
        continue
      }
      if (isExcludedSpecifier(specifier)) {
        imports.push({ specifier, line, kind, disposition: "excluded" })
        continue
      }

      const pkgName = extractPackageName(specifier)
      if (pkgName === null || !workspaceNames.has(pkgName)) {
        imports.push({ specifier, line, kind, disposition: "external" })
        continue
      }

      imports.push({ specifier, line, kind, disposition: "edge" })
    }
  }

  return imports
}

export const classifyMdFile = (
  ctx: BuildContext,
  relPath: string,
  workspaceNames: ReadonlySet<string>
): NodeInit<"md-file", MdFileAttrs> | null => {
  const content = readRepoFile(ctx, CODE_REPO, relPath)
  if (content === null) return null
  return {
    type: MD_FILE_NODE_TYPE,
    repo: CODE_REPO,
    key: relPath,
    attrs: { path: relPath, imports: buildImportsInventory(content, workspaceNames) },
  }
}
