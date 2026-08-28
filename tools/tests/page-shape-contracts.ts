import { SIZE_LG, SIZE_MD, SIZE_SM, SIZE_XS } from "../../page/document/tokens.ts"
import type { ContentRule, Fragment, SectionPart } from "../../page/document/shape-types.ts"

export const PRINCIPLE_CONTRACT: SectionPart = {
  part: "section",
  level: 2,
  heading: {
    match: "any",
    content: {
      maxChars: SIZE_XS,
      marks: null,
      lead: null,
      template: null,
    },
  },
  maxChars: "contents",
  cardinality: {
    least: 1,
    max: 12,
  },
  contains: [
    {
      part: "block",
      block: "paragraph",
      cardinality: {
        least: 1,
        max: 1,
      },
      content: {
        maxChars: SIZE_SM,
        marks: {
          every: "strong",
        },
        lead: null,
        template: null,
      },
    },
    {
      part: "block",
      block: "paragraph",
      cardinality: {
        least: 1,
        max: 1,
      },
      content: {
        maxChars: SIZE_MD,
        marks: null,
        lead: null,
        template: null,
      },
    },
  ],
}

export const SEQUENCE_CONTRACT: SectionPart = {
  part: "section",
  level: 1,
  heading: {
    match: "literal",
    text: "Sequence",
  },
  maxChars: "contents",
  cardinality: {
    least: 0,
    max: 1,
  },
  contains: [
    {
      part: "block",
      block: "list",
      ordered: true,
      cardinality: {
        least: 1,
        max: 1,
      },
      items: {
        least: 1,
        max: 12,
      },
      item: [
        {
          maxChars: SIZE_SM,
          marks: null,
          lead: null,
          template: [
            {
              slot: "hole",
              name: "stage",
              value: {
                type: "text",
                maxChars: SIZE_SM,
              },
              mark: "strong",
              optional: false,
            },
          ],
        },
      ],
      children: {
        least: 1,
        max: 15,
      },
      child: [
        {
          maxChars: SIZE_LG,
          marks: null,
          lead: null,
          template: null,
        },
      ],
    },
  ],
}

export const TASKS_CONTRACT: SectionPart = {
  part: "section",
  level: 1,
  heading: {
    match: "literal",
    text: "Tasks",
  },
  maxChars: "contents",
  cardinality: {
    least: 0,
    max: 1,
  },
  contains: [
    {
      part: "block",
      block: "list",
      ordered: false,
      cardinality: {
        least: 1,
        max: 1,
      },
      items: {
        least: 1,
        max: 10,
      },
      item: [
        {
          maxChars: SIZE_MD,
          marks: null,
          lead: null,
          template: [
            {
              slot: "hole",
              name: "task",
              value: {
                type: "docref",
                to: {
                  resolve: "path",
                },
              },
              mark: "strong",
              optional: false,
            },
            {
              slot: "literal",
              text: " — ",
              optional: false,
            },
            {
              slot: "hole",
              name: "guidance",
              value: {
                type: "text",
                maxChars: SIZE_MD,
              },
              mark: null,
              optional: false,
            },
          ],
        },
      ],
      children: null,
    },
  ],
}

export const LOOP_CONTRACT: SectionPart = {
  part: "section",
  level: 1,
  heading: {
    match: "literal",
    text: "Loop",
  },
  maxChars: "contents",
  cardinality: {
    least: 0,
    max: 1,
  },
  contains: [
    {
      part: "block",
      block: "list",
      ordered: true,
      cardinality: {
        least: 1,
        max: 1,
      },
      items: {
        least: 1,
        max: 12,
      },
      item: [
        {
          maxChars: SIZE_SM,
          marks: null,
          lead: null,
          template: [
            {
              slot: "hole",
              name: "stage",
              value: {
                type: "text",
                maxChars: SIZE_SM,
              },
              mark: "strong",
              optional: false,
            },
          ],
        },
      ],
      children: {
        least: 1,
        max: 15,
      },
      child: [
        {
          maxChars: SIZE_LG,
          marks: null,
          lead: null,
          template: null,
        },
      ],
    },
  ],
}

export const PRINCIPLE_FRAGMENT: Fragment = {
  name: "principles",
  parts: [
    {
      part: "section",
      level: 2,
      heading: {
        match: "any",
        content: {
          maxChars: SIZE_XS,
          marks: null,
          lead: null,
          template: null,
        },
      },
      maxChars: "contents",
      cardinality: {
        least: 1,
        max: 12,
      },
      contains: [
        {
          part: "block",
          block: "paragraph",
          cardinality: {
            least: 1,
            max: 1,
          },
          content: {
            maxChars: SIZE_SM,
            marks: {
              every: "strong",
            },
            lead: null,
            template: null,
          },
        },
        {
          part: "block",
          block: "paragraph",
          cardinality: {
            least: 1,
            max: 1,
          },
          content: {
            maxChars: SIZE_MD,
            marks: null,
            lead: null,
            template: null,
          },
        },
      ],
    },
  ],
}

export const GLOSS_ITEM_PAIR: readonly ContentRule[] = [
  {
    maxChars: "slots",
    marks: null,
    lead: null,
    template: [
      {
        slot: "hole",
        name: "handle",
        value: {
          type: "text",
          maxChars: SIZE_XS,
        },
        mark: "strong",
        optional: false,
      },
      {
        slot: "literal",
        text: " — ",
        optional: false,
      },
      {
        slot: "hole",
        name: "body",
        value: {
          type: "text",
          maxChars: SIZE_SM,
        },
        mark: null,
        optional: false,
      },
    ],
  },
  {
    maxChars: SIZE_MD,
    marks: {
      without: "strong",
    },
    lead: null,
    template: null,
  },
]

export const DOMAIN_SECTION_HEADINGS: readonly string[] = [
  "Definition",
  "Design",
  "Condition",
  "Intent",
  "Principles",
  "Rules",
]
