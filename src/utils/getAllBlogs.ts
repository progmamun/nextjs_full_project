export const getAllBlogs = async () =>{
    const response = await fetch('https://rubshibir.github.io/api/blogs.json', {
      next: { revalidate: 60 }, // Enable ISR with 60-second revalidation
    });
    return response.json();
  }