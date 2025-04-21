# **App Name**: Collector's Vault

## Core Features:

- Catalog Display: Display a catalog of movies and games in a Netflix-style grid layout.
- Filtering & Search: Implement filtering and search functionality to easily find movies and games based on title, genre, or platform.
- User Authentication: Enable users to authenticate and manage their profiles.
- AI-Powered Collection Update: Allow authenticated users to upload images or videos of new items. Use Gemini Pro to analyze the content and automatically update the user's collection library. The app will use a tool to determine if it should update the library.
- External API Integration: Fetch movie and game details, including images, from TMDB or a similar API to enhance the visual appeal of the catalog.

## Style Guidelines:

- Primary color: Dark background (#121212) to mimic Netflix's dark theme.
- Secondary color: Light grey (#E0E0E0) for text and subtle UI elements.
- Accent: Teal (#008080) for interactive elements and highlights.
- Netflix-style grid layout for displaying movies and games. Responsive design for mobile-first approach.
- Use clean and modern icons from a library like FontAwesome or Material Icons for filtering and search options.
- Subtle transitions and hover effects for interactive elements to enhance user experience.

## Original User Request:
An app that shows a catalog of movies and games in a netflix or streaming service style vibe. I have a JSON file with all the objects. Should be a next.js app using the latest builds, with the App/ project structure, latest Tailwind 4 version, and shadcn components. The interface should allow for easy filtering, searching. Be mobile first friendly and responsive. I can provide the json file or use dummy data but I prefer to use the data I have if possible, and use an TMDB or other API to gather image info to make it look top notch. This will have movies, and video games so consider that. I want the user to be able to take photos or videos of items new and have gemini allow it to use the preview 2.5 pro model free tier, to analyze the video or image and automatically update the collectors library, if they are authenticated. If they are not authenticated, then it would be read only and explore only. Make sure to test this and make it look great.
  