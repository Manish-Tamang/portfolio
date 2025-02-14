import Image from 'next/image';
import { useTheme } from 'next-themes';

interface ImageWithThemeProps {
    alt: string;
    light: string;
    dark: string;
    [key: string]: any;
}

export default function ImageWithTheme(props: ImageWithThemeProps) {
    const { theme } = useTheme();

    return (
        <Image
            alt={props.alt}
            src={theme === 'light' ? props.light : props.dark}
            {...props}
        />
    );
}
