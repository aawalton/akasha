import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { IOS_APP_PAGE_REPO, IOS_APP_SUBJECT_REPO, discoverIosApps } from "./discover.ts"
import { IOS_APP_NODE_TYPE, type IosAppAttrs } from "./types.ts"

export const buildIosAppNodes = (apps: readonly IosAppAttrs[]): readonly NodeInit[] =>
  apps.map((app): NodeInit<"ios-app", IosAppAttrs> => ({
    type: IOS_APP_NODE_TYPE,
    repo: IOS_APP_SUBJECT_REPO,
    key: app.name,
    attrs: app,
  }))

export const iosAppNodeProducer = defineNodeProducer({
  name: "ios-app",
  nodeTypes: [IOS_APP_NODE_TYPE],
  build: (ctx) => ({ nodes: buildIosAppNodes(discoverIosApps(ctx, IOS_APP_PAGE_REPO)) }),
})

export default iosAppNodeProducer
