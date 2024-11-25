import { scrapeList } from '@/utils/scrapeSite';
import React, { FC } from 'react';
import useSWR from 'swr';
import { Loader } from './Loader';

interface Props {
  setUrl: (url: string) => void;
  handleGetScrapeSite: (url: string) => void;
}

export const ScheduleList: FC<Props> = ({ setUrl, handleGetScrapeSite }) => {
  const { data, isLoading } = useSWR('schedule-list', scrapeList);

  if (isLoading) {
    return (
      <div className='my-5 flex justify-center'>
        <Loader className='h-8 w-8' />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const displayedData = data?.slice(0, 3) || [];

  const onSelectItem = (url: string) => {
    setUrl(url);
    handleGetScrapeSite(url);
  };

  return (
    <ul className='flex list-disc flex-col gap-1 pl-5 pt-4 text-sm'>
      {displayedData?.map((item) => (
        <li key={item.link}>
          <button className='text-left text-black hover:underline' onClick={() => onSelectItem(item.link)}>
            {item.title}
          </button>
        </li>
      ))}
    </ul>
  );
};
