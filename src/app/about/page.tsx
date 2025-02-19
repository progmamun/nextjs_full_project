import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Target } from 'lucide-react';
import PageHeading from '@/components/common/PageHeading';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                <PageHeading title='About Us' as='h1' />
                    <p className="text-lg max-w-2xl mx-auto">
                        Making a difference in our community through dedication, compassion, and service.
                    </p>
                </div>

                {/* Mission and Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <Card className="p-6">
                        <div className="flex items-center mb-4">
                            <Heart className="h-8 w-8 text-blue-600 mr-3" />
                            <h2 className="text-2xl font-bold">Our Mission</h2>
                        </div>
                        <CardContent className="p-0">
                            <p className="">
                                To empower and strengthen our community by providing essential resources,
                                education, and support to those in need, while fostering sustainable
                                development and positive social change.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center mb-4">
                            <Target className="h-8 w-8 text-blue-600 mr-3" />
                            <h2 className="text-2xl font-bold">Our Vision</h2>
                        </div>
                        <CardContent className="p-0">
                            <p className="">
                                A world where every individual has access to opportunities for growth,
                                where communities thrive through mutual support, and where positive
                                change creates lasting impact.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Jane Smith",
                                role: "Executive Director",
                                image: "/api/placeholder/150/150",
                                bio: "20+ years of nonprofit leadership experience"
                            },
                            {
                                name: "John Davis",
                                role: "Program Manager",
                                image: "/api/placeholder/150/150",
                                bio: "Dedicated to community development"
                            },
                            {
                                name: "Sarah Johnson",
                                role: "Volunteer Coordinator",
                                image: "/api/placeholder/150/150",
                                bio: "Passionate about connecting people"
                            }
                        ].map((member) => (
                            <Card key={member.name} className="text-center p-6">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-blue-600 mb-2">{member.role}</p>
                                <p className="">{member.bio}</p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Impact Section */}
                <div className="rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: "5,000+", label: "People Helped" },
                            { number: "100+", label: "Active Volunteers" },
                            { number: "50+", label: "Community Programs" }

                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</p>
                                <p className="">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;