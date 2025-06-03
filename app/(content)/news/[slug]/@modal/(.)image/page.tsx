import Image from "next/image";
import { notFound } from "next/navigation";
import ModalBackDrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";

type ImagePageProps = {
  params: Promise<{ slug?: string }>;
};
const ImageInterceptedPage = async ({ params }: ImagePageProps) => {
  const { slug } = await params;
  const newsItem = await getNewsItem(slug);
  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackDrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <Image
            src={`/images/news/${newsItem.image}`}
            alt={`/images/news/${newsItem.title}`}
            height={500}
            width={500}
          />
        </div>
      </dialog>
    </>
  );
};
export default ImageInterceptedPage;
