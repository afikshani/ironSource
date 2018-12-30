/** TweetMe APP integrating with twitter services using their API.
 *  this product is able to provide services on behalf of a test account configured at test_account.js file.
 *  It is the BackEnd infrastructure of TweetMe.
 */

// Requiring all the necessary modules within the NPM
const express = require('express'),
    stringFormat = require('stringformat'),
    Twitter = require('twitter'),
    bodyParser = require('body-parser');

// Requiring my modules and configurations
const UserConfig = require('./test_account.js'),
    searcher = require('./services/search.js'),
    follower = require('./services/follow.js'),
    tweeter = require('./services/tweet.js');

// Server configurations
const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Creating the client using the authenticating credentials of the TEST_ACCOUNT
const client = new Twitter(UserConfig.twitterKeys);


app.get('/postTweet', function (req, res) {
    const someTweet = req.query.twt;
    tweeter.tweetNow(res, client, someTweet);
});

app.get('/getMyTweets', function (req, res) {
    const count = req.query.count;
    searcher.myTweets(res, client, count);
});

app.get('/LikeTweetWith/:keyword', function (req, res) {
    const keyword = req.params.keyword;
    searcher.keywordSearchAndLike(res, client, keyword);
});

app.get('/joinIronSourceCommunity', function (req, res) {
    follower.ironSource_BasedNetwork(res, client);
});


app.get('*', (req, res) => {
    const firstService = "To tweet some message enter the URL/postTweet?twt=message",
    secondService = "To get the list of X most recent tweets (max val of X is 200) of the enter the URL/getMyTweets?count=X",
    thirdService = "To like a random tweet that contains or is related for a certain keyword please enter the URL/LikeTweetWith/keyword",
    fourthService = "To create a new friend with someone who follow ironSource as well enter the URL/joinIronSourceCommunity";

    res.end(stringFormat("Hey tester! \n\n You can do the following: \n\n {0} \n\n {1} \n\n {2} \n\n {3} \n\n Enjoy :)", firstService, secondService, thirdService, fourthService));
});


app.listen(PORT, () => {
    console.log("Server is listening on port: %s", PORT);
});
