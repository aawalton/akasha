export const summary = "Rule that every binary a composed CI step runs is one its target image carries"

import type { CommandHelp } from "../ops/surface.ts"
import { examinePopulation } from "../lib/check-workflow/population.ts"
import { commandBinaries } from "../lib/check-workflow/shell-command-binaries.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../lib/check-workflow/violation-reporter.ts"
import { IMAGE_TOOLS, IMAGES } from "../lib/workflow-dsl/images"
import { buildWorkflowSurface } from "../lib/workflow-surface/build"
import { commandsFor, type ProbeContextId, type SurfaceStep, type SurfaceWorkflow } from "../lib/workflow-surface/surface"
import { readUnder, SURFACE_ROOT_FLAGS, surfaceRoots } from "../lib/workflow-surface/roots.ts"
import { parseArgs } from "../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [...SURFACE_ROOT_FLAGS],
  exits: [
    { code: 0, meaning: "every step's binaries stand in its image" },
    { code: 1, meaning: "one or more steps reach for a binary their image does not carry" },
    { code: 2, meaning: "a step named an image with no tool list, or a tree could not be read" },
  ],
  examples: ["ops check-image-tools", "ops check-image-tools --code-root ~/repos/akasha"],
}

const PREFIX = "[image-tools]"

const CONTEXT: ProbeContextId = "main-no-diff"

interface ImageToolViolation extends Violation {
  readonly workflow: string
  readonly step: string
  readonly image: string
  readonly binary: string
  readonly commandPreview: string
  readonly sourcePath: string
}

interface StepMember {
  readonly workflow: SurfaceWorkflow
  readonly step: SurfaceStep
}

type ImageKey = keyof typeof IMAGES

function isImageKey(key: string): key is ImageKey {
  return Object.hasOwn(IMAGES, key)
}

function* imageEntries(): Generator<[ImageKey, string]> {
  for (const key in IMAGES) {
    if (isImageKey(key)) yield [key, IMAGES[key]]
  }
}

function resolveImageKey(image: string): ImageKey | null {
  for (const [key, url] of imageEntries()) {
    if (image === url) return key
  }
  const digestIdx = image.indexOf("@sha256:")
  if (digestIdx !== -1) {
    const base = image.slice(0, digestIdx)
    for (const [key, url] of imageEntries()) {
      const urlBase = url.replace(/:[\w.-]+$/, "")
      if (base === urlBase || base === url) return key
    }
  }
  return null
}

function previewAround(script: string, binary: string): string {
  const line = script.split("\n").find((one) => one.includes(binary))
  if (line === undefined) return ""
  const trimmed = line.trim()
  return trimmed.length > 120 ? `${trimmed.slice(0, 120)}...` : trimmed
}

export default async function checkImageTools(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const roots = surfaceRoots({
    instructionsRoot: parsed.string("--instructions-root"),
    codeRoot: parsed.string("--code-root"),
  })

  let steps: readonly StepMember[]
  try {
    const surface = await buildWorkflowSurface(roots.instructionsRoot, {
      codeRoot: roots.codeRoot,
    })
    steps = surface.workflows.flatMap((workflow) =>
      workflow.steps.map((step) => ({ workflow, step }))
    )
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const { population, violations } = examinePopulation<StepMember, ImageToolViolation>({
    members: steps,
    unit: "workflow steps",
    membership: {
      kind: "enumerated",
      because:
        "`buildWorkflowSurface` parses what it emits through its own schema, and a workflow " +
        "page that yields no workflow throws out of discovery rather than being skipped, so a " +
        "short list is reported as a tool error above instead of scanned; the members are every " +
        "`steps` entry of every workflow it returned, flattened with nothing dropped",
    },
    labelOf: ({ workflow, step }) => `${workflow.name}/${step.name}`,
    siteOf: ({ workflow }) => `${roots.instructionsRoot}/${workflow.sourcePath}`,
    examine: ({ workflow, step }) => {
      const imageKey = resolveImageKey(step.image)
      if (imageKey === null) {
        throw new Error(
          `image \`${step.image}\` is in no \`IMAGES\` entry, so this step has no tool list to ` +
            "be judged against — add it to `tools/lib/workflow-dsl/images.ts` with what the " +
            "container carries"
        )
      }
      const allowed = new Set(IMAGE_TOOLS[imageKey])
      const script = commandsFor(step, CONTEXT).join("\n")
      const found: ImageToolViolation[] = []
      for (const binary of commandBinaries(script)) {
        if (allowed.has(binary)) continue
        found.push({
          workflow: workflow.name,
          step: step.name,
          image: step.image,
          binary,
          commandPreview: previewAround(script, binary),
          sourcePath: workflow.sourcePath,
        })
      }
      return found
    },
  })

  exitOnResult({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header: "a step reaching for a binary its image does not carry",
      successMessage: [
        `OK — every step's binaries stand in the image it runs on, over ${steps.length} step(s).`,
        `  ${readUnder(roots)}`,
        `  IMAGE TOOLS: read from \`tools/lib/workflow-dsl/images.ts\` in this repository, ` +
          `the same module the step images are minted from.`,
      ].join("\n"),
      footer: (count) =>
        [
          `${PREFIX} ${count} violation(s)`,
          `${PREFIX} ${readUnder(roots)}`,
          `${PREFIX} IMAGE TOOLS: read from \`tools/lib/workflow-dsl/images.ts\` in this ` +
            `repository, the same module the step images are minted from.`,
        ].join("\n"),
      formatViolation: (one) =>
        `${one.sourcePath} → ${one.workflow}/${one.step}\n    image: ${one.image}\n` +
        `    binary: ${one.binary}\n    command: ${one.commandPreview}`,
    },
  })
}
