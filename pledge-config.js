// Settings for the closing "one thing I will do" wall.
// Firebase values come from config.js, so there is nothing to paste here.

export { firebaseConfig } from "./config.js";

// The question shown on phones and pinned at the top of the big screen.
export const PLEDGE_PROMPT = "What is one thing you intend to do with your institution?";

// Keep in sync with the 140 in database.rules.json.
export const PLEDGE_MAX_LEN = 140;

// Trim and squash repeated spaces and line breaks.
export function collapse(text) {
  return String(text).replace(/\s+/g, " ").trim();
}
