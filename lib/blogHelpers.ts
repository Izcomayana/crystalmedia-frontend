import { fetchPaginatedBlogs, getTotalBlogsCount } from "@/lib/firebaseUtils";
import type { Blog } from "@/lib/firebaseUtils";

// Fetch total blog count and initial pagination pointers
export const fetchInitialPaginationData = async (
  pageSize: number
): Promise<{ totalPages: number; pagePointers: any[] }> => {
  const pagePointers: any[] = [];
  let lastVisibleDoc: any = null;

  try {
    // Step 1: Calculate the total number of pages
    const totalBlogs = await getTotalBlogsCount();
    const totalPages = Math.ceil(totalBlogs / pageSize);

    // Step 2: Collect all page pointers
    while (true) {
      const { blogs, lastDoc } = await fetchPaginatedBlogs(pageSize, lastVisibleDoc);
      if (blogs.length === 0) break;

      pagePointers.push(lastDoc);
      lastVisibleDoc = lastDoc;

      if (blogs.length < pageSize) break; // End loop if fewer blogs are returned
    }

    return { totalPages, pagePointers };
  } catch (error) {
    console.error("Failed to fetch initial pagination data:", error);
    throw error;
  }
};

// Load paginated blogs for a specific page
export const loadPaginatedBlogsHelper = async (
  pageSize: number,
  pagePointers: any[],
  pageNumber: number
): Promise<{ blogs: Blog[]; lastDoc: any }> => {
  const startAfterPointer = pageNumber > 1 ? pagePointers[pageNumber - 2] : null;

  try {
    const { blogs, lastDoc } = await fetchPaginatedBlogs(pageSize, startAfterPointer);
    return { blogs, lastDoc };
  } catch (err) {
    console.error("Error fetching blogs for page:", err);
    throw err;
  }
};
