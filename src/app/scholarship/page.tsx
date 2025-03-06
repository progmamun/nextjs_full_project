'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function ScholarshipPage() {
    return (
        <div className='dark:bg-gray-900'>
            <div className="container mx-auto py-10 px-4 md:px-6">
                <div className="flex flex-col items-center space-y-8 text-center">
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">শিক্ষাবৃত্তি ফর্ম</h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                            বাংলাদেশ ইসলামী ছাত্রশিবির, রবীন্দ্র বিশ্ববিদ্যালয়
                        </p>
                    </div>

                    <Card className="w-full max-w-4xl">
                        <CardContent className="p-0 sm:p-6">
                            <div className="relative w-full overflow-hidden">
                                <div className="pb-0" style={{
                                    position: 'relative',
                                    paddingTop: '150%', /* This controls the height-to-width ratio */
                                    width: '100%'
                                }}>
                                    <iframe
                                        src="https://docs.google.com/forms/d/e/1FAIpQLSd8fpCgUgPkDE8OrwuXNPcaXrG0kkT94FpybtN187GbiE_czg/viewform?embedded=true"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            border: 0
                                        }}
                                        title="Support Form"
                                    >
                                        Loading Google Form...
                                    </iframe>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}