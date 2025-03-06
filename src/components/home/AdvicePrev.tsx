import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import advice from '../../../public/assets/poramorso.png'
import verticalLine from '../../../public/assets/advice-icn.png'
import { MoveUpRight } from 'lucide-react'

export function AdvicePreview() {
    const previewText = `এহতেসাব মানে অনুসন্ধান, সমালোচনা, পরীক্ষা-নিরীক্ষা, যাচাই-বাছাই, মূল্যায়ন, ফলাফল প্রত্যাশা, পুণ্য, নেকি বা সওয়াবের আশা ও আত্মজিজ্ঞাসা ইত্যাদি। মুহাসাবা শব্দটি আরবি হিসাব শব্দ থেকে এসেছে। হিসাব শব্দটি এসেছে হাসব শব্দ থেকে; যার আভিধানিক অর্থ হলো যথেষ্ট, পর্যাপ্ত, যথাযথ ইত্যাদি`;
    return (
        <section className="mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
            <Card className="max-w-4xl mx-auto dark:bg-gray-800 dark:border-gray-700 p-12">
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/3 flex flex-col items-center">
                            <h2 className="text-2xl font-bold dark:text-white text-center">এহতেসাব বা পরামর্শ</h2>
                            <Image
                                src={advice}
                                alt="About Us Preview"
                                width={400}
                                height={400}
                                className="rounded-lg shadow-lg object-cover bg-gray-800"
                            />
                        </div>

                        <div className="hidden md:block">
                            <Image
                                src={verticalLine}
                                alt="Vertical Line"
                                width={10} 
                                height={300} 
                                className="mx-4"
                            />
                        </div>

                        <div className="w-full md:w-2/3 space-y-4">
                            <p className="text-base leading-relaxed dark:text-gray-300 text-justify">
                                {previewText}
                            </p>
                            <Link href="/advice" passHref>
                                <Button variant="default" className="dark:bg-blue-600 dark:hover:bg-blue-700 mt-4">
                                    এহতেসাব/পরামর্শ দিন
                                    <MoveUpRight className='' />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
