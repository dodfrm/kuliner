import RegionGalleryPage from "@/components/RegionGalleryPage";

const SUMATERA_IMAGES = [
  { src: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=800&auto=format&fit=crop", alt: "Rendang Daging" },
  { src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop", alt: "Pempek Palembang" },
  { src: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop", alt: "Sate Padang" },
  { src: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop", alt: "Mie Aceh" },
  { src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop", alt: "Bika Ambon" },
  { src: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop", alt: "Nasi Padang" },
  { src: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop", alt: "Soto Medan" },
  { src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop", alt: "Kopi Gayo" },
  { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop", alt: "Martabak Mesir" },
  { src: "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=800&auto=format&fit=crop", alt: "Gulai Kapau" }
];

export default function SumateraPage() {
  return <RegionGalleryPage regionKey="sumatera" images={SUMATERA_IMAGES} />;
}
