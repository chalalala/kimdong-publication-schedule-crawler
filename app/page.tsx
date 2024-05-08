import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Inika } from 'next/font/google';
import PublicationCrawler from '@/components/PublicationCrawler';

const inika = Inika({ weight: '400', subsets: ['latin'] });

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <Card className='w-[640px] shadow-lg'>
          <CardHeader className='pb-5'>
            <CardTitle className={`${inika.className} text-[32px]`}>Kim Dong's Publication Crawler</CardTitle>
          </CardHeader>
          <CardContent>
            <PublicationCrawler />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
