import { assertNever } from "@akasha/utils-narrow/assert-never"
import type {
  DisplayFormulaNode,
  NumberFormat,
} from "../display-formula-node/display-formula-node.module.code.ts"

type ParentContext = "root" | "add" | "multiply" | "divide" | "floor" | "max" | "min" | "group"

function formatLatexNumber(value: number, format: NumberFormat = "decimal"): string {
  switch (format) {
    case "integer": {
      const rounded = Math.round(value)
      const negative = rounded < 0
      const abs = Math.abs(rounded).toString()
      const withSeparators = abs.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,")
      return negative ? `-${withSeparators}` : withSeparators
    }
    case "percent": {
      const pct = value * 100
      const formatted = pct.toFixed(2).replace(/\.?0+$/, "")
      return `${formatted}\\%`
    }
    case "decimal": {
      if (value === 0) return "0"
      if (Math.abs(value) < 1) {
        return value.toFixed(4).replace(/\.?0+$/, "")
      }
      return formatLatexNumber(value, "integer")
    }
    default:
      return assertNever(format)
  }
}

function nodeToLatex(node: DisplayFormulaNode, parent: ParentContext): string {
  switch (node.type) {
    case "constant":
      return formatLatexNumber(node.value, node.format)

    case "variable":
      return `\\text{${node.label}}`

    case "labeled-value": {
      const formatted = formatLatexNumber(node.value, node.format)
      const encodedLabel = node.label.replaceAll(",", "\uFF0C")
      return `\\htmlData{label=${encodedLabel}}{${formatted}}`
    }

    case "add": {
      const inner = node.operands.map((op) => nodeToLatex(op, "add")).join(" + ")
      if (parent === "multiply") {
        return `\\left(${inner}\\right)`
      }
      return inner
    }

    case "multiply": {
      const parts = node.operands.map((op) => nodeToLatex(op, "multiply"))
      return parts.join(" \\times ")
    }

    case "divide":
      return `\\frac{${nodeToLatex(node.numerator, "divide")}}{${nodeToLatex(node.denominator, "divide")}}`

    case "floor":
      return `\\lfloor ${nodeToLatex(node.operand, "floor")} \\rfloor`

    case "max": {
      const args = node.operands.map((op) => nodeToLatex(op, "max")).join(",\\, ")
      return `\\max\\!\\left(${args}\\right)`
    }

    case "min": {
      const args = node.operands.map((op) => nodeToLatex(op, "min")).join(",\\, ")
      return `\\min\\!\\left(${args}\\right)`
    }

    case "equals":
      return `${nodeToLatex(node.left, "root")} = ${nodeToLatex(node.right, "root")}`

    case "group":
      return `\\left(${nodeToLatex(node.operand, "group")}\\right)`

    default:
      return assertNever(node)
  }
}

export function toLatex(node: DisplayFormulaNode): string {
  return nodeToLatex(node, "root")
}
