import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperLibAddonMenuOrderListBox = {
  id: "01a06207-bdfa-77c3-9c7b-c125ea77a269",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-addon-menu-order-list-box",
  definition: "a LibAddonMenu-2.0 widget holding a list a player puts into an order by hand",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "module/order-list-box-entry",
  partSlugs: [
    "module/order-list-box-build",
    "module/order-list-box-casts",
    "module/order-list-box-constants",
    "module/order-list-box-dialogs",
    "module/order-list-box-drag-cursor",
    "module/order-list-box-drag-methods",
    "module/order-list-box-entry",
    "module/order-list-box-entry-methods",
    "module/order-list-box-errors",
    "module/order-list-box-list-methods",
    "module/order-list-box-move-buttons",
    "module/order-list-box-publish",
    "module/order-list-box-row-setup",
    "module/order-list-box-state",
    "module/order-list-box-widget",
    "eso-interface/lam-order-list-box-markup",
    "type-declaration/order-list-box-control-shapes",
    "type-declaration/order-list-box-lam-shapes",
    "type-declaration/order-list-box-published",
    "type-declaration/order-list-box-shape",
  ],
  interfaceSlugs: ["eso-interface/lam-order-list-box-markup"],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "LibAddonMenu-2.0 is loaded before this widget or the widget does nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The widget is offered to LibAddonMenu-2.0 rather than to an addon directly.",
    },
    {
      invariantKind: "departure",
      statement: "A row is moved by dragging it or by the four buttons beside the list.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing here reaches a Date.",
    },
  ],
} as const satisfies EsoAddon
