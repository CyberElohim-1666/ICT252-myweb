# Nelson Phiri - Interactive Personal Website

ICT251 Web Technologies, Activity 3, Mulungushi University, 2026.
This portfolio extends my Activity 2 site using plain HTML, external CSS and JavaScript. It retains my About Me paragraph, three hobbies, learning steps and weekly table, three original photos, introduction video and hobby audio. It adds a skills section, responsive layouts and four interactive features.

Repository: https://github.com/CyberElohim-1666/ICT252-myweb

The existing repository name contains ICT252; this assignment and the website refer to ICT251.

## Files

```text
index.html
README.md
css/styles.css
js/script.js
images/photo1.jpg
images/photo2.jpg
images/photo3.jpg
images/favicon.svg
videos/intro.mp4
videos/voice.mp3
```

All local URLs are relative and case-sensitive. There is no build step, framework, backend or database. The original images and recordings are unchanged. Activity backups belong outside the website folder and must not be uploaded with the site.

## Run locally

1. Open the `myweb` folder in VS Code.
2. With the Live Server extension installed, right-click `index.html` and choose **Open with Live Server**.
3. Open browser developer tools and check Console and Network for errors or missing files.
4. Test at approximately 375 px and 1280 px viewport widths. Text, navigation, fields and media must remain usable without sideways page scrolling.

## Four JavaScript features and their tests

| Feature | How to test | Expected result |
| --- | --- | --- |
| Contact validation and preview (compulsory) | Submit an empty form; try names/messages containing only spaces; try `bad-email`, `name@` and `name@example`; then use a name, `student@example.com` and a message. | Invalid fields receive nearby feedback and focus goes to the first error. Valid details appear on the page without a reload. The form explicitly says that data was validated and **no message was sent**. |
| Gallery viewer | Click Previous on photo 1, Next on photo 3, and click repeatedly in both directions. | Previous wraps to photo 3; Next wraps to photo 1. The displayed image, caption, counter and announced status stay in sync. |
| Skills search | Search `HTML`, `CSS`, `validation`, mixed-case text, whitespace and an unmatched word. Press Reset search. | Matching cards are shown; an empty-results message explains how to recover. Empty/whitespace searches and Reset show all three skills. |
| Theme switch | Use Dark mode, then Light mode; repeat and reload. | Colours and button state change. Both themes stay readable. The preference is saved when local storage is available; blocked storage does not break the switch. |

Additional form checks: edit after a valid preview (the stale preview disappears), resubmit, and use Clear form (fields, errors and preview clear). Text such as `<b>Hello</b>` must appear literally, never as HTML. The implementation uses `event.preventDefault()` and `textContent`; entered contact data is neither stored nor transmitted. Required attributes and labels remain in the HTML. The preview button is disabled without JavaScript so the demo cannot accidentally submit contact details.

Use Tab and Shift+Tab to navigate. A visible outline identifies the focused control. Check the skip link, section links, search, gallery buttons, media controls, theme switch and all contact controls. The menu remains visible at narrow widths without needing JavaScript. Without JavaScript all three photos and all skills remain visible.

## GitHub and Render deployment

Upload the **contents** of `myweb` to the repository so `index.html` is at its root. Keep the `css`, `js`, `images` and `videos` folders. Keep the repository accessible to the lecturer. Suggested commit message: `Enhance Activity 2 portfolio for ICT251 Activity 3`.

In Render, connect this GitHub repository and create a **Static Site** with:

| Setting | Value |
| --- | --- |
| Branch | `main` (or the branch holding the final files) |
| Root Directory | Leave blank when `index.html` is at the root |
| Build Command | `echo "No build required"` |
| Publish Directory | `.` |
| Auto Deploy | Enabled for the selected branch |

If the website is in a subfolder, use that folder as Root Directory and keep Publish Directory as `.`. Wait for Live status, then open the public HTTPS `onrender.com` URL. A local check does not establish that deployment worked.

After the first successful deployment, make one small meaningful improvement (for example, clarify a skill description), commit it to the same branch, wait for automatic redeployment, and verify the change at the same URL. Do this **after** the initial deployment, as required by Part E.6.

## Live checks before submission

- Open the Render URL in a private browser window and try every section link.
- Repeat the four feature tests above on the deployed website.
- Check 375 px and 1280 px widths in both themes.
- Confirm all photos load and both recordings play and pause.
- Check keyboard focus, Console errors and missing network requests.
- Ask a classmate to test without guidance, and fix the problems they find.
- Submit the live Render URL through the course platform. The PDF gives a deadline of **9 October 2026 at 23:59**.

## Sources and assistance

- `ICT251_Activity_3_2026.pdf`: assignment requirements and deployment settings.
- Nelson Phiri's original Activity 2 `myweb` folder: personal biography, hobbies, learning plan, photographs and recordings.
- Activity 3 implementation and checks were prepared with Codex coding assistance. Review the HTML, CSS and commented JavaScript so you can explain how each feature works, and follow your course's rules on acknowledging assistance.
- No third-party template, JavaScript library, external font, stock photograph or remotely loaded asset is used by the website. The initials favicon is a small local SVG.

The original Activity 2 media summaries are retained; compare their wording with your recordings before submission. Live deployment, redeployment and classmate testing must be completed separately from local verification.
