import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { fetchTweets } from '../utils/fetchTweets';
import { Tweet } from '../utils/typing';

interface Props {
  tweets: Tweet[];
}

export default function Home({ tweets }: Props) {


  return (
    <div className="overflow-hidden lg:max-w-6xl mx-auto max-h-screen">
      <Head>
        <title>Twitter 2.0</title>
      </Head>
      <Toaster />
      <main className="grid grid-cols-9">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed tweets={tweets} />

        {/* Widgets */}
        <Widgets/>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    },
  };
};
