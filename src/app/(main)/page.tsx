import { AboutPreview } from '@/components/home/AboutPrev';
import { AdvicePreview } from '@/components/home/AdvicePrev';
import ButtonGrid from '@/components/home/ButtonGrid';
import FeaturedBlogs from '@/components/home/FeaturedBlogs';
import Gallery from '@/components/home/Gallery';
import { GreatPrev } from '@/components/home/GreatPrev';
import Hero from '@/components/home/Hero';
import OurMission from '@/components/home/OurMission';
import UpcomingEventsPage from '@/components/home/UpcomingEvents';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { Event,  Post } from '@/types';
import { getAllBlogs } from '@/utils/getAllBlogs';
import { getAllEvents } from '@/utils/getAllEvents';

const events: Event[] = await getAllEvents();
const posts: Post[] = await getAllBlogs();

export default function HomePage() {
  return (
    <>
    <Navigation/>
      <Hero />
      <ButtonGrid/>
      <AboutPreview/>
      <OurMission/>
      <GreatPrev/>
      <UpcomingEventsPage events={events} />
      <Gallery/>
      <AdvicePreview/>
      <FeaturedBlogs posts={posts} />
      <Footer/>
    </>
  );
}
