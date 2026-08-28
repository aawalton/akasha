import { CERTIFICATE_FILE_NODE_TYPE } from "./certificate-file/types.ts"
import { CONF_FILE_NODE_TYPE } from "./conf-file/types.ts"
import { CSS_FILE_NODE_TYPE } from "./css-file/types.ts"
import { CSV_FILE_NODE_TYPE } from "./csv-file/types.ts"
import { ENV_FILE_NODE_TYPE } from "./env-file/types.ts"
import { HTML_FILE_NODE_TYPE } from "./html-file/types.ts"
import { IGNORE_FILE_NODE_TYPE } from "./ignore-file/types.ts"
import { IMAGE_FILE_NODE_TYPE } from "./image-file/types.ts"
import { DOCKERFILE_FILE_NODE_TYPE } from "./dockerfile-file/types.ts"
import type { FileKind } from "../../../../../file-kind/file-kind.ts"
import { JS_FILE_NODE_TYPE, JSX_FILE_NODE_TYPE } from "./js-file/types.ts"
import { JSON_FILE_NODE_TYPE } from "./json-file/types.ts"
import { LOCK_FILE_NODE_TYPE } from "./lock-file/types.ts"
import { LUA_FILE_NODE_TYPE } from "./lua-file/types.ts"
import { MD_FILE_NODE_TYPE } from "./md-file/types.ts"
import { PYTHON_FILE_NODE_TYPE } from "./python-file/types.ts"
import { RUST_FILE_NODE_TYPE } from "./rust-file/types.ts"
import { SH_FILE_NODE_TYPE } from "./sh-file/types.ts"
import { SOPS_CONFIG_FILE_NODE_TYPE } from "./sops-config-file/types.ts"
import { SQL_FILE_NODE_TYPE } from "./sql-file/types.ts"
import { SWIFT_FILE_NODE_TYPE } from "./swift-file/types.ts"
import { SYSTEMD_UNIT_FILE_NODE_TYPE } from "./systemd-unit-file/types.ts"
import { TOML_FILE_NODE_TYPE } from "./toml-file/types.ts"
import { TS_FILE_NODE_TYPE, TSX_FILE_NODE_TYPE } from "./ts-file/types.ts"
import { TXT_FILE_NODE_TYPE } from "./txt-file/types.ts"
import { XML_FILE_NODE_TYPE } from "./xml-file/types.ts"
import { YAML_FILE_NODE_TYPE, YML_FILE_NODE_TYPE } from "./yaml-file/types.ts"

export type FileKindAuthorship = "authored" | "serialized"

export interface FileKindFacts {
  readonly nodeType: string
  readonly authorship: FileKindAuthorship
}

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

export type FileKindNodeType = (typeof FILE_KIND_FACTS)[FileKind]["nodeType"]

export const AUTHORED_FILE_NODE_TYPES: readonly FileKindNodeType[] = Object.values(FILE_KIND_FACTS)
  .filter((facts) => facts.authorship === "authored")
  .map((facts) => facts.nodeType)
