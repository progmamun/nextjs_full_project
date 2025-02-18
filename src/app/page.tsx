import FeaturedBlogs from '@/components/home/FeaturedBlogs';
import FeaturedBooks from '@/components/home/FeaturedBook';
import Hero from '@/components/home/Hero';
import UpcomingEventsPage from '@/components/home/UpcomingEvents';
import { Book, Event, Post } from '@/types';
import { getAllBlogs } from '@/utils/getAllBlogs';
import { getAllBooks } from '@/utils/getAllBooks';
import { getAllEvents } from '@/utils/getAllEvents';



const events: Event[] = await getAllEvents();
const posts: Post[] = await getAllBlogs();
const books: Book[] = await getAllBooks();
export default function HomePage() {
  return (
    <>
      <Hero />
      <UpcomingEventsPage events={events.slice(0, 2)} />
      <FeaturedBlogs posts={posts} />
      <FeaturedBooks books={books} />
    </>
  );
}
