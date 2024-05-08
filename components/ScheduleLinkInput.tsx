'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { scrapeSite } from '@/utils/scrapeSite';
import { Download, SearchIcon, X } from 'lucide-react';
import Link from 'next/link';

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
      console.log('🚀 ~ handleGetScrapeSite ~ data:', results);
      setHasError(hasError);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchByName = () => {};

  const handleExport = () => {};

  return (
    <>
      <div className='mb-1.5 text-sm'>{data.length > 0 && !hasError ? 'Search by name' : 'Publication schedule link'}</div>
      <div className='flex w-full space-x-2'>
        <div className='flex flex-1 flex-col space-y-1.5'>
          <Input
            id='name'
            placeholder={data.length > 0 && !hasError ? 'Enter searching name here' : 'Enter schedule link here'}
            value={inputUrl}
            onChange={handleChangeUrl}
          />
        </div>
        {data.length > 0 && !hasError ? (
          <>
            <Button onClick={handleSearchByName} className='w-[56px]'>
              <SearchIcon size={16} />
            </Button>
            <Button onClick={handleExport} variant={'ghost'} className='size-10 bg-[#E2E8F0] p-0'>
              <Download size={16} />
            </Button>
          </>
        ) : (
          <Button type='submit' onClick={handleGetScrapeSite}>
            Crawl
          </Button>
        )}
      </div>
      {hasError ? <div className='mt-[10px] text-xs text-[#EB5757]'>Invalid link. Head to nxbkimdong.com.vn to get the correct link.</div> : null}

      <div className='mt-6 flex items-baseline gap-2'>
        <span className='text-sm font-medium'>Link:</span>
        <div className='flex min-w-0 flex-1 items-center'>
          <Link href={inputUrl} className='flex-1 truncate text-xs text-[#475569] underline hover:text-blue-500'>
            {inputUrl}
          </Link>
          <div className='flex size-4 cursor-pointer justify-center rounded-full border-2 bg-[#E2E8F0]'>
            <X size={12} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleLinkInput;
