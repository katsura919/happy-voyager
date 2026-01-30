import { getPublicBlogs, PublicBlog } from "@/api/blogs.api";
import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface BlogListingPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogListingPage({
  searchParams,
}: BlogListingPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const category = params.category;

  // Fetch blogs from API with businessId from env
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID;

  let blogs: PublicBlog[] = [];
  let pagination = {
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  try {
    const response = await getPublicBlogs({
      businessId,
      category,
      page: currentPage,
      limit: 9,
    });
    blogs = response.data;
    pagination = {
      page: response.pagination.page,
      totalPages: response.pagination.totalPages,
      hasNextPage: response.pagination.hasNextPage,
      hasPrevPage: response.pagination.hasPrevPage,
    };
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (pagination.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= pagination.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(pagination.totalPages);
      } else if (currentPage >= pagination.totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = pagination.totalPages - 3; i <= pagination.totalPages; i++)
          pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(pagination.totalPages);
      }
    }
    return pages;
  };

  const buildPageUrl = (page: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());
    if (category) searchParams.set("category", category);
    return `/blog?${searchParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col font-sans">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative px-6 py-16 md:py-24 bg-[var(--color-secondary)] mb-12 overflow-hidden">
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-accent)] opacity-20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="container mx-auto relative z-10 max-w-4xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-script text-[var(--color-charcoal)] animate-fade-in relative inline-block">
              <span className="relative z-10">Our Travel Journal</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[var(--color-primary)]/30 -rotate-1 rounded-full -z-10" />
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-2xl mx-auto leading-relaxed">
              Stories, tips, and inspiration for your next handcrafted journey.
              Discover the world through our eyes.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="container mx-auto px-6 max-w-7xl">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--color-muted-foreground)] text-lg">
                No blog posts found. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-16 text-center">
              <div className="inline-flex space-x-2">
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="w-10 h-10 flex items-center justify-center text-[var(--color-muted-foreground)]"
                    >
                      ...
                    </span>
                  ) : (
                    <Link
                      key={page}
                      href={buildPageUrl(page as number)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        page === currentPage
                          ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                          : "bg-white text-[var(--color-charcoal)] border border-[var(--color-border)] hover:bg-[var(--color-secondary)]"
                      }`}
                    >
                      {page}
                    </Link>
                  ),
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
