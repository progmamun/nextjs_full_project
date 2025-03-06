// PostContent.tsx
import React from 'react';

interface Post {
  content: string;
}

const PostContent = ({ post }: { post: Post }) => {
  // Split the content by <br/> tags to handle line breaks
  const contentParts = post.content.split('<br/>');

  return (
    <article className="prose prose-lg max-w-none text-justify">
      {contentParts.map((part, index) => (
        <React.Fragment key={index}>
          {/* Use dangerouslySetInnerHTML to render HTML content */}
          <p
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{
                __html: part.replace(
                  /<a /g,
                  '<a class="text-blue-600 underline hover:text-blue-800" '
                ),
              }}
          />
          {index < contentParts.length - 1 && <br />} {/* Add line break if not the last part */}
        </React.Fragment>
      ))}
    </article>
  );
};

export default PostContent;
