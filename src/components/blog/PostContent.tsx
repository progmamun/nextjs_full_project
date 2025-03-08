// components/blog/PostContent.tsx
import { PortableText } from '@portabletext/react';
import { Post } from '@/types/post';

const PostContent = ({ post }: { post: Post }) => {
  return (
    <article className="prose prose-lg max-w-none text-justify">
      {post.body ? (
        <PortableText
          value={post.body}
          components={{
            marks: {
              link: ({ value, children }) => (
                <a
                  href={encodeURIComponent(value.href)} // Encode the URL
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            },
          }}
        />
      ) : (
        <p>No content available.</p>
      )}
    </article>
  );
};

export default PostContent;