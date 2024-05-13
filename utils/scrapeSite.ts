'use server';

import { CrawlData } from '@/types/CrawlData';
import axios from 'axios';
import { load } from 'cheerio';
import https from 'https';

export async function scrapeSite(url: string) {
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
      const dateString = $(elem).find('td:first-of-type').find('p:last-of-type').text();
      const [date, month] = dateString.split('.');

      if (!!dateString.trim()) {
        currentReleaseDate = new Date(`${year}-${month}-${date}`).toISOString();
      }

      const name = $(elem).find('td:nth-child(2)').text();

      // ignore empty rows
      if (!name.trim()) {
        return;
      }

      const price = $(elem).find('td:nth-child(3)').text();

      results.push({ index, name, price, releaseDate: currentReleaseDate });
    });
    return { results };
  } catch (error) {
    return { results: undefined, error };
  }
}
