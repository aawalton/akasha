import type { Module } from "@akasha/code-system/module"

export const luaNumberString = {
  id: "01a06059-2492-7512-9794-36f5ae797518",
  pageTypeSlug: "module",
  slug: "lua-number-string",
  definition: "a number written the way Lua 5.1 writes that number",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A whole number is written with no fractional part.",
    },
    {
      invariantKind: "departure",
      statement: "Every other number is written to fourteen significant digits.",
    },
    {
      invariantKind: "departure",
      statement: "Seventeen digits are used where fourteen lose the number.",
    },
    {
      invariantKind: "departure",
      statement: "A trailing zero of a fraction is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "An exponent is written with a sign and at least two digits.",
    },
  ],
} as const satisfies Module
