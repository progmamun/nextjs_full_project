import { AboutPreview } from '@/components/home/AboutPrev';
import { AdvicePreview } from '@/components/home/AdvicePrev';
import ButtonGrid from '@/components/home/ButtonGrid';
import FeaturedBlogs from '@/components/home/FeaturedBlogs';
// import FeaturedBooks from '@/components/home/FeaturedBook';
import Gallery from '@/components/home/Gallery';
import { GreatPrev } from '@/components/home/GreatPrev';
import Hero from '@/components/home/Hero';
import OurMission from '@/components/home/OurMission';
// import PhotoGallery from '@/components/home/PhotoGallery';
import UpcomingEventsPage from '@/components/home/UpcomingEvents';
// import { Book, Event, Photo, Post } from '@/types';
import { Event,  Post } from '@/types';
import { getAllBlogs } from '@/utils/getAllBlogs';
// import { getAllBooks } from '@/utils/getAllBooks';
import { getAllEvents } from '@/utils/getAllEvents';
// import { getAllPhotos } from '@/utils/getAllPhotos';



const events: Event[] = await getAllEvents();
const posts: Post[] = await getAllBlogs();
// const books: Book[] = await getAllBooks();
// const photos: Photo[] = await getAllPhotos();

export default function HomePage() {
  return (
    <>
      <Hero />
      <ButtonGrid/>
      <AboutPreview/>
      <OurMission/>
      <GreatPrev/>
      <UpcomingEventsPage events={events} />
      {/* <PhotoGallery photos={photos} /> */}
      <Gallery/>
      <AdvicePreview/>
      <FeaturedBlogs posts={posts} />
      {/* <FeaturedBooks books={books} /> */}
    </>
  );
}
