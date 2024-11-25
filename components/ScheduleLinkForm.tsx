'use client';

import { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent } from 'react';
import { Loader } from './Loader';
import { useFormStatus } from 'react-dom';

interface Props {
  url: string;
  hasError: boolean;
  setUrl: (url: string) => void;
  handleGetScrapeSite: (url: string) => void;
}

const CrawlButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending}>
      {pending ? <Loader className='h-8 w-8' /> : <span>Crawl</span>}
    </Button>
  );
};

const ScheduleLinkForm: FC<Props> = ({ url, hasError, setUrl, handleGetScrapeSite }) => {
  const handleChangeInputUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <>
      <div className='mb-1.5 text-sm'>Publication schedule link</div>
      <form className='flex w-full space-x-2' action={() => handleGetScrapeSite(url)}>
        <div className='flex flex-1 flex-col space-y-1.5'>
          <Input id='url' placeholder='Enter schedule link here' value={url} onChange={handleChangeInputUrl} />
        </div>
        <CrawlButton />
      </form>
      {hasError ? (
        <div className='mt-[10px] text-xs font-medium text-red-500'>Invalid link. Head to nxbkimdong.com.vn to get the correct link.</div>
      ) : null}
    </>
  );
};

export default ScheduleLinkForm;
