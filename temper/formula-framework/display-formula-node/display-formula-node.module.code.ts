export type NumberFormat = "integer" | "percent" | "decimal"

export type DisplayFormulaNode =
  | { type: "constant"; value: number; format?: NumberFormat }
  | { type: "variable"; label: string }
  | {
      type: "labeled-value"
      value: number
      label: string
      format?: NumberFormat
    }
  | { type: "add"; operands: readonly DisplayFormulaNode[] }
  | { type: "multiply"; operands: readonly DisplayFormulaNode[] }
  | {
      type: "divide"
      numerator: DisplayFormulaNode
      denominator: DisplayFormulaNode
    }
  | { type: "floor"; operand: DisplayFormulaNode }
  | { type: "max"; operands: readonly DisplayFormulaNode[] }
  | { type: "min"; operands: readonly DisplayFormulaNode[] }
  | { type: "equals"; left: DisplayFormulaNode; right: DisplayFormulaNode }
  | { type: "group"; operand: DisplayFormulaNode }
