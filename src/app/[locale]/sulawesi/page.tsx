"use client";

import RegionGalleryPage from "@/components/RegionGalleryPage";
import { useTranslations } from "next-intl";

export default function SulawesiPage() {
  const t = useTranslations("Regions");

  const SULAWESI_IMAGES = [
    { src: "/makanan/58.png", title: t("sulawesi.makanan1.title"), description: t("sulawesi.makanan1.desc") }
  ];

  return <RegionGalleryPage regionKey="sulawesi" images={SULAWESI_IMAGES} />;
}
