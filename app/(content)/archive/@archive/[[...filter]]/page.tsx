import NewsList from "@/components/newsList";
import { type NewsPost } from "@/news-type";
import Link from "next/link";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import { ReactNode, Suspense } from "react";

type YearNewsPageProps = {
  params: Promise<{ filter?: string[] }>;
};
type FilteredNewsProps = {
  year: string | undefined;
  month: string | undefined;
};

const FilterHeader = async ({ year, month }: FilteredNewsProps) => {
  let links: string[] = await getAvailableNewsYears();
  if (year)
    if (
      (year && !(await getAvailableNewsYears()).includes(year)) ||
      (month && !getAvailableNewsMonths(year).includes(month))
    )
      throw new Error("Invalid filter");

  if (year && !month) links = await getAvailableNewsMonths(year);

  if (year && month) links = [];
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = year
                ? `/archive/${year}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
};
const FilteredNews = async ({
  year,
  month,
}: FilteredNewsProps): Promise<ReactNode> => {
  let news: NewsPost[] | undefined;
  if (year && !month) news = await getNewsForYear(year);
  else if (year && month) news = await getNewsForYearAndMonth(year, month);
  let newsContent: ReactNode;
  if (!news) newsContent = <p>no news found for the selected Period</p>;

  if (news && news.length > 0) newsContent = <NewsList news={news} />;

  return newsContent;
};
const YearNewsPage = async ({ params }: YearNewsPageProps) => {
  const { filter } = await params;

  const selectedYear = filter ? filter[0] : undefined;
  const selectedMonth = filter ? filter[1] : undefined;

  return (
    <>
      <Suspense fallback={<p>Loading filter....</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading News....</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
};
export default YearNewsPage;
