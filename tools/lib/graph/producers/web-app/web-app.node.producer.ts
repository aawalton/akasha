import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { WEB_APP_PAGE_REPO, discoverWebApps } from "./discover.ts"
import { WEB_APP_NODE_TYPE, type WebApp, type WebAppAttrs } from "./types.ts"

export const buildWebAppNodes = (apps: readonly WebApp[]): readonly NodeInit[] =>
  apps.map((app): NodeInit<"web-app", WebAppAttrs> => ({
    type: WEB_APP_NODE_TYPE,
    repo: app.repo,
    key: app.name,
    attrs: { name: app.name },
  }))

export const webAppNodeProducer = defineNodeProducer({
  name: "web-app",
  nodeTypes: [WEB_APP_NODE_TYPE],
  build: (ctx) => ({ nodes: buildWebAppNodes(discoverWebApps(ctx, WEB_APP_PAGE_REPO)) }),
})

export default webAppNodeProducer
