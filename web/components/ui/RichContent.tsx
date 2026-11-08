import type { RichNode } from "@/types/product";

function Inline({ node }: { node: RichNode }) {
  if (node.type === "link") {
    return (
      <a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-4"
      >
        {node.children?.map((c, i) => <Inline key={i} node={c} />)}
      </a>
    );
  }
  let el: React.ReactNode = node.text;
  if (node.code) el = <code className="rounded bg-surface px-1.5 py-0.5 text-sm">{el}</code>;
  if (node.bold) el = <strong className="text-text">{el}</strong>;
  if (node.italic) el = <em>{el}</em>;
  if (node.underline) el = <u>{el}</u>;
  if (node.strikethrough) el = <s>{el}</s>;
  return <>{el}</>;
}

function Block({ node }: { node: RichNode }) {
  const kids = node.children?.map((c, i) => <Inline key={i} node={c} />);

  switch (node.type) {
    case "heading": {
      const Tag = `h${Math.min(Math.max(node.level ?? 2, 1), 6)}` as "h2";
      return <Tag className="mt-8 text-xl font-semibold text-text">{kids}</Tag>;
    }
    case "list": {
      const ordered = node.format === "ordered";
      const Tag = ordered ? "ol" : "ul";
      return (
        <Tag className={`mt-4 space-y-1 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>
          {node.children?.map((li, i) => (
            <li key={i}>
              {li.children?.map((c, j) => <Inline key={j} node={c} />)}
            </li>
          ))}
        </Tag>
      );
    }
    case "quote":
      return <blockquote className="mt-4 border-l-2 border-accent pl-4 italic">{kids}</blockquote>;
    case "code":
      return (
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 text-sm">
          <code>{kids}</code>
        </pre>
      );
    default:
      return <p className="mt-4">{kids}</p>;
  }
}

export default function RichContent({
  content,
}: {
  content?: string | RichNode[] | null;
}) {
  if (!content) return null;

  if (typeof content === "string") {
    return <p className="whitespace-pre-line leading-relaxed text-muted">{content}</p>;
  }

  return (
    <div className="leading-relaxed text-muted [&>*:first-child]:mt-0">
      {content.map((node, i) => (
        <Block key={i} node={node} />
      ))}
    </div>
  );
}