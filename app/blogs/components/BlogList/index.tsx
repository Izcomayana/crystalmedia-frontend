import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { PaginationComponent } from "@/components/ui/pagination";
import Link from "next/link";
import { Blog } from "@/lib/firebaseUtils";
import { TbPointFilled } from "react-icons/tb";

interface BlogListProps {
  blogs: Blog[];
  title: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  fullWidth?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({
  blogs,
  title,
  currentPage,
  totalPages,
  onPageChange,
  fullWidth,
}) => {
  return (
    <>
      <h2 className="font-semibold text-xl my-12 lg:text-2xl lg:mb-8">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 justify-between mb-10">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className={`mb-8 ${fullWidth ? "lg:w-full" : "lg:w-[48.5%]"}`}
          >
            <div className="md:h-[240px]">
              <Image
                src={blog.img}
                width={300}
                height={200}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="flex gap-2 text-gray-900 font-semibold text-sm my-3 lg:text-gray-700">
                <span className="hidden lg:flex gap-2 justify-center items-center">
                  {blog.author}
                  <TbPointFilled />
                </span>

                <span className="lg:hidden">
                  {blog.date
                    ? format(blog.date.toDate(), "EEEE, MMMM d, yyyy")
                    : "No date available"}
                </span>
                <span className="hidden lg:block">
                  {blog.date
                    ? format(blog.date.toDate(), "d MMMM, yyyy")
                    : "No date available"}
                </span>
              </p>
            </div>

            <Link href={`/blogs/blog?id=${blog.id}`}>
              <div className="flex justify-between hover:underline">
                <h2 className="text-base font-semibold lg:text-lg">
                  {blog.title}
                </h2>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <div className="text-sm text-[#667085] my-3">
              <ReactMarkdown>
                {blog.post.length > 300
                  ? `${blog.post.slice(0, 300)}...`
                  : blog.post}
              </ReactMarkdown>
            </div>

            <div className="flex gap-2">
              <Badge variant={"secondary"}>Badge</Badge>
              <Badge variant={"secondary"}>Badge</Badge>
              <Badge variant={"secondary"}>Badge</Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default BlogList;
