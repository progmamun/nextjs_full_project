import FeaturedBlogs from '@/components/home/FeaturedBlogs';
import FeaturedBooks from '@/components/home/FeaturedBook';
import Hero from '@/components/home/Hero';
import PhotoGallery from '@/components/home/PhotoGallery';
import UpcomingEventsPage from '@/components/home/UpcomingEvents';
import { Book, Event, Photo, Post } from '@/types';
import { getAllBlogs } from '@/utils/getAllBlogs';
import { getAllBooks } from '@/utils/getAllBooks';
import { getAllEvents } from '@/utils/getAllEvents';
import { getAllPhotos } from '@/utils/getAllPhotos';



const events: Event[] = await getAllEvents();
const posts: Post[] = await getAllBlogs();
const books: Book[] = await getAllBooks();
const photos: Photo[] = await getAllPhotos();

export default function HomePage() {
  return (
    <>
      <Hero />
      <UpcomingEventsPage events={events.slice(0, 2)} />
      <PhotoGallery photos={photos} />
      <FeaturedBlogs posts={posts} />
      <FeaturedBooks books={books} />
    </>
  );
}
