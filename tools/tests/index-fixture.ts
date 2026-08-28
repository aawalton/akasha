import { buildOver } from "../../page/index/build.ts"
import { akashaRoot } from "../../repo/roots/roots.ts"

/**
 * Build the page index for whichever akasha root `AKASHA_ROOT` names, and say nothing.
 *
 * A CHILD PROCESS RATHER THAN A CALL: the root is stated in the child's environment, so the build
 * runs against it without the calling process moving anything. `page/index/place/place.ts` works
 * the index's place out against whichever root is named when it is asked, so the index it writes
 * lands under that root.
 */
buildOver({ akasha: akashaRoot() })
