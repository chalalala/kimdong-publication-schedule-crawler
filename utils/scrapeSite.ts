'use server';

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

  const results: {
    name: string;
    price: string;
    releaseDate: string;
  }[] = [];

  let hasError: boolean = false;

  try {
    const { data } = await axios.request(options);
    const $ = load(data);

    let currentReleaseDate = '';

    $('tr').each((_, elem) => {
      const releaseDate = $(elem).find('td:first-of-type').find('p:last-of-type').text();

      if (!!releaseDate.trim()) {
        currentReleaseDate = releaseDate;
      }

      const name = $(elem).find('td:nth-child(2)').text();

      // ignore empty rows
      if (!name.trim()) {
        return;
      }

      const price = $(elem).find('td:nth-child(3)').text();

      results.push({ name, price, releaseDate: currentReleaseDate });
    });
  } catch (error) {
    hasError = true;
  } finally {
    return { results, hasError };
  }
}
