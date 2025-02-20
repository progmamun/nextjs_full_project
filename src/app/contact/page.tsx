"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import PageHeading from '@/components/common/PageHeading';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '';

const ContactPage = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your form submission logic here
        // Extract form data
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const templateParams = {
            name: formData.get('firstName') + ' ' + formData.get('lastName'),
            email: formData.get('email'),
            message: formData.get('message'),
        };


        emailjs.send(serviceId, templateId, templateParams, userId )
            .then((response) => {
                toast.success(`Successfully created! ${response.status}`);
                // Reset the form after successful submission
                form.reset();
            }, (error) => {
                toast.error(`This is an error! ${error}`);
            });
    };

    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <PageHeading title='Contact Us' as='h1' />
                    <p className="text-lg max-w-2xl mx-auto">
                        {"We'd love to hear from you. Please fill out the form below or reach out through our contact information."}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Get in Touch</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Mail className="h-6 w-6 text-blue-600" />
                                    <div>
                                        <h3 className="font-medium">Email</h3>
                                        <p className="text-gray-600">contact@yournonprofit.org</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Phone className="h-6 w-6 text-blue-600" />
                                    <div>
                                        <h3 className="font-medium">Phone</h3>
                                        <p className="text-gray-600">(555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <MapPin className="h-6 w-6 text-blue-600" />
                                    <div>
                                        <h3 className="font-medium">Address</h3>
                                        <p className="text-gray-600">
                                            123 Nonprofit Street<br />
                                            City, State 12345
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-medium">
                                                First Name
                                            </label>
                                            <Input id="firstName" name="firstName" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-medium">
                                                Last Name
                                            </label>
                                            <Input id="lastName" name="lastName" placeholder="Doe" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">
                                            Message
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Your message here..."
                                            className="min-h-32"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;