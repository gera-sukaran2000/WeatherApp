The files has been divided into src -> 4 subfolder

1)API -
Contains 2 files for the base url of Geofy and VisualCrossing API
Geofy API - has been used for search suggestions

2)Pages

1. SPlash -- this is the splash screen of the app with animation from react native-reanimated

2. Main -- This page is the one where user will search for cities and on page load the local db will checked for offline cached data previously checked which has been implemented using sqlite

3. Results - This is the page where results from the searched data will be shown

3)Store
This is the folder containing logic related redux and app state management with a slice called weatherInfo used for global state management

4)Components
This is the folder containing majority of components which have been reused in pages

.env file. -- contains Key for Geofy Api and Weather API

Debouncing --> Deboucing has also been implemented in LocationInput Component

DarkMode
---> Appearence From React Native is used to get the user device appearence
for implmenting dark and light themes
