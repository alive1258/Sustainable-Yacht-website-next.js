import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import type { ApiResponse } from "@/src/types/axios";
import type { BlogItem, BlogPaginatedResponse } from "@/src/types/blogType";
import type { BlogDetail } from "@/src/types/blogDetailsType";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogBySlug(slug: string): Promise<BlogItem | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/slug/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const body: ApiResponse<BlogItem> = await res.json();
    return body.data ?? null;
  } catch {
    return null;
  }
}

async function getBlogSections(blogId: string): Promise<BlogDetail[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog-details/by-blog/${blogId}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: ApiResponse<BlogDetail[]> = await res.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

async function getRelatedPosts(excludeSlug: string): Promise<BlogItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog?status=true&limit=4&sort_by=created_at&sort_order=DESC`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return [];

    const body: BlogPaginatedResponse = await res.json();
    return (body.data ?? []).filter((p) => p.slug !== excludeSlug).slice(0, 3);
  } catch {
    return [];
  }
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const [sections, relatedPosts] = await Promise.all([
    getBlogSections(post.id),
    getRelatedPosts(post.slug ?? slug),
  ]);

  const fallbackParagraphs = sections.length === 0 ? post.content?.split("\n\n") : undefined;

  return (
    <>
      <section className="relative flex min-h-[380px] items-center overflow-hidden py-20 md:min-h-[460px]">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/60 to-brand-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 via-transparent to-transparent" />

        <div className="container relative">
          {post.category?.category_name && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              {post.category.category_name}
            </span>
          )}
          <h1 className="mt-5 max-w-2xl text-4xl sm:text-5xl font-bold text-white leading-[1.1]">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {formatDate(post.created_at)}
            </span>
            {post.author_name && (
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.author_name}
              </span>
            )}
            {post.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.read_time}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          <div className="mx-auto mt-8 max-w-3xl">
            {post.excerpt && (
              <p className="text-lg text-brand-900/80 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="mt-6 space-y-12">
              {sections.map((section) => (
                <div key={section.id} id={section.section_key}>
                  {section.heading && (
                    <h2 className="text-xl font-bold text-brand-900">
                      {section.heading}
                    </h2>
                  )}

                  {section.image && (
                    <div className="relative mt-4 aspect-16/9 overflow-hidden rounded-2xl">
                      <Image
                        src={section.image}
                        alt={section.heading ?? post.title}
                        fill
                        sizes="(min-width: 1024px) 768px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {section.body && (
                    <div className="mt-4 space-y-5">
                      {section.body.split("\n\n").map((paragraph, i) => (
                        <p key={i} className="text-brand-900/70 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2 text-brand-900/70">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                          <span>
                            {bullet.title && (
                              <span className="font-semibold text-brand-900">
                                {bullet.title}
                                {bullet.text ? " — " : ""}
                              </span>
                            )}
                            {bullet.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {fallbackParagraphs?.map((paragraph, i) => (
                <p key={i} className="text-brand-900/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="bg-brand-50/50 py-16 md:py-24">
          <div className="container">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-900">
              More Sailing Insights
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    {related.image && (
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="flex items-center gap-1.5 text-xs text-brand-900/50">
                      <CalendarDays size={13} />
                      {formatDate(related.created_at)}
                    </span>
                    <h3 className="mt-2 font-bold text-brand-900 leading-snug transition-colors group-hover:text-brand-600">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-brand-900 py-16 md:py-20">
        <div className="container flex flex-col items-center text-center gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Plan Your Own Charter?
          </h2>
          <p className="max-w-lg text-brand-100/80">
            Browse the fleet or talk to our team about your next itinerary.
          </p>
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
          >
            Browse the Fleet
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
