import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const uiPlaceModel = {
  id: "01a0c9f1-36c1-73df-8646-fa76a2dbda20",
  type: "page-type/lua-module",
  slug: "ui-place-model",
  definition: "where on the screen a control the sandbox holds sits",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A point on a control is a fraction of that control's width and height.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point is keyed by the number the game gives it rather than by a number here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control with one anchor takes the width and the height the control states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A label stating no width or no height takes that measure from its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Text is measured by the advance the game's own face gives each character, at its font's size.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line of text is as tall as its face's line, at its font's size.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The faces are the OpenType files the game ships beside its slug faces, kept in the art cache.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A placeholder in a font is filled from the game's font strings before it is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A label whose font names no face kept, or no size, refuses rather than being measured.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A character its face lacks is measured as that face's missing glyph, not by a backup face.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A label naming no font is measured as ZoFontGame, whose face is the game's fallback.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text is measured with the kerning the game gives each pair of characters.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's own slug faces hold no kerning, so the game draws its own faces unkerned.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The slug faces Temper ships hold the kerning of their GPOS tables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A label's text wraps at the last space that fits the label's width.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word wider than its label breaks at the last character that fits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A label stating no height is as tall as the lines its text wraps into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A label's lines stop at its greatest line count, and the rest are not shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A label wrapping with an ellipsis ends the last line shown in three full stops that fit.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "How a word breaks and what the ellipsis is are worked out here rather than measured from the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Markup in a label's text is measured as the words it shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control growing to fit what it holds is at least as wide and tall as its shown children span.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control with two anchors takes the width and the height those anchors leave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two anchors sharing a fraction leave that measure to what the control states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two anchors past each other leave the control no width or height, never less.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tooltip stating no width is as wide as its widest line unwrapped and its padding across.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control held to a size sits at its first anchor, and its second anchor gives way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control with no anchor sits at the top left of its parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control clamped to the screen is moved back inside the screen's edges.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An anchor to anything that is no control is answered with the screen's own corner.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control anchored to itself through a ring is answered with what it states once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This is loaded before the controls, so a control reaches it as a global.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing worked out here is kept between one call and the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Within one call, a control already placed is not placed again, unless its placing met a ring.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call that raises leaves no control marked as being placed.",
    },
  ],
} as const satisfies LuaModule
