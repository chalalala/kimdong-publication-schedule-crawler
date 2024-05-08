'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { Download, SearchIcon, X } from 'lucide-react';
import Link from 'next/link';
import { ResData } from '@/utils/scrapeSite';

type Props = {
  data: ResData[];
  inputUrl: string;
};

const CrawlLinkSuccess = ({ data, inputUrl }: Props) => {
  console.log('🚀 ~ CrawlLinkSuccess ~ data:', data);
  const [inputSearch, setInputSearch] = useState('');

  const handleChangeInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  const handleSearch = () => {};

  const handleExport = () => {};

  return (
    <>
      <div className='mb-1.5 text-sm'>Search by name</div>
      <div className='flex w-full space-x-2'>
        <div className='flex flex-1 flex-col space-y-1.5'>
          <Input id='name' placeholder='Enter searching name here' value={inputSearch} onChange={handleChangeInputSearch} />
        </div>
        <Button onClick={handleSearch} className='w-[56px]'>
          <SearchIcon size={16} />
        </Button>
        <Button onClick={handleExport} variant={'ghost'} className='size-10 bg-[#E2E8F0] p-0'>
          <Download size={16} />
        </Button>
      </div>

      <div className='mt-6 flex items-baseline gap-2'>
        <span className='text-sm font-medium'>Link:</span>
        <div className='flex min-w-0 flex-1 items-center'>
          {inputUrl ? (
            <>
              <Link href={inputUrl} target='_blank' className='flex-1 truncate text-xs text-[#475569] underline hover:text-blue-500'>
                {inputUrl}
              </Link>
              <div className='flex size-4 cursor-pointer justify-center rounded-full border-2 bg-[#E2E8F0]'>
                <X size={12} />
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className='my-6'>
        <div className='flex items-center gap-4'>
          <span className='text-sm font-medium'>{data.length} items selected</span>
          <Button variant={'ghost'} className='h-8 px-2 text-xs text-[#475569]'>
            Select All
          </Button>
          <Button variant={'ghost'} className='h-8 px-2 text-xs text-[#475569]'>
            Deselect All
          </Button>
        </div>
      </div>

      <div>
        <ol>
          {data.map((item, index) => {
            return (
              <li key={`${item}_${index}`}>
                {item.name} - {item.releaseDate} - {item.price}
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default CrawlLinkSuccess;
