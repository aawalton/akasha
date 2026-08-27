// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import { oldGraphGone } from "../../../graph-gone.ts"

export type FileKindNodeType = unknown

export const FILE_KIND_FACTS = {
  ts: { nodeType: TS_FILE_NODE_TYPE, authorship: "authored" },
  tsx: { nodeType: TSX_FILE_NODE_TYPE, authorship: "authored" },
  js: { nodeType: JS_FILE_NODE_TYPE, authorship: "authored" },
  jsx: { nodeType: JSX_FILE_NODE_TYPE, authorship: "authored" },
  css: { nodeType: CSS_FILE_NODE_TYPE, authorship: "authored" },
  md: { nodeType: MD_FILE_NODE_TYPE, authorship: "authored" },
  lua: { nodeType: LUA_FILE_NODE_TYPE, authorship: "authored" },
  sh: { nodeType: SH_FILE_NODE_TYPE, authorship: "authored" },
  rust: { nodeType: RUST_FILE_NODE_TYPE, authorship: "authored" },
  swift: { nodeType: SWIFT_FILE_NODE_TYPE, authorship: "authored" },
  dockerfile: { nodeType: DOCKERFILE_FILE_NODE_TYPE, authorship: "authored" },
  "systemd-unit": { nodeType: SYSTEMD_UNIT_FILE_NODE_TYPE, authorship: "authored" },

  sql: { nodeType: SQL_FILE_NODE_TYPE, authorship: "serialized" },
  yaml: { nodeType: YAML_FILE_NODE_TYPE, authorship: "serialized" },
  yml: { nodeType: YML_FILE_NODE_TYPE, authorship: "serialized" },
  json: { nodeType: JSON_FILE_NODE_TYPE, authorship: "serialized" },
  toml: { nodeType: TOML_FILE_NODE_TYPE, authorship: "serialized" },
  txt: { nodeType: TXT_FILE_NODE_TYPE, authorship: "serialized" },
  lock: { nodeType: LOCK_FILE_NODE_TYPE, authorship: "serialized" },

  image: { nodeType: IMAGE_FILE_NODE_TYPE, authorship: "serialized" },
  xml: { nodeType: XML_FILE_NODE_TYPE, authorship: "serialized" },
  html: { nodeType: HTML_FILE_NODE_TYPE, authorship: "serialized" },
  python: { nodeType: PYTHON_FILE_NODE_TYPE, authorship: "serialized" },
  csv: { nodeType: CSV_FILE_NODE_TYPE, authorship: "serialized" },
  certificate: { nodeType: CERTIFICATE_FILE_NODE_TYPE, authorship: "serialized" },
  env: { nodeType: ENV_FILE_NODE_TYPE, authorship: "serialized" },
  conf: { nodeType: CONF_FILE_NODE_TYPE, authorship: "serialized" },
  ignore: { nodeType: IGNORE_FILE_NODE_TYPE, authorship: "serialized" },
  "sops-config": { nodeType: SOPS_CONFIG_FILE_NODE_TYPE, authorship: "serialized" },
} as const satisfies Record<FileKind, FileKindFacts>
