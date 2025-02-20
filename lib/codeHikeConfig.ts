import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx';
import { highlight } from 'codehike/code';

// Define the component for CodeBlock
async function CodeBlock({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark-dimmed");
  return <Pre code={highlighted} />;
}

// MDX configuration
const chConfig = {
  components: { code: 'CodeBlock' },
  syntaxHighlighting: {
    theme: 'github-dark-dimmed',
  },
};

export const mdxOptions = {
  remarkPlugins: [
    [remarkCodeHike, chConfig],
  ],
  recmaPlugins: [
    [recmaCodeHike, chConfig],
  ],
};

// Serialize the MDX content
const mdxSource = await serialize(post.content || '', {
  mdxOptions,
});
