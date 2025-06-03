import Image from "next/image";
import Link from "next/link";
import { type NewsPost } from "@/news-type";

type NewsListProps = {
  news: NewsPost[];
};
const NewsList = ({ news }: NewsListProps) => {
  if (news.length === 0) return <p>no news found</p>;
  return (
    <ul className="news-list">
      {news.map((newsItem) => (
        <li key={newsItem.id}>
          <Link href={`/news/${newsItem.slug}`}>
            <Image
              src={`/images/news/${newsItem.image}`}
              alt={newsItem.title}
              height={200}
              width={200}
            />
            {newsItem.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default NewsList;
