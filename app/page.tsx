'use client';
import Image from "next/image";
import React from 'react';
import { useState } from 'react';
import { Calendar, Mail, MapPin, Phone, Menu, X } from 'lucide-react';

export default function Home() {

  const [activeTab, setActiveTab] = useState('about');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const navItems = ['about', 'programs', 'blog', 'events', 'contact'];
    
    // Rest of the data stays the same
    const blogPosts = [
      {
        id: 1,
        title: "Community Outreach Program Success",
        date: "2025-02-14",
        excerpt: "Our recent community outreach program reached over 1000 people...",
        image: "/api/placeholder/400/300"
      },
      {
        id: 2,
        title: "Annual Fundraising Event",
        date: "2025-02-10",
        excerpt: "This year's fundraising event exceeded our goals by 150%...",
        image: "/api/placeholder/400/300"
      }
    ];
  
    const events = [
      {
        id: 1,
        title: "Volunteer Training Workshop",
        date: "2025-03-01",
        location: "Community Center"
      },
      {
        id: 2,
        title: "Youth Leadership Program",
        date: "2025-03-15",
        location: "Main Office"
      }
    ];
  
  return (
    <div className="min-h-screen bg-gray-50">
          {/* Header with responsive navigation */}
          <header className="bg-white shadow-sm relative">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <nav className="flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">NonProfit Name</div>
                
                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
    
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                  {navItems.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${
                        activeTab === tab
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-blue-500'
                      } capitalize px-2 py-4 transition-colors`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
    
                {/* Mobile Navigation */}
                <div className={`
                  absolute top-full left-0 right-0 
                  bg-white shadow-lg md:hidden
                  transition-transform duration-300 ease-in-out
                  ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
                  ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}>
                  <div className="flex flex-col p-4 space-y-4">
                    {navItems.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setIsMenuOpen(false);
                        }}
                        className={`${
                          activeTab === tab
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:bg-gray-50'
                        } capitalize px-4 py-2 rounded-lg text-left transition-colors`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </header>
    
          {/* Rest of the component remains the same */}
          {/* Hero Section */}
          <div className="bg-blue-600 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold mb-6">Making a Difference Together</h1>
              <p className="text-xl mb-8">Join us in our mission to create positive change in our community</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Get Involved
              </button>
            </div>
          </div>
    
          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 py-12">
            {activeTab === 'blog' && (
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{post.date}</span>
                        <button className="text-blue-600 hover:text-blue-700">Read More →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
    
            {activeTab === 'events' && (
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start space-x-4">
                      <Calendar className="text-blue-600 w-6 h-6 mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-2">Date: {event.date}</p>
                        <p className="text-gray-600">Location: {event.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
    
            {activeTab === 'contact' && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-blue-600" />
                      <span>123 Nonprofit Street, City, Country</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-blue-600" />
                      <span>+1 234 567 8900</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="text-blue-600" />
                      <span>contact@nonprofit.org</span>
                    </div>
                  </div>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-2 border rounded"
                    />
                    <textarea
                      placeholder="Your Message"
                      className="w-full p-2 border rounded h-32"
                    ></textarea>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}
          </main>
    
          {/* Footer */}
          <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">About Us</h3>
                  <p className="text-gray-400">
                    We are dedicated to making a positive impact in our community through various programs and initiatives.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>Our Programs</li>
                    <li>Get Involved</li>
                    <li>Donate</li>
                    <li>Contact</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="p-2 rounded-l w-full text-gray-800"
                    />
                    <button className="bg-blue-600 px-4 rounded-r hover:bg-blue-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
  );
}

