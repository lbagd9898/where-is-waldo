# Where’s Waldo? – A Photo‑Tagging App (Harry Potter Version)

## 🧩 Project Overview

This project is a photo‑tagging / “find the hidden character” game inspired by The Odin Project’s NodeJS lesson. You click on a large image to tag Harry Potter characters (e.g., Ogre, Ron Weasly). The app uses:

- A **React** frontend for UI, user interactions and responsive design
- An **Express** backend that stores character coordinates & high‑scores

## 🚀 Features

- Click anywhere on the image and a “targeting box” appears with a dropdown menu of characters.
- On selecting a character, the backend checks if the click falls within the correct coordinates.
- If correct: that character is eliminated from your list of characters to find
- Tracks how long the user takes to find all characters. At the end: prompts user for a name, saves score.
- Responsive design: works on mobile, tablet and desktop.

## 🛠️ Tech Stack

- **Frontend**: React, React Router (if using), CSS/Tailwind (or your CSS framework of choice)
- **Backend**: Express.js, Node.js, PostgreSQL
- **Deployment**: Heroku

## 📁 Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your‑username/your‑repo.git
   cd your‑repo
   ```
