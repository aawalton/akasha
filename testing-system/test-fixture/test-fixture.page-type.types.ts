import type { Code } from "akasha/code/modules/properties/code.code-file-property.types.ts"
import type { Test } from "akasha/code/modules/properties/test.code-file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type TestFixture = Domain & {
  code: Code
  test?: Test
}
