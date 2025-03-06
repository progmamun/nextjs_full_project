import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PeoplePhoto } from "@/types";
import { getAllPeoplesPhoto } from "@/utils/getAllPeoplesPhoto";
import Image from "next/image";
import Link from "next/link";


export default async function PeoplePage() {
    const peopleData: PeoplePhoto[] = await getAllPeoplesPhoto();

    return (
        <div className="dark:bg-gray-900">
            <div className="container mx-auto dark:bg-gray-900 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">দায়িত্বশীলবৃন্দ</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
                    {peopleData.map((person) => (
                        <Link key={person.id} href={`/peoples/${person.id}`}>
                            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <Image
                                        src={person?.image}
                                        alt={person.name}
                                        width={800}
                                        height={800}
                                        className="rounded-lg"    
                                    />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="text-2xl text-center">{person.name}</CardTitle>
                                    <Separator/>
                                    <CardDescription className="text-sky-500 text-xl text-center">{person.designation}</CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    );
}