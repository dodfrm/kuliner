import RegionGalleryPage from "@/components/RegionGalleryPage";

const BALI_IMAGES = [
  { src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop", alt: "Sate Lilit" },
  { src: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop", alt: "Nasi Campur Bali" },
  { src: "https://images.unsplash.com/photo-1626200419199-391ae4be7a40?q=80&w=800&auto=format&fit=crop", alt: "Ayam Betutu" },
  { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop", alt: "Lawar" },
  { src: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop", alt: "Sambal Matah" },
  { src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop", alt: "Jaje Bali" },
  { src: "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=800&auto=format&fit=crop", alt: "Ikan Bakar Jimbaran" },
  { src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop", alt: "Kopi Bali Kintamani" },
  { src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop", alt: "Urab Sayur" },
  { src: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=800&auto=format&fit=crop", alt: "Buah Segar Bali" }
];

export default function BaliPage() {
  return <RegionGalleryPage regionKey="bali" images={BALI_IMAGES} />;
}
