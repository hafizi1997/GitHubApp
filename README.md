# GitHub Starred Repos

This React Native/Expo application displays the most starred GitHub repositories created in the last 10 days.

## Features

- **Recent repos:** The list always shows repositories created within the past 10 days relative to the current date.
- **Sorted by stars:** Results are ordered descending by star count.
- **Infinite scrolling:** As you scroll to the end of the list, the next page of results is fetched automatically.
- **Rich list items:** Each row displays the repository’s full name, the owner’s username and avatar, a brief description and the number of stars.

## Getting started

1. **Install dependencies.** Navigate into the project directory and run:

   ```sh
   npm install
   ```

   This will install Expo, React, React Native and Axios.

2. **Start the development server.** From the project directory run:

   ```sh
   npx expo start
   ```

   Expo will start a Metro bundler. You can then run the app on an Android or iOS simulator or device via the Expo Go app.

3. **Building for production.** Refer to the [Expo documentation](https://docs.expo.dev/) for instructions on how to build and deploy the app for iOS and Android.

## Code structure

- `app/Home.jsx` – The main application component. It handles data fetching, pagination and rendering of the repository list.
- `package.json` – Defines dependencies and scripts. The project uses Expo for a simplified React Native workflow.
- `app.json` – Contains minimal Expo configuration.
- `/api/github.jsx` - API call to GitHub Search API
