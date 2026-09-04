import type { z } from "zod"

type Exact<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false

export function assertSchemaMatchesPayload<Schema extends z.ZodTypeAny, Payload>(
  ..._witness: Exact<z.infer<Schema>, Payload> extends true ? [] : [never]
): undefined {}
