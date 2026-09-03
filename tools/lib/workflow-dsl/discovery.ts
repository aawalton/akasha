import { attachmentPathFor } from "@akasha/markdown-pages/attachment-file"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { canonicalize } from "@akasha/pages-system/repo-path"
import type {
  DiscoveredWorkflow,
  Workflow,
  WorkflowKind,
} from "@akasha/workflow-language/workflow-types"
import { answer } from "../page-query.ts"

export const WORKFLOW_TEMPLATE_PAGE_TYPE = "workflow-template"
export const DECLARATION_KEY = "declaration"
export const DECLARATION_EXTENSION = "ts"

const SLUG_KEY = "slug"
const KIND_KEY = "kind"

const REPO = "akasha"

const EVERY_KIND: Readonly<Record<WorkflowKind, true>> = {
  preparation: true,
  foundation: true,
  checks: true,
  apps: true,
  cleanup: true,
}

const KINDS_NAMED = Object.keys(EVERY_KIND)
  .map((one) => `\`${one}\``)
  .join(", ")

export interface WorkflowPage {
  readonly slug: string
  readonly kind: WorkflowKind
  readonly sourcePath: string
  readonly declarationPath: string
}

export interface DeclarationContext {
  readonly codeRoot: string
}

function textIn(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

function relPathOf(at: string): string {
  const cut = at.indexOf(":")
  const repo = cut === -1 ? "" : at.slice(0, cut)
  const relPath = cut === -1 ? "" : at.slice(cut + 1)
  if (relPath === "") {
    throw new Error(
      `a \`${WORKFLOW_TEMPLATE_PAGE_TYPE}\` page stands at \`${at}\`, which does not read as \`<repo>:<path>\``
    )
  }
  if (repo !== REPO) {
    throw new Error(
      `a \`${WORKFLOW_TEMPLATE_PAGE_TYPE}\` page stands at \`${at}\`, in \`${repo}\` rather than ` +
        `\`${REPO}\`; only the \`${REPO}\` tree is held at a commit here, so this page would be ` +
        "read as it stands now rather than as it stood at that commit"
    )
  }
  return relPath
}

function kindOf(values: Readonly<Record<string, unknown>>, at: string): WorkflowKind {
  const stated = textIn(values, KIND_KEY)
  if (stated === null) {
    throw new Error(
      `\`${at}\` states no \`${KIND_KEY}\`, and a workflow takes its kind from its page`
    )
  }
  if (!Object.hasOwn(EVERY_KIND, stated)) {
    throw new Error(`\`${at}\` states \`${KIND_KEY}: ${stated}\`, which is none of ${KINDS_NAMED}`)
  }
  return stated as WorkflowKind
}

export function rootedAt(root: string): Roots {
  return { ...resolveRoots(), akasha: canonicalize(root) }
}

export function workflowPages(root: string): readonly WorkflowPage[] {
  const roots = rootedAt(root)
  const asked = answer(roots, {
    pageType: WORKFLOW_TEMPLATE_PAGE_TYPE,
    keys: [SLUG_KEY, KIND_KEY],
  })
  if (asked === null) {
    throw new Error(
      `the tree at \`${rootFor(roots, AKASHA)}\` names no \`${WORKFLOW_TEMPLATE_PAGE_TYPE}\` page type ` +
        "whose pages are files, so no workflow stands to be run"
    )
  }
  return asked.rows.map((row) => {
    const relPath = relPathOf(row.at)
    const sourcePath = attachmentPathFor(relPath, DECLARATION_KEY, DECLARATION_EXTENSION)
    return {
      slug: textIn(row.values, SLUG_KEY) ?? relPath,
      kind: kindOf(row.values, row.at),
      sourcePath,
      declarationPath: `${rootFor(roots, AKASHA)}/${sourcePath}`,
    }
  })
}

function isWorkflowShape(obj: unknown): obj is Workflow {
  if (typeof obj !== "object" || obj === null) return false
  if (!("name" in obj) || typeof obj.name !== "string") return false
  if (!("when" in obj) || typeof obj.when !== "object" || obj.when === null) return false
  return true
}

function attachDiscovery(workflow: Workflow, page: WorkflowPage): DiscoveredWorkflow {
  return {
    ...workflow,
    declaredKind: workflow.kind,
    kind: page.kind,
    sourcePath: page.sourcePath,
  }
}

function statedBy(held: unknown, page: WorkflowPage, context: DeclarationContext): unknown {
  if (typeof held !== "function") return held
  try {
    return (held as (context: DeclarationContext) => unknown)(context)
  } catch (cause) {
    throw new Error(
      `\`${page.sourcePath}\` states \`${page.slug}\` as a function of the tree it runs over, and ` +
        `that function refused the code root \`${context.codeRoot}\` it was handed: ` +
        `${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
}

function workflowsIn(
  mod: Record<string, unknown>,
  page: WorkflowPage,
  context: DeclarationContext
): readonly DiscoveredWorkflow[] {
  const stated = statedBy(mod.default, page, context)
  if (isWorkflowShape(stated)) return [attachDiscovery(stated, page)]
  if (Array.isArray(stated)) {
    const made = stated.filter(isWorkflowShape).map((one) => attachDiscovery(one, page))
    if (made.length > 0) return made
  }

  const held: DiscoveredWorkflow[] = []
  for (const [exportName, exportValue] of Object.entries(mod)) {
    if (exportName === "default") continue
    if (Array.isArray(exportValue)) {
      for (const item of exportValue) {
        if (isWorkflowShape(item)) held.push(attachDiscovery(item, page))
      }
      continue
    }
    if (isWorkflowShape(exportValue)) held.push(attachDiscovery(exportValue, page))
  }
  return held
}

export async function loadWorkflowPage(
  page: WorkflowPage,
  context: DeclarationContext
): Promise<readonly DiscoveredWorkflow[]> {
  let mod: Record<string, unknown>
  try {
    mod = await import(`${page.declarationPath}?v=${Date.now()}`)
  } catch (cause) {
    throw new Error(
      `\`${page.sourcePath}\` did not load, so what \`${page.slug}\` runs is unknown: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }

  const held = workflowsIn(mod, page, context)
  if (held.length === 0) {
    throw new Error(
      `\`${page.sourcePath}\` exports no workflow, and \`${page.slug}\` is a page that states one`
    )
  }
  return held
}

export async function discoverWorkflows(
  root: string,
  context: DeclarationContext
): Promise<readonly DiscoveredWorkflow[]> {
  const pages = workflowPages(root)
  const loaded = await Promise.all(pages.map((one) => loadWorkflowPage(one, context)))
  return loaded.flat()
}
