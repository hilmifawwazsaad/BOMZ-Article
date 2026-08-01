import { Link } from "react-router-dom";
import type { Article } from "@/types/article";

type Props = {
  article: Article;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({ article }: Props) {

  return (
    <Link
      to={`/article/${article.slug}`}
      className="flex flex-col no-underline text-inherit border border-(--border) rounded-sm overflow-hidden transition-all duration-200 hover:shadow-(--shadow) hover:border-(--accent-border)"
    >
      <div className="flex flex-col gap-3 p-5">
        <h2 className="text-lg tracking-[-0.2px] m-0 text-(--text-h) leading-[140%]">
          {article.title}
        </h2>
        <p className="text-sm text-(--text) leading-relaxed">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
