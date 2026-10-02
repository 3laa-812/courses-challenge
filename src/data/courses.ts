import type { Course } from "@/types/course";
import { calculateProgress } from "@/lib/course-utils";

const defaultComments = [
  {
    id: "c1",
    authorName: "Student Name Goes Here",
    authorAvatar: "/images/avatars/avatar-1.svg",
    date: "2021-10-10T12:00:00Z",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "c2",
    authorName: "Student Name Goes Here",
    authorAvatar: "/images/avatars/avatar-2.svg",
    date: "2021-10-15T12:00:00Z",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "c3",
    authorName: "Student Name Goes Here",
    authorAvatar: "/images/avatars/avatar-3.svg",
    date: "2021-10-19T12:00:00Z",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const mockCourses: Course[] = [
  {
    id: "seo-home-business",
    title: "Starting SEO as your Home Based Business",
    description:
      "Advanced story telling techniques for writers: Personas, Characters & Plots",
    instructor: "Edward Norton",
    thumbnail: "/images/courses/course-1.svg",
    price: "$70.00",
    status: "in-progress",
    progress: 0, // Calculated below
    materials: {
      duration: "3 weeks",
      lessons: 8,
      enrolled: "65 students",
      language: "English",
    },
    sections: [
      {
        id: "week-1-4",
        title: "Week 1-4",
        description:
          "Advanced story telling techniques for writers: Personas, Characters & Plots",
        lessons: [
          {
            id: "l1",
            title: "Introduction",
            type: "document",
            isLocked: false,
            isCompleted: true,
            order: 1,
          },
          {
            id: "l2",
            title: "Course Overview",
            type: "document",
            isLocked: false,
            isCompleted: true,
            order: 2,
          },
          {
            id: "l3",
            title: "Course Overview",
            type: "document",
            questions: 0,
            duration: "10 MINUTES",
            isLocked: false,
            isCompleted: true,
            order: 3,
          },
          {
            id: "l4",
            title: "Course Exercise / Reference Files",
            type: "document",
            isLocked: true,
            isCompleted: false,
            order: 4,
          },
          {
            id: "l5",
            title: "Code Editor Installation (Optional if you have one)",
            type: "document",
            isLocked: true,
            isCompleted: false,
            order: 5,
          },
          {
            id: "l6",
            title: "Embedding PHP in HTML",
            type: "document",
            isLocked: true,
            isCompleted: false,
            order: 6,
          },
        ],
      },
      {
        id: "week-5-8",
        title: "Week 5-8",
        description:
          "Advanced story telling techniques for writers: Personas, Characters & Plots",
        lessons: [
          {
            id: "l7",
            title: "Defining Functions",
            type: "document",
            isLocked: true,
            isCompleted: false,
            order: 7,
          },
          {
            id: "l8",
            title: "Function Parameters",
            type: "document",
            isLocked: true,
            isCompleted: false,
            order: 8,
          },
          {
            id: "l9",
            title: "Return Values From Functions",
            type: "quiz",
            questions: 5,
            duration: "15 MINUTES",
            isLocked: false,
            isCompleted: false,
            order: 9,
          },
          {
            id: "l10",
            title: "Global Variable and Scope",
            type: "document",
            isLocked: true,
            isCompleted: false,
            order: 10,
          },
          {
            id: "l11",
            title: "Newer Way of creating a Constant",
            type: "document",
            isLocked: true,
            isCompleted: false,
            order: 11,
          },
          {
            id: "l12",
            title: "Constants",
            type: "document",
            isLocked: true,
            isCompleted: false,
            order: 12,
          },
        ],
      },
    ],
    comments: [...defaultComments],
  },
  // Adding more mock courses to fulfill the 6 courses requirement
  {
    id: "web-dev-bootcamp",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, and React from scratch.",
    instructor: "Sarah Drasner",
    thumbnail: "/images/courses/course-2.svg",
    price: "$89.99",
    status: "not-started",
    progress: 0,
    materials: {
      duration: "10 weeks",
      lessons: 45,
      enrolled: "1200 students",
      language: "English",
    },
    sections: [
      {
        id: "s1",
        title: "HTML & CSS Basics",
        description: "Get started with the building blocks of the web.",
        lessons: [
          {
            id: "c2-l1",
            title: "HTML Fundamentals",
            type: "video",
            duration: "15 MINUTES",
            isLocked: false,
            isCompleted: false,
            order: 1,
          },
          {
            id: "c2-l2",
            title: "CSS Styling",
            type: "video",
            duration: "20 MINUTES",
            isLocked: true,
            isCompleted: false,
            order: 2,
          },
        ],
      },
    ],
    comments: [],
  },
  {
    id: "python-data-science",
    title: "Python for Data Science and Machine Learning",
    description: "Analyze data and build machine learning models.",
    instructor: "Jose Portilla",
    thumbnail: "/images/courses/course-3.svg",
    price: "$95.00",
    status: "completed",
    progress: 100,
    materials: {
      duration: "6 weeks",
      lessons: 20,
      enrolled: "450 students",
      language: "English",
    },
    sections: [
      {
        id: "s1",
        title: "Python Basics",
        description: "Learn Python from scratch.",
        lessons: [
          {
            id: "c3-l1",
            title: "Intro to Python",
            type: "video",
            duration: "10 MINUTES",
            isLocked: false,
            isCompleted: true,
            order: 1,
          },
        ],
      },
    ],
    comments: [],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Principles",
    description:
      "Master the art of creating beautiful and functional interfaces.",
    instructor: "Gary Simon",
    thumbnail: "/images/courses/course-4.svg",
    price: "$50.00",
    status: "in-progress",
    progress: 40,
    materials: {
      duration: "4 weeks",
      lessons: 15,
      enrolled: "320 students",
      language: "English",
    },
    sections: [
      {
        id: "s1",
        title: "Design Fundamentals",
        description: "Color theory and typography.",
        lessons: [
          {
            id: "c4-l1",
            title: "Color Theory",
            type: "video",
            duration: "12 MINUTES",
            isLocked: false,
            isCompleted: true,
            order: 1,
          },
          {
            id: "c4-l2",
            title: "Typography",
            type: "video",
            duration: "18 MINUTES",
            isLocked: false,
            isCompleted: false,
            order: 2,
          },
        ],
      },
    ],
    comments: [],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Masterclass",
    description: "Grow your business online with proven strategies.",
    instructor: "Seth Godin",
    thumbnail: "/images/courses/course-5.svg",
    price: "$65.00",
    status: "not-started",
    progress: 0,
    materials: {
      duration: "5 weeks",
      lessons: 25,
      enrolled: "800 students",
      language: "English",
    },
    sections: [
      {
        id: "s1",
        title: "SEO Basics",
        description: "Search Engine Optimization intro.",
        lessons: [
          {
            id: "c5-l1",
            title: "What is SEO?",
            type: "video",
            duration: "10 MINUTES",
            isLocked: false,
            isCompleted: false,
            order: 1,
          },
        ],
      },
    ],
    comments: [],
  },
  {
    id: "photography-basics",
    title: "Photography Basics: Capture the Moment",
    description: "Learn how to use your camera and take stunning photos.",
    instructor: "Annie Leibovitz",
    thumbnail: "/images/courses/course-6.svg",
    price: "$45.00",
    status: "in-progress",
    progress: 75,
    materials: {
      duration: "2 weeks",
      lessons: 10,
      enrolled: "150 students",
      language: "English",
    },
    sections: [
      {
        id: "s1",
        title: "Camera Settings",
        description: "ISO, Aperture, Shutter Speed.",
        lessons: [
          {
            id: "c6-l1",
            title: "Understanding ISO",
            type: "video",
            duration: "10 MINUTES",
            isLocked: false,
            isCompleted: true,
            order: 1,
          },
          {
            id: "c6-l2",
            title: "Aperture explained",
            type: "video",
            duration: "15 MINUTES",
            isLocked: false,
            isCompleted: true,
            order: 2,
          },
          {
            id: "c6-l3",
            title: "Shutter speed",
            type: "video",
            duration: "12 MINUTES",
            isLocked: false,
            isCompleted: false,
            order: 3,
          },
        ],
      },
    ],
    comments: [],
  },
];

// Ensure calculated progress is set
mockCourses.forEach((course) => {
  course.progress = calculateProgress(course.sections);
});

export async function getCourses(): Promise<Course[]> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses);
    }, 100);
  });
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses.find((course) => course.id === id));
    }, 100);
  });
}
