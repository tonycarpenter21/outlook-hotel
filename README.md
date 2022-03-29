# Outlook Hotel Read Me
## Contributors:
- Tony Carpenter
- Ryan Bahan
- Alex Fritz

## Technologies Used:
- HTML
- SASS/CSS
- Javascript
- JSON
- API FETCH CALLS

## Instructions for Starting and Using the Application:
**Launch The Application**
1. Download this repo to your local machine along with https://github.com/turingschool-examples/overlook-api repo in separate folders.
2. In the command line navigate to both repo directories and run the "npm install" command.
3. In the command line navigate to both repo directories and run the "npm start" command.
4. Go to `http://localhost:8080/` and you should see the web application. Once the site loads, you should see a home screen:
![Home Screen](https://user-images.githubusercontent.com/88450229/150051901-4a68c3eb-c7ef-4742-bc05-936dfe84703c.png)
5. Enter `control + c` in your terminal to stop the servers at any time.

**Login**
1. Once the site application is open, you will be prompted to login. There are 50 users built into this application and you can access different user accounts by appending the login number at the end of the username to a number between 1 and 50. Use the following example login credentials:
- USERNAME: customer50
- PASSWORD: overlook2021
2. Once logged in, you will see all of your current bookings sorted by date and the total amount spent at the bottom.
![Current Bookings Screen](https://user-images.githubusercontent.com/88450229/150051996-fb9ea08c-7f91-4817-a9e2-7c4495f9c209.png)

**Book A Reservation**
1. In the upper right click on the "Create Booking" button.
![Book Reservation Screen](https://user-images.githubusercontent.com/88450229/150052060-d620e529-3cb1-4817-b441-1a8b9c8da7e5.png)
2. Click on the calendar icon or type in a date to see available rooms.
![See Available Bookings Results Page](https://user-images.githubusercontent.com/88450229/150052139-55a02116-458f-4678-a421-8fd09f8e338b.png)
3. You can now sort by room type and the page should automatically refresh anytime a new filter or date is applied.
4. Click "Book Room" button to book a room. This should also display a Booking Room Details page. 
![See Confirmed Room Booking Details](https://user-images.githubusercontent.com/88450229/150052209-2a4cd35c-4ef9-4d31-a89a-c758b4f145df.png)
5. To book another room, click the "Create Another Booking" button. Or to see your updated bookings including your most recently added room, click the "See All Current Bookings" button.

**Logout**
1. At any point in the application you can click the "Logout" button to log out of your current user. Once logged out, you can log in as any other user to see their booking history or add a new booking.

## Future Feature Additions:
- Create a manager view to view all current bookings for that day, total revenue, and allow the deletion of user bookings.
