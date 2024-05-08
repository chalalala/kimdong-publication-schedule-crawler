'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useState, useEffect } from 'react';
import { scrapeSite } from '@/utils/scrapeSite';

type Props = {
  sendDataToParent: Function;
};

const ScheduleLinkInput = ({ sendDataToParent }: Props) => {
  const [data, setData] = useState<Object[]>([]);
  const [hasError, setHasError] = useState(false);
  const [inputUrl, setInputUrl] = useState('');

  const handleChangeInputUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const handleGetScrapeSite = async () => {
    try {
      //   const url = `http://nxbkimdong.com.vn/blogs/lich-phat-hanh-sach-dinh-ky/lich-phat-hanh-sach-dinh-ki-thang-5-2024`;
      const { results, error } = await scrapeSite(inputUrl);
      setData(results);
      setHasError(error ? true : false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      sendDataToParent({ data, inputUrl, hasError });
    }
  }, [data, hasError]);

  return (
    <>
      <div className='mb-1.5 text-sm'>Publication schedule link</div>
      <div className='flex w-full space-x-2'>
        <div className='flex flex-1 flex-col space-y-1.5'>
          <Input id='url' placeholder='Enter schedule link here' value={inputUrl} onChange={handleChangeInputUrl} />
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
