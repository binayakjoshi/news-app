import Image from "next/image";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news";

type ImagePageProps = {
  params: Promise<{ slug?: string }>;
};
const ImagePage = async ({ params }: ImagePageProps) => {
  const { slug } = await params;
  const newsItem = await getNewsItem(slug);
  if (!newsItem) {
    notFound();
  }
  return (
    <div className="fullscreen-image">
      <Image
        src={`/images/news/${newsItem.image}`}
        alt={`/images/news/${newsItem.title}`}
        height={500}
        width={500}
      />
    </div>
  );
};
export default ImagePage;
