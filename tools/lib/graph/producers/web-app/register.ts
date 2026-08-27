import type { Engine } from "../../types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import {
  WEB_APP_BUILD_CONFIG_EDGE_TYPE,
  WEB_APP_BUILT_FROM_EDGE_TYPE,
  WEB_APP_ENTRY_EDGE_TYPE,
  WEB_APP_NODE_TYPE,
  WEB_APP_PUBLIC_EDGE_TYPE,
} from "./types.ts"

export const registerWebAppTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: WEB_APP_NODE_TYPE })
  engine.registerEdgeType({
    name: WEB_APP_BUILT_FROM_EDGE_TYPE,
    from: WEB_APP_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: WEB_APP_ENTRY_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: WEB_APP_PUBLIC_EDGE_TYPE,
    from: WEB_APP_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: WEB_APP_BUILD_CONFIG_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
}
