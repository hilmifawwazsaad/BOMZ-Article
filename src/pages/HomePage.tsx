import { useEffect, useState } from "react";
import Navigation from "@/components/layouts/Navigation";
import Footer from "@/components/layouts/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getArticles } from "@/services/articles";
import type { Article } from "@/types/article";

const SearchIcon = () => (
  <svg
    className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text) pointer-events-none"
    width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  const filtered = articles.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q)
    );
  });

  // Sequential block-of-2 distribution: fills panels L→R in pairs to preserve reading order
  const leftArticles = filtered.filter((_, i) => Math.floor(i / 2) % 3 === 0);
  const centerArticles = filtered.filter((_, i) => Math.floor(i / 2) % 3 === 1);
  const rightArticles = filtered.filter((_, i) => Math.floor(i / 2) % 3 === 2);

  const searchInput = (
    <div className="relative">
      <SearchIcon />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari artikel, topik, atau kategori..."
        className="w-full pl-12 pr-4 py-4 border border-(--border) rounded-sm bg-(--bg) text-(--text-h) placeholder:text-(--text) focus:outline-none focus:border-(--accent) transition-colors"
      />
    </div>
  );

  const cards = (items: Article[]) =>
    items.map((article) => (
      <div key={article.id} className="break-inside-avoid mb-6">
        <ArticleCard article={article} />
      </div>
    ));

  return (
    <>
      <Navigation />
      <main className="p-6 max-xl:p-4">

        {/* Desktop (≥1280px): 3-panel layout — search embedded in center */}
        <div className="hidden xl:flex gap-6">
          {/* Left panel: cols 1–2 */}
          <div className="flex-1 columns-2 gap-6">
            {cards(leftArticles)}
          </div>

          {/* Center panel: search on top, then cols 3–4 */}
          <div className="flex-1 flex flex-col gap-6">
            {searchInput}
            {filtered.length === 0 && search ? (
              <p className="text-center py-10 text-(--text)">
                Tidak ada hasil untuk &ldquo;{search}&rdquo;
              </p>
            ) : (
              <div className="columns-2 gap-6">
                {cards(centerArticles)}
              </div>
            )}
          </div>

          {/* Right panel: cols 5–6 */}
          <div className="flex-1 columns-2 gap-6">
            {cards(rightArticles)}
          </div>
        </div>

        {/* Mobile & tablet (<1280px): search at top + masonry */}
        <div className="xl:hidden flex flex-col gap-6">
          {searchInput}
          {filtered.length === 0 && search ? (
            <p className="text-center py-10 text-(--text)">
              Tidak ada hasil untuk &ldquo;{search}&rdquo;
            </p>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
              {cards(filtered)}
            </div>
          )}
        </div>

      </main>
      <Footer />
    </>
  );
}
