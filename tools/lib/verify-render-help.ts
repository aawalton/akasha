import type { CommandHelp } from "../ops/surface.ts"

export const DEFAULT_TIMEOUT_MS = 60_000

export const help: CommandHelp = {
  verdict: "emits",
  positionals: [
    {
      name: "url",
      required: false,
      aliasOfFlag: "--url",
      description: "Deployed base URL to verify against, e.g. https://alanwalton.com",
    },
  ],
  flags: [
    {
      name: "--url",
      argLabel: "<deployed-base>",
      valueShape: "token",
      required: true,
      description:
        "Deployed base URL to verify against, e.g. https://alanwalton.com " +
        "(every hostname is declared in a `tunnel-routes.ts` file in the code repository). " +
        "Must be a deployed " +
        "domain, not localhost — the session cookie is origin-scoped.",
    },
    {
      name: "--path",
      argLabel: "<route>",
      valueShape: "token",
      required: true,
      description: "Route under --url to navigate, e.g. /story/the-apology-1a2b3c4d.",
    },
    {
      name: "--page-type",
      argLabel: "<slug>",
      valueShape: "token",
      required: true,
      description:
        "Page-type slug of the route's content (e.g. story, story-chapter, " +
        "project). Recorded in the report; the verdict never keys on it, so a " +
        "mistyped or copy-pasted slug cannot change the outcome.",
    },
    {
      name: "--expect-text",
      argLabel: "<string>",
      valueShape: "prose",
      description:
        "A known string that must appear in the render to prove the page's data " +
        "rendered. One discriminating signal is required for EVERY page type — " +
        "this, --expect-count, or --expect-attr. No slug waives it.",
    },
    {
      name: "--expect-title",
      argLabel: "<string>",
      valueShape: "prose",
      description:
        "Expected tab title, asserted on two legs. DOM leg: document.title must " +
        "equal it exactly; the probe WAITS (up to --timeout-ms) for the match, so " +
        "a client-set title is deterministic, never a first-probe race. " +
        "Initial-HTML leg: the navigation response HTML must already carry a " +
        "<title> containing it — SSR-ONLY BY DESIGN (the cold-load server " +
        "document, before any client JS): a title rendered only client-side " +
        "always fails this leg, because it leaves the cold-load tab showing the " +
        "raw URL until hydration.",
    },
    {
      name: "--root-selector",
      argLabel: "<sel>",
      valueShape: "token",
      default: "main",
      description: "CSS selector for the app root/shell element. Default `main`.",
    },
    {
      name: "--hydration-selector",
      argLabel: "<sel>",
      valueShape: "token",
      description:
        "CSS selector present ONLY on the hydrated surface of a client-store-gated " +
        'SPA (e.g. the idle game\'s Lineup/Roster tab, `[role="tab"]`), not on its ' +
        "pre-hydration shell. When set, the settle-wait waits for this marker " +
        "(outranking --expect-text / root-populated) so the snapshot observes the " +
        "hydrated UI, not the 'Loading…' / 'No save yet.' shell that root-populated " +
        "would false-settle on.",
    },
    {
      name: "--expect-count-selector",
      argLabel: "<sel>",
      valueShape: "token",
      description:
        "CSS selector for a count assertion: the render must contain exactly " +
        "--expect-count matching elements. Pair with --expect-count. Catches a " +
        "duplicate-render regression (e.g. a card shown twice) that a text check " +
        "misses. A count assertion is a discriminating signal.",
    },
    {
      name: "--expect-count",
      argLabel: "<n>",
      valueShape: "token",
      description:
        "Exact number of elements --expect-count-selector must match (>= 0). " +
        "Requires --expect-count-selector; ignored without it.",
    },
    {
      name: "--expect-attr-selector",
      argLabel: "<sel>",
      valueShape: "token",
      description:
        "CSS selector for an attribute/class-value assertion: the FIRST matching " +
        "element's --expect-attr must satisfy --expect-attr-value. Pair with " +
        "--expect-attr and --expect-attr-value. Catches a restyle regression (e.g. " +
        "a muted variant class) that presence/text checks miss. A discriminating " +
        "signal.",
    },
    {
      name: "--expect-attr",
      argLabel: "<name>",
      valueShape: "token",
      description:
        "Attribute name to read on the --expect-attr-selector element (e.g. class, " +
        "aria-disabled). Requires --expect-attr-selector and --expect-attr-value.",
    },
    {
      name: "--expect-attr-value",
      argLabel: "<value>",
      valueShape: "token",
      description:
        "Expected value for --expect-attr. In the default `equals` mode the whole " +
        "attribute value must match; in `contains-token` mode it must appear as a " +
        "whole whitespace-delimited token (so `muted` matches `btn muted`).",
    },
    {
      name: "--expect-attr-mode",
      argLabel: "<equals|contains-token>",
      valueShape: "token",
      default: "equals",
      description:
        "How --expect-attr-value is compared: `equals` (exact whole value) or " +
        "`contains-token` (whole-token containment, for class lists). Default equals.",
    },
    {
      name: "--as-throwaway",
      description:
        "Sign in read-only as the isolated throwaway BROWSER_TEST_* user instead of " +
        "Alan's live identity. The hydrated-content verify path: the throwaway owns " +
        "its own rows, so its owner-gated data renders without touching Alan's. " +
        "Nothing here seeds those rows — they have to be there already. Reads the " +
        "throwaway BROWSER_TEST_* env, not the real-user env.",
    },
    {
      name: "--no-sign-in",
      description:
        "Skip the sign-in form entirely and verify with an anonymous read-only " +
        "session. For no-auth apps that serve owner-owned data via server-side " +
        "service-role reads and have no /sign-in route. No real-user " +
        "credentials are read. A discriminating signal is still required.",
    },
    {
      name: "--sign-in-path",
      argLabel: "<path>",
      valueShape: "token",
      default: "/sign-in",
      description: "Path the app serves its sign-in form at. Default `/sign-in`.",
    },
    {
      name: "--timeout-ms",
      argLabel: "<n>",
      valueShape: "token",
      default: String(DEFAULT_TIMEOUT_MS),
      description: "Per-navigation timeout in milliseconds. Default 60000.",
    },
    { name: "--json", description: "Emit a JSON envelope instead of the anchored verdict line." },
  ],
  envVars: [
    {
      name: "BROWSER_TEST_URL",
      required: true,
      description: "Any app URL (parsed by the env reader; overridden by --url).",
    },
    {
      name: "BROWSER_TEST_REAL_USER_EMAIL",
      required: false,
      description: "Alan's real Supabase email (default read-only live identity).",
    },
    {
      name: "BROWSER_TEST_REAL_USER_PASSWORD",
      required: false,
      description: "Alan's real Supabase password (default path). Secret — never echoed.",
    },
    {
      name: "BROWSER_TEST_EMAIL",
      required: false,
      description: "Throwaway user email (--as-throwaway path).",
    },
    {
      name: "BROWSER_TEST_PASSWORD",
      required: false,
      description: "Throwaway user password (--as-throwaway path). Secret — never echoed.",
    },
    { name: "SUPABASE_URL", required: true, description: "Supabase project URL." },
    { name: "SUPABASE_ANON_KEY", required: true, description: "Supabase anon key." },
    {
      name: "SUPABASE_SERVICE_ROLE_KEY",
      required: false,
      description: "Service-role key (read by the throwaway env reader; --as-throwaway path).",
    },
  ],
  exits: [
    { code: 0, meaning: "the render was observed healthy" },
    {
      code: 1,
      meaning:
        "usage error (no discriminating signal, or a localhost --url), " +
        "or a genuine session failure (bad credentials / missing session env) — never a retryable state",
    },
    {
      code: 2,
      meaning:
        "a TERMINAL broken render: owner-owned settled-but-empty / 404 / " +
        "sign-in wall / 5xx / missing expected text / count or attr mismatch (DataError; " +
        "also missing session credential env). Loud and not retryable.",
    },
    {
      code: 3,
      meaning:
        "a content-settle / navigation TIMEOUT with no positive " +
        "broken signal: the expected content had not appeared within --timeout-ms, OR a " +
        "sign-in / session-open TIMEOUT (the sign-in page had not hydrated within --timeout-ms; " +
        "#15716) (OperationalError). Under load a healthy page hydrates slowly, so this is " +
        "retryable with a longer budget rather than a FAIL.",
    },
  ],
  examples: [
    "ops browser-test verify-render --url https://alanwalton.com --path /story/the-apology-1a2b3c4d --page-type story --expect-text-file ./expect-text.txt",
    "ops browser-test verify-render --url https://alanwalton.com --path /game/the-tower-1a2b3c4d --page-type game --expect-text-file ./expect-text.txt",
  ],
}
