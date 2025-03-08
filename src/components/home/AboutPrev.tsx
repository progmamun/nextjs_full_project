import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import aboutImg from '../../../public/assets/about.jpg'

export function AboutPreview() {
    const previewText = `দেশের প্রতিটি জনপদে কাজ করে যাচ্ছে বাংলাদেশ ইসলামী ছাত্রশিবির। শিবির একজন তরুণকে একই সাথে একজন ভাল ছাত্র ও একজন ভাল মুসলমান হিসেবে গড়ে তুলতে চেষ্টা করে। ইসলাম সকল মানুষের কল্যাণের জন্য; তাই ইসলামী ছাত্রশিবির মুসলমান, হিন্দু, বৌদ্ধ ও খ্রিস্টানসহ সবার কাছে ইসলামের সুমহান সৌন্দর্যকে সুন্দরভাবে তুলে ধরার কর্মসূচি নিয়ে এগিয়ে যাচ্ছে। তাই এই সুন্দর কর্মসূচি ও চরিত্রবান কর্মীদের প্রতি দিন দিন জনসমর্থন বাড়ছে। আসুন, আপনিও শিবিরের পতাকাতলে সমবেত হয়ে নিজেকে গড়ে তুলুন সুন্দর ও যোগ্যতম ব্যক্তি হিসেবে। শরিক হউন ইহকাল ও পরকালের মুক্তিকামী মানুষের এই কাফেলায়।`;
    return (
        <section className="mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
            <Card className="max-w-4xl mx-auto dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/3">
                            <Image
                                src={aboutImg}
                                alt="About Us Preview"
                                width={400}
                                height={400}
                                className="rounded-lg shadow-lg object-cover"
                            />
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <h2 className="text-2xl font-bold dark:text-white">সংক্ষিপ্ত পরিচিতি</h2>
                            <h2 className="text-2xl font-bold dark:text-white">বাংলাদেশ ইসলামী ছাত্রশিবির</h2>
                            <p className="text-lg leading-relaxed dark:text-gray-300 text-justify">
                                {previewText}
                            </p>
                            <Link href="/about" passHref>
                                <Button variant="default" className="dark:bg-blue-600 dark:hover:bg-blue-700 mt-4">
                                    বিস্তারিত পড়ুন →
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}