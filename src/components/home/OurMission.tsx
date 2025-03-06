'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function OurMission() {
  const [activeTab, setActiveTab] = useState('mission');

  const tabContents = {
    mission: "তরুণ ছাত্রসমাজের কাছে ইসলামের আহ্বান পৌঁছিয়ে তাদের মাঝে ইসলামী জ্ঞান অর্জন এবং বাস্তব জীবনে ইসলামের পূর্ণ অনুশীলনের দায়িত্বানুভূতি জাগ্রত করা।",
    vision: "যে সব ছাত্র ইসলামী জীবনবিধান প্রতিষ্ঠার সংগ্রামে অংশ নিতে প্রস্তুত তাদেরকে সংগঠনের অধীনে সংঘবদ্ধ করা।",
    values: "এই সংগঠনের অধীনে সংঘবদ্ধ ছাত্রদেরকে ইসলামী জ্ঞান প্রদান এবং আদর্শ চরিত্রবানরূপে গড়ে তুলে জাহেলিয়াতের সমস্ত চ্যালেঞ্জের মোকাবেলায় ইসলামের শ্রেষ্ঠত্ব প্রমাণ করার যোগ্যতাসম্পন্ন কর্মী হিসেবে গড়ার কার্যকরী ব্যবস্থা করা।",
    approach: "আদর্শ নাগরিক তৈরীর উদ্দেশ্যে ইসলামী মূল্যবোধের ভিত্তিতে শিক্ষাব্যবস্থার পরিবর্তন সাধনের দাবিতে সংগ্রাম এবং ছাত্রসমাজের প্রকৃত সমস্যা সমাধানের সংগ্রামে নেতৃত্ব প্রদান।",
    impact: "অর্থনৈতিক শোষণ, রাজনৈতিক নিপীড়ন এবং সাংস্কৃতিক গোলামী হতে মানবতার মুক্তির জন্য ইসলামী সমাজ বিনির্মাণে সর্বাত্মক প্রচেষ্টা চালানো।"
  };

  const tabTitles = [
    { value: 'mission', label: 'দাওয়াত' },
    { value: 'vision', label: 'সংগঠন' },
    { value: 'values', label: 'প্রশিক্ষণ' },
    { value: 'approach', label: 'ইসলামী শিক্ষা ও ছাত্রসমস্যা' },
    { value: 'impact', label: 'ইসলামী সমাজ বিনির্মাণ' }
  ];

  return (
    <div className="mx-auto px-4 py-8 md:py-12 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* First Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg">
          <CardContent className="p-4 md:p-6 space-y-6">
            <div className="space-y-4 p-8">
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
                আমাদের লক্ষ্য ও উদ্দেশ্য
              </h2>
              <p className="text-base md:text-lg dark:text-gray-300 leading-relaxed">
                আল্লাহ প্রদত্ত ও রাসূল (সাঃ) প্রদর্শিত বিধান অনুযায়ী মানুষের সার্বিক জীবনের পুনর্বিন্যাস সাধন করে আল্লাহর সন্তোষ অর্জন।
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Second Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg">
          <CardContent className="p-4 md:p-6 space-y-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-center mb-4 md:mb-6 dark:text-white">
                ৫ দফা কর্মসূচি
              </h3>
              
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab} 
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 gap-2 w-full mb-4 rounded-lg mx-auto">
                  {tabTitles.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="dark:text-gray-300 dark:hover:bg-gray-600 
                                dark:data-[state=active]:bg-blue-900 
                                dark:data-[state=active]:text-white 
                                 whitespace-nowrap"
                    >
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mt-16">
                  <p className="text-base md:text-lg dark:text-gray-200 leading-relaxed break-words">
                    {tabContents[activeTab as keyof typeof tabContents]}
                  </p>
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}