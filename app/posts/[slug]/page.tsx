import { getPost } from "../../lib/posts";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post: any = await getPost(params.slug);

  return (
    <article className="p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.date}</p>
      <div className="mt-4 prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
