"use client";

import RegionGalleryPage from "@/components/RegionGalleryPage";
import { useTranslations } from "next-intl";

export default function KalimantanPage() {
  const t = useTranslations("Regions");

  const KALIMANTAN_IMAGES = [
    { src: "/makanan/35.png", title: t("kalimantan.makanan1.title"), description: t("kalimantan.makanan1.desc") },
    { src: "/makanan/36.png", title: t("kalimantan.makanan2.title"), description: t("kalimantan.makanan2.desc") },
    { src: "/makanan/37.png", title: t("kalimantan.makanan3.title"), description: t("kalimantan.makanan3.desc") },
    { src: "/makanan/38.png", title: t("kalimantan.makanan4.title"), description: t("kalimantan.makanan4.desc") },
    { src: "/makanan/39.png", title: t("kalimantan.makanan5.title"), description: t("kalimantan.makanan5.desc") },
    { src: "/makanan/40.png", title: t("kalimantan.makanan6.title"), description: t("kalimantan.makanan6.desc") },
    { src: "/makanan/41.png", title: t("kalimantan.makanan7.title"), description: t("kalimantan.makanan7.desc") },
    { src: "/makanan/42.png", title: t("kalimantan.makanan8.title"), description: t("kalimantan.makanan8.desc") },
    { src: "/makanan/43.png", title: t("kalimantan.makanan9.title"), description: t("kalimantan.makanan9.desc") },
    { src: "/makanan/44.png", title: t("kalimantan.makanan10.title"), description: t("kalimantan.makanan10.desc") },
  ];

  return <RegionGalleryPage regionKey="kalimantan" images={KALIMANTAN_IMAGES} />;
}
