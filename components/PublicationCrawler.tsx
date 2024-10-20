'use client';

import React, { useState } from 'react';
import ScheduleLinkForm from './ScheduleLinkForm';
import ScheduleData from './ScheduleData';
import { CrawlData } from '@/types/CrawlData';

const PublicationCrawler = () => {
  const [crawlData, setCrawlData] = useState<CrawlData[] | undefined>();
  const [url, setUrl] = useState(() => {
    const today = new Date().getDate();
    const thisMonth = new Date().getMonth() + 1;
    const queryMonth = today > 25 ? thisMonth + 1 : thisMonth;

    return `https://nxbkimdong.com.vn/blogs/lich-phat-hanh-sach-dinh-ky/lich-phat-hanh-sach-dinh-ki-thang-${queryMonth}-2024`;
  });

  return url && crawlData ? (
    <ScheduleData data={crawlData} inputUrl={url} setUrl={setUrl} setCrawlData={setCrawlData} />
  ) : (
    <ScheduleLinkForm url={url} setUrl={setUrl} setCrawlData={setCrawlData} />
  );
};

export default PublicationCrawler;
