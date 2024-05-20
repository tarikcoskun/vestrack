export interface GenericLink {
  label: string;
  href: string;
  external?: boolean;
}

export const navbarLinks: (GenericLink & { isButton?: boolean })[] = [
  {
    label: "Movies",
    href: "/movies",
  },
  {
    label: "TV Shows",
    href: "/shows",
  },
  {
    label: "People",
    href: "/people",
  },
];

export const navbarUserActions: Record<string, GenericLink[]> = {};

export const footerLinks: Record<string, GenericLink[]> = {
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
      href: "/movies",
    },
    {
      label: "TV Shows",
      href: "/shows",
    },
    {
      label: "People",
      href: "/people",
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
