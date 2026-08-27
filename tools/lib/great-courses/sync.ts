import {
  classifyError,
  combineSyncResults,
  logError,
  type SyncResult,
  toError,
} from "../sync-run/result.ts"
import { extractExternalIdFromUrl, getCatalogData } from "./catalogue.ts"
import { mapCourseToSubjects } from "./course-mapping.ts"
import { findAllCourses } from "./courses-query.ts"
import { createCourse } from "./create-course.ts"
import { pageTitled, textAt } from "./page-query.ts"
import { shouldRunGreatCoursesSync, updateRootParentLastSyncedAt } from "./root-parent-query.ts"
import { findSubjectCollections } from "./subject-collections-query.ts"

const GREAT_COURSES_COLLECTION_SLUG = "great-courses-collection"
const ALL_GREAT_COURSES_TITLE = "All Great Courses"

const NOTHING_DONE: SyncResult = { created: 0, updated: 0, skipped: 0, failed: 0 }

let allGreatCoursesParentSlug: string | null = null

async function getAllGreatCoursesParentSlug(): Promise<string> {
  if (allGreatCoursesParentSlug != null) return allGreatCoursesParentSlug
  const page = await pageTitled(GREAT_COURSES_COLLECTION_SLUG, ALL_GREAT_COURSES_TITLE, [])
  const slug = page === null ? null : textAt(page, "slug")
  if (slug == null) throw new Error(`${ALL_GREAT_COURSES_TITLE} collection not found`)
  allGreatCoursesParentSlug = slug
  return slug
}

export async function syncGreatCourses(): Promise<SyncResult> {
  try {
    console.log("Starting Great Courses sync...")

    if (!(await shouldRunGreatCoursesSync())) return NOTHING_DONE

    const parentSlug = await getAllGreatCoursesParentSlug()

    let created = 0
    let skipped = 0
    let failed = 0

    const existingCourses = await findAllCourses()
    const { courses: courseList, subjects: subjectList } = await getCatalogData()

    if (courseList.courses.length === 0) {
      console.log("No courses found to process")
      return NOTHING_DONE
    }

    const subjectCollectionsMap = await findSubjectCollections()

    const newCourses = courseList.courses.filter((course) => {
      const externalId =
        course.externalId !== "" ? course.externalId : extractExternalIdFromUrl(course.url)
      return !existingCourses.has(externalId)
    })

    const skippedCount = courseList.courses.length - newCourses.length

    if (newCourses.length === 0) {
      console.log("No new courses to process")
      skipped = skippedCount
    } else {
      const results: SyncResult[] = []

      for (let i = 0; i < newCourses.length; i++) {
        const course = newCourses[i]
        if (!course) continue
        console.log(`Course ${i + 1}/${newCourses.length}: ${course.title}`)

        try {
          const parents = mapCourseToSubjects(
            course,
            subjectList.subjects,
            subjectCollectionsMap,
            parentSlug
          )
          results.push(await createCourse(course, parents))
        } catch (thrown) {
          const err = toError(thrown)
          logError("Course creation", course.title, err, classifyError(err))
          results.push({ created: 0, updated: 0, skipped: 0, failed: 1 })
        }
      }

      const totalResult = combineSyncResults(results)
      created = totalResult.created
      skipped = totalResult.skipped + skippedCount
      failed = totalResult.failed
    }

    console.log(
      `Summary: created=${created} updated=0 skipped=${skipped} failed=${failed} total=${created + skipped + failed}`
    )

    await updateRootParentLastSyncedAt()

    console.log("Great Courses sync completed!")
    return { created, updated: 0, skipped, failed }
  } catch (thrown) {
    const err = toError(thrown)
    logError("Great Courses sync", "main sync", err, classifyError(err))
    throw thrown
  }
}
