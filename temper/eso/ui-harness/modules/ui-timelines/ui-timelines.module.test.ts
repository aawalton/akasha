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

const INHERITED = `<GuiXml>
    <Animations>
        <AnimationTimeline name="Base">
            <Animations>
                <AlphaAnimation duration="700"/>
                <AlphaAnimation duration="200">
                    <OnStop>self:GetTimeline():Stop()</OnStop>
                </AlphaAnimation>
            </Animations>
        </AnimationTimeline>
        <AnimationTimeline name="Burst">
            <Animations>
                <TextureRotateAnimation duration="750"/>
            </Animations>
        </AnimationTimeline>
        <AnimationTimeline name="Result" inherits="Base">
            <Animations>
                <!-- Burst1 -->
                <AlphaAnimation inherits="FadeIn"/>
                <AnimationTimeline inherits="Burst"/>
                <AnimationTimeline>
                    <Animations>
                        <ScaleAnimation duration="100"/>
                    </Animations>
                </AnimationTimeline>
                <TranslateAnimation duration="10"/>
            </Animations>
        </AnimationTimeline>
    </Animations>
</GuiXml>`

describe("timelinesIn", () => {
  test("reads each timeline's animations in the order written", () => {
    expect(timelinesIn([TIMELINES]).SparkleStarburstAnim).toEqual({
      animations: ["TextureRotateAnimation", "AlphaAnimation"],
      timelines: [],
    })
  })

  test("reads a timeline closed at once as empty, and the next one as its own", () => {
    const timelines = timelinesIn([TIMELINES])
    expect(timelines.NothingInIt).toEqual({ animations: [], timelines: [] })
    expect(timelines.AfterTheEmptyOne?.animations).toEqual(["ScaleAnimation"])
  })

  test("puts the animations a timeline inherits before its own", () => {
    expect(timelinesIn([INHERITED]).Result?.animations).toEqual([
      "AlphaAnimation",
      "AlphaAnimation",
      "AlphaAnimation",
      "TranslateAnimation",
    ])
  })

  test("keeps a timeline nested in another apart from its animations", () => {
    expect(timelinesIn([INHERITED]).Result?.timelines).toEqual([
      { animations: ["TextureRotateAnimation"], timelines: [] },
      { animations: ["ScaleAnimation"], timelines: [] },
    ])
  })
})

describe("timelinesLua", () => {
  test("hands every timeline over in one call", () => {
    const lua = timelinesLua(timelinesIn([TIMELINES]))
    expect(lua.startsWith("__ui_timelines({")).toBe(true)
    expect(lua).toContain('["AfterTheEmptyOne"] = { "ScaleAnimation" }')
  })
})
