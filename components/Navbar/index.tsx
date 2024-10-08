"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// image
import CMT from "@/public/images/cmt-full-logo.svg";
import React from "react";

const Navbar = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop === 0) {
        setIsScrollingDown(true);
      } else if (currentScrollTop > lastScrollTop) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const components: { title: string; href: string }[] = [
    {
      title: "Social Media Marketing and Management",
      href: "#",
    },
    {
      title: "Influencer Marketing",
      href: "#",
    },
    {
      title: "Public Relation",
      href: "#",
    },
    {
      title: "Design",
      href: "#",
    },
  ];

  return (
    <div
      className={`hidden fixed w-full z-10 transition-transform duration-300 lg:block ${
        isScrollingDown ? "translate-y-0" : "-translate-y-full"
      } shadow-sm py-8 bg-black bg-opacity-80 bg-clip-padding blur-backdrop-filter`}
    >
      <div className="relative container px-auto justify-between items-center flex lg:shadow-none">
        <div className="absolute inset-0 z-0 block w-full h-full shadow-md opacity-50"></div>
        <div className="w-48 z-10">
          <Link href="/">
            <Image src={CMT} alt={"cmt log"} className="w-full" />
          </Link>
        </div>

        <NavigationMenu className="w-full max-w-full">
          <NavigationMenuList className="justify-between hidden w-[525px] z-10 lg:flex xl:w-[650px]">
            <NavigationMenuItem className="text-white">
              <Link
                href="/"
                className="hover:text-[#4173CB] active:text-[#4173CB] focus:text-[#4173CB] transition-all"
              >
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="text-white">
              <Link
                href="/whoweare"
                className="hover:text-[#4173CB] active:text-[#4173CB] focus:text-[#4173CB] transition-all"
              >
                Who we are
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="p-0 text-white bg-transparent hover:!bg-transparent hover:!text-[#4173CB] active:text-[#4173CB] focus:!text-[#4173CB] focus:!bg-transparent transition-all">
                Components
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[350px] md:grid-cols-1">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      href={component.href}
                      title={component.title}
                    >
                      {component.title}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="text-white">
              <Link
                href="/portfolio"
                className="hover:text-[#4173CB] active:text-[#4173CB] focus:text-[#4173CB] transition-all"
              >
                Our Portfolio
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="text-white">
              <Link
                href="/blog"
                className="hover:text-[#4173CB] active:text-[#4173CB] focus:text-[#4173CB] transition-all"
              >
                Our Blog
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="z-10">
          <Button className="bg-[#FFFFFF] text-primaryBlue text-sm px-4 py-3 rounded-[10px] hover:bg-[#c9c9c9] transition-all">
            Contact us
          </Button>
        </div>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Navbar;
