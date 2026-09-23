import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList: "ul" | "ol" | null = null;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      if (inList === "ul") {
        elements.push(
          <ul key={`ul-${elements.length}`} style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.8" }}>
            {listItems}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${elements.length}`} style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.8" }}>
            {listItems}
          </ol>
        );
      }
      listItems = [];
      inList = null;
    }
  };

  const formatInline = (text: string): React.ReactNode => {
    // Parse links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // Parse bold: **text**
    const boldRegex = /\*\*([^*]+)\*\*/g;
    // Parse italic: *text*
    const italicRegex = /(?<!\*)\*([^*]+)\*(?!\*)/g;
    // Parse inline code: `code`
    const codeRegex = /`([^`]+)`/g;

    // Split and map
    // We can do a safe HTML replace or regex replacement
    const html = text
      .replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #00A896; text-decoration: underline; font-weight: 600;">$1</a>')
      .replace(boldRegex, "<strong>$1</strong>")
      .replace(italicRegex, "<em>$1</em>")
      .replace(codeRegex, '<code style="background: #f1f5f9; color: #028090; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;">$1</code>');

    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    // Unordered List
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (inList !== "ul") {
        flushList();
        inList = "ul";
      }
      listItems.push(
        <li key={`li-${elements.length}-${listItems.length}`} style={{ marginBottom: "6px" }}>
          {formatInline(trimmed.substring(2))}
        </li>
      );
      continue;
    }

    // Ordered List
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      if (inList !== "ol") {
        flushList();
        inList = "ol";
      }
      listItems.push(
        <li key={`li-${elements.length}-${listItems.length}`} style={{ marginBottom: "6px" }}>
          {formatInline(olMatch[2])}
        </li>
      );
      continue;
    }

    // Anything else terminates a list
    flushList();

    // H1
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={`h1-${elements.length}`} style={{ fontSize: "2rem", color: "#0f172a", margin: "28px 0 12px", fontWeight: 800 }}>
          {formatInline(trimmed.substring(2))}
        </h1>
      );
    }
    // H2
    else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${elements.length}`} style={{ fontSize: "1.5rem", color: "#0f172a", margin: "28px 0 12px", fontWeight: 700 }}>
          {formatInline(trimmed.substring(3))}
        </h2>
      );
    }
    // H3
    else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${elements.length}`} style={{ fontSize: "1.25rem", color: "#1e293b", margin: "22px 0 10px", fontWeight: 600 }}>
          {formatInline(trimmed.substring(4))}
        </h3>
      );
    }
    // Blockquote
    else if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`bq-${elements.length}`}
          style={{
            borderLeft: "4px solid #00A896",
            paddingLeft: "16px",
            margin: "20px 0",
            color: "#475569",
            fontStyle: "italic",
            background: "#f8fafc",
            padding: "12px 16px",
            borderRadius: "0 8px 8px 0",
          }}
        >
          {formatInline(trimmed.substring(2))}
        </blockquote>
      );
    }
    // Normal paragraph
    else {
      elements.push(
        <p key={`p-${elements.length}`} style={{ marginBottom: "16px", lineHeight: "1.75", color: "#334155" }}>
          {formatInline(trimmed)}
        </p>
      );
    }
  }

  flushList();

  return <div className={className}>{elements}</div>;
}
