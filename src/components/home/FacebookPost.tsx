import { FacebookPost } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import formatDateToBangla from "@/utils/helpers";

async function fetchFacebookPosts(): Promise<FacebookPost[]> {
  const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID;
  const accessToken = process.env.FB_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    throw new Error("Missing configuration");
  }

  const response = await fetch(
    `https://graph.facebook.com/v22.0/${pageId}/posts?access_token=${accessToken}&fields=id,message,created_time,permalink_url,attachments{media_type,url,media}`,
    { cache: "force-cache", next: { revalidate: 3600 } }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to fetch posts");
  }

  return data.data || [];
}

export default async function FacebookPostPage() {
  let posts: FacebookPost[] = [];
  let error: string | null = null;

  try {
    posts = await fetchFacebookPosts();
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <>
      {error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground text-center">
          কোনো পোস্ট পাওয়া যায়নি।
        </p>
      ) : (
        <ScrollArea className="h-[500px] mx-auto border rounded-md">
          <div className="p-4">
            <h1 className="text-2xl text-center text-sky-500 font-bold py-4">
              ফেসবুক পোস্ট সমূহ
            </h1>
            {posts.map((post) => {
              const firstAttachment = post.attachments?.data?.[0];
              return (
                <Card key={post.id} className="mb-4">
                  <CardContent className="pt-4 flex flex-col md:flex-row gap-4">
                    {firstAttachment?.media && (
                      <div className="w-full md:w-1/3 flex-shrink-0">
                        {firstAttachment.media.media_type === "video" ? (
                          <video
                            controls
                            src={firstAttachment.media.url}
                            className="w-full h-auto rounded-md"
                          />
                        ) : firstAttachment.media.image ? (
                          <img
                            src={firstAttachment.media.image.src}
                            alt="Post image"
                            className="w-full h-auto rounded-md object-cover"
                          />
                        ) : null}
                      </div>
                    )}
                    <div className="w-full md:w-2/3">
                      {post.message && (
                        <p className="text-foreground mb-2">{post.message}</p>
                      )}
                      <p className="text-muted-foreground text-sm">
                        পোস্ট করা হয়েছে: {formatDateToBangla(post.created_time)}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <a
                      href={post.permalink_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      ফেসবুকে দেখুন
                    </a>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </>
  );
}
