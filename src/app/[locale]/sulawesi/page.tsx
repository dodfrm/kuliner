"use client";

import RegionGalleryPage from "@/components/RegionGalleryPage";
import { useTranslations } from "next-intl";

export default function SulawesiPage() {
  const t = useTranslations("Regions");

  const SULAWESI_IMAGES = [
    { src: "/makanan/61.png", title: t("sulawesi.makanan1.title"), description: t("sulawesi.makanan1.desc") },
    { src: "/makanan/62.png", title: t("sulawesi.makanan2.title"), description: t("sulawesi.makanan2.desc") },
    { src: "/makanan/63.png", title: t("sulawesi.makanan3.title"), description: t("sulawesi.makanan3.desc") },
    { src: "/makanan/64.png", title: t("sulawesi.makanan4.title"), description: t("sulawesi.makanan4.desc") },
    { src: "/makanan/65.png", title: t("sulawesi.makanan5.title"), description: t("sulawesi.makanan5.desc") },
    { src: "/makanan/66.png", title: t("sulawesi.makanan6.title"), description: t("sulawesi.makanan6.desc") },
    { src: "/makanan/67.png", title: t("sulawesi.makanan7.title"), description: t("sulawesi.makanan7.desc") },
    { src: "/makanan/68.png", title: t("sulawesi.makanan8.title"), description: t("sulawesi.makanan8.desc") },
    { src: "/makanan/69.png", title: t("sulawesi.makanan9.title"), description: t("sulawesi.makanan9.desc") },
    { src: "/makanan/70.png", title: t("sulawesi.makanan10.title"), description: t("sulawesi.makanan10.desc") },
  ];

  return <RegionGalleryPage regionKey="sulawesi" images={SULAWESI_IMAGES} />;
}
