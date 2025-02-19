import config from "@/sanity/config/client-config";
import { Blog } from "@/types/blog";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import Image from "next/image";

import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

// lazy-loaded image component
const ImageComponent = ({ value, isInline }: any) => {
    const { width, height } = getImageDimensions(value);
    return (
        <div className="my-10 overflow-hidden rounded-[15px]">
            <Image
                src={
                    urlBuilder(config)
                        .image(value)
                        .fit("max")
                        .auto("format")
                        .url() as string
                }
                width={width}
                height={height}
                alt={value.alt || "blog image"}
                loading="lazy"
                style={{
                    display: isInline ? "inline-block" : "block",
                    aspectRatio: width / height,
                }}
            />
        </div>
    );
};

const Code = ({ value }: any) => {
    return (
        <div className="my-10">
            <SyntaxHighlighter language={value.language} style={dracula}>
                {value.code}
            </SyntaxHighlighter>
        </div>
    );
};

const Table = ({ value }: any) => {
    return (
        <div className="my-10">
            <table>
                <tbody>
                    {value.rows.map((row: any) => (
                        <tr key={row._key}>
                            {row.cells.map((cell: any, key: any) => (
                                <td
                                    key={key}
                                    className="first-of-type:bg-gray-100 max-w-[100px]"
                                >
                                    <span className="px-4">{cell}</span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const components = {
    types: {
        image: ImageComponent,
        code: Code,
        table: Table,
    },
};

const RenderBodyContent = ({ post }: { post: Blog }) => {
    return (
        <>
            <PortableText value={post?.body as any} components={components} />
        </>
    );
};

export default RenderBodyContent;
