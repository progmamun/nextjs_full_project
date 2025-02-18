export const getAllEvents = async () =>{
    const response = await fetch('https://rubshibir.github.io/api/events.json', {
      next: { revalidate: 60 }, // Enable ISR with 60-second revalidation
    });
    return response.json();
  }