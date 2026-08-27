import { posix } from "node:path"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext, NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { repoTree } from "../../lib/repo-tree.ts"
import { resolveRepoRelative } from "./discover.ts"
import {
  extractImportSpecifiers,
  extractPackageName,
  extractSourceDirectives,
  extractUrlSpecifiers,
  globBase,
  isRelativeSpecifier,
  isTemplateSpecifier,
  isUrlSpecifier,
} from "./extract.ts"
import { CSS_FILE_NODE_TYPE, type CssDirective, type CssFileAttrs } from "./types.ts"

const resolveDirectiveBase = (
  ctx: BuildContext,
  cssRelPath: string,
  pattern: string
): string | null => {
  const resolved = resolveRepoRelative(posix.dirname(cssRelPath), globBase(pattern))
  if (resolved === null) return null
  return repoTree(ctx, CODE_REPO).hasPath(resolved) ? resolved : null
}

const buildDirectives = (
  ctx: BuildContext,
  cssRelPath: string,
  content: string
): readonly CssDirective[] => {
  const out: CssDirective[] = []
  for (const d of extractSourceDirectives(content)) {
    out.push({
      raw: d.raw,
      pattern: d.pattern,
      line: d.line,
      negated: d.negated,
      resolvedBase: resolveDirectiveBase(ctx, cssRelPath, d.pattern),
    })
  }
  return out
}

const buildPackageRefs = (content: string): readonly string[] => {
  const out = new Set<string>()
  for (const { specifier } of [
    ...extractImportSpecifiers(content),
    ...extractUrlSpecifiers(content),
  ]) {
    if (isTemplateSpecifier(specifier)) continue
    if (isUrlSpecifier(specifier)) continue
    if (isRelativeSpecifier(specifier)) continue
    const name = extractPackageName(specifier)
    if (name !== null) out.add(name)
  }
  return [...out].sort()
}

export const classifyCssFile = (
  ctx: BuildContext,
  relPath: string,
  ownerName: string | null
): NodeInit<"css-file", CssFileAttrs> | null => {
  const content = readRepoFile(ctx, CODE_REPO, relPath)
  if (content === null) return null
  return {
    type: CSS_FILE_NODE_TYPE,
    repo: CODE_REPO,
    key: relPath,
    attrs: {
      path: relPath,
      directives: buildDirectives(ctx, relPath, content),
      package: ownerName,
      packageRefs: buildPackageRefs(content),
    },
  }
}
