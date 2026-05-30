import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "id",
});

// Lightweight wrappers for Next.js navigation APIs
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
