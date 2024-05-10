import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicationCrawler from '@/components/PublicationCrawler';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <Card className='w-[640px] shadow-lg'>
          <CardHeader className='pb-5'>
            <CardTitle className='font-inika text-[32px]'>Kim Dong&apos;s Publication Crawler</CardTitle>
          </CardHeader>
          <CardContent>
            <PublicationCrawler />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
