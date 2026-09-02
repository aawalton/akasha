// HOW LONG THE ANSWER IS, SAID WHERE THE ANSWER IS NOT. A verb writes one JSON object to stdout
// and its caller parses it, and nothing in between checks that all of it arrived. So a pipe that
// closes early, or a child that stops writing and still exits 0, reaches the caller as a JSON
// syntax error at whatever byte it stopped on — which reads as a broken verb rather than a short
// read, and is the failure that looks like a success.
//
// A verb therefore states the size of its answer on stderr before writing the answer on stdout.
// The two never mix: stdout stays one JSON object and nothing else, so a human piping a verb into
// `jq` sees what it always saw. A caller holding both refuses by name when the numbers disagree,
// and says both numbers, which is what turns a silent short read into something diagnosable.
//
// SAID BEFORE THE ANSWER RATHER THAN AFTER, because a statement written after the answer is
// missing in exactly the case it exists for: the write that did not finish.
export const ANSWER_BYTES = "answer-bytes"

const SAID = `${ANSWER_BYTES}: `

// Says how long the answer is and then writes it. `text` is the whole of what goes to stdout.
export function sayAnswer(text: string): undefined {
  process.stderr.write(`${SAID}${Buffer.byteLength(text, "utf8")}\n`)
  process.stdout.write(text)
  return undefined
}

// The size a verb stated, or null where it stated none — a verb that does not say, or one that
// failed before it had an answer to say anything about. A caller finding none checks nothing,
// which is where every caller stood before this existed.
export function answerBytesSaid(stderr: string): number | null {
  let said: number | null = null
  for (const line of stderr.split("\n")) {
    if (!line.startsWith(SAID)) continue
    const stated = Number(line.slice(SAID.length).trim())
    if (Number.isInteger(stated) && stated >= 0) said = stated
  }
  return said
}
