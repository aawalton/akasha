import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { discoverTemperAddons } from "./discover.ts"
import { TEMPER_ADDON_NODE_TYPE, type TemperAddonAttrs } from "./types.ts"

export const buildTemperAddonNodes = (
  addons: readonly TemperAddonAttrs[]
): readonly NodeInit[] =>
  addons.map((addon): NodeInit<"temper-addon", TemperAddonAttrs> => ({
    type: TEMPER_ADDON_NODE_TYPE,
    repo: CODE_REPO,
    key: addon.name,
    attrs: addon,
  }))

export const temperAddonNodeProducer = defineNodeProducer({
  name: "temper-addon",
  nodeTypes: [TEMPER_ADDON_NODE_TYPE],
  dependsOn: ["package"],
  build: (ctx, upstream) => ({ nodes: buildTemperAddonNodes(discoverTemperAddons(ctx, upstream)) }),
})

export default temperAddonNodeProducer
