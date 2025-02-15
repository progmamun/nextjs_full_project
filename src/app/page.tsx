import FeaturedBlogs from '@/components/home/FeaturedBlogs';
import Hero from '@/components/home/Hero';
import UpcomingEventsPage from '@/components/home/UpcomingEvents';
import { samplePosts, sampleEvents } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedBlogs posts={samplePosts.slice(0, 3)} />
      <UpcomingEventsPage events={sampleEvents.slice(0, 2)} />
    </>
  );
}
