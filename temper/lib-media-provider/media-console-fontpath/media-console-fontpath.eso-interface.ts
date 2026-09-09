import type { EsoInterface } from "@akasha/code/eso-interface"

export const mediaConsoleFontpath = {
  id: "01a06069-f8c2-76ab-b89e-8605c12ac960",
  pageTypeSlug: "eso-interface",
  type: "eso-interface",
  slug: "media-console-fontpath",
  definition: "the folder the client reads fonts from on a console",
  markup: "xml",
  loadedAs: "Console/fontpath.xml",
} as const satisfies EsoInterface
