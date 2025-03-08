import { AboutPreview } from '@/components/home/AboutPrev';
import { AdvicePreview } from '@/components/home/AdvicePrev';
import ButtonGrid from '@/components/home/ButtonGrid';
import FeaturedBlogs from '@/components/home/FeaturedBlogs';
import Gallery from '@/components/home/Gallery';
import { GreatPrev } from '@/components/home/GreatPrev';
import Hero from '@/components/home/Hero';
import OurMission from '@/components/home/OurMission';
import UpcomingEventsPage from '@/components/home/UpcomingEvents';
import { Event} from '@/types';
import { Post } from '@/types/post';
import { BlogFilters, getAllBlogs } from '@/utils/getAllBlogs';
import { getAllEvents } from '@/utils/getAllEvents';

const events: Event[] = await getAllEvents();

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
      <Gallery/>
      <AdvicePreview/>
      <FeaturedBlogs posts={posts} />
    </>
  );
}
