import { classifyError, logError, safeUpdateResult, type SyncResult, toError } from "../sync-run/result.ts"
import type { Course } from "./types.ts"

const GREAT_COURSE_SLUG = "great-course"

// A COURSE IS MADE AS A WHOLE PAGE, AND NOTHING WRITES ONE FROM ITS KEYS. `writePage` has refused
// every call since 4c1f05a264: the store writes a path and a whole body, and nothing renders a
// page's body out of the keys it carries. This built thirteen of those keys and handed them over
// to be refused, so no course has been created since that commit.
//
// It fetched the course's whole detail page from the Great Courses catalogue first — every
// episode, to count them — and threw that answer away on the refusal. The sync runs daily at
// 07:35, so refusing before the fetch stops a request a day that could never be used. Making a
// course again means composing its body and landing it with `writeFiles`, or going through the
// akasha command line.
const NO_RENDER =
  "the store writes a path and a whole body, and nothing renders a `great-course` page's body out of the keys carried here, so this course cannot become a file. compose the body and land it with `writeFiles`, or create it through the akasha command line"

export async function createCourse(
  course: Course,
  _parents: readonly string[]
): Promise<SyncResult> {
  const err = toError(new Error(`\`${GREAT_COURSE_SLUG}\` did not land: ${NO_RENDER}`))
  logError("Course creation", course.title, err, classifyError(err))
  return safeUpdateResult(err)
}
