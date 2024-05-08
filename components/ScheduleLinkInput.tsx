'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { scrapeSite } from '@/utils/scrapeSite';

const ScheduleLinkInput = () => {
  const [data, setData] = useState<Object[]>([]);
  const [hasError, setHasError] = useState(false);
  const [inputUrl, setInputUrl] = useState('');

  const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const handleGetScrapeSite = async () => {
    try {
      //   const url = `http://nxbkimdong.com.vn/blogs/lich-phat-hanh-sach-dinh-ky/lich-phat-hanh-sach-dinh-ki-thang-5-2024`;
      const { results, hasError } = await scrapeSite(inputUrl);
      setData(results);
      console.log('🚀 ~ handleGetScrapeSite ~ data:', data);
      setHasError(hasError);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='mb-1.5 text-sm'>Publication schedule link</div>
      <div className='flex w-full space-x-2'>
        <div className='flex w-full flex-col space-y-1.5'>
          <Input id='name' placeholder='Enter schedule link here' value={inputUrl} onChange={handleChangeUrl} />
        </div>
        <Button type='submit' onClick={handleGetScrapeSite}>
          Crawl
        </Button>
      </div>
      {hasError ? <div className='mt-[10px] text-xs text-[#EB5757]'>Invalid link. Head to nxbkimdong.com.vn to get the correct link.</div> : null}
    </>
  );
};

export default ScheduleLinkInput;
