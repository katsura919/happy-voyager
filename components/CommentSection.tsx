"use client";

import { useState, useEffect } from "react";
import {
  Comment,
  getCommentsBySlug,
  createComment as createCommentApi,
  CommentsPagination,
} from "@/api/blogs.api";
import LeadForm from "./LeadForm";
import {
  User as UserIcon,
  MessageSquare,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CommentSectionProps {
  slug: string;
}

const COMMENTS_PER_PAGE = 5;

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<CommentsPagination | null>(null);
  const [leadInfo, setLeadInfo] = useState<{
    name: string;
    email: string;
    phone: string;
  } | null>(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await getCommentsBySlug(slug, 1, COMMENTS_PER_PAGE);
        setComments(response.data);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [slug]);

  // Check for stored lead info in localStorage
  useEffect(() => {
    const storedLead = localStorage.getItem("leadInfo");
    if (storedLead) {
      try {
        setLeadInfo(JSON.parse(storedLead));
      } catch {
        localStorage.removeItem("leadInfo");
      }
    }
  }, []);

  const handleLoadMore = async () => {
    if (!pagination || pagination.page >= pagination.totalPages) return;

    try {
      setLoadingMore(true);
      const nextPage = pagination.page + 1;
      const response = await getCommentsBySlug(
        slug,
        nextPage,
        COMMENTS_PER_PAGE,
      );
      setComments((prev) => [...prev, ...response.data]);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Failed to load more comments:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleLeadSuccess = (data: {
    name: string;
    email: string;
    phone: string;
  }) => {
    setLeadInfo(data);
    localStorage.setItem("leadInfo", JSON.stringify(data));
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !leadInfo) return;

    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await createCommentApi(slug, {
        name: leadInfo.name,
        email: leadInfo.email,
        phone: leadInfo.phone,
        comment: newComment,
      });

      // Show success message - comment needs approval
      setSuccessMessage(
        response.message ||
          "Thank you! Your comment has been submitted and is pending approval.",
      );
      setNewComment("");

      // Note: We don't add to comments list since it needs approval
    } catch (err: unknown) {
      console.error("Failed to submit comment:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit comment";
      setError(
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || errorMessage,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeLead = () => {
    setLeadInfo(null);
    localStorage.removeItem("leadInfo");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes} minutes ago`;
      }
      return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const totalComments = pagination?.total || comments.length;
  const hasMoreComments = pagination && pagination.page < pagination.totalPages;

  return (
    <div className="max-w-3xl mx-auto mt-16 pb-16">
      {/* Header with toggle */}
      <div
        className="flex items-center justify-between mb-6 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-[var(--color-secondary)] p-2 rounded-full">
            <MessageSquare className="w-5 h-5 text-[var(--color-charcoal)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-charcoal)]">
            Comments
          </h2>
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full text-sm font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            {totalComments}
          </span>
        </div>
        <button
          className="p-2 rounded-full hover:bg-[var(--color-secondary)] transition-colors"
          aria-label={isExpanded ? "Collapse comments" : "Expand comments"}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[var(--color-muted-foreground)]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[var(--color-muted-foreground)]" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-8 animate-fade-in">
          {/* Comment Form Area */}
          <section>
            {!leadInfo ? (
              <div className="bg-[var(--color-secondary)]/30 p-1 rounded-2xl">
                <LeadForm onSuccess={handleLeadSuccess} />
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                      Commenting as{" "}
                      <span className="text-[var(--color-primary)]">
                        {leadInfo.name}
                      </span>
                    </p>
                    <button
                      onClick={handleChangeLead}
                      className="text-xs text-[var(--color-muted-foreground)] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100 mb-4">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg border border-green-100 mb-4">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-4 rounded-xl border border-[var(--color-input)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all min-h-[100px] resize-y bg-[var(--color-background)]/50"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary py-2 px-6 flex items-center space-x-2 text-sm"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Post Comment</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>

          {/* Comments List */}
          <section>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
                <span className="ml-2 text-[var(--color-muted-foreground)]">
                  Loading comments...
                </span>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-[var(--color-border)]">
                <MessageSquare className="w-12 h-12 mx-auto text-[var(--color-muted-foreground)]/30 mb-3" />
                <p className="text-[var(--color-muted-foreground)]">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {/* Comments container with max height and scroll */}
                <div
                  className={`divide-y divide-[var(--color-border)] ${
                    comments.length > 8
                      ? "max-h-[500px] overflow-y-auto pr-2"
                      : ""
                  }`}
                >
                  {comments.map((comment) => (
                    <article
                      key={comment._id}
                      className="py-4 first:pt-0 flex gap-3"
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Name and time */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-[var(--color-charcoal)]">
                            {comment.lead?.name || "Anonymous"}
                          </span>
                          <span className="text-xs text-[var(--color-muted-foreground)]">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        {/* Comment text */}
                        <p className="text-sm text-[var(--color-foreground)] leading-relaxed">
                          {comment.comment}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreComments && (
                  <div className="pt-4 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="text-sm font-medium text-[var(--color-primary)] hover:underline disabled:opacity-50"
                    >
                      {loadingMore
                        ? "Loading..."
                        : `View more comments (${pagination.total - comments.length} remaining)`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
