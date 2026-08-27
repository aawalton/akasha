import { buildOver } from "../../page/index/build.ts"
import { akashaRoot } from "../../repo/roots/roots.ts"

/**
 * Build the page index for whichever akasha root `AKASHA_ROOT` names, and say nothing.
 *
 * A CHILD PROCESS RATHER THAN A CALL, because `page/index/place/place.ts` works the index's place
 * out once and holds it for the life of the process. A test making one fixture after another would
 * write every one of their indexes into the first fixture's `.git`, and read them back out of a
 * directory its `dispose()` had already taken away.
 */
buildOver({ akasha: akashaRoot() })
