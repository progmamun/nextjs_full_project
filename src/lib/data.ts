import { Event, Post } from "@/types";

export const samplePosts: Post[] = [
  {
    id: "1",
    title: "Introduction to Next.js",
    slug: "introduction-to-nextjs",
    content: "Next.js is a powerful React framework that helps in building fast and SEO-friendly web applications...",
    author: {
      name: "John Doe",
      image: "/images/authors/john_doe.jpg",
      role: "Senior Developer"
    },
    publishedAt: "2025-02-01",
    readingTime: "5 min read",
    tags: ["Next.js", "React", "Web Development"],
    imageUrl: "/images/posts/nextjs-introduction.jpg"
  },
  {
    id: "2",
    title: "Understanding TypeScript Basics",
    slug: "understanding-typescript-basics",
    content: "TypeScript is a typed superset of JavaScript that adds static types to the language, improving developer productivity...",
    author: {
      name: "Jane Smith",
      image: "/images/authors/jane_smith.jpg",
      role: "Frontend Developer"
    },
    publishedAt: "2025-02-05",
    readingTime: "7 min read",
    tags: ["TypeScript", "JavaScript", "Frontend"],
    imageUrl: "/images/posts/typescript-basics.jpg"
  },
  {
    id: "3",
    title: "Building Serverless Applications",
    slug: "building-serverless-applications",
    content: "Serverless architecture is transforming how we build and deploy applications by reducing the complexity of infrastructure management...",
    author: {
      name: "Alice Brown",
      image: "/images/authors/alice_brown.jpg",
      role: "Cloud Engineer"
    },
    publishedAt: "2025-02-10",
    readingTime: "6 min read",
    tags: ["Serverless", "Cloud", "AWS"],
    imageUrl: "/images/posts/serverless-applications.jpg"
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox",
    slug: "css-grid-vs-flexbox",
    content: "CSS Grid and Flexbox are two powerful layout techniques that help developers design responsive layouts with ease...",
    author: {
      name: "Mark Johnson",
      image: "/images/authors/mark_johnson.jpg",
      role: "UI/UX Designer"
    },
    publishedAt: "2025-02-12",
    readingTime: "4 min read",
    tags: ["CSS", "Web Design", "Layout"],
    imageUrl: "/images/posts/css-grid-vs-flexbox.jpg"
  },
  {
    id: "5",
    title: "Understanding React Hooks",
    slug: "understanding-react-hooks",
    content: "React Hooks were introduced in React 16.8 and allow functional components to manage state and side effects...",
    author: {
      name: "Tom Harris",
      image: "/images/authors/tom_harris.jpg",
      role: "React Developer"
    },
    publishedAt: "2025-02-15",
    readingTime: "5 min read",
    tags: ["React", "Hooks", "JavaScript"],
    imageUrl: "/images/posts/react-hooks.jpg"
  },
  {
    id: "6",
    title: "The Importance of Web Accessibility",
    slug: "the-importance-of-web-accessibility",
    content: "Web accessibility ensures that websites and web applications are usable by people with disabilities...",
    author: {
      name: "Emily Green",
      image: "/images/authors/emily_green.jpg",
      role: "Accessibility Specialist"
    },
    publishedAt: "2025-02-18",
    readingTime: "6 min read",
    tags: ["Accessibility", "Web Development", "UX"],
    imageUrl: "/images/posts/web-accessibility.jpg"
  },
  {
    id: "7",
    title: "Introduction to GraphQL",
    slug: "introduction-to-graphql",
    content: "GraphQL is a query language for your API, designed to make APIs more flexible and efficient compared to REST...",
    author: {
      name: "George White",
      image: "/images/authors/george_white.jpg",
      role: "Backend Developer"
    },
    publishedAt: "2025-02-20",
    readingTime: "8 min read",
    tags: ["GraphQL", "API", "Backend"],
    imageUrl: "/images/posts/graphql-introduction.jpg"
  },
  {
    id: "8",
    title: "How to Use TailwindCSS in React",
    slug: "how-to-use-tailwindcss-in-react",
    content: "TailwindCSS is a utility-first CSS framework that makes it easy to style React components efficiently...",
    author: {
      name: "Sophia Lee",
      image: "/images/authors/sophia_lee.jpg",
      role: "Frontend Engineer"
    },
    publishedAt: "2025-02-22",
    readingTime: "6 min read",
    tags: ["TailwindCSS", "React", "CSS"],
    imageUrl: "/images/posts/tailwindcss-react.jpg"
  },
  {
    id: "9",
    title: "Optimizing React Performance",
    slug: "optimizing-react-performance",
    content: "React is an efficient framework, but you can optimize its performance even more using techniques such as memoization, lazy loading, and code splitting...",
    author: {
      name: "Liam Taylor",
      image: "/images/authors/liam_taylor.jpg",
      role: "React Expert"
    },
    publishedAt: "2025-02-25",
    readingTime: "5 min read",
    tags: ["React", "Performance", "Web Development"],
    imageUrl: "/images/posts/react-performance.jpg"
  },
  {
    id: "10",
    title: "Understanding CSS Variables",
    slug: "understanding-css-variables",
    content: "CSS variables allow you to store values that can be reused throughout your stylesheets, improving maintainability...",
    author: {
      name: "Oliver King",
      image: "/images/authors/oliver_king.jpg",
      role: "Frontend Developer"
    },
    publishedAt: "2025-02-28",
    readingTime: "4 min read",
    tags: ["CSS", "Variables", "Web Development"],
    imageUrl: "/images/posts/css-variables.jpg"
  },
  {
    id: "11",
    title: "How to Build a RESTful API with Node.js",
    slug: "how-to-build-a-restful-api-with-nodejs",
    content: "Learn how to build a RESTful API using Node.js, Express, and MongoDB to handle HTTP requests and serve dynamic content...",
    author: {
      name: "Charlotte Scott",
      image: "/images/authors/charlotte_scott.jpg",
      role: "Backend Developer"
    },
    publishedAt: "2025-03-01",
    readingTime: "7 min read",
    tags: ["Node.js", "API", "Backend"],
    imageUrl: "/images/posts/restful-api-nodejs.jpg"
  },
  {
    id: "12",
    title: "JavaScript Array Methods You Should Know",
    slug: "javascript-array-methods-you-should-know",
    content: "JavaScript provides several array methods that make working with arrays much easier and more efficient. Learn about map, filter, reduce, and more...",
    author: {
      name: "James Walker",
      image: "/images/authors/james_walker.jpg",
      role: "JavaScript Developer"
    },
    publishedAt: "2025-03-03",
    readingTime: "5 min read",
    tags: ["JavaScript", "Array", "Programming"],
    imageUrl: "/images/posts/js-array-methods.jpg"
  },
  {
    id: "13",
    title: "Modern JavaScript Features You Should Use",
    slug: "modern-javascript-features-you-should-use",
    content: "Modern JavaScript has introduced many new features that can simplify your code and improve readability. Let's take a look at some of the best ones...",
    author: {
      name: "Victoria Adams",
      image: "/images/authors/victoria_adams.jpg",
      role: "Full Stack Developer"
    },
    publishedAt: "2025-03-05",
    readingTime: "6 min read",
    tags: ["JavaScript", "ES6", "Programming"],
    imageUrl: "/images/posts/js-modern-features.jpg"
  },
  {
    id: "14",
    title: "Mastering Git and GitHub",
    slug: "mastering-git-and-github",
    content: "Git and GitHub are essential tools for version control. Learn how to use them effectively for collaborative development...",
    author: {
      name: "Ethan Clark",
      image: "/images/authors/ethan_clark.jpg",
      role: "DevOps Engineer"
    },
    publishedAt: "2025-03-08",
    readingTime: "8 min read",
    tags: ["Git", "GitHub", "Version Control"],
    imageUrl: "/images/posts/git-github.jpg"
  },
  {
    id: "15",
    title: "Building an E-commerce Site with React",
    slug: "building-an-ecommerce-site-with-react",
    content: "In this tutorial, we will build an e-commerce site using React, complete with shopping cart functionality and product listings...",
    author: {
      name: "Grace Lee",
      image: "/images/authors/grace_lee.jpg",
      role: "React Developer"
    },
    publishedAt: "2025-03-10",
    readingTime: "9 min read",
    tags: ["React", "E-commerce", "Web Development"],
    imageUrl: "/images/posts/react-ecommerce.jpg"
  },
  {
    id: "16",
    title: "The Future of Web Development",
    slug: "the-future-of-web-development",
    content: "The web development landscape is changing rapidly, with new technologies emerging every year. Here's a look at some of the trends shaping the future...",
    author: {
      name: "Lucas Mitchell",
      image: "/images/authors/lucas_mitchell.jpg",
      role: "Web Development Expert"
    },
    publishedAt: "2025-03-12",
    readingTime: "6 min read",
    tags: ["Web Development", "Future", "Technology"],
    imageUrl: "/images/posts/future-of-web.jpg"
  },
  {
    id: "17",
    title: "A Guide to CSS Flexbox",
    slug: "a-guide-to-css-flexbox",
    content: "Flexbox is a powerful layout system in CSS. This guide will teach you how to use it to create responsive layouts with ease...",
    author: {
      name: "Isabella Harris",
      image: "/images/authors/isabella_harris.jpg",
      role: "UI Developer"
    },
    publishedAt: "2025-03-15",
    readingTime: "5 min read",
    tags: ["CSS", "Flexbox", "Web Design"],
    imageUrl: "/images/posts/css-flexbox.jpg"
  },
  {
    id: "18",
    title: "Why You Should Learn Vue.js",
    slug: "why-you-should-learn-vuejs",
    content: "Vue.js is an approachable JavaScript framework that makes building modern web apps easier. Here's why you should consider learning Vue...",
    author: {
      name: "Noah Allen",
      image: "/images/authors/noah_allen.jpg",
      role: "Frontend Developer"
    },
    publishedAt: "2025-03-18",
    readingTime: "7 min read",
    tags: ["Vue.js", "Frontend", "JavaScript"],
    imageUrl: "/images/posts/vuejs-why.jpg"
  },
  {
    id: "19",
    title: "Deploying a Web Application to AWS",
    slug: "deploying-a-web-application-to-aws",
    content: "AWS provides a wide array of services for deploying and hosting web applications. This guide covers the basics of deploying your app to AWS...",
    author: {
      name: "Olivia Scott",
      image: "/images/authors/olivia_scott.jpg",
      role: "Cloud Architect"
    },
    publishedAt: "2025-03-20",
    readingTime: "8 min read",
    tags: ["AWS", "Cloud", "Deployment"],
    imageUrl: "/images/posts/aws-deployment.jpg"
  }
];

