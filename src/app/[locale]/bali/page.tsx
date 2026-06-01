"use client";

import RegionGalleryPage from "@/components/RegionGalleryPage";
import { useTranslations } from "next-intl";

export default function BaliPage() {
  const t = useTranslations("Regions");

  const BALI_IMAGES = [
    { src: "/makanan/25.png", title: t("bali.makanan1.title"), description: t("bali.makanan1.desc") },
    { src: "/makanan/26.png", title: t("bali.makanan2.title"), description: t("bali.makanan2.desc") },
    { src: "/makanan/27.png", title: t("bali.makanan3.title"), description: t("bali.makanan3.desc") },
    { src: "/makanan/28.png", title: t("bali.makanan4.title"), description: t("bali.makanan4.desc") },
    { src: "/makanan/29.png", title: t("bali.makanan5.title"), description: t("bali.makanan5.desc") },
    { src: "/makanan/30.png", title: t("bali.makanan6.title"), description: t("bali.makanan6.desc") },
    { src: "/makanan/31.png", title: t("bali.makanan7.title"), description: t("bali.makanan7.desc") },
    { src: "/makanan/32.png", title: t("bali.makanan8.title"), description: t("bali.makanan8.desc") },
    { src: "/makanan/33.png", title: t("bali.makanan9.title"), description: t("bali.makanan9.desc") },
    { src: "/makanan/34.png", title: t("bali.makanan10.title"), description: t("bali.makanan10.desc") },
  ];

  return <RegionGalleryPage regionKey="bali" images={BALI_IMAGES} />;
}
