'use server';

import { CrawlData } from '@/types/CrawlData';
import { ScheduleListData } from '@/types/ScheduleListData';
import axios from 'axios';
import { load } from 'cheerio';
import https from 'https';

export async function scrapeDetails(url: string) {
  const options = {
    method: 'GET',
    url,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  const results: CrawlData[] = [];

  try {
    const { data } = await axios.request(options);
    const $ = load(data);

    let currentReleaseDate = '';

    const monthAndYear =
      $('h1')
        .text()
        .match(/\d{1,2}\/\d{4}/)?.[0] || '';

    const [_, year] = monthAndYear.split('/');

    $('tr').each((index, elem) => {
      const dateString = $(elem).find('td:nth-child(1)').find('p:last-of-type').text();
      const [date, month] = dateString.split('.');

      let name = '';
      let price = '';

      if (!!dateString.trim()) {
        currentReleaseDate = new Date(`${year}-${month}-${date}`).toISOString();
        name = $(elem).find('td:nth-child(3)').text();
        price = $(elem).find('td:nth-child(4)').text();
      } else {
        name = $(elem).find('td:nth-child(2)').text();
        price = $(elem).find('td:nth-child(3)').text();
      }

      // ignore empty rows
      if (!name.trim()) {
        return;
      }

      results.push({ index, name, price, releaseDate: currentReleaseDate });
    });
    return { results };
  } catch (error) {
    return { results: undefined, error };
  }
}

export async function scrapeList() {
  const baseUrl = 'https://nxbkimdong.com.vn/';
  const url = 'https://nxbkimdong.com.vn/blogs/lich-phat-hanh-sach-dinh-ky/';
  const options = {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  const results: ScheduleListData[] = [];

  const { data } = await axios.get(url, options);
  const $ = load(data);

  const blogBody = $('.blog-body');
  const articles = $(blogBody).find('.article-item.article-item-blog');

  articles.each((_, elem) => {
    const titleEl = $(elem).find('.article-title')?.children()?.first();
    const title = $(titleEl).text();
    const href = $(titleEl).attr('href') ?? '';
    const link = new URL(href, baseUrl).href;

    results.push({ title, link });
  });

  return results;
}
