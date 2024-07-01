'use client';

import React, { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { scrapeSite } from '@/utils/scrapeSite';
import { CrawlData } from '@/types/CrawlData';

interface Props {
  url: string;
  setUrl: (url: string) => void;
  setCrawlData: (data: CrawlData[] | undefined) => void;
}

const ScheduleLinkInput: FC<Props> = ({ url, setUrl, setCrawlData }) => {
  const [hasError, setHasError] = useState(false);

  const handleChangeInputUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleGetScrapeSite = async () => {
    try {
      const { results, error } = await scrapeSite(url);
      setCrawlData(results);
      setHasError(error ? true : false);
    } catch (err) {
      setHasError(true);
      console.error(err);
    }
  };

  return (
    <>
      <div className='mb-1.5 text-sm'>Publication schedule link</div>
      <form className='flex w-full space-x-2' action={handleGetScrapeSite}>
        <div className='flex flex-1 flex-col space-y-1.5'>
          <Input id='url' placeholder='Enter schedule link here' value={url} onChange={handleChangeInputUrl} />
        </div>
        <Button type='submit'>Crawl</Button>
      </form>
      {hasError ? <div className='mt-[10px] text-xs text-[#EB5757]'>Invalid link. Head to nxbkimdong.com.vn to get the correct link.</div> : null}
    </>
  );
};

export default ScheduleLinkInput;
