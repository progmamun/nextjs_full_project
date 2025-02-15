import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';

const EventsPage = () => {
  const events = [
    {
      id: 1,
      title: "Annual Fundraising Gala",
      date: "2025-03-15",
      time: "6:00 PM - 10:00 PM",
      location: "Grand Community Center",
      description: "Join us for our biggest fundraising event of the year, featuring dinner, entertainment, and a silent auction.",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Community Cleanup Day",
      date: "2025-03-22",
      time: "9:00 AM - 2:00 PM",
      location: "City Park",
      description: "Help us keep our community clean and beautiful. Equipment and refreshments provided.",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Workshop Series: Financial Literacy",
      date: "2025-04-05",
      time: "2:00 PM - 4:00 PM",
      location: "Community Library",
      description: "Learn essential financial skills in this free workshop series led by industry experts.",
      image: "/api/placeholder/400/250"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us at our upcoming events and help make a difference in our community.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-600">{event.description}</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendar Download Section */}
        <div className="mt-12 text-center">
          <Button variant="outline" className="inline-flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Download Event Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;