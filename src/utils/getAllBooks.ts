export const getAllBooks = async () =>{
    const response = await fetch('https://rubshibir.github.io/api/books.json', {
      next: { revalidate: 60 }, // Enable ISR with 60-second revalidation
    });
    return response.json();
  }