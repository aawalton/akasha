import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperSettingsPanel = {
  id: "01a06053-3636-7e00-b329-e1ac77ae851e",
  type: "domain",
  slug: "temper-settings-panel",
  definition: "the settings an add-on shows in the game's own add-on menu",
  parts: [
    "module/build-lookup",
    "module/dropdown",
    "module/header",
    "module/panel-controls-created",
    "module/register-panel",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A control here is a plain record the add-on menu library reads.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a control.",
    },
    {
      invariantKind: "departure",
      statement: "The add-on menu library is handed in rather than reached as a global.",
    },
    {
      invariantKind: "departure",
      statement: "A setting is read back the way the setting was stated.",
    },
  ],
} as const satisfies Domain
