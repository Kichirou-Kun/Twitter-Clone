import { RefreshIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTweets } from '../utils/fetchTweets';
import { Tweet } from '../utils/typing';
import TweetComponent from './Tweet';
import TweetBox from './TweetBox';
interface Props {
  tweets: Tweet[];
}
const Feed = ({ tweets: tweetsProps }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProps);
  const handlerRefresh = async () => {
    const refreshToash = toast.loading('Rereshing...');
    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success('Feed Updated', {
      id: refreshToash,
    });
  };
  return (
    <div className="col-span-7 scrollbar-hide lg:col-span-5 border max-h-screen overflow-scroll">
      <div className="flex  items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold ">Home</h1>
        <RefreshIcon
          className="h-8 w-8 mr-5 mt-5 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
          onClick={handlerRefresh}
        />
      </div>
      {/* Tweetbox */}
      <div>
        <TweetBox setTweets={setTweets}/>
      </div>
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
