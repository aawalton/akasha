// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses when it is used; importing it does not throw.
import { goneRecord } from "../../graph-gone.ts"

export type FileKindNodeType = unknown

export const FILE_KIND_FACTS = goneRecord("FILE_KIND_FACTS")
