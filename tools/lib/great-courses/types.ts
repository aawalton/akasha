export interface Course {
  readonly title: string
  readonly url: string
  readonly externalId: string
}

export interface Subject {
  readonly title: string
  readonly url: string
  readonly courses: readonly Course[]
}

export interface Episode {
  readonly title: string
  readonly lengthSeconds: number
  readonly episodeNumber: number
}

export interface CourseData {
  readonly courseId: string
  readonly title: string
  readonly episodes: readonly Episode[]
  readonly totalLengthSeconds: number
}

export interface CourseList {
  readonly courses: readonly Course[]
}

export interface SubjectList {
  readonly subjects: readonly Subject[]
}
