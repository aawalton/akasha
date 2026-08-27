

import {
  booleanShape,
  coerceNumber,
  enumOf,
  json,
  literal,
  numberShape,
  stringShape,
  unknownShape,
} from "./shape-scalar.ts"
import {
  array,
  discriminatedUnion,
  looseObject,
  object,
  record,
  tuple,
  union,
} from "./shape-object.ts"

export const shape = {
  string: stringShape,
  number: numberShape,
  boolean: booleanShape,
  unknown: unknownShape,
  literal,
  enum: enumOf,
  object,
  looseObject,
  array,
  tuple,
  record,
  union,
  discriminatedUnion,
  json,
  coerce: { number: coerceNumber },
} as const
