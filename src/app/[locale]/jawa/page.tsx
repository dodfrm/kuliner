import RegionGalleryPage from "@/components/RegionGalleryPage";

const JAWA_IMAGES = [
  { src: "https://images.unsplash.com/photo-1603133872878-685f58884a28?q=80&w=800&auto=format&fit=crop", alt: "Nasi Tumpeng" },
  { src: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop", alt: "Bakso Jawa" },
  { src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop", alt: "Gudeg Yogyakarta" },
  { src: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop", alt: "Soto Ayam" },
  { src: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop", alt: "Sate Madura" },
  { src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop", alt: "Gado-Gado" },
  { src: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop", alt: "Tempe Mendoan" },
  { src: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop", alt: "Es Dawet Ayu" },
  { src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop", alt: "Mie Goreng Jawa" },
  { src: "https://images.unsplash.com/photo-1553618551-fba689030290?q=80&w=800&auto=format&fit=crop", alt: "Rujak Cingur" }
];

export default function JawaPage() {
  return <RegionGalleryPage regionKey="jawa" images={JAWA_IMAGES} />;
}
