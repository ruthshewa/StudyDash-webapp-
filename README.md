# asigge-ldesu-say-shewa-HT24-Project
asigge-ldesu-say-shewa-HT24-Project created for asigge-ldesu-say-shewa

# Studydash  

**Studydash** is a web application for students to manage deadlines, exams, and study tasks.  

### **Features**  
- **Calendar**: Integrated with Google Calendar, the calendar helps students manage deadlines, exam dates, and important events, ensuring nothing is overlooked. 
- **To-Do List**: A simple to-do list allows students to break down tasks by priority or deadline, with options to mark tasks as completed or pending.  
- **Pomodoro Timer**: The app includes a Pomodoro timer for focused study sessions, complete with a Spotify playlist to help students concentrate during their work intervals.  
- **Progress Tracker**: The tracker monitors active study time based on completed Pomodoro sessions and displays the corresponding tasks from the to-do list, showing what has been completed and what’s still pending.

---

Studydash combines these features into a user-friendly interface, helping students stay organized and productive in their academic journey.

   

## **Third-Party Components**

The project uses several third-party libraries and APIs:

- **Firebase**: For user authentication and data storage.
- **Google Calendar API**: Integration for managing events and deadlines.
- **Spotify API**: To provide playlists for the Pomodoro timer.
- **React**: To build the dynamic and responsive user interface.
- **FullCalendar (DayGrid View)**: For displaying calendar events in a visually appealing and interactive grid layout

## File structure

### **Model**  
We’re using **model file** to store data (sent to the views) and handle the application logic.

### **View Folder**  
The following files are included in the **View folder**. These files contain all the components responsible for rendering the user interface.  

The folder includes the following files:  

- `timerView`  
- `calendarView`  
- `loginView`  
- `progressView`  
- `sidebarView`
- `homeView`
- `todolistView`


### **Presenter Folder**  
The files in this folder fetch the relevant data from the model, apply the UI logic for the displays, and manage the states of their respective views.  

The folder includes the following files:  

- `timerPresenter`  
- `sidebarPresenter`  
- `calenderPresenter`  
- `progressPresenter`  
- `loginPresenter`
- `callbackPresenter`
- `dashboardPresenter`
- `homePresenter`
- `playlistPresenter`
- `todolistPresenter`

### JS Files in `src`  

The following JavaScript files are located in the `src` directory:  

- `apiConfig`  
- `spotifyOAuth`  
- `firebaseModel`  
- `firebaseConfig`  
- `googleOAuth.js`  
- `index`  

