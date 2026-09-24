import { describe, expect, test } from "bun:test"
import {
  timelinesIn,
  timelinesLua,
} from "akasha/temper/eso/ui-harness/modules/ui-timelines/ui-timelines.module.code.ts"

const TIMELINES = `<GuiXml>
    <Animations>
        <AnimationTimeline name="SparkleStarburstAnim">
            <Animations>
                <TextureRotateAnimation duration="750" startRotation="0"/>
                <AlphaAnimation duration="75" startAlpha="0.0" endAlpha="1.0"/>
            </Animations>
        </AnimationTimeline>
        <AnimationTimeline name="NothingInIt"/>
        <AnimationTimeline name="AfterTheEmptyOne">
            <Animations>
                <ScaleAnimation duration="100"/>
            </Animations>
        </AnimationTimeline>
    </Animations>
</GuiXml>`

describe("timelinesIn", () => {
  test("reads each timeline's animations in the order written", () => {
    expect(timelinesIn([TIMELINES]).SparkleStarburstAnim).toEqual([
      "TextureRotateAnimation",
      "AlphaAnimation",
    ])
  })

  test("reads a timeline closed at once as empty, and the next one as its own", () => {
    const timelines = timelinesIn([TIMELINES])
    expect(timelines.NothingInIt).toEqual([])
    expect(timelines.AfterTheEmptyOne).toEqual(["ScaleAnimation"])
  })
})

describe("timelinesLua", () => {
  test("hands every timeline over in one call", () => {
    const lua = timelinesLua(timelinesIn([TIMELINES]))
    expect(lua.startsWith("__ui_timelines({")).toBe(true)
    expect(lua).toContain('["AfterTheEmptyOne"] = { "ScaleAnimation" }')
  })
})
