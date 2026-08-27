import { posix } from "node:path"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext, NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { type FlatRule, isManifestSopsFile } from "./discover.ts"
import { extractFlatKeys, extractManifestDocs } from "./extract.ts"
import {
  YAML_FILE_NODE_TYPE,
  type YamlFileAttrs,
  type YamlFileSopsAttrs,
  type YamlFileSopsDoc,
  YML_FILE_NODE_TYPE,
  type YmlFileNodeType,
} from "./types.ts"

const SOPS_YAML_SUFFIX = ".sops.yaml"
const SOPS_CONFIG_BASENAME = ".sops.yaml"

const isEncryptedSopsManifestPath = (relPath: string): boolean => {
  const base = posix.basename(relPath)
  return base.endsWith(SOPS_YAML_SUFFIX) && base !== SOPS_CONFIG_BASENAME
}

const classifySopsFile = (
  relPath: string,
  content: string,
  flatRules: readonly FlatRule[]
): YamlFileSopsAttrs => {
  if (!isManifestSopsFile(relPath, flatRules)) {
    return {
      shape: "flat",
      apiVersion: null,
      kind: null,
      namespace: null,
      name: null,
      encryptedField: null,
      flatKeys: extractFlatKeys(content),
      docs: [],
    }
  }
  const docs = extractManifestDocs(content)
  const head = docs[0]
  const docsCopy: YamlFileSopsDoc[] = []
  for (const d of docs) docsCopy.push(d)
  return {
    shape: "manifest",
    apiVersion: head?.apiVersion ?? null,
    kind: head?.kind ?? null,
    namespace: head?.namespace ?? null,
    name: head?.name ?? null,
    encryptedField: head?.encryptedField ?? null,
    flatKeys: [],
    docs: docsCopy,
  }
}

type YamlNodeType = typeof YAML_FILE_NODE_TYPE | YmlFileNodeType

export const classifyYamlFile = (
  ctx: BuildContext,
  relPath: string,
  ext: "yaml" | "yml",
  flatRules: readonly FlatRule[]
): NodeInit<YamlNodeType, YamlFileAttrs> => {
  let sops: YamlFileSopsAttrs | null = null
  if (isEncryptedSopsManifestPath(relPath)) {
    const content = readRepoFile(ctx, CODE_REPO, relPath)
    if (content !== null) sops = classifySopsFile(relPath, content, flatRules)
  }
  const isYml = ext === "yml"
  const attrsExt: ".yaml" | ".yml" = isYml ? ".yml" : ".yaml"
  return {
    type: isYml ? YML_FILE_NODE_TYPE : YAML_FILE_NODE_TYPE,
    repo: CODE_REPO,
    key: relPath,
    attrs: { path: relPath, ext: attrsExt, sops },
  }
}
