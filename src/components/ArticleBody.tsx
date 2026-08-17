import { marked } from 'marked';

type Props = {
  markdown: string;
};

marked.setOptions({
  gfm: true,
  breaks: false,
});

export default function ArticleBody({ markdown }: Props) {
  const html = marked.parse(markdown, { async: false }) as string;

  return (
    <div
      className="article-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