export const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Annual Charity Gala",
    date: "2025-03-15",
    location: "City Convention Center",
    description: "Join us for our annual fundraising gala...",
    image: "/images/events/charity-gala.jpg"
  },
  {
    id: "2",
    title: "Spring Community Cleanup",
    date: "2025-04-10",
    location: "Downtown Park",
    description: "Help us keep our community clean and green.",
    image: "/images/events/community-cleanup.jpg"
  },
  {
    id: "3",
    title: "Tech Innovations Expo",
    date: "2025-05-20",
    location: "Tech Hub Auditorium",
    description: "Discover the latest trends and technologies.",
    image: "/images/events/tech-expo.jpg"
  },
  {
    id: "4",
    title: "Health and Wellness Fair",
    date: "2025-06-05",
    location: "Community Health Center",
    description: "Explore resources for a healthier lifestyle.",
    image: "/images/events/health-fair.jpg"
  },
  {
    id: "5",
    title: "Summer Music Festival",
    date: "2025-07-15",
    location: "City Amphitheater",
    description: "Enjoy live performances from local and national artists.",
    image: "/images/events/music-festival.jpg"
  },
  {
    id: "6",
    title: "Back-to-School Drive",
    date: "2025-08-10",
    location: "Community Center",
    description: "Donate school supplies to support local students.",
    image: "/images/events/school-drive.jpg"
  },
  {
    id: "7",
    title: "Fall Harvest Festival",
    date: "2025-09-25",
    location: "Central Plaza",
    description: "Celebrate the season with food, fun, and activities.",
    image: "/images/events/harvest-festival.jpg"
  },
  {
    id: "8",
    title: "Winter Wonderland Market",
    date: "2025-12-05",
    location: "Town Square",
    description: "Shop for unique holiday gifts and enjoy festive treats.",
    image: "/images/events/winter-market.jpg"
  },
  {
    id: "9",
    title: "Local Authors Book Fair",
    date: "2025-03-30",
    location: "City Library",
    description: "Meet local authors and discover new reads.",
    image: "/images/events/book-fair.jpg"
  },
  {
    id: "10",
    title: "Outdoor Adventure Workshop",
    date: "2025-05-02",
    location: "Riverfront Park",
    description: "Learn essential outdoor skills from experts.",
    image: "/images/events/adventure-workshop.jpg"
  },
  {
    id: "11",
    title: "Art and Craft Exhibition",
    date: "2025-06-20",
    location: "Art Museum Gallery",
    description: "Explore stunning works from talented artists and craftsmen.",
    image: "/images/events/art-exhibition.jpg"
  },
  {
    id: "12",
    title: "Holiday Charity Run",
    date: "2025-12-15",
    location: "Lakeside Trail",
    description: "Run or walk to raise funds for a good cause.",
    image: "/images/events/charity-run.jpg"
  }
];

// export const getPosts = async (): Promise<Post[]> => {
/*
    "id": 1,
    "title": "Fires of Eternity",
    "author": "Isabella Rose",
    "genre": "Fantasy",
    "published_year": 2023,
    "image": "/images/books/fires-of-eternity.jpg",
    "publishedAt": "2023-03-15",
    "link": "https://www.amazon.com/fires-of-eternity"
*/
