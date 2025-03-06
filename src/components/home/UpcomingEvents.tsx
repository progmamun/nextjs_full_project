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
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative w-full h-[200px] md:h-[250px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4 pb-2">
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {formatDate(date)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {location}
            </span>
          </div>
        </div>
      </CardContent>

      {link && (
        <CardFooter className="p-4 pt-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
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
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <PageHeading
            title="Upcoming Events"
            as="h2"
            description="Join us at our upcoming events and be part of our community journey"
          />
        </div>

        {/* Dynamically adjust grid layout based on number of events */}
        <div
          className={`max-w-7xl mx-auto ${events.length === 2
              ? 'flex justify-center gap-8'
              : 'grid grid-cols-1 md:grid-cols-3 gap-6'
            }`}
        >
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsPage;