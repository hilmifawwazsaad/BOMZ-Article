import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/layouts/Navigation";
import Footer from "@/components/layouts/Footer";
import { getArticleBySlug } from "@/services/articles";
import type { Article } from "@/types/article";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getArticleBySlug(slug).then((data) => {
      if (data) setArticle(data);
      else setNotFound(true);
    });
  }, [slug]);

  if (notFound) {
    return (
      <>
        <Navigation />
        <main className="px-10 pb-20 max-w-180 mx-auto w-full box-border max-lg:px-4">
          <div className="text-center py-20 flex flex-col items-center gap-6">
            <h1>Artikel tidak ditemukan</h1>
            <Link to="/" className="text-sm text-(--text) hover:text-(--text-h) no-underline">
              Kembali ke beranda
            </Link>
          </div>
        </main>
      </>
    );
  }

  if (!article) return null;

  // Strip leading H1 from markdown — rendered separately as article title
  const body = article.content.replace(/^#[ \t]+.+(\r?\n|$)/, '');

  return (
    <>
      <Navigation />
      <main className="px-10 pb-20 max-w-180 mx-auto w-full box-border max-lg:px-4 max-lg:pb-16">
        <nav className="flex items-center gap-2 text-xs text-(--text) mt-8 mb-8">
          <Link to="/" className="hover:text-(--text-h) no-underline text-(--text)">Beranda</Link>
          <span>/</span>
          <span className="truncate max-w-80 font-medium text-(--text-h)">{article.title}</span>
        </nav>
        <article>
          <header className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-(--text) mb-2">
              {article.category}
            </p>
            <h1 className="text-4xl font-bold text-(--text-h) leading-tight tracking-tight mb-4 max-lg:text-2xl">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-(--text)">
              <span className="font-medium text-(--text-h)">{article.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
          </header>
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
