import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import 'highlight.js/styles/github.css'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-neutral max-w-none
      prose-headings:font-semibold prose-headings:text-neutral-900
      prose-h1:text-2xl prose-h1:mt-0
      prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
      prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
      prose-p:text-neutral-600 prose-p:leading-relaxed
      prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-2
      prose-code:text-sm prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-neutral-800 prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-neutral-950 prose-pre:rounded-xl prose-pre:p-4
      prose-pre:code:bg-transparent prose-pre:code:text-neutral-100 prose-pre:code:p-0
      prose-blockquote:border-l-2 prose-blockquote:border-neutral-300 prose-blockquote:text-neutral-500 prose-blockquote:not-italic
      prose-ul:text-neutral-600 prose-ol:text-neutral-600
      prose-li:my-1
      prose-table:text-sm
      prose-th:text-neutral-900 prose-th:font-semibold prose-th:bg-neutral-50
      prose-td:text-neutral-600
      prose-hr:border-neutral-200
      prose-strong:text-neutral-900 prose-strong:font-semibold">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSlug]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
