'use client';

import React, { useState } from 'react';
import ScheduleLinkForm from './ScheduleLinkForm';
import ScheduleData from './ScheduleData';
import { CrawlData } from '@/types/CrawlData';
import { ScheduleList } from './ScheduleList';
import { scrapeDetails } from '@/utils/scrapeSite';
import { Loader } from './Loader';

const PublicationCrawler = () => {
  const [crawlData, setCrawlData] = useState<CrawlData[] | undefined>();
  const [url, setUrl] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetScrapeSite = async (url: string) => {
    try {
      setIsLoading(true);
      const { results, error } = await scrapeDetails(url);
      setCrawlData(results);
      setHasError(!!error);
    } catch (err) {
      setHasError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader className='h-8 w-8' />;
  }

  return url && crawlData ? (
    <ScheduleData data={crawlData} inputUrl={url} setUrl={setUrl} setCrawlData={setCrawlData} />
  ) : (
    <>
      <ScheduleLinkForm url={url} hasError={hasError} setUrl={setUrl} handleGetScrapeSite={handleGetScrapeSite} />
      <ScheduleList setUrl={setUrl} handleGetScrapeSite={handleGetScrapeSite} />
    </>
  );
};

export default PublicationCrawler;
