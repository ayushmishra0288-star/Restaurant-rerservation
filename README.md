# Restaurant Reservations

A small, responsive restaurant table reservation dashboard built with HTML, CSS, and vanilla JavaScript. It keeps reservation data in memory for the current page session; refreshing the page resets all five tables to available.


## Demonstration

Enter **Priya**, choose **T5**, and leave guests at **4**. The page confirms the reservation and updates the status cards, booking list, and live totals. Trying T5 again is rejected without replacing Priya's booking. Guest counts must be whole numbers from 1 through 10. Use **Cancel** in the bookings table to free a table.

## Java OOP connection

The `tables` array contains one object for each table. Each object stores `tableNumber`, `reserved`, `customerName`, and `guests`. `reserveTable` and `cancelReservation` change those objects, while render functions display the current state. This mirrors objects, fields, methods, conditions, and collection iteration in a simple Java console program.
