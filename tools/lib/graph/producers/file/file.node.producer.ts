import { defineNodeProducer } from "../../define-node-producer.ts"
import { readRepoFile } from "../../repos.ts"
import type { Graph, NodeInit } from "../../types.ts"
import { assertNever } from "../../../narrow.ts"
import { CODE_REPO, INSTRUCTIONS_REPO } from "../../../../../repo/scope/scope.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../package/types.ts"
import { classifyBiomeConfigFile } from "./biome-config-file/classify.ts"
import { BIOME_CONFIG_FILE_NODE_TYPE, isBiomeConfigPath } from "./biome-config-file/types.ts"
import { classifyCertificateFile } from "./certificate-file/classify.ts"
import { CERTIFICATE_FILE_NODE_TYPE } from "./certificate-file/types.ts"
import { classifyConfFile } from "./conf-file/classify.ts"
import { CONF_FILE_NODE_TYPE } from "./conf-file/types.ts"
import { classifyCssFile } from "./css-file/classify.ts"
import { CSS_FILE_NODE_TYPE } from "./css-file/types.ts"
import { classifyCsvFile } from "./csv-file/classify.ts"
import { CSV_FILE_NODE_TYPE } from "./csv-file/types.ts"
import { classifyDockerfile } from "./dockerfile-file/classify.ts"
import { DOCKERFILE_FILE_NODE_TYPE } from "./dockerfile-file/types.ts"
import { classifyEnvFile } from "./env-file/classify.ts"
import { ENV_FILE_NODE_TYPE } from "./env-file/types.ts"
import { classifyExtension } from "../../../../../file-kind/file-kind.ts"
import { classifyHtmlFile } from "./html-file/classify.ts"
import { HTML_FILE_NODE_TYPE } from "./html-file/types.ts"
import { classifyIgnoreFile } from "./ignore-file/classify.ts"
import { IGNORE_FILE_NODE_TYPE } from "./ignore-file/types.ts"
import { classifyImageFile } from "./image-file/classify.ts"
import { IMAGE_FILE_NODE_TYPE } from "./image-file/types.ts"
import { classifyJsFile, classifyJsxFile } from "./js-file/classify.ts"
import { JS_FILE_NODE_TYPE, JSX_FILE_NODE_TYPE } from "./js-file/types.ts"
import { classifyJsonFile } from "./json-file/classify.ts"
import { JSON_FILE_NODE_TYPE } from "./json-file/types.ts"
import { classifyLockFile } from "./lock-file/classify.ts"
import { LOCK_FILE_NODE_TYPE } from "./lock-file/types.ts"
import { classifyLuaFile } from "./lua-file/classify.ts"
import { LUA_FILE_NODE_TYPE } from "./lua-file/types.ts"
import { classifyMdFile } from "./md-file/classify.ts"
import { MD_FILE_NODE_TYPE } from "./md-file/types.ts"
import { classifyPythonFile } from "./python-file/classify.ts"
import { PYTHON_FILE_NODE_TYPE } from "./python-file/types.ts"
import { classifyRustFile } from "./rust-file/classify.ts"
import { RUST_FILE_NODE_TYPE } from "./rust-file/types.ts"
import { classifyShFile } from "./sh-file/classify.ts"
import { namesShell } from "./sh-file/shebang.ts"
import { SH_FILE_NODE_TYPE } from "./sh-file/types.ts"
import { classifySopsConfigFile } from "./sops-config-file/classify.ts"
import { SOPS_CONFIG_FILE_NODE_TYPE } from "./sops-config-file/types.ts"
import { classifySqlFile } from "./sql-file/classify.ts"
import { SQL_FILE_NODE_TYPE } from "./sql-file/types.ts"
import { classifySwiftFile } from "./swift-file/classify.ts"
import { SWIFT_FILE_NODE_TYPE } from "./swift-file/types.ts"
import { classifySystemdUnitFile } from "./systemd-unit-file/classify.ts"
import { SYSTEMD_UNIT_FILE_NODE_TYPE } from "./systemd-unit-file/types.ts"
import { classifyTomlFile } from "./toml-file/classify.ts"
import { TOML_FILE_NODE_TYPE } from "./toml-file/types.ts"
import { classifyTsFile } from "./ts-file/classify.ts"
import { discoverTsFiles } from "./ts-file/discover.ts"
import { TS_FILE_NODE_TYPE, TSX_FILE_NODE_TYPE } from "./ts-file/types.ts"
import { classifyTsconfigFile } from "./tsconfig-file/classify.ts"
import { isTsconfigPath, TSCONFIG_FILE_NODE_TYPE } from "./tsconfig-file/types.ts"
import { classifyTxtFile } from "./txt-file/classify.ts"
import { TXT_FILE_NODE_TYPE } from "./txt-file/types.ts"
import { classifyXmlFile } from "./xml-file/classify.ts"
import { XML_FILE_NODE_TYPE } from "./xml-file/types.ts"
import { classifyYamlFile } from "./yaml-file/classify.ts"
import { discoverSopsConfigs } from "./yaml-file/discover.ts"
import { YAML_FILE_NODE_TYPE, YML_FILE_NODE_TYPE } from "./yaml-file/types.ts"

