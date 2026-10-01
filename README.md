# Password Security Tool

A simple web-based password security tool that helps users generate strong passwords and check the strength of their own passwords.

## Features

- Generate random passwords
- Choose password length
- Choose uppercase, lowercase, numbers, and special characters
- Copy generated passwords
- Create and check your own password
- Show/hide password
- Check password strength
- Shows password requirements
- Password strength meter
- Saves generated password history
- Clear password history
- Password history is stored using localStorage
- Responsive design for mobile and desktop

## Technologies Used

- HTML
- CSS
- JavaScript
- Browser Local Storage API

## How It Works

### Password Generator

Users can select the password length and the types of characters they want to include. The tool then generates a random password based on their choices.

### Password Strength Checker

Users can enter their own password and check whether it contains:

- At least 8 characters
- Uppercase letter
- Lowercase letter
- Number
- Special character

The tool then shows the password strength as Weak, Medium, or Strong.

### Password History

Generated passwords are saved in the browser's local storage. The latest 10 generated passwords are kept in the history.

## How to Run

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.

No additional installation is required.

## Project Structure

```text
Password-generator/
│
├── index.html
├── style.css
├── script.js
└── README.md