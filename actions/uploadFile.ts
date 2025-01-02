'use server';

import { CrawlData } from '@/types/CrawlData';
import axios from 'axios';

interface UploadFileResponse {
  filePath: string;
  name: string;
}

export const uploadFile = async (content: (CrawlData | undefined)[]) => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(content, undefined, 2)], { type: 'application/json' });
  formData.append('file', blob, 'publication-schedule.json');

  const queryParams = new URLSearchParams({
    expires_in: '30',
    expires_unit: 'minutes',
  });

  const { data } = await axios.post<UploadFileResponse>(`/test?${queryParams.toString()}`, formData, {
    baseURL: process.env.UPLOAD_FILE_BASE_URL,
  });

  return data;
};
