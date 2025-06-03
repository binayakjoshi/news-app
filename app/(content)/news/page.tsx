import NewsList from "@/components/newsList";
import { getAllNews } from "@/lib/news";

const NewsListPage = async () => {
  //const response = await fetch("http://localhost:5000/news");
  //if (!response.ok) throw new Error("Failed to fetch news");
  //const news: NewsPost[] = await response.json();
  const news = await getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
};

export default NewsListPage;
