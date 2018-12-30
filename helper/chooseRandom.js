/** This is A Random module
 *  It serves as a helper for the services such as search and follow
 *  Has only one function that gets an array and return a random element from it
 */


const chooseRandom = (arr) => {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

module.exports = chooseRandom