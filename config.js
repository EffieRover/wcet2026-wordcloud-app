// Edit this file once, then upload everything to GitHub Pages.
// See SETUP.md for where to find each value.

export const firebaseConfig = {
  apiKey: "AIzaSyC8-TMAPmhjWz_9sXJw4ArFb4OtMpVbsI4",
  authDomain: "wcet2026-wordcloud.firebaseapp.com",
  databaseURL: "https://wcet2026-wordcloud-default-rtdb.firebaseio.com",
  projectId: "wcet2026-wordcloud",
  appId: "1:159282886273:web:30cd006d0987c6b94c7f80"
};

// The question shown on attendees' phones and at the top of your screen.
export const PROMPT = "What tells you a student is struggling?";

// Keep in sync with the 30 in database.rules.json.
export const MAX_LEN = 30;

// Trim and squash repeated spaces.
export function collapse(text) {
  return String(text).replace(/\s+/g, " ").trim();
}

// Words merge when this key matches: capitalization and extra spaces are ignored.
// Output is safe to use as a Firebase key (letters, digits, underscores only).
export function keyFor(text) {
  return Array.from(collapse(text).toLowerCase())
    .map(ch => /[a-z0-9]/.test(ch) ? ch : "_" + ch.codePointAt(0).toString(16) + "_")
    .join("");
}
