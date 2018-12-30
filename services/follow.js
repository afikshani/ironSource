/** This is FOLLOW module
 * It serves as an outsourced service for the TweetMe server.
 *
 * The idea of it is to helps us create a more 'interest based' social network :)
 */

// Helps us get a random user out of an users array
const randomize = require('../helper/chooseRandom.js');

// The method to be invoked

module.exports = {

    /* The method query Twitter server using GET and POST requests over REST API
     * At first it gets the list of ironSource followers, then it create a new follow on behalf of the test account
     * for a random follower of ironSource.
     */

    ironSource_BasedNetwork: function (res, client) {
        let queryParams = {screen_name: 'ironSource'};
        // The method gets the list of ironSource followers.
        client.get('followers/list', queryParams, function (err, data) {
            if (!err) {
                let friendOfironSource = randomize(data.users);
                // The method create a new follow on behalf of the test account
                client.post('friendships/create', {screen_name: friendOfironSource.screen_name}, function (error, response) {
                    if (error) {
                        res.send(error);
                    } else {
                        res.status(200).send(`Congratulations! You just followed \"${friendOfironSource.screen_name}\" who's following ironSource as well. Keep enriching our community :)`);
                    }
                });
            } else {
                res.send(err);
            }
        });
    }
}




