import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TbPointFilled } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import { PaginationComponent } from "@/components/ui/pagination";
import Link from "next/link";

interface Blog {
  id: number;
  attributes: {
    date: Date;
    title: string;
    post: string;
    writer: string;
    publishedAt: string;
    img: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          width: number;
          height: number;
          url: string;
        };
      };
    };
  };
}

interface BlogListProps {
  blogs: Blog[];
  title: string;
  pagination: any;
  onPageChange: (page: number) => void;
  currentPage: number;
  fullWidth?: boolean;
}

const BlogList: React.FC<BlogListProps> = ({
  blogs,
  title,
  pagination,
  onPageChange,
  currentPage,
  fullWidth,
}) => {
  return (
    <>
      {/* Display the title prop */}
      <h2 className="font-semibold text-xl my-12 lg:text-2xl lg:mb-8">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 justify-between">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className={`mb-8 ${fullWidth ? "lg:w-full" : "lg:w-[48.5%]"}`}
          >
            <div>
              <div className="md:h-[240px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI}${blog.attributes.img.data.attributes.url}`}
                  width={blog.attributes.img.data.attributes.width}
                  height={blog.attributes.img.data.attributes.height}
                  alt={blog.attributes.img.data.attributes.alternativeText}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="flex gap-2 text-gray-900 font-semibold text-sm my-3 lg:text-gray-700">
                  <span className="hidden lg:flex gap-2 justify-center items-center">
                    {blog.attributes.writer}
                    <TbPointFilled />
                  </span>
                  <span className="lg:hidden">
                    {format(
                      new Date(blog.attributes.publishedAt),
                      "EEEE, MMMM d, yyyy",
                    )}
                  </span>
                  <span className="hidden lg:block">
                    {format(
                      new Date(blog.attributes.publishedAt),
                      "d MMMM, yyyy",
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between hover:underline">
              <h2 className="text-base font-semibold lg:text-lg">
                <Link href={`/blogs/blog?id=${blog.id}`}>
                  {blog.attributes.title}
                </Link>
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
            <p className="text-sm text-[#667085] my-3">
              <ReactMarkdown>
                {blog.attributes.post.length > 300
                  ? `${blog.attributes.post.slice(0, 300)}...`
                  : blog.attributes.post}
              </ReactMarkdown>
            </p>
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
        totalPages={pagination?.pageCount || 1}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default BlogList;
