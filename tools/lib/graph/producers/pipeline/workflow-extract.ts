import ts from "typescript"
import type { PopulationEntry } from "./types.ts"
import {
  lineOfNode,
  pathOfNode,
  type SourceTree,
  textOfNode,
  unwrap,
} from "./workflow-modules.ts"
import {
  type ArgumentMap,
  createSourceReader,
  NO_ARGUMENTS,
  type SourceReader,
} from "./workflow-source.ts"

export type WorkflowKind = "preparation" | "foundation" | "checks" | "apps" | "cleanup"

export type ExtractedStep = {
  readonly name: string
  readonly image: string
  readonly alwaysRun?: boolean
  readonly dependsOn: readonly string[]
  readonly script?: string
  readonly commands?: readonly string[]
}

export type ExtractedWorkflow = {
  readonly name: string
  readonly kind: WorkflowKind
  readonly sourcePath: string
  readonly package?: string
  readonly disabled?: boolean
  readonly alwaysRun?: boolean
  readonly branch?: string
  readonly dependsOn: readonly string[]
  readonly dispatchNodes?: readonly string[]
  readonly dispatchNodeTypes?: readonly PopulationEntry[]
  readonly steps: readonly ExtractedStep[]
}

export type ExtractionGap = {
  readonly sourcePath: string
  readonly declaredIn: string
  readonly line: number
  readonly workflow: string | null
  readonly construct: string
  readonly text: string
}

export type Extraction = {
  readonly workflows: readonly ExtractedWorkflow[]
  readonly gaps: readonly ExtractionGap[]
}

export type WorkflowSource = {
  readonly sourcePath: string
  readonly kind: WorkflowKind
}

const WORKFLOW_KEYS: readonly string[] = ["name", "when"]

