import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export const components = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative aspect-video">
                    <Image
                        src={urlFor(value).width(800).height(600).url()}
                        alt={value.alt || 'Blog image'}
                        fill
                        sizes='100vw'
                        className='object-cover rounded-md'
                        style={{
                            objectFit: 'contain'
                        }}
                        priority
                    />
                </div>
            )
        }
    },
    marks: {
        link: ({ children, value }: any) => {
            const { href, blank } = value;
            return blank ? (
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            ) : (
                <a href={href}>{children}</a>
            );
        },
        strong: ({ children }: any) => (
            <strong className="font-bold">{children}</strong>
        ),
    },
};