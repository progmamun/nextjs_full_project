import MasonryGrid from '@/components/gallery/MasonryGrid';
import { AboutPreview } from '@/components/home/AboutPrev';
import { AdvicePreview } from '@/components/home/AdvicePrev';
import ButtonGrid from '@/components/home/ButtonGrid';
import FeaturedBlogs from '@/components/home/FeaturedBlogs';
import { GreatPrev } from '@/components/home/GreatPrev';
import Hero from '@/components/home/Hero';
import OurMission from '@/components/home/OurMission';
import UpcomingEventsPage from '@/components/home/UpcomingEvents';
import { Event, Photo} from '@/types';
import { Post } from '@/types/post';
import { BlogFilters, getAllBlogs } from '@/utils/getAllBlogs';
import { getAllEvents } from '@/utils/getAllEvents';
import { getAllPhotos } from '@/utils/getAllPhotos';

const events: Event[] = await getAllEvents();

const photos: Photo[] = await getAllPhotos();
const sortedPhotos = photos.sort((a, b) => Number(b.id) - Number(a.id));

const filters: BlogFilters = { sortOrder: 'desc', limit: 5 };
const posts: Post[] = await getAllBlogs(filters);

export default function HomePage() {
  return (
    <>
      <Hero />
      <ButtonGrid/>
      <AboutPreview/>
      <OurMission/>
      <GreatPrev/>
      <UpcomingEventsPage events={events} />
      <MasonryGrid items={sortedPhotos.slice(0, 6)} />
      <AdvicePreview/>
      <FeaturedBlogs posts={posts} />
    </>
  );
}
