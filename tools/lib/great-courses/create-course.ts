import { writePage } from "@shared/pages-query"
import { classifyError, logError, safeUpdateResult, type SyncResult, toError } from "../sync-run/result.ts"
import { extractExternalIdFromUrl, getCourseDetails } from "./catalogue.ts"
import { slugFor, WRITER } from "./page-query.ts"
import type { Course } from "./types.ts"

const GREAT_COURSE_SLUG = "great-course"
const SOURCE = "the-great-courses"
const WORDS_PER_MINUTE = 250
const SECONDS_PER_MINUTE = 60

function secondsToWords(seconds: number): number {
  return (seconds * WORDS_PER_MINUTE) / SECONDS_PER_MINUTE
}

export async function createCourse(
  course: Course,
  parents: readonly string[]
): Promise<SyncResult> {
  try {
    const externalId =
      course.externalId !== "" ? course.externalId : extractExternalIdFromUrl(course.url)
    const courseDetails = await getCourseDetails(course, externalId)

    const totalDurationInWords = secondsToWords(courseDetails.totalLengthSeconds)
    const episodeCount = courseDetails.episodes.length
    const weight = episodeCount > 0 ? totalDurationInWords / episodeCount : 0
    const slug = slugFor(courseDetails.title)

    const written = await writePage(
      GREAT_COURSE_SLUG,
      slug,
      {
        title: courseDetails.title,
        slug,
        externalId,
        externalLink: course.url,
        source: SOURCE,
        unit: "minutes",
        position: 0,
        ownLength: episodeCount,
        ownProgress: 0,
        status: "not-started",
        rank: "not-ranked",
        partOf: parents,
      },
      WRITER
    )
    if (!written.ok) throw new Error(written.why)

    console.log(
      `Created course: ${courseDetails.title} (${episodeCount} lectures, ${weight.toLocaleString()} words/episode)`
    )

    return { created: 1, updated: 0, skipped: 0, failed: 0 }
  } catch (thrown) {
    const err = toError(thrown)
    logError("Course creation", course.title, err, classifyError(err))
    return safeUpdateResult(err)
  }
}
