export interface BlogFilters {
  limit?: number;
  tag?: string;
  author?: string;
  searchTerm?: string;
  sortOrder?: 'asc' | 'desc';
}

export const getAllBlogs = async (filters?: BlogFilters) => {
  const response = await fetch('https://rubshibir.github.io/api/blogs.json', {
    next: { revalidate: 60 }, // Enable ISR with 60-second revalidation
  });
  
  let blogs = await response.json();
  
  // Apply filters if provided
  if (filters) {
    // Sort by publishedAt date
    const sortOrder = filters.sortOrder || 'desc';
    blogs.sort((a: { publishedAt: string }, b: { publishedAt: string }) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    // Apply limit
    if (filters.limit && filters.limit > 0) {
      blogs = blogs.slice(0, filters.limit);
    }
  } else {
    // Default sorting: newest first
    blogs.sort((a: { publishedAt: string }, b: { publishedAt: string }) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });
  }
  
  return blogs;
}

/*
// Get all blogs, newest first
const allBlogs = await getAllBlogs();

// Get 5 most recent blogs
const recentBlogs = await getAllBlogs({ limit: 5 });
*/