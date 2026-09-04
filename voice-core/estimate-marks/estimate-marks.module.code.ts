import type { SentenceMark } from "../mark-schema/mark-schema.module.code.ts"
import {
  buildKokoroSpeechInput,
  buildKokoroSpeechSegments,
  splitSentences,
} from "../speech/speech.module.code.ts"

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x
}

export function estimateSentenceMarks(
  sentences: readonly string[],
  segments: readonly string[],
  segmentDurationsSec: readonly number[]
): readonly SentenceMark[] {
  if (segments.length !== segmentDurationsSec.length) return []
  if (segments.length === 0 || sentences.length === 0) return []

  const segStartChar: number[] = new Array(segments.length)
  const segCumSec: number[] = new Array(segments.length)
  let charAcc = 0
  let secAcc = 0
  for (let k = 0; k < segments.length; k++) {
    segStartChar[k] = charAcc
    segCumSec[k] = secAcc
    charAcc += (segments[k]?.length ?? 0) + 1
    secAcc += segmentDurationsSec[k] ?? 0
  }
  const lastIdx = segments.length - 1
  const contentEndChar = (segStartChar[lastIdx] ?? 0) + (segments[lastIdx]?.length ?? 0)

  const marks: SentenceMark[] = []
  let sentenceStartChar = 0
  let k = 0
  for (let i = 0; i < sentences.length; i++) {
    if (sentenceStartChar >= contentEndChar) break
    while (k + 1 < segments.length && (segStartChar[k + 1] ?? 0) <= sentenceStartChar) k++
    const segLen = segments[k]?.length ?? 0
    const offsetInSeg = sentenceStartChar - (segStartChar[k] ?? 0)
    const frac = segLen > 0 ? clamp01(offsetInSeg / segLen) : 0
    const startSec = (segCumSec[k] ?? 0) + frac * (segmentDurationsSec[k] ?? 0)
    marks.push({ sentenceIndex: i, startSec })
    sentenceStartChar += (sentences[i]?.length ?? 0) + 1
  }
  return marks
}

export function estimateChapterSentenceMarks(
  body: string,
  segmentDurationsSec: readonly number[]
): readonly SentenceMark[] {
  const sentences = splitSentences(buildKokoroSpeechInput(body))
  const segments = buildKokoroSpeechSegments(body)
  return estimateSentenceMarks(sentences, segments, segmentDurationsSec)
}

const KOKORO_SEC_PER_CHAR = 0.0576

function estimateSegmentDurationsFromChars(segments: readonly string[]): readonly number[] {
  return segments.map((s) => s.length * KOKORO_SEC_PER_CHAR)
}

export function estimateChapterSentenceMarksFromN(
  body: string,
  opts: { readonly fromSentenceIndex: number; readonly segmentDurationsSec?: readonly number[] }
): readonly SentenceMark[] {
  const from = Math.max(0, Math.trunc(opts.fromSentenceIndex))
  const allSentences = splitSentences(buildKokoroSpeechInput(body))
  const sentences = from > 0 ? allSentences.slice(from) : allSentences
  const segments = buildKokoroSpeechSegments(body, { fromSentenceIndex: from })
  const durations = opts.segmentDurationsSec ?? estimateSegmentDurationsFromChars(segments)
  const local = estimateSentenceMarks(sentences, segments, durations)
  if (from === 0) return local
  return local.map((m) => ({ sentenceIndex: m.sentenceIndex + from, startSec: m.startSec }))
}
