import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPeoplesPhoto } from "@/utils/getAllPeoplesPhoto";
import { PeoplePhoto } from "@/types";

export async function generateStaticParams() {
  const photos = await getAllPeoplesPhoto();
  return photos.map((photo: PeoplePhoto) => ({ id: photo.id }));
}


export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const peopleData: PeoplePhoto[] = await getAllPeoplesPhoto();

  // Fix: Use the resolved id from params instead of params.id
  const person = peopleData.find((p) => p.id === id); // Changed from params.id to id

  if (!person) {
    notFound();
  }

  return (
    <div className="dark:bg-gray-900">
      <div className="container mx-auto p-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Image
            src={person.image}
            alt={person.name}
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <p className="font-bold text-2xl">{person.name}</p>
          <p className="text-blue-500 text-xl">{person.designation}</p>
          <p className="text-lg"><strong>ডিপার্টমেন্ট:</strong> {person.dept}</p>
          {person.hall && <p className="text-lg"><strong>Hall:</strong> {person.hall}</p>}
          <p className="text-lg"><strong>সেশন:</strong> {person.session}</p>
        </div>
      </div>
          {person.quotes && <p className="text-lg"> {person.quotes}</p>}
    </div>
    </div>
  );
}