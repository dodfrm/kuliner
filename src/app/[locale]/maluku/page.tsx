import RegionGalleryPage from "@/components/RegionGalleryPage";

const MALUKU_IMAGES = [
  { src: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop", alt: "Ikan Kuah Kuning & Papeda" },
  { src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop", alt: "Gohu Ikan" },
  { src: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop", alt: "Sambal Colocolo" },
  { src: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop", alt: "Rempah Maluku (Pala & Cengkeh)" },
  { src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop", alt: "Ikan Bakar Banda" },
  { src: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=800&auto=format&fit=crop", alt: "Gulai Seafood Maluku" },
  { src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop", alt: "Kue Sagu" },
  { src: "https://images.unsplash.com/photo-1566818614417-640c666a014a?q=80&w=800&auto=format&fit=crop", alt: "Pisang Mulut Bebek" },
  { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop", alt: "Kohu-Kohu" },
  { src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop", alt: "Nasi Lapola" }
];

export default function MalukuPage() {
  return <RegionGalleryPage regionKey="maluku" images={MALUKU_IMAGES} />;
}
