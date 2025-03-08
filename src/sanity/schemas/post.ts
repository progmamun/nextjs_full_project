// schemas/post.ts (in your Sanity project)
const post = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }, // Reference
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } },
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
  ],
};
export default post;