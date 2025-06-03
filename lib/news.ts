import { type NewsPost } from "@/news-type";
import sql from "better-sqlite3";

const db = sql("data.db");

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllNews = async (): Promise<NewsPost[]> => {
  const news = db.prepare("SELECT * FROM news").all() as NewsPost[];
  await delay(2000);
  return news;
};

export const getNewsItem = async (
  slug: string | undefined
): Promise<NewsPost | undefined> => {
  const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug) as
    | NewsPost
    | undefined;
  await delay(2000);
  return newsItem;
};

export const getLatestNews = async (): Promise<NewsPost[]> => {
  const latestNews = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all() as NewsPost[];
  await delay(2000);
  return latestNews;
};

export const getAvailableNewsYears = async (): Promise<string[]> => {
  const rows = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all() as { year: string }[];
  await delay(2000);
  return rows.map((row) => row.year);
};

export const getAvailableNewsMonths = (year: string): string[] => {
  const rows = db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year) as { month: string }[];
  return rows.map((row) => row.month);
};

export const getNewsForYear = async (year: string): Promise<NewsPost[]> => {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year) as NewsPost[];
  await delay(2000);
  return news;
};

export const getNewsForYearAndMonth = async (
  year: string,
  month: string
): Promise<NewsPost[]> => {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month) as NewsPost[];
  await delay(2000);
  return news;
};
