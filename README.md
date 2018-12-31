# ironSource

This is the BackEnd infrastructure for “TweetMe”.

The following sevices are provided:

1. Tweet a message on behalf of the user account.

2. Get a list of the most recent Tweets of the user.

3. Like a Tweet from a list of Tweets containing certain keyword or related to it.

4. Create a new friendship ("follow") with some follower of ironSource.

--------------------------------------------------------------------------------

IMPORTANT NOTE:

This product serves the test user configured in the test_account.js file to do the all the mentioned above operations using Twitter API - currently defined for 'afik21023201'.

--------------------------------------------------------------------------------

HOW TO GET A NEW TEST ACCOUNT:

1) Enter to Twitter.com and create a new test account.
2) Apply for being a developer with Twitter.
3) Once you get approved, create a new app.
4) After doing that, findy your access tokens and all of the credentails.
5) Type it in the relevant fields at the test_account.js file.
6) Re-deploy the service to heroku.

--------------------------------------------------------------------------------

FINAL NOTES:

1) This server is deployed at heroku at https://desolate-river-25894.herokuapp.com/

2) Sample link to the service that will tweet a message (to the test account).
https://desolate-river-25894.herokuapp.com/postTweet?twt=msg
** REPLACE THE msg IN ANY TWEET YOU WOULD LIKE TO BE POSTED

3) Currently any change regarding the user's access tokens has to updated on the web server as well at the git repository of heroku using ''git heroku push master'' meaning new deploy to heroku-
https://git.heroku.com/desolate-river-25894.git

3) In the future, once the FrontEnd would be complete, one should be asked to fill his access tokens and we can send it would be possible to send those as parameters to the config file. 
-> Doing that would cause the application to bu fully general and no need for re-deploy after nay change in the user. 

--------------------------------------------------------------------------------

ENJOY!

AFIK SHANI SCHONWETTER

