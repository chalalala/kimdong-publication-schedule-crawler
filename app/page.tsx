import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicationCrawler from '@/components/PublicationCrawler';

export default async function Home() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-between p-4 lg:p-24'>
      <Card className='w-full max-w-[640px] shadow-lg'>
        <CardHeader className='pb-5'>
          <CardTitle className='font-inika text-[32px]'>Kim Dong&apos;s Publication Crawler</CardTitle>
        </CardHeader>
        <CardContent>
          <PublicationCrawler />
        </CardContent>
      </Card>
    </main>
  );
}
