'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function AdvicePage() {
    return (
        <div className='dark:bg-gray-900'>
            <div className="container mx-auto py-10 px-4 md:px-6">
                <div className="flex flex-col items-center space-y-8 text-center">
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">এহতেসাব/পরামর্শ ফর্ম</h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                            বাংলাদেশ ইসলামী ছাত্রশিবির, রবীন্দ্র বিশ্ববিদ্যালয়
                        </p>
                    </div>

                    <Card className="w-full md:max-w-4xl">
                        <CardContent className="p-0">
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSf-ffXf1QvkXLVy-WyrX38J-pCGD4wLdMgzQ03lLTMKSAsnOA/viewform?embedded=true"
                                className='w-full md:h-[1000px] h-[1150px]'
                                title="Support Form"
                            >
                                Loading Google Form...
                            </iframe>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}