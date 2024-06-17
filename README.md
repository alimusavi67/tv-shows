# TV Show Browser

## Overview

TV Show Browser is a web application that allows users to search for TV shows, view show details, and explore episodes by season. The application leverages the TVMaze API to fetch show data, seasons, and episodes.

## Features

- **Home Page**: Search for TV shows by name.
- **Show Details**: View detailed information about a show, including genres, premiered date, rating, and more.
- **Seasons & Episodes**: Navigate through the seasons of a show and view the episodes within each season.
- **Favorites**: Mark shows as favorites for quick access.
- **Breadcrumb Navigation**: Easily navigate between home, show details, and episodes with breadcrumb links.
- **Loading & Error Handling**: User-friendly loading indicators and error messages.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Router**: Declarative routing for React applications.
- **Redux**: A predictable state container for JavaScript apps.
- **Axios**: Promise-based HTTP client for the browser.
- **React Icons**: Include popular icons in your React projects easily.
- **React Toastify**: To add beautiful toast notifications to the app.

### Testing
- **Jest**: JavaScript testing framework.
- **React Testing Library**: Simple and complete React DOM testing utilities.

### Tools & Libraries
- **Moment Timezone**: Parse, validate, manipulate, and display dates and times in JavaScript.
- **Redux Mock Store**: Mocking library for Redux.
- **Husky**: Modern native Git hooks made easy.
- **Lint-staged**: Run linters on git staged files.

## Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/alimusavi67/tv-shows.git
    cd tv-show
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Start the Development Server**:
    ```sh
    npm start
    ```
    The application will be available at `http://localhost:3000`.

4. **Run Tests**:
    ```sh
    npm test
    ```

## Pre-commit Hooks

This project uses Husky to manage Git hooks, and `lint-staged` to run linters on staged files before committing.

- **Husky**: Ensures that linting and tests pass before allowing a commit.
- **Lint-staged**: Runs ESLint and Prettier on staged files to maintain code quality and formatting.

To install Husky hooks, run:
```sh
npx husky install
```
### API Endpoints

- **Fetch Shows**: `GET /shows?page={page}`
- **Search Shows**: `GET /search/shows?q={query}`
- **Fetch Seasons**: `GET /shows/{showId}/seasons`
- **Fetch Episodes**: `GET /seasons/{seasonId}/episodes`

### Breadcrumb Navigation

The breadcrumb navigation helps users understand the hierarchy and navigate back to previous pages.

- **Home Page**: No breadcrumb displayed.
- **Show Details Page**: Displays breadcrumb for **Home**.
- **Season Episodes Page**: Displays breadcrumb for **Home** and the **Show name** linking back to the Show Details.
