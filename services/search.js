/** This is SEARCH module
 *  It serves as an outsourced service for the TweetMe server. The following services are operated:
 *  - Get a list of X most recent tweet on the test user (X max val. is 200).
 *  - Like a Tweet that contains a certain keyword.
 */


// In case of sending Nan count parameter or larger value than can get
const DEFAULT_SEARCH_COUNT = 5;

// Helps us get a random tweet out of an array
const randomize = require('../helper/chooseRandom.js');

// Main methods to be invoked by server

module.exports = {

    // The method gets the client and number of Tweets (count) provide to tester and send the Tweets data back
    myTweets: function(res, client, count) {
        if(isNaN(count) || count > 200 || count < 1) { //count < 200 is restricted by Twitter API
            count = DEFAULT_SEARCH_COUNT;
        }
        let queryParams = {count: count};
        // Actual get request for Twitter API
        client.get('statuses/user_timeline', queryParams, function (error, tweets, response){
            if (!error) { // Get the tweets as a JSON and send back to the tester
                res.header("Content-Type", 'application/json');
                res.write(`These are the ${count} most recent Tweets of you [JSON FORMAT] : \n\n`)
                res.end(JSON.stringify(tweets, null, 4));
            } else{
                res.send(error);
            }
        });
    },

    /* The method gets the client and a keyword to search by as parameters.
     * The method provide a list of Tweets containing the keyword and 'likes' a random tweet out of this list.
     */
    keywordSearchAndLike: function(res, client, keyword) {
        let query = {q: keyword}
        client.get('search/tweets', query, function(error, tweets, response) {
            if (!error) { // Choose a random Tweet out of the list and send to be 'liked'
                let radnomTweet= randomize(tweets.statuses);
                client.post('favorites/create', {id: radnomTweet.id_str}, function(err, response) {
                    if (err) {
                        res.send(err)
                    }
                    else {  // In case of successful 'like' it sends back the url of the Tweet.
                        let username = response.user.screen_name;
                        let tweetId = response.id_str;
                        res.status(200).send('The Tweet that was just liked:  ' + `https://twitter.com/${username}/status/${tweetId}`);
                    }
                });
            }
            else{
                res.send(error);
            }
        });
    }

}



