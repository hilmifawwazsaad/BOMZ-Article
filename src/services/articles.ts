import type { Article } from '@/types/article';

const modules = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const colon = line.indexOf(': ');
    if (colon !== -1) {
      const key = line.slice(0, colon).trim();
      const value = line.slice(colon + 2).trim().replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  });
  return { data, content: match[2].trim() };
}

const allArticles: Article[] = Object.values(modules)
  .map((raw) => {
    const { data, content } = parseFrontmatter(raw as string);
    return { ...data, content } as Article;
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export async function getArticles(): Promise<Article[]> {
  return allArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return allArticles.find((a) => a.slug === slug) ?? null;
}