const collectWorkspaceNames = (upstream: Graph): ReadonlySet<string> => {
  const out = new Set<string>()
  for (const node of upstream.nodes(PACKAGE_NODE_TYPE)) {
    const attrs = PackageAttrsSchema.parse(node.attrs)
    out.add(attrs.name)
  }
  return out
}

type WorkspaceOwner = { readonly path: string; readonly name: string }

const collectWorkspaceOwners = (upstream: Graph): readonly WorkspaceOwner[] => {
  const out: WorkspaceOwner[] = []
  for (const node of upstream.nodes(PACKAGE_NODE_TYPE)) {
    const attrs = PackageAttrsSchema.parse(node.attrs)
    if (attrs.path === "") continue
    out.push({ path: attrs.path, name: attrs.name })
  }
  return out.sort((a, b) => b.path.length - a.path.length)
}

const owningWorkspaceName = (relPath: string, owners: readonly WorkspaceOwner[]): string | null => {
  for (const ws of owners) {
    if (relPath === ws.path || relPath.startsWith(`${ws.path}/`)) return ws.name
  }
  return null
}

export const fileNodeProducer = defineNodeProducer({
  name: "file",
  nodeTypes: [
    TS_FILE_NODE_TYPE,
    TSX_FILE_NODE_TYPE,
    JS_FILE_NODE_TYPE,
    JSX_FILE_NODE_TYPE,
    CSS_FILE_NODE_TYPE,
    MD_FILE_NODE_TYPE,
    YAML_FILE_NODE_TYPE,
    YML_FILE_NODE_TYPE,
    LUA_FILE_NODE_TYPE,
    SQL_FILE_NODE_TYPE,
    JSON_FILE_NODE_TYPE,
    SH_FILE_NODE_TYPE,
    RUST_FILE_NODE_TYPE,
    TOML_FILE_NODE_TYPE,
    SWIFT_FILE_NODE_TYPE,
    DOCKERFILE_FILE_NODE_TYPE,
    SYSTEMD_UNIT_FILE_NODE_TYPE,
    TXT_FILE_NODE_TYPE,
    LOCK_FILE_NODE_TYPE,
    TSCONFIG_FILE_NODE_TYPE,
    IMAGE_FILE_NODE_TYPE,
    XML_FILE_NODE_TYPE,
    HTML_FILE_NODE_TYPE,
    PYTHON_FILE_NODE_TYPE,
    CSV_FILE_NODE_TYPE,
    CERTIFICATE_FILE_NODE_TYPE,
    ENV_FILE_NODE_TYPE,
    CONF_FILE_NODE_TYPE,
    IGNORE_FILE_NODE_TYPE,
    SOPS_CONFIG_FILE_NODE_TYPE,
    BIOME_CONFIG_FILE_NODE_TYPE,
  ],
  dependsOn: ["package"],
  build: (ctx, upstream) => {
    const nodes: NodeInit[] = []

    for (const file of discoverTsFiles(ctx)) {
      nodes.push(classifyTsFile(ctx, file))
    }

    const workspaceNames = collectWorkspaceNames(upstream)
    const workspaceOwners = collectWorkspaceOwners(upstream)
    const flatRules = discoverSopsConfigs(ctx)
    for (const relPath of repoFiles(ctx, CODE_REPO)) {
      const kind = classifyExtension(relPath)
      if (kind === null) {
        const body = readRepoFile(ctx, CODE_REPO, relPath)
        if (body !== null && namesShell(body)) nodes.push(classifyShFile(relPath))
        continue
      }
      switch (kind) {
        case "ts":
        case "tsx":
          continue
        case "js":
          nodes.push(classifyJsFile(relPath))
          break
        case "jsx":
          nodes.push(classifyJsxFile(relPath))
          break
        case "css": {
          const node = classifyCssFile(ctx, relPath, owningWorkspaceName(relPath, workspaceOwners))
          if (node !== null) nodes.push(node)
          break
        }
        case "md": {
          const node = classifyMdFile(ctx, relPath, workspaceNames)
          if (node !== null) nodes.push(node)
          break
        }
        case "yaml":
        case "yml":
          nodes.push(classifyYamlFile(ctx, relPath, kind, flatRules))
          break
        case "lua":
          nodes.push(classifyLuaFile(relPath))
          break
        case "sql":
          nodes.push(classifySqlFile(relPath))
          break
        case "json":
          nodes.push(classifyJsonFile(relPath, CODE_REPO))
          if (isTsconfigPath(relPath)) nodes.push(classifyTsconfigFile(relPath))
          if (isBiomeConfigPath(relPath)) nodes.push(classifyBiomeConfigFile(relPath))
          break
        case "sh":
          nodes.push(classifyShFile(relPath))
          break
        case "rust":
          nodes.push(classifyRustFile(relPath))
          break
        case "toml":
          nodes.push(classifyTomlFile(relPath))
          break
        case "swift":
          nodes.push(classifySwiftFile(relPath))
          break
        case "dockerfile":
          nodes.push(classifyDockerfile(ctx, relPath))
          break
        case "systemd-unit":
          nodes.push(classifySystemdUnitFile(relPath))
          break
        case "txt":
          nodes.push(classifyTxtFile(relPath))
          break
        case "lock":
          nodes.push(classifyLockFile(relPath))
          break
        case "image":
          nodes.push(classifyImageFile(relPath))
          break
        case "xml":
          nodes.push(classifyXmlFile(relPath))
          break
        case "html":
          nodes.push(classifyHtmlFile(relPath))
          break
        case "python":
          nodes.push(classifyPythonFile(relPath))
          break
        case "csv":
          nodes.push(classifyCsvFile(relPath))
          break
        case "certificate":
          nodes.push(classifyCertificateFile(relPath))
          break
        case "env":
          nodes.push(classifyEnvFile(relPath))
          break
        case "conf":
          nodes.push(classifyConfFile(relPath))
          break
        case "ignore":
          nodes.push(classifyIgnoreFile(relPath))
          break
        case "sops-config":
          nodes.push(classifySopsConfigFile(relPath))
          break
        default:
          assertNever(kind)
      }
    }

    for (const relPath of repoFiles(ctx, INSTRUCTIONS_REPO)) {
      if (relPath.endsWith(".json")) nodes.push(classifyJsonFile(relPath, INSTRUCTIONS_REPO))
    }

    return { nodes }
  },
})

export default fileNodeProducer
