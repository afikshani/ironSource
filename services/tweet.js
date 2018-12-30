/** This is TWEET module
 *  It serves as an outsourced service for the TweetMe server.
 *  The service tweets on behalf of the test account.
 */


// In case of not sending a tweet, we have a defualt one
const DEFAULT_TWEET_POSTING = 'Hey, I\'m a default tweet :(';

// The method to be invoked

module.exports = {

    // The method get the client and a some Tweet as parameter and Tweets it on behalf of the test account
    tweetNow: function (res, client, someTweet) {
        if (typeof someTweet == 'undefined') {
            someTweet = DEFAULT_TWEET_POSTING
        }
        let postParam = {status: someTweet};
        // Actual post request for Twitter API
        client.post('statuses/update', postParam, function (error, tweet, response) {
            if (!error) {
                res.status(200).send('The  ' + `\"${tweet.text}\"` + '  Tweet was posted successfully! Check on your page on Twitter website :) \n');
            } else {
                res.send("Please type in a different tweet on the url in format of url/postTweet?twt=message.");
            }
        });
    }
}


