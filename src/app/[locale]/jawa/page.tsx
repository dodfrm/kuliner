"use client";

import RegionGalleryPage from "@/components/RegionGalleryPage";
import { useTranslations } from "next-intl";

export default function JawaPage() {
  const t = useTranslations("Regions");

  const JAWA_IMAGES = [
    { src: "/makanan/15.png", title: t("jawa.makanan1.title"), description: t("jawa.makanan1.desc") },
    { src: "/makanan/16.png", title: t("jawa.makanan2.title"), description: t("jawa.makanan2.desc") },
    { src: "/makanan/17.png", title: t("jawa.makanan3.title"), description: t("jawa.makanan3.desc") },
    { src: "/makanan/18.png", title: t("jawa.makanan4.title"), description: t("jawa.makanan4.desc") },
    { src: "/makanan/19.png", title: t("jawa.makanan5.title"), description: t("jawa.makanan5.desc") },
    { src: "/makanan/20.png", title: t("jawa.makanan6.title"), description: t("jawa.makanan6.desc") },
    { src: "/makanan/21.png", title: t("jawa.makanan7.title"), description: t("jawa.makanan7.desc") },
    { src: "/makanan/22.png", title: t("jawa.makanan8.title"), description: t("jawa.makanan8.desc") },
    { src: "/makanan/23.png", title: t("jawa.makanan9.title"), description: t("jawa.makanan9.desc") },
    { src: "/makanan/24.png", title: t("jawa.makanan10.title"), description: t("jawa.makanan10.desc") },
  ];

  return <RegionGalleryPage regionKey="jawa" images={JAWA_IMAGES} />;
}
