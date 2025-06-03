import NewsList from "@/components/newsList";
import { NewsPost } from "@/news-type";
import { getLatestNews } from "@/lib/news";

const LatestNewsPage = async () => {
  const latestNews: NewsPost[] = await getLatestNews();
  return (
    <>
      <h2>Latest news page</h2>
      <NewsList news={latestNews} />
    </>
  );
};
export default LatestNewsPage;