export const extractWorkflows = (
  tree: SourceTree,
  sources: readonly WorkflowSource[]
): Extraction => {
  const reader = createSourceReader(tree)
  const workflows: ExtractedWorkflow[] = []
  const gaps: ExtractionGap[] = []

  for (const { sourcePath, kind } of sources) {
    const file = reader.sourceFile(sourcePath)
    if (file === null) {
      throw new Error(
        `graph: ${sourcePath} is the declaration a workflow-template page states and the snapshot carries no body for it`
      )
    }
    const before = workflows.length
    for (const statement of file.statements) {
      if (ts.isExportAssignment(statement) && statement.isExportEquals !== true) {
        collectWorkflows(reader, statement.expression, sourcePath, kind, workflows, gaps)
        continue
      }
      if (!ts.isVariableStatement(statement)) continue
      const modifiers = ts.getModifiers(statement)
      if (modifiers === undefined) continue
      if (!modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue
      for (const declaration of statement.declarationList.declarations) {
        if (declaration.initializer === undefined) continue
        collectWorkflows(reader, declaration.initializer, sourcePath, kind, workflows, gaps)
      }
    }
    if (workflows.length === before) {
      throw new Error(
        `graph: a workflow-template page states ${sourcePath} and no workflow stands in its source; nothing was extracted where the page promises one`
      )
    }
  }

  return { workflows, gaps }
}

const noteGap = (
  gaps: ExtractionGap[],
  sourcePath: string,
  node: ts.Node,
  workflow: string | null,
  construct: string
): undefined => {
  gaps.push({
    sourcePath,
    declaredIn: pathOfNode(node, sourcePath),
    line: lineOfNode(node),
    workflow,
    construct,
    text: textOfNode(node),
  })
}

const resolvePopulationArray = (
  reader: SourceReader,
  expr: ts.Expression,
  path: string,
  args: ArgumentMap
): readonly PopulationEntry[] | null => {
  const scoped = reader.resolveArray(expr, path, args)
  if (scoped === null) return null
  const { site, args: scope } = scoped
  const out: PopulationEntry[] = []
  for (const element of (site.node as ts.ArrayLiteralExpression).elements) {
    if (ts.isSpreadElement(element)) {
      const nested = resolvePopulationArray(reader, element.expression, site.path, scope)
      if (nested === null) return null
      out.push(...nested)
      continue
    }
    const named = reader.resolveString(element, site.path, scope)
    if (named !== null) {
      out.push(named)
      continue
    }
    const value = reader.resolveValue(element, site.path, scope)
    if (value === null || !ts.isObjectLiteralExpression(value.node)) return null
    const kindExpr = reader.propertyOf(value.node, "kind")
    const underExpr = reader.propertyOf(value.node, "under")
    if (kindExpr === null || underExpr === null) return null
    const kind = reader.resolveString(kindExpr, value.path, scope)
    const under = reader.resolveString(underExpr, value.path, scope)
    if (kind === null || under === null) return null
    out.push({ kind, under })
  }
  return out
}

const collectWorkflows = (
  reader: SourceReader,
  expr: ts.Expression,
  sourcePath: string,
  kind: WorkflowKind,
  workflows: ExtractedWorkflow[],
  gaps: ExtractionGap[],
  depth = 0
): undefined => {
  if (depth > 4) return
  const site = reader.resolveValue(expr, sourcePath)
  if (site === null) return
  const node = site.node

  const returned = reader.returnedExpression(node, site.path)
  if (returned !== null) {
    collectWorkflows(
      reader,
      returned.node as ts.Expression,
      returned.path,
      kind,
      workflows,
      gaps,
      depth + 1
    )
    return
  }

  if (ts.isArrayLiteralExpression(node)) {
    for (const element of node.elements) {
      const inner = ts.isSpreadElement(element) ? element.expression : element
      collectWorkflows(reader, inner, site.path, kind, workflows, gaps, depth + 1)
    }
    return
  }

  if (ts.isCallExpression(node)) {
    const shape = reader.shapeReturnedBy(node, site.path)
    if (shape === null || !ts.isObjectLiteralExpression(shape.node)) return
    if (!reader.declaresKeys(shape.node, WORKFLOW_KEYS)) return
    readWorkflow(reader, node, site.path, sourcePath, kind, workflows, gaps)
    return
  }

  if (ts.isObjectLiteralExpression(node) && reader.declaresKeys(node, WORKFLOW_KEYS)) {
    readWorkflow(reader, node, site.path, sourcePath, kind, workflows, gaps)
  }
}

const readWorkflow = (
  reader: SourceReader,
  expr: ts.Expression,
  path: string,
  sourcePath: string,
  kind: WorkflowKind,
  workflows: ExtractedWorkflow[],
  gaps: ExtractionGap[]
): undefined => {
  const fields = reader.declaredFields(expr, path)
  if (fields === null) {
    noteGap(gaps, sourcePath, expr, null, "workflow-fields")
    return
  }

  const nameField = fields.get("name")
  const name =
    nameField === null
      ? null
      : reader.resolveString(nameField.expr, nameField.path, nameField.args)
  if (name === null) {
    noteGap(gaps, sourcePath, expr, null, "workflow-name")
    return
  }

  const packageField = fields.get("package")
  const disabledField = fields.get("disabled")
  const alwaysRunField = fields.get("alwaysRun")
  const dependsOnField = fields.get("dependsOn")
  const dispatchNodesField = fields.get("dispatchNodes")
  const dispatchNodeTypesField = fields.get("dispatchNodeTypes")
  const whenField = fields.get("when")
  const stepsField = fields.get("steps")

  let branch: string | null = null
  if (whenField !== null) {
    const when = reader.resolveValue(whenField.expr, whenField.path, whenField.args)
    if (when !== null && ts.isObjectLiteralExpression(when.node)) {
      const branchExpr = reader.propertyOf(when.node, "branch")
      branch = branchExpr === null ? null : reader.resolveString(branchExpr, when.path)
    }
  }

  const packageName =
    packageField === null
      ? null
      : reader.resolveString(packageField.expr, packageField.path, packageField.args)
  const disabled =
    disabledField === null
      ? null
      : reader.resolveBoolean(disabledField.expr, disabledField.path, disabledField.args)
  const alwaysRun =
    alwaysRunField === null
      ? null
      : reader.resolveBoolean(alwaysRunField.expr, alwaysRunField.path, alwaysRunField.args)
  const dependsOn =
    dependsOnField === null
      ? []
      : reader.resolveStringArray(dependsOnField.expr, dependsOnField.path, dependsOnField.args)
  const dispatchNodes =
    dispatchNodesField === null
      ? null
      : reader.resolveStringArray(dispatchNodesField.expr, dispatchNodesField.path, dispatchNodesField.args)
  const dispatchNodeTypes =
    dispatchNodeTypesField === null
      ? null
      : resolvePopulationArray(
          reader,
          dispatchNodeTypesField.expr,
          dispatchNodeTypesField.path,
          dispatchNodeTypesField.args ?? NO_ARGUMENTS
        )

  if (dependsOnField !== null && dependsOn === null) {
    noteGap(gaps, sourcePath, dependsOnField.expr, name, "workflow-dependsOn")
  }
  if (dispatchNodesField !== null && dispatchNodes === null) {
    noteGap(gaps, sourcePath, dispatchNodesField.expr, name, "workflow-dispatchNodes")
  }
  if (dispatchNodeTypesField !== null && dispatchNodeTypes === null) {
    noteGap(gaps, sourcePath, dispatchNodeTypesField.expr, name, "workflow-dispatchNodeTypes")
  }

  const steps =
    stepsField === null
      ? []
      : readSteps(
          reader,
          stepsField.expr,
          stepsField.path,
          sourcePath,
          name,
          gaps,
          stepsField.args ?? NO_ARGUMENTS
        )

  workflows.push({
    name,
    kind,
    sourcePath,
    ...(packageName !== null && { package: packageName }),
    ...(disabled !== null && { disabled }),
    ...(alwaysRun !== null && { alwaysRun }),
    ...(branch !== null && { branch }),
    dependsOn: dependsOn ?? [],
    ...(dispatchNodes !== null && { dispatchNodes }),
    ...(dispatchNodeTypes !== null && { dispatchNodeTypes }),
    steps,
  })
}

const readSteps = (
  reader: SourceReader,
  expr: ts.Expression,
  path: string,
  sourcePath: string,
  workflowName: string,
  gaps: ExtractionGap[],
  args: ArgumentMap = NO_ARGUMENTS,
  depth = 0
): readonly ExtractedStep[] => {
  if (depth > 4) return []
  const scoped = reader.resolveArray(expr, path, args)
  if (scoped === null) {
    noteGap(gaps, sourcePath, expr, workflowName, "steps-not-a-declared-array")
    return []
  }
  const { site, args: scope } = scoped
  const steps: ExtractedStep[] = []
  for (const element of (site.node as ts.ArrayLiteralExpression).elements) {
    if (ts.isSpreadElement(element)) {
      const spread = reader.resolveArray(element.expression, site.path, scope)
      if (spread === null) {
        noteGap(gaps, sourcePath, element, workflowName, "step-spread-not-a-declared-array")
        continue
      }
      steps.push(
        ...readSteps(
          reader,
          spread.site.node as ts.Expression,
          spread.site.path,
          sourcePath,
          workflowName,
          gaps,
          spread.args,
          depth + 1
        )
      )
      continue
    }
    const step = readStep(reader, element, site.path, sourcePath, workflowName, gaps, scope)
    if (step !== null) steps.push(step)
  }
  return steps
}

const readStep = (
  reader: SourceReader,
  element: ts.Expression,
  path: string,
  sourcePath: string,
  workflowName: string,
  gaps: ExtractionGap[],
  args: ArgumentMap = NO_ARGUMENTS
): ExtractedStep | null => {
  const fields = reader.declaredFields(unwrap(element), path, args)
  if (fields === null) {
    noteGap(gaps, sourcePath, element, workflowName, "step-not-a-declared-object")
    return null
  }

  const nameField = fields.get("name")
  const name =
    nameField === null
      ? null
      : reader.resolveString(nameField.expr, nameField.path, nameField.args)
  if (name === null) {
    noteGap(gaps, sourcePath, element, workflowName, "step-name")
    return null
  }

  const imageField = fields.get("image")
  const image =
    imageField === null
      ? null
      : reader.resolveString(imageField.expr, imageField.path, imageField.args)
  if (image === null) {
    noteGap(gaps, sourcePath, element, workflowName, "step-image")
    return null
  }

  const alwaysRunField = fields.get("alwaysRun")
  const dependsOnField = fields.get("dependsOn")
  const scriptField = fields.get("script")
  const commandsField = fields.get("commands")

  const alwaysRun =
    alwaysRunField === null
      ? null
      : reader.resolveBoolean(alwaysRunField.expr, alwaysRunField.path, alwaysRunField.args)
  const dependsOn =
    dependsOnField === null
      ? []
      : reader.resolveStringArray(dependsOnField.expr, dependsOnField.path, dependsOnField.args)
  const script =
    scriptField === null
      ? null
      : reader.resolveString(scriptField.expr, scriptField.path, scriptField.args)

  const commands =
    commandsField === null
      ? null
      : reader.resolveCommands(commandsField.expr, commandsField.path, commandsField.args)

  if (dependsOnField !== null && dependsOn === null) {
    noteGap(gaps, sourcePath, dependsOnField.expr, workflowName, "step-dependsOn")
  }
  if (commandsField !== null && commands === null) {
    noteGap(gaps, sourcePath, commandsField.expr, workflowName, "step-commands")
  }

  return {
    name,
    image,
    ...(alwaysRun !== null && { alwaysRun }),
    dependsOn: dependsOn ?? [],
    ...(script !== null && { script }),
    ...(commands !== null && { commands }),
  }
}