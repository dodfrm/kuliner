"use client";

import RegionGalleryPage from "@/components/RegionGalleryPage";
import { useTranslations } from "next-intl";

export default function SumateraPage() {
  const t = useTranslations("Regions");

  const SUMATERA_IMAGES = [
    { src: "/makanan/5.png", title: t("sumatera.makanan1.title"), description: t("sumatera.makanan1.desc") },
    { src: "/makanan/6.png", title: t("sumatera.makanan2.title"), description: t("sumatera.makanan2.desc") },
    { src: "/makanan/7.png", title: t("sumatera.makanan3.title"), description: t("sumatera.makanan3.desc") },
    { src: "/makanan/8.png", title: t("sumatera.makanan4.title"), description: t("sumatera.makanan4.desc") },
    { src: "/makanan/9.png", title: t("sumatera.makanan5.title"), description: t("sumatera.makanan5.desc") },
    { src: "/makanan/10.png", title: t("sumatera.makanan6.title"), description: t("sumatera.makanan6.desc") },
    { src: "/makanan/11.png", title: t("sumatera.makanan7.title"), description: t("sumatera.makanan7.desc") },
    { src: "/makanan/12.png", title: t("sumatera.makanan8.title"), description: t("sumatera.makanan8.desc") },
    { src: "/makanan/13.png", title: t("sumatera.makanan9.title"), description: t("sumatera.makanan9.desc") },
    { src: "/makanan/14.png", title: t("sumatera.makanan10.title"), description: t("sumatera.makanan10.desc") },
  ];

  return <RegionGalleryPage regionKey="sumatera" images={SUMATERA_IMAGES} />;
}
