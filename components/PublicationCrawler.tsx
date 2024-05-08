'use client';

import React, { useState } from 'react';
import ScheduleLinkInput from './ScheduleLinkInput';
import CrawlLinkSuccess from './CrawlLinkSuccess';
import { ResData } from '@/utils/scrapeSite';

type ResponseDataCrawl = {
  data: ResData[];
  inputUrl: string;
  hasError: boolean;
};

const PublicationCrawler = () => {
  const [resDataCrawl, setResDataCrawl] = useState<ResponseDataCrawl>();

  const receiveDataFromChild = (data: ResponseDataCrawl) => {
    setResDataCrawl(data);
  };

  return (
    <>
      {resDataCrawl?.data && resDataCrawl?.inputUrl && !resDataCrawl.hasError ? (
        <CrawlLinkSuccess data={resDataCrawl?.data} inputUrl={resDataCrawl?.inputUrl} />
      ) : (
        <ScheduleLinkInput sendDataToParent={receiveDataFromChild} />
      )}
    </>
  );
};

export default PublicationCrawler;
