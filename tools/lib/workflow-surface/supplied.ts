import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { HelpFlag } from "../../ops/surface.ts"
import { codeRoot } from "../code-root.ts"
import { AKASHA, resolveRoots, rootFor } from "../../../repo/roots/roots"
import { buildWorkflowSurface } from "./build.ts"
import { type WorkflowSurface, WorkflowSurfaceSchema } from "./surface.ts"

export const SURFACE_FLAGS: readonly HelpFlag[] = [
  {
    name: "--root",
    argLabel: "<dir>",
    valueShape: "token",
    path: true,
    description:
      "Build the surface from this instructions checkout instead of the one this command lives in.",
  },
  {
    name: "--surface",
    argLabel: "<file>",
    valueShape: "token",
    path: true,
    description:
      "Read the surface from this JSON file instead of building it. The file is parsed through the same schema `buildWorkflowSurface` emits, so a file that is not a surface is refused rather than half-read.",
  },
]

export interface SuppliedSurface {
  readonly surface: WorkflowSurface
  readonly from: string
  readonly root: string | null
}

export const surfaceFromFile = (path: string): WorkflowSurface => {
  const at = resolve(path)
  let text: string
  try {
    text = readFileSync(at, "utf8")
  } catch (cause) {
    throw new Error(
      `\`${at}\` did not open, so the workflow surface this run was told to read is not there: ` +
        `${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch (cause) {
    throw new Error(
      `\`${at}\` is not JSON, so nothing in it reads as a workflow surface: ` +
        `${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  const parsed = WorkflowSurfaceSchema.safeParse(held)
  if (!parsed.success) {
    throw new Error(
      `\`${at}\` is JSON but not a workflow surface, so what it holds is unknown rather than ` +
        `empty: ${parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`
    )
  }
  return parsed.data
}

export const suppliedSurface = async (args: {
  readonly root: string | undefined
  readonly surfaceFile: string | undefined
}): Promise<SuppliedSurface> => {
  if (args.surfaceFile !== undefined) {
    return {
      surface: surfaceFromFile(args.surfaceFile),
      from: `the surface in ${args.surfaceFile}`,
      root: null,
    }
  }
  const root = args.root === undefined ? rootFor(resolveRoots(), AKASHA) : resolve(args.root)
  const surface = await buildWorkflowSurface(root, { codeRoot: codeRoot() })
  return { surface, from: `the workflow-template pages under ${root}`, root }
}
