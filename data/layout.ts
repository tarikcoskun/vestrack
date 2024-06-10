import type { IconList } from "@/components/Icon";

export interface GenericLink {
  label: string;
  href: string;
}

export const navbarLinks: (GenericLink & { icon: IconList })[] = [
  {
    label: "Home",
    href: "/",
    icon: "home",
  },
  {
    label: "Movies",
    href: "/movie",
    icon: "film",
  },
  {
    label: "TV Series",
    href: "/tv",
    icon: "tv",
  },
  {
    label: "People",
    href: "/person",
    icon: "people",
  },
];

export const footerLinks: Record<string, (GenericLink & { external?: boolean })[]> = {
  Community: [
    {
      label: "Twitter",
      href: "https://twitter.com",
      external: true,
    },
    {
      label: "Discord",
      href: "https://discord.com",
      external: true,
    },
  ],
  Links: [
    {
      label: "Movies",
      href: "/movie",
    },
    {
      label: "TV Series",
      href: "/tv",
    },
    {
      label: "People",
      href: "/person",
    },
  ],
};

export const locales = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "tr",
    label: "Türkçe",
  },
];
