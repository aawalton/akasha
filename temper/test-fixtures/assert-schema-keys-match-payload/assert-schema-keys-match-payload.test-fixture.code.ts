import type { z } from "zod"

type Leaf = string | number | boolean | bigint | symbol | null | undefined

type Indexed<Table> = string extends keyof Table ? true : number extends keyof Table ? true : false

type KeysDisagreeing<Payload, Schema, At extends string> = Payload extends unknown
  ? EachKeysDisagreeing<NonNullable<Payload>, NonNullable<Schema>, At>
  : never

type EachKeysDisagreeing<Payload, Schema, At extends string> = [Payload] extends [Leaf]
  ? never
  : unknown extends Schema
    ? never
    : [Schema] extends [Leaf]
      ? `${At}: the payload writes a table where the schema reads a value`
      : Payload extends readonly (infer Item)[]
        ? Schema extends readonly (infer Read)[]
          ? KeysDisagreeing<Item, Read, `${At}[]`>
          : `${At}: the payload writes a list where the schema reads no list`
        : Indexed<Payload> extends true
          ? KeysDisagreeing<Payload[keyof Payload], Schema[keyof Schema], `${At}[*]`>
          : TableKeysDisagreeing<Payload, Schema, At>

type TableKeysDisagreeing<Payload, Schema, At extends string> =
  | {
      [Key in keyof Payload & string]: Key extends keyof Schema
        ? KeysDisagreeing<Payload[Key], Schema[Key], `${At}.${Key}`>
        : `${At}.${Key}: the payload writes it and the schema does not admit it`
    }[keyof Payload & string]
  | {
      [Key in keyof Schema & string]: Key extends keyof Payload
        ? never
        : `${At}.${Key}: the schema admits it and the payload never writes it`
    }[keyof Schema & string]

type Disagreeing<Schema extends z.ZodType, Payload> = KeysDisagreeing<Payload, z.infer<Schema>, "">

export function assertSchemaKeysMatchPayload<Schema extends z.ZodType, Payload>(
  agreeing: [Disagreeing<Schema, Payload>] extends [never]
    ? true
    : { readonly [Each in Disagreeing<Schema, Payload>]: false }
): undefined {
  void agreeing
}
