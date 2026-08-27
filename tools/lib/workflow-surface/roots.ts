import type { HelpFlag } from "../../ops/surface.ts"
import { codeRoot } from "../code-root.ts"
import { canonicalize, normalizeAbsolute } from "../../../repo/path/path"
import { AKASHA, resolveRoots, rootFor } from "../../../repo/roots/roots"

export interface SurfaceRoots {
  readonly instructionsRoot: string
  readonly codeRoot: string
}

export const AKASHA_ROOT_FLAG: HelpFlag = {
  name: "--akasha-root",
  argLabel: "<dir>",
  valueShape: "token",
  path: true,
  description:
    "The akasha checkout holding the `workflow-template` pages and RBAC profiles to compose (defaults to this repo).",
}

const CODE_ROOT_FLAG: HelpFlag = {
  name: "--code-root",
  argLabel: "<dir>",
  valueShape: "token",
  path: true,
  description:
    "The code checkout the workflows are composed over and whose files are looked for (defaults to $CODE_ROOT, else this repo).",
}

export const SURFACE_ROOT_FLAGS: readonly HelpFlag[] = [AKASHA_ROOT_FLAG, CODE_ROOT_FLAG]

const real = (path: string): string => canonicalize(normalizeAbsolute(path))

export function surfaceRoots(flags: {
  readonly instructionsRoot?: string | undefined
  readonly codeRoot?: string | undefined
}): SurfaceRoots {
  return {
    instructionsRoot: real(flags.instructionsRoot ?? rootFor(resolveRoots(), AKASHA)),
    codeRoot: real(flags.codeRoot ?? codeRoot()),
  }
}

export function readUnder(roots: SurfaceRoots): string {
  return (
    `READ UNDER: workflow pages and their declarations from the akasha tree at ` +
    `${roots.instructionsRoot}; the tree they are composed over, and every file path they ` +
    `name, from the code tree at ${roots.codeRoot}.`
  )
}
