import { expect, test } from "bun:test"
import { assertSchemaKeysMatchPayload } from "akasha/temper/modules/assert-schema-keys-match-payload/assert-schema-keys-match-payload.module.code.ts"
import { z } from "zod"

const reading = z.strictObject({
  capturedAt: z.number(),
  pieces: z.array(z.strictObject({ name: z.string() })).optional(),
  linesById: z.record(z.string(), z.strictObject({ rank: z.number() })),
})

type Piece = { name: string }

type Agreeing = {
  capturedAt: number
  pieces: Piece[]
  linesById: Record<string, { rank: number }>
}

test("a payload naming the keys the schema admits, at every depth, typechecks", () => {
  expect(assertSchemaKeysMatchPayload<typeof reading, Agreeing>(true)).toBeUndefined()
})

test("a key the payload writes and the schema does not admit is refused", () => {
  // @ts-expect-error the schema does not admit esoVersion
  assertSchemaKeysMatchPayload<typeof reading, Agreeing & { esoVersion: string }>(true)
})

test("a key the schema admits and the payload never writes is refused", () => {
  // @ts-expect-error the payload never writes pieces
  assertSchemaKeysMatchPayload<typeof reading, Omit<Agreeing, "pieces">>(true)
})

test("a key written inside a list is held to the schema", () => {
  type Ranked = Omit<Agreeing, "pieces"> & { pieces: (Piece & { purchased: boolean })[] }
  // @ts-expect-error the schema does not admit pieces[].purchased
  assertSchemaKeysMatchPayload<typeof reading, Ranked>(true)
})

test("a key written inside a record is held to the schema", () => {
  type Leveled = Omit<Agreeing, "linesById"> & {
    linesById: Record<string, { rank: number; xp: number }>
  }
  // @ts-expect-error the schema does not admit linesById[*].xp
  assertSchemaKeysMatchPayload<typeof reading, Leveled>(true)
})

test("a key one member of a payload union writes is held to the schema", () => {
  // @ts-expect-error the schema does not admit pets
  assertSchemaKeysMatchPayload<typeof reading, Agreeing | (Agreeing & { pets: string[] })>(true)
})
