import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Post } from "@/types/post";
import { urlFor } from '@/lib/sanity';
import Link from "next/link";
import formatDateToBangla from "@/utils/helpers";
import Image from "next/image";


interface BlogListProps {
  posts?: Post[];
}

const TableBlogCard = ({ posts = [] }: BlogListProps) => {
  if (!posts || posts.length === 0) {
    return (
      <Card className="p-6 text-center bg-slate-900 border border-slate-700">
        <p className="text-gray-400">কোনো ব্লগ পোস্ট পাওয়া যায়নি।</p>
      </Card>
    );
  }

  return (
    <>
      {posts.map((post) => {
        const encodedSlug = encodeURIComponent(post.slug.current); // ✅ Moved outside JSX
        return (
          <Card
            key={post._id}
            className="dark:bg-slate-900 border dark:border-slate-700 overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                {/* Left side - Image */}
                <div className="sm:w-1/3 flex-shrink-0 dark:bg-gray-800">
                  <Image
                    src={urlFor(post.mainImage)}
                    alt={post.mainImage?.alt || post.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right side - Content */}
                <div className="p-6 sm:w-2/3 flex flex-col justify-between space-y-3">
                  <h3 className="text-base font-bold dark:text-white">
                    {post.title.length > 25 ? post.title.slice(0, 25) + "..." : post.title}
                  </h3>

                  <p className="text-sm font-bold dark:text-slate-300 flex items-center">
                    <Calendar className="mr-2 w-4 h-4 text-sky-400" />
                    {formatDateToBangla(post.publishedAt)}
                  </p>

                  <Link href={`/blog/${encodedSlug}`} passHref>
                    <span className="text-blue-400 hover:underline">বিস্তারিত পড়ুন →</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default TableBlogCard;
