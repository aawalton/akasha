import { readRepoFile } from "../../../repos.ts"
import type { BuildContext, NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import type { DiscoveredFile } from "./discover.ts"
import { flatImportsFromParsed, parseFileFromText } from "./parse.ts"
import {
  type TsFileAttrs,
  type TsFileNodeType,
  tsFileNodeTypeOf,
  type TsxFileNodeType,
} from "./types.ts"

type TsOrTsxNodeType = TsFileNodeType | TsxFileNodeType

export const classifyTsFile = (
  ctx: BuildContext,
  file: DiscoveredFile
): NodeInit<TsOrTsxNodeType, TsFileAttrs> => {
  const text = readRepoFile(ctx, file.repo, file.relPath) ?? ""
  const parsed = parseFileFromText(file.relPath, text)
  const attrs: TsFileAttrs = {
    path: file.relPath,
    ext: file.relPath.endsWith(".tsx") ? ".tsx" : ".ts",
    package: file.packageName,
    workspaceRoot: file.workspaceRoot,
    discoveredVia: file.discoveredVia,
    exports: parsed.exports,
    imports: flatImportsFromParsed(parsed.imports),
    parsedImports: parsed.imports,
    mockModuleCalls: parsed.mockModuleCalls,
  }
  return {
    type: tsFileNodeTypeOf(file.relPath),
    repo: file.repo,
    key: file.relPath,
    attrs,
  }
}
