import api from "@/utils/api";

export interface PublicBlog {
  _id: string;
  title: string;
  featuredImage?: string;
  category?: string;
  slug: string;
  excerpt?: string;
  createdAt: string;
}

export interface BlogDetail {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  businessId: string;
  authorId: string;
  status: "draft" | "published";
  publishedAt?: string;
  viewCount: number;
  commentCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PublicBlogPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PublicBlogsResponse {
  data: PublicBlog[];
  pagination: PublicBlogPagination;
}

export interface PublicBlogsParams {
  businessId?: string;
  category?: string;
  page?: number;
  limit?: number;
}

// Comment interfaces
export interface CommentLead {
  _id: string;
  name: string;
}

export interface Comment {
  _id: string;
  comment: string;
  createdAt: string;
  lead?: CommentLead;
}

export interface CommentsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CommentsResponse {
  data: Comment[];
  pagination: CommentsPagination;
}

export interface CreateCommentInput {
  name: string;
  email: string;
  phone: string;
  comment: string;
}

export interface CreateCommentResponse {
  _id: string;
  blogId: string;
  leadId: string;
  comment: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  message: string;
}

// Get public blogs for landing page
export const getPublicBlogs = async (
  params?: PublicBlogsParams,
): Promise<PublicBlogsResponse> => {
  const response = await api.get<PublicBlogsResponse>("/blogs/public", {
    params: {
      businessId: params?.businessId || undefined,
      category: params?.category || undefined,
      page: params?.page?.toString() || "1",
      limit: params?.limit?.toString() || "10",
    },
  });
  return response.data;
};

// Get blog by slug (full content)
export const getBlogBySlug = async (slug: string): Promise<BlogDetail> => {
  const response = await api.get<BlogDetail>(`/blogs/slug/${slug}`);
  return response.data;
};

// Get comments for a blog by slug (public - approved only)
export const getCommentsBySlug = async (
  slug: string,
  page: number = 1,
  limit: number = 10,
): Promise<CommentsResponse> => {
  const response = await api.get<CommentsResponse>(
    `/comments/blog/slug/${slug}`,
    {
      params: { page, limit },
    },
  );
  return response.data;
};

// Create a comment for a blog (public - with lead capture)
export const createComment = async (
  slug: string,
  data: CreateCommentInput,
): Promise<CreateCommentResponse> => {
  const response = await api.post<CreateCommentResponse>(
    `/comments/blog/slug/${slug}`,
    data,
  );
  return response.data;
};
