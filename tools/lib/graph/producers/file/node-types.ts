import { BIOME_CONFIG_FILE_NODE_TYPE } from "./biome-config-file/types.ts"
import { CERTIFICATE_FILE_NODE_TYPE } from "./certificate-file/types.ts"
import { CONF_FILE_NODE_TYPE } from "./conf-file/types.ts"
import { CSS_FILE_NODE_TYPE } from "./css-file/types.ts"
import { CSV_FILE_NODE_TYPE } from "./csv-file/types.ts"
import { DOCKERFILE_FILE_NODE_TYPE } from "./dockerfile-file/types.ts"
import { ENV_FILE_NODE_TYPE } from "./env-file/types.ts"
import { HTML_FILE_NODE_TYPE } from "./html-file/types.ts"
import { IGNORE_FILE_NODE_TYPE } from "./ignore-file/types.ts"
import { IMAGE_FILE_NODE_TYPE } from "./image-file/types.ts"
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
import { TSCONFIG_FILE_NODE_TYPE } from "./tsconfig-file/types.ts"
import { TXT_FILE_NODE_TYPE } from "./txt-file/types.ts"
import { XML_FILE_NODE_TYPE } from "./xml-file/types.ts"
import { YAML_FILE_NODE_TYPE, YML_FILE_NODE_TYPE } from "./yaml-file/types.ts"

export const FILE_NODE_TYPES: readonly string[] = [
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
]
