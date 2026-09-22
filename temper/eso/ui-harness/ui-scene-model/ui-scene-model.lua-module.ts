import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiSceneModel = {
  id: "01a0ca7b-5ce2-75de-85ef-5e0f626588b7",
  type: "page-type/lua-module",
  slug: "ui-scene-model",
  definition: "the scenes the game shows and hides, kept as tables outside the game",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scene is made the first time a caller asks for that scene by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scene starts hidden, as a scene the game has not shown yet is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scene moved to a state it already holds tells nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scene shown passes through showing, and a scene hidden through hiding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A callback is handed the state the scene left and the state the scene took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A callback that raises leaves the scene in the state that callback found it in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fragment is the control that fragment was made over and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller outside the sandbox moves a scene by naming the scene and the state.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No scene here hides another scene when that scene is shown.",
    },
  ],
} as const satisfies LuaModule
