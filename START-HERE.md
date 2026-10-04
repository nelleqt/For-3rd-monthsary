# Your Spider-Man Monthsary Webpage — VS Code Guide

This project follows your PDF: greeting → three questions → monthsary password → first-chat reveal → Happy 3rd Monthsary → photo presentation → sweet message → Ecclesiastes 4:9–12.

## 1. Extract and open the project
1. Download Monthsary-Webpage-Code.zip.
2. Right-click it in Windows File Explorer and choose **Extract All**. Click **Extract**.
3. Open Visual Studio Code.
4. Choose **File → Open Folder**. Select the extracted **monthsary-webpage** folder containing index.html. Click **Select Folder**.
5. The Explorer on the left should show index.html, style.css, script.js, config.js, this guide, and assets.

You do not need Node.js, npm, a database, or a design application. HTML makes the content, CSS makes the design, and JavaScript controls the quiz and slideshow. This download already contains all three.

## 2. Enter your real answers
Open **config.js** from the left Explorer. Change only the values between quotes, keeping commas and brackets intact:

```js
fullName: "Your Actual Full Name",
birthday: "2005-05-01",
favoriteColors: ["violet", "purple"],
monthsaryPassword: "0703",
passwordHint: "Use MMDD: two digits for the month, then two for the day.",
coupleNames: "Your Name & His Name",
```

The supplied name, birthday, color, and password are EXAMPLES, not guesses about you. Replace them before sharing.

- Birthday uses YYYY-MM-DD: May 1, 2005 is 2005-05-01.
- The birthday question uses a calendar picker.
- Full name and colors ignore capitalization and extra spaces.
- favoriteColors accepts every listed answer. Keep only your real favorite color(s).
- Password is text, so leading zeros are preserved. 0703 means July 3 if you choose MMDD. If you choose another password format, change passwordHint to match.
- Press **Ctrl+S** after edits.

## 3. Add the first conversation screenshot
1. Prepare a screenshot of his first message and your reply.
2. Rename it **first-chat.jpg** if it is actually a JPG file.
3. Drag or copy it into the project's **assets** folder.
4. If it is a PNG instead, keep its real format and change the config line to:

```js
chatImage: "assets/first-chat.png",
```

Do not just rename a PNG extension to JPG. On Windows, show filename extensions in File Explorer so you do not accidentally create first-chat.jpg.jpg. Use a cropped screenshot that avoids unrelated personal information.

## 4. Add your couple photos
1. Copy your pictures into assets.
2. Use simple filenames, for example photo1.jpg, photo2.jpg, photo3.jpg.
3. Match the config paths to the actual filenames, including extensions:

```js
photos: [
  { src: "assets/photo1.jpg", caption: "Our first date." },
  { src: "assets/photo2.png", caption: "My favorite person." },
  { src: "assets/photo3.jpg", caption: "Another memory with you." }
],
```

To add a fourth photo, insert another object separated by a comma before the closing bracket. All photos are displayed without cropping. The arrows wrap around, and **Play slideshow** changes images every 3.5 seconds. Missing files show an instructional placeholder rather than a broken image.

## 5. Write your long sweet message
In config.js, find **message:**. Replace the sample message inside the backticks. You can write many paragraphs; separate them with a blank line. Do not remove the opening or closing backtick. Avoid using backticks or `${...}` in the letter because those have a special meaning in JavaScript template strings.

Change **signature** to your preferred closing. Save with Ctrl+S.

## 6. Open the webpage
The simplest method needs no extension:
1. In File Explorer, open the project folder.
2. Double-click **index.html**. It opens in your default browser.
3. After editing and saving in VS Code, refresh the browser with Ctrl+R.

Optional local server: if Python is installed, open **Terminal → New Terminal** in VS Code and run:

```sh
python -m http.server 5500
```

Open http://localhost:5500 in your browser. On Windows, if python is not recognized but the Python launcher is installed, use `py -m http.server 5500`. Stop the server with Ctrl+C. No package installation is required.

## 7. Test the entire surprise
1. Click **Open your surprise**.
2. Try incorrect quiz answers. An error should appear and the password screen should remain hidden.
3. Enter your correct name, birthday, and favorite color. The password screen should appear.
4. Try a wrong password, then the configured correct password.
5. Confirm your first-chat screenshot and “Thank you, Lord, I replied to this man” appear.
6. Continue to the Happy 3rd Monthsary greeting.
7. Check every photo, both arrows, and Play/Pause slideshow.
8. Continue to your letter and the complete Ecclesiastes 4:9–12 passage (KJV).
9. Use **Revisit our story** to return to the celebration, or **Start again** to reset the questions.
10. Make your browser window narrow to check the mobile layout.

## 8. Colors and design
style.css contains your PDF palette at the top:

| Variable | Hex | Use |
| --- | --- | --- |
| --red | #DA5047 | Buttons and emphasized words |
| --wine | #822720 | Red shading |
| --black | #030104 | Background |
| --gray | #ABADBF | Supporting text and borders |
| --blue | #0648A9 | Blue accents |
| --navy | #021656 | Secondary buttons |

A warm cream is added for readable primary text. The mask and web pattern use CSS, so you need no external images or internet connection to see the theme. Fonts use built-in Arial and Georgia.

## 9. Sharing and limitations
This is a local static webpage. A localhost or file URL will not work on his device. You can send the entire ZIP with your photos included; he must extract it and open index.html. An online shareable link requires a separate hosting step.

The questions and password are a playful surprise gate, not secure login: answers and content can be seen in the source code, and image files can be opened directly. There are no accounts, database, or server-side authentication. This project does not store entered answers or send them anywhere. Keep truly private conversations off a publicly hosted copy.

## Troubleshooting
- Blank page: open browser Developer Tools (F12) → Console. Check for a missing quote, comma, bracket, or backtick in config.js.
- No style: make sure style.css is next to index.html.
- Buttons do nothing: make sure config.js and script.js are next to index.html; check the Console for a configuration typo.
- Wrong answer rejected: compare your config answers and password format. The birthday must match exactly as a date.
- Photo placeholder: the asset path or extension does not match the actual file. Filenames should also match capitalization for future hosting.
- Old changes still showing: save in VS Code, then use Ctrl+Shift+R in the browser.
