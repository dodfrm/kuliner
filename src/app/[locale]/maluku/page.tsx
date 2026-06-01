"use client";

import RegionGalleryPage from "@/components/RegionGalleryPage";
import { useTranslations } from "next-intl";

export default function MalukuPage() {
  const t = useTranslations("Regions");

  const MALUKU_IMAGES = [
    { src: "/makanan/45.png", title: t("maluku.makanan1.title"), description: t("maluku.makanan1.desc") },
    { src: "/makanan/46.png", title: t("maluku.makanan2.title"), description: t("maluku.makanan2.desc") },
    { src: "/makanan/47.png", title: t("maluku.makanan3.title"), description: t("maluku.makanan3.desc") },
    { src: "/makanan/48.png", title: t("maluku.makanan4.title"), description: t("maluku.makanan4.desc") },
    { src: "/makanan/49.png", title: t("maluku.makanan5.title"), description: t("maluku.makanan5.desc") },
    { src: "/makanan/50.png", title: t("maluku.makanan6.title"), description: t("maluku.makanan6.desc") },
    { src: "/makanan/51.png", title: t("maluku.makanan7.title"), description: t("maluku.makanan7.desc") },
    { src: "/makanan/52.png", title: t("maluku.makanan8.title"), description: t("maluku.makanan8.desc") },
    { src: "/makanan/53.png", title: t("maluku.makanan9.title"), description: t("maluku.makanan9.desc") },
    { src: "/makanan/54.png", title: t("maluku.makanan10.title"), description: t("maluku.makanan10.desc") },
    { src: "/makanan/55.png", title: t("maluku.makanan11.title"), description: t("maluku.makanan11.desc") },
    { src: "/makanan/56.png", title: t("maluku.makanan12.title"), description: t("maluku.makanan12.desc") },
    { src: "/makanan/57.png", title: t("maluku.makanan13.title"), description: t("maluku.makanan13.desc") },
  ];

  return <RegionGalleryPage regionKey="maluku" images={MALUKU_IMAGES} />;
}
