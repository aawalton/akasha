export interface ConstantNode {
  type: "constant"
  value: number
}

export interface AddNode<F> {
  type: "add"
  operands: readonly F[]
}

export interface MultiplyNode<F> {
  type: "multiply"
  operands: readonly F[]
}

export interface DivideNode<F> {
  type: "divide"
  operands: readonly F[]
}

export interface FloorNode<F> {
  type: "floor"
  operand: F
}

export interface MaxNode<F> {
  type: "max"
  operands: readonly F[]
}

export interface MinNode<F> {
  type: "min"
  operands: readonly F[]
}

export type ArithmeticNode<F> =
  | ConstantNode
  | AddNode<F>
  | MultiplyNode<F>
  | DivideNode<F>
  | FloorNode<F>
  | MaxNode<F>
  | MinNode<F>
