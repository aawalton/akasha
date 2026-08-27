import { expect, test } from "bun:test"
import { z } from "zod"
import { assertSchemaMatchesPayload } from "./assert-schema-matches-payload"

interface DemoPayload {
  count: number
  label?: string
}

const demoAccountWide = z.object({
  count: z.number(),
  label: z.string().optional(),
})

test("gate passes when z.infer<Schema> is structurally identical to Payload", () => {
  assertSchemaMatchesPayload<typeof demoAccountWide, DemoPayload>()
  expect(true).toBe(true)
})

test("gate fails (tsc error) when the payload has drifted from the schema", () => {
  interface DriftedPayload {
    count: string
    label?: string
  }
  // @ts-expect-error z.infer (count: number) ≠ DriftedPayload (count: string)
  assertSchemaMatchesPayload<typeof demoAccountWide, DriftedPayload>()
  expect(true).toBe(true)
})
