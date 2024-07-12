'use client';

import { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { Download, SearchIcon, X } from 'lucide-react';
import Link from 'next/link';
import { CrawlData } from '@/types/CrawlData';
import AccessibleTreeView from './AccessibleTreeView';
import { NodeId } from 'react-accessible-treeview';
import { exportData } from '@/utils/exportData';
import { GetUrlForm } from './GetUrlForm';

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

  return (
    <>
      <div className='mb-1.5 text-sm'>Search by name</div>
      <div className='flex w-full gap-2'>
        <div className='flex flex-1 gap-2'>
          <Input type='search' id='name' placeholder='Enter searching name here' value={searchTerm} onChange={handleChangeInputSearch} />
          <Button className='w-[56px]'>
            <SearchIcon size={16} />
          </Button>
        </div>
        <Button onClick={handleExport} variant={'ghost'} className='size-10 bg-[#E2E8F0] p-0'>
          <Download size={16} />
        </Button>
        <GetUrlForm selectedItems={selectedItems} />
      </div>

      <div className='mt-6 flex items-baseline gap-1'>
        <span className='text-sm font-medium'>Link:</span>
        <div className='flex min-w-0 flex-1 items-center'>
          {inputUrl ? (
            <>
              <Link href={inputUrl} target='_blank' className='flex-1 truncate text-xs text-label underline hover:text-blue-500'>
                {inputUrl}
              </Link>
              <div className='flex size-4 cursor-pointer justify-center rounded-full border-2 bg-[#E2E8F0]' onClick={handleRemoveUrl}>
                <X size={12} />
              </div>
            </>
          ) : null}
        </div>
      </div>

      <AccessibleTreeView
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
