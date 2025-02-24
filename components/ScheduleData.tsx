'use client';

import { FC, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { Download, SearchIcon, X } from 'lucide-react';
import Link from 'next/link';
import { CrawlData } from '@/types/CrawlData';
import ScheduleTree from './ScheduleTree';
import { NodeId } from 'react-accessible-treeview';
import { exportData } from '@/utils/exportData';
import { GetUrlButton } from './GetUrlButton';
import { cn } from '@/lib/utils';

interface Props {
  data: CrawlData[];
  inputUrl: string;
  setUrl: (url: string) => void;
  setCrawlData: (data: CrawlData[] | undefined) => void;
}

const ScheduleData: FC<Props> = ({ data, inputUrl, setUrl, setCrawlData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<NodeId[]>([]);
  const [selectedItems, setSelectedItems] = useState<(CrawlData | undefined)[]>([]);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const buttonsGroupRef = useRef<HTMLDivElement>(null);
  const timerId = useRef<number | null>(null);

  const handleChangeInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveUrl = () => {
    setUrl('');
    setCrawlData(undefined);
  };

  const handleExport = () => {
    exportData(selectedItems);
  };

  // Confirmation on leaving page
  useEffect(() => {
    window.onbeforeunload = function (e) {
      if (selectedItems.length > 0) {
        return 'Do you want to exit this page?';
      }
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [selectedItems]);

  // Show fixed buttons when scrolling
  useEffect(() => {
    if (!buttonsGroupRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (timerId.current) {
          clearTimeout(timerId.current);
        }

        timerId.current = window.setTimeout(() => {
          if (!entry.isIntersecting) {
            setIsIntersecting(true);
          } else {
            setIsIntersecting(false);
          }
        }, 200);

        timerId.current = null;
      });
    });

    observer.observe(buttonsGroupRef.current);
  }, []);

  return (
    <>
      <div className='mb-1.5 text-sm'>Search by name</div>
      <div className='flex w-full gap-2' ref={buttonsGroupRef}>
        <div className='flex flex-1 gap-2'>
          <Input type='search' id='name' placeholder='Enter searching name here' value={searchTerm} onChange={handleChangeInputSearch} />
          <Button className='w-[56px]'>
            <SearchIcon size={16} />
          </Button>
        </div>

        <div
          className={cn('flex gap-2', {
            'fixed bottom-8 right-8 flex-col items-center': isIntersecting,
          })}>
          <Button
            onClick={handleExport}
            variant={'ghost'}
            className={cn('size-10 bg-gray-50 p-0', {
              'shadow-md': isIntersecting,
            })}>
            <Download size={16} />
          </Button>

          <span
            className={cn({
              'rounded-md border border-gray-50/50 bg-white shadow-md': isIntersecting,
            })}>
            <GetUrlButton selectedItems={selectedItems} />
          </span>
        </div>
      </div>

      <div className='mt-6 flex items-baseline gap-1'>
        <span className='text-sm font-medium'>Link:</span>
        <div className='flex min-w-0 flex-1 items-center'>
          {inputUrl ? (
            <>
              <Link href={inputUrl} target='_blank' className='flex-1 truncate text-xs text-label underline hover:text-blue-500'>
                {inputUrl}
              </Link>
              <div className='flex size-4 cursor-pointer justify-center rounded-full border-2 bg-gray-50' onClick={handleRemoveUrl}>
                <X size={12} />
              </div>
            </>
          ) : null}
        </div>
      </div>

      <ScheduleTree
        searchTerm={searchTerm}
        rawData={data}
        selectedItems={selectedItems}
        selectedIds={selectedIds}
        setSelectedItems={setSelectedItems}
        setSelectedIds={setSelectedIds}
      />
    </>
  );
};

export default ScheduleData;
