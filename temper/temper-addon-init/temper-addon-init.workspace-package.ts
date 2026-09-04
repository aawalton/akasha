import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperAddonInit = {
  id: "01a060ae-335e-74c4-a05c-9d3c375de3b4",
  pageTypeSlug: "workspace-package",
  slug: "temper-addon-init",
  definition: "the moment the game has finished loading one add-on",
  manifest: "json",
  partSlugs: ["module/addon-init"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An add-on begins its work once the game says that add-on has loaded.",
    },
    {
      invariantKind: "departure",
      statement: "An add-on hears the loading announcement once.",
    },
  ],
} as const satisfies WorkspacePackage
