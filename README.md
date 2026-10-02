# E-Learning Course Platform

A pixel-perfect, highly interactive course platform frontend built with Next.js App Router, Tailwind CSS, and TypeScript. This project features a responsive course player with interactive curriculum tracking, live comments, mock exams, and state management via session storage.

## Project Overview & Features

This platform is designed to provide an optimal learning experience with focus on visual aesthetics and user engagement. 

**Key Features:**
- **Pixel-Perfect UI:** Built accurately against provided Figma/PNG design specifications, featuring custom fonts (League Spartan) and optimized SVG icons (Lucide).
- **Sticky Mobile Player & Desktop Wide Mode:** The video player pins to the top of the screen on mobile for easy viewing while scrolling the curriculum. Desktop users can toggle a "Wide Mode" for a distraction-free cinematic view.
- **Interactive Curriculum:** Track course progress with a custom animated progress bar. Curriculum sections can be expanded/collapsed.
- **Learning Action Center:** Ask questions with draft persistence, view leaderboards, and read mentor messages (e.g., from Eng. Ali Shaheen).
- **Interactive Exam Engine:** A custom-built, full-screen mobile-style exam module featuring pagination, a live countdown timer (with auto-submit), and session-based state preservation.
- **PDF Viewer Modal:** View course attachments seamlessly without losing your spot in the video player.

## Requirements & Setup Instructions

**Prerequisites:**
- Node.js 18.17 or later
- npm (or pnpm/yarn)

**Setup:**
1. Clone the repository.
2. Ensure you are in the project root directory.
3. Install dependencies by running:
   ```bash
   npm install
   ```

## Available Commands

- **Start Development Server:**
  ```bash
  npm run dev
  ```
  *Runs the app in development mode on http://localhost:3000.*

- **Run Type Checking & Linting:**
  ```bash
  npm run lint
  tsc --noEmit
  ```

- **Build for Production:**
  ```bash
  npm run build
  ```
  *Creates an optimized production build in the `.next` folder.*

- **Start Production Server:**
  ```bash
  npm start
  ```

## Folder Structure & Architecture

The project utilizes the Next.js App Router (`src/app`) for modern server-side rendering and routing capabilities.

```text
src/
├── app/                  # Next.js App Router pages (/, /courses/[courseId])
├── components/           # Modular React components
│   ├── course-player/    # Domain-specific components (VideoPanel, Comments, Exams, etc.)
│   └── ui/               # Reusable atomic UI components (Modal, ProgressBar, Badge)
├── data/                 # Static mock data (courses, mentor messages, leaderboards)
├── lib/                  # Utility functions and custom hooks (useSessionStorage)
└── types/                # Global TypeScript interfaces and type definitions
```

## Server vs. Client Components

This project leverages Next.js hybrid architecture for performance and interactivity:

- **Server Components (Default):** Route pages like `src/app/courses/[courseId]/page.tsx` are Server Components. They securely fetch and format the mock data on the server, resulting in zero client-side JavaScript bundle size for the data fetching layer. This improves initial page load speed and SEO.
- **Client Components (`"use client"`):** Components that require browser APIs (like `sessionStorage`), interactivity (React `useState`, `useEffect`), or DOM event listeners (scrolling, clicking) are marked as Client Components. Examples include `CoursePlayer.tsx`, `ExamModal.tsx`, and `CommentsSection.tsx`.

## Course Mock Data

Mock data is stored in TypeScript files within the `src/data/` directory. 
- `courses.ts`: Contains the main catalog of courses, their curriculums, embedded lessons (documents, quizzes), and initial comments. 
- **Data Access:** In a real-world scenario, this would be fetched from an API/Database. Currently, the server components import this static array directly and find the relevant course by ID to pass down as props to the Client Components.

## Images and Performance

- All images (avatars, course thumbnails) are served using the Next.js `<Image>` component (`next/image`).
- This automatically handles image optimization, WebP formatting, and responsive resizing.
- To prevent layout shifts (CLS), width and height attributes are strictly defined.
- Icons are handled via `lucide-react`, which renders inline SVGs to keep the bundle size small and eliminate extra network requests.
- Heavy modals (like the Exam and PDF viewer) are lazily rendered only when `isOpen` is true, keeping the initial DOM lightweight.

## Assumptions, Limitations, & Known Issues

- **Data Persistence:** Progress (exams, question drafts) is persisted using `sessionStorage` via a custom hook (`useSessionStorage`). This means data is lost if the browser tab is closed. In a production environment, this state should be synced to a backend database.
- **Video Playback:** The video player is currently a visual mockup. Clicking play/maximize simulates UI states but does not stream actual video segments.
- **Routing:** Only a mock `/courses/seo-home-business` route is fully populated with deep data. Other courses listed in the grid are placeholders.
- **Authentication:** There is no user authentication implemented; the app assumes a logged-in state as a student.
