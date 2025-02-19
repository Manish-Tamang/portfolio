import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CHCode } from '@code-hike/mdx/components';
import '@code-hike/mdx/dist/index.css';

// Inline code handler
export const InlineCode = ({ children }: { children: string }) => {
  // If wrapped in single backticks, render as pink text
  if (/^`[^`]+`$/.test(children)) {
    return <code className="text-pink-500 font-mono text-sm px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">{children.slice(1, -1)}</code>;
  }
  return <code>{children}</code>;
};

const CodeBlock = ({ children, language = 'typescript', showLineNumbers = false }: {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle single-line inline code with backticks
  if (/^`[^`]+`$/.test(children.trim())) {
    return <InlineCode>{children.trim()}</InlineCode>;
  }

  return (
    <div className="relative rounded bg-[#1E1E1E] overflow-hidden my-6">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-gray-400" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
      <CHCode code={children} language={language} />
    </div>
  );
};

export default CodeBlock;
