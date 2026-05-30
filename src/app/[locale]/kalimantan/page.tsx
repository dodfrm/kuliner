import RegionGalleryPage from "@/components/RegionGalleryPage";

const KALIMANTAN_IMAGES = [
  { src: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop", alt: "Soto Banjar" },
  { src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop", alt: "Choipan Pontianak" },
  { src: "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=800&auto=format&fit=crop", alt: "Patin Bakar" },
  { src: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=800&auto=format&fit=crop", alt: "Jeruk Pontianak" },
  { src: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop", alt: "Ketupat Kandangan" },
  { src: "https://images.unsplash.com/photo-1553618551-fba689030290?q=80&w=800&auto=format&fit=crop", alt: "Kepiting Soka Kalimantan" },
  { src: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=800&auto=format&fit=crop", alt: "Buah Lai" },
  { src: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop", alt: "Teh Herbal Kalimantan" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop", alt: "Pisang Goreng Pontianak" },
  { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop", alt: "Bubur Pedas Sambas" }
];

export default function KalimantanPage() {
  return <RegionGalleryPage regionKey="kalimantan" images={KALIMANTAN_IMAGES} />;
}
