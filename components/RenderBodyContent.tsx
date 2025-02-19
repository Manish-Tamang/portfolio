import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { projectId, dataset } from "@/sanity/env"; 

const urlBuilder = imageUrlBuilder({ projectId, dataset });

const ImageComponent = ({ value, isInline }: any) => {
    const { width, height } = getImageDimensions(value);
    const imageUrl = urlBuilder.image(value).fit("max").auto("format").url();

    return (
        <div className="my-10 overflow-hidden rounded-[15px]">
            <Image
                src={imageUrl}
                width={width}
                height={height}
                alt={value.alt || "blog image"}
                loading="lazy"
                style={{
                    display: isInline ? "inline-block" : "block",
                    aspectRatio: width / height,
                    width: '100%', // Make image responsive
                    height: 'auto',
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
        <div className="my-10 overflow-x-auto"> {/* Added overflow-x-auto for responsiveness */}
            <table className="min-w-full"> {/* Added min-w-full for responsiveness */}
                <tbody>
                    {value.rows.map((row: any) => (
                        <tr key={row._key}>
                            {row.cells.map((cell: any, key: any) => (
                                <td
                                    key={key}
                                    className="first-of-type:bg-gray-100 dark:first-of-type:bg-gray-800 p-2 border dark:border-gray-700"
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

interface RenderBodyContentProps {
    content: any[]; // Changed from Blog to any[] to support dynamic content
}

const RenderBodyContent = ({ content }: RenderBodyContentProps) => {
    return (
        <>
            <PortableText value={content} components={components} />
        </>
    );
};

export default RenderBodyContent;