
import { expect } from "bun:test"
import type { Shape } from "../lib/shape-core"

export const refusal = (shape: Shape<unknown>, value: unknown) => {
  const result = shape.safeParse(value)
  if (result.success) throw new Error(`expected a refusal, got ${JSON.stringify(result.data)}`)
  const issue = result.error.issues[0]
  return {
    at: issue === undefined ? "" : issue.path.join("."),
    code: issue?.code ?? "",
    message: issue?.message ?? "",
    count: result.error.issues.length,
  }
}

export const accepts = (shape: Shape<unknown>, value: unknown) => {
  const result = shape.safeParse(value)
  if (!result.success) {
    throw new Error(`expected acceptance, refused: ${JSON.stringify(result.error.issues)}`)
  }
  return result.data
}

export const refuses = (shape: Shape<unknown>, value: unknown) =>
  expect(shape.safeParse(value).success).toBe(false)
