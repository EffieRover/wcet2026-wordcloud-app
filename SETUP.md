# Word Cloud Setup

Two pages, one shared database.

- `index.html` is the phone page attendees reach by QR code.
- `presenter.html` is your screen. Tap a word to cross it out, tap again to bring it back.
- `config.js` holds your Firebase values and the question text.
- `database.rules.json` is the lock: anyone can add words, only your Google account can strike them.

Everything below is a one-time setup, about 20 minutes.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com and sign in with the Google account you'll present with.
2. Click **Create a project**, name it (for example `wcet-wordcloud`), and turn Google Analytics off.

## 2. Create the database

1. Left menu: **Build > Realtime Database > Create Database**.
2. Pick the default location.
3. Choose **Start in locked mode**.
4. Copy the database URL shown at the top of the Data tab (it looks like `https://something-default-rtdb.firebaseio.com`). You need it in step 5.

## 3. Paste the rules

1. In Realtime Database, open the **Rules** tab.
2. Delete what's there and paste the contents of `database.rules.json`.
3. Replace `YOUR_EMAIL_HERE` with your Google email address, all lowercase, exactly as you sign in.
4. Click **Publish**.

## 4. Turn on Google sign-in

1. **Build > Authentication > Get started**.
2. **Sign-in method > Google > Enable**, pick a support email, save.

## 5. Register the web app and fill in config.js

1. Click the gear icon, then **Project settings**.
2. Under **Your apps**, click the web icon (`</>`), give it a nickname, skip Firebase Hosting, register.
3. Copy the config values it shows into `config.js`: `apiKey`, `authDomain`, `projectId`, `appId`.
4. Set `databaseURL` to the URL from step 2.
5. Optional: change `PROMPT` in `config.js` to reword the question.

The apiKey is not a secret. The rules in step 3 are what protect your data.

## 6. Put it on GitHub Pages

1. Create a new **public** repository on GitHub.
2. Upload `index.html`, `presenter.html`, `config.js`, and this file to the top level of the repo. (`database.rules.json` is optional there.)
3. Repo **Settings > Pages > Build and deployment**: Source is **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. After a minute or two, your pages are live:
   - Phones: `https://YOURUSERNAME.github.io/REPONAME/`
   - Presenter: `https://YOURUSERNAME.github.io/REPONAME/presenter.html`

## 7. Authorize your GitHub address for sign-in

Without this, the Google popup fails.

1. Firebase console: **Authentication > Settings > Authorized domains > Add domain**.
2. Add `YOURUSERNAME.github.io` (just the domain, no path).

## 8. Test run (do this on a different day than the talk)

1. Open the presenter page on your laptop, click **Sign in with Google**, finish the popup.
2. Open the phone page on two or three phones using **cell data, not Wi-Fi**.
3. Submit words, including repeats with different capitalization (`Late` and `late` should merge and grow).
4. Tap words on the presenter page. They should get a line through them and a lighter look. Tap again to bring one back.
5. Have a friend on a phone try the presenter URL without signing in. Tapping should do nothing but show a message.

## 9. Clear the test data

Easiest: sign in on `presenter.html` and click **Reset (erase all words)** at the bottom, then click it again within 5 seconds to confirm. This erases every word and every strike. (The rules must include the owner-delete lines for this to work, so publish the latest `database.rules.json` first.)

Or by hand: Firebase console > Realtime Database > Data. Hover over `submissions`, click the red X to delete it, then do the same for `struck`. Do this the day before the talk, and again right before if you test again.

## 10. After the talk: lock it

In the Rules tab, change this line:

```
".write": "!data.exists() && newData.exists()",
```

to:

```
".write": false,
```

and Publish. Phones can no longer add words, and the cloud stays readable.

## Day-of checklist

- Sign in on the presenter page on your own Wi-Fi before you walk up. Test a strike, then un-strike it.
- If you tested that morning, clear `submissions` and `struck` (step 9).
- Keep your phone nearby in case Google asks for a verification code.
- Put the QR code (it points to the phone page URL) on a slide. Test the scan on both an iPhone and an Android, and make the code big.
- Ask the room a quick "can everyone scan it?" before round one starts.

## How it behaves

- Words merge when they match after ignoring capitalization and extra spaces. `Late` and `  late ` are one word. `late work` stays its own phrase.
- Bigger means more people said it.
- Max 30 characters per entry, enforced on the phone and in the database rules.
- Strikes are shared. If you open the presenter page on a second device, the struck words show there too.
- Attendees cannot delete or change anything, only add.

## Troubleshooting

- **Phone says "Not sent":** usually the database URL in `config.js` is wrong, or the rules were not published.
- **Sign-in popup closes or errors:** check step 7 (authorized domain) and that your browser allows the popup.
- **Tapping a word shows "Could not save that":** the email in the rules doesn't match the Google account you signed in with. Check spelling and lowercase.
- **Page loads but cloud stays empty:** open the browser console (F12) and look for a red error. The most common one is a typo in `config.js`.

## Putting the live cloud on a PowerPoint slide

Use `view.html`, not `presenter.html`. It is read-only (no sign-in, no tapping), so it works inside embedded browsers, and it updates live as you strike words in `presenter.html`.

- Address to embed: `https://YOURUSERNAME.github.io/REPONAME/view.html`
- Add `?title=1` to the end of the address to show the question above the cloud.
- In PowerPoint, use a web-page add-in (Insert > Get Add-ins, search "Web Viewer" or "LiveWeb") and paste that address. Add-in availability varies, so test it well before the talk, in slideshow mode, on the laptop and Wi-Fi you will use.
- Keep `presenter.html` open in a separate browser window. Tap words there; they strike on the slide within a second or so.
- Backups: Alt+Tab to the browser window, or screenshot the final cloud and paste it onto a slide.
