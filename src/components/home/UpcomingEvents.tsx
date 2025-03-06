import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Event } from '../../types';
import PageHeading from '../common/PageHeading';
import Image from 'next/image';

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const EventCard: React.FC<Event> = ({
  title,
  date,
  location,
  description,
  link,
  image
}) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-md mx-auto">
      <CardHeader className="p-0">
        <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </CardHeader>
      
      <CardHeader className="pb-2 px-4 sm:px-6">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4 pb-2 px-4 sm:px-6">
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {formatDate(date)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
              {location}
            </span>
          </div>
        </div>
      </CardContent>

      {link && (
        <CardFooter className="p-4 sm:p-6 pt-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <button className="w-full px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Register Now
            </button>
          </a>
        </CardFooter>
      )}
    </Card>
  );
};

interface UpcomingEventsPageProps {
  events: Event[];
}

const UpcomingEventsPage: React.FC<UpcomingEventsPageProps> = ({ events }) => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          <PageHeading
            title="আসন্ন ইভেন্ট"
            as="h2"
            description="আমাদের আসন্ন ইভেন্টগুলিতে আমাদের সাথে যোগ দিন এবং আমাদের সংগঠনের যাত্রার অংশ হোন"
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className={`
            grid gap-6 
            grid-cols-1 
            sm:grid-cols-1 
            ${events.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}
          `}>
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsPage;