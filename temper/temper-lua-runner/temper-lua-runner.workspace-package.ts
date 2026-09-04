import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperLuaRunner = {
  id: "01a06059-248e-7afb-9115-253f8636048f",
  pageTypeSlug: "workspace-package",
  slug: "temper-lua-runner",
  definition: "a Lua 5.1 interpreter kept alive in a subprocess and talked to over a pipe",
  manifest: "json",
  partSlugs: [
    "lua-module/lua-driver",
    "lua-module/eso-sandbox-prelude",
    "module/lua-protocol",
    "module/lua-marshal",
    "module/lua-number-string",
    "module/persistent-vm",
    "module/lua-vm",
    "module/sandboxed-lua-vm",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The interpreter is the `lua5.1` binary on the path rather than one bundled here.",
    },
    {
      invariantKind: "departure",
      statement: "One subprocess answers many scripts in turn.",
    },
    {
      invariantKind: "departure",
      statement: "A value crosses back from Lua as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A value crosses into Lua as a Lua literal written out here.",
    },
    {
      invariantKind: "departure",
      statement: "The Lua the subprocess loads first is a file beside a page rather than a string.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here compiles TypeScript to Lua.",
    },
  ],
} as const satisfies WorkspacePackage
