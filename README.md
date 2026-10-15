# Restaurant Reservations

A small, responsive restaurant table reservation dashboard built with HTML, CSS, and vanilla JavaScript. It keeps reservation data in memory for the current page session; refreshing the page resets all five tables to available.

## Run locally

1. Keep `index.html`, `styles.css`, and `app.js` together in the same folder.
2. Open `index.html` in a modern browser, or open the folder in VS Code and start Live Server.

Google Fonts are loaded from the web when available. The site remains usable offline with system font fallbacks.

## Push to GitHub

Create an empty repository on GitHub, then run these commands from this project folder (replace the URL with your repository URL):

```bash
git init
git add index.html styles.css app.js README.md .gitignore
git commit -m "Build restaurant reservations website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## Demonstration

Enter **Priya**, choose **T5**, and leave guests at **4**. The page confirms the reservation and updates the status cards, booking list, and live totals. Trying T5 again is rejected without replacing Priya's booking. Guest counts must be whole numbers from 1 through 10. Use **Cancel** in the bookings table to free a table.

## Java OOP connection

The `tables` array contains one object for each table. Each object stores `tableNumber`, `reserved`, `customerName`, and `guests`. `reserveTable` and `cancelReservation` change those objects, while render functions display the current state. This mirrors objects, fields, methods, conditions, and collection iteration in a simple Java console program.
