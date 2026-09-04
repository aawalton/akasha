import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibNotification = {
  id: "01a0605a-0514-797f-9f36-a01b055a56fc",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-notification",
  definition: "the rows an addon adds to the game's notifications panel",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "notification-entry",
  partSlugs: [
    "module/notification-casts",
    "module/notification-entry",
    "module/notification-names",
    "module/notification-provider-link",
    "module/notification-providers",
    "module/notification-row-overrides",
    "module/notification-types",
    "type-declaration/notification-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller gets one link table and puts every notification into that table.",
    },
    {
      invariantKind: "departure",
      statement: "The keyboard panel gets a provider apart from the gamepad panel's provider.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh of the keyboard panel refreshes the gamepad panel too.",
    },
    {
      invariantKind: "departure",
      statement: "Loading twice is an error rather than a second library.",
    },
    {
      invariantKind: "constraint",
      statement: "The game's own row setup is replaced so a row may carry its own icon.",
    },
    {
      invariantKind: "departure",
      statement: "The game reaches the library through two global names for one library.",
    },
  ],
} as const satisfies EsoAddon
