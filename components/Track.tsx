import Image from 'next/image';
import { Song } from '@/lib/types';

export default function Track(track: Song & { ranking: number }) {
  return (
    <div className="flex flex-row items-center border-b border-gray-200 dark:border-gray-800 max-w-3xl transition-all hover:scale-[1.03] w-full pt-4 pb-4">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-600 w-4">
        {track.ranking}
      </p>
      <div className="flex w-full">
        <div className="flex flex-col pl-3 w-fit">
          <Image
            className="rounded-[4px]"
            src={track.cover}
            width={48}
            height={48}
            alt=""
          />
        </div>
        <div className="flex flex-col pl-3">
          <a
            className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1 hover:text-[#D67BFF] hover:dark:text-[#D67BFF] w-60 sm:w-96 md:w-full"
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {track.title}
          </a>
          <p
            className="w-60 truncate text-gray-500 sm:w-96 md:w-full "
            color="gray.500"
          >
            {track.artist}
          </p>
        </div>
      </div>
    </div>
  );
} 