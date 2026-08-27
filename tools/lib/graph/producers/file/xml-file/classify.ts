import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { XML_FILE_NODE_TYPE, type XmlFileAttrs } from "./types.ts"

export const classifyXmlFile = (relPath: string): NodeInit<"xml-file", XmlFileAttrs> => ({
  type: XML_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
