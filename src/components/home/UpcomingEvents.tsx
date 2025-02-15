import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Event } from '../../types';


const EventCard = ({ title, date, location, description }: Event) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src="/api/placeholder/400/200"
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-medium text-blue-600">Upcoming</span>
        </div>
      </div>

      <CardHeader>
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm">{formatDate(date)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface UpcomingEventsPageProps {
  events: Event[];
}


const UpcomingEventsPage: React.FC<UpcomingEventsPageProps> = ({ events }) => {
  

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600">
           {`Join us at our upcoming events and be part of our community's journey`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsPage;