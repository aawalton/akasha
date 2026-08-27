import type { Engine } from "../../types.ts"
import { SWIFT_FILE_NODE_TYPE } from "../file/swift-file/types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import {
  IOS_APP_NATIVE_SHELL_EDGE_TYPE,
  IOS_APP_NODE_TYPE,
  IOS_APP_SPA_SOURCE_EDGE_TYPE,
} from "./types.ts"

export const registerIosAppTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: IOS_APP_NODE_TYPE })
  engine.registerEdgeType({
    name: IOS_APP_NATIVE_SHELL_EDGE_TYPE,
    from: IOS_APP_NODE_TYPE,
    to: SWIFT_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: IOS_APP_SPA_SOURCE_EDGE_TYPE,
    from: IOS_APP_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
}
