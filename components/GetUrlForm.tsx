'use client';

import { FC, useState } from 'react';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { uploadFile } from '@/actions/uploadFile';
import { CrawlData } from '@/types/CrawlData';
import { getSecretKey } from '@/actions/isCorrectKey';

interface Props {
  selectedItems: (CrawlData | undefined)[];
}

export const GetUrlForm: FC<Props> = ({ selectedItems }) => {
  const [secretKey, setSecretKey] = useState<string | null>('');

  const getUrl = async () => {
    const correctKey = await getSecretKey();

    if (!!correctKey && !secretKey) {
      const key = prompt('Please enter your secret key to unlock get the URL');

      if (key !== correctKey) {
        alert('Wrong key!');
        return;
      } else {
        setSecretKey(key);
      }

      return;
    }

    try {
      const { filePath } = await uploadFile(selectedItems);
      await navigator.clipboard.writeText(filePath);

      alert('Download URL has been copied to your clipboard:' + filePath);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form action={getUrl}>
      <Button variant={'link'} className='size-10 p-0'>
        <Copy size={16} />
      </Button>
    </form>
  );
};
