import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import aboutImg from '../../../public/assets/about.jpg'
import { MoveUpRight } from 'lucide-react'

export function GreatPrev() {
    const previewText = `এদেশকে একটি সমৃদ্ধ, স্বনির্ভর দেশ হিসেবে গড়ে তোলার লক্ষ্যে বাংলাদেশ ইসলামী ছাত্রশিবির সৎ, দক্ষ ও দেশপ্রেমিক নেতৃত্ব তৈরির প্রকল্প নিয়ে প্রতিষ্ঠাকালীন সময় থেকেই একাগ্রতার সাথে কাজ করে যাচ্ছে। ১৯৭৭ সালের ৬ ফেব্রুয়ারী ঢাকা বিশ্ববিদ্যালয়ের কেন্দ্রীয় জামে মসজিদ থেকে যাত্রা শুরু করে ইসলামী ছাত্রশিবির। সে লগ্ন থেকে অদ্যাবধি দেশের ক্রান্তিকালীন সময়ে সম্মুখ সারিতে থেকে সংকট উত্তরণে সাহসী ও বুদ্ধিদীপ্ত ভূমিকা রেখেছে এ সংগঠন।`;
    
    return (
        <section className="mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
            <Card className="max-w-4xl mx-auto dark:bg-gradient-to-br dark:from-gray-800 dark:to-blue-900 dark:border-blue-700 shadow-xl">
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/3 relative">
                            <Image
                                src={aboutImg}
                                alt="About Us Preview"
                                width={400}
                                height={400}
                                className="rounded-lg shadow-lg object-cover border-4 border-blue-500 dark:border-blue-400"
                            />
                            <div className="absolute -top-2 -left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
                            সভাপতি
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                সভাপতির শুভেচ্ছা বক্তব্য
                            </h2>
                            <h2 className="text-2xl font-bold text-blue-400">আরমান</h2>
                            <p className="text-lg leading-relaxed dark:text-gray-200 bg-gray-800/10 p-4 rounded-lg border-l-4 border-blue-500">
                                {previewText}
                            </p>
                            <Link href="/peoples/1" passHref>
                                <Button 
                                    variant="default" 
                                    className="dark:bg-gradient-to-r dark:from-blue-600 dark:to-green-600 dark:hover:from-blue-700 dark:hover:to-green-700 mt-4 transform hover:scale-105 transition-transform duration-200"
                                >
                                    বিস্তারিত পড়ুন 
                                    <MoveUpRight className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}