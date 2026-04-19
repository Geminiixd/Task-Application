# Todo List App

A modern, feature-rich todo list application with bookmarks and user settings management. Built with vanilla JavaScript and localStorage for data persistence.

## Features

### Task Management
- Add, complete, and delete tasks
- Mark tasks as done with visual feedback
- Clear all tasks at once
- Automatic save to localStorage
- Toast notifications for user actions

### Bookmarks
- Save frequently used links
- Quick access bookmark list
- Persistent storage across sessions

### User Settings
- Personal information management (name, address, ID, zipcode)
- Theme settings panel
- Account settings panel
- Collapsible settings sections

### Data Persistence
All data is automatically saved to browser localStorage:
- Tasks (with completion status)
- Bookmarks
- User information

## Usage

### Managing Tasks
1. Enter a task in the input field
2. Click the submit button to add it
3. Use the checkmark button to mark tasks as complete
4. Use the trash button to delete tasks
5. Click "Clear All" to remove all tasks

### Adding Bookmarks
1. Click "Open Modal" to access the bookmark form
2. Enter bookmark name and URL
3. Click "Add Bookmark"
4. Bookmarks are saved automatically

### Configuring Settings
1. Click the settings icon to open the settings panel
2. Expand "Theme Settings" or "Account Settings"
3. Fill in your personal information
4. Click "Submit" to save changes

## Technical Details

### Dependencies
- [Toastify JS](https://github.com/apvarun/toastify-js) - Toast notifications

### Browser Compatibility
Requires a modern browser with localStorage support.

### Data Structure

**Tasks:**
```javascript
{
  task: "Task description",
  done: false
}

**Bookmarks:**
javascript
{
  text: "Bookmark name",
  link: "https://example.com"
}

**User Info:**
javascript
{
  fname: "First name",
  lname: "Last name",
  settingsID: "ID number",
  zipcode: "Postal code",
  address: "Street address"
}

## Installation

1. Include the JavaScript file in your HTML
2. Add the Toastify JS library
3. Ensure your HTML has the required element IDs (see code for reference)
4. Open in a browser - data persists automatically

## License

Free to use and modify.
