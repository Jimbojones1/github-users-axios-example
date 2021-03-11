const axios = require('axios');

const token = process.env.GITHUB_TOKEN;

const rootUrl = 'https://api.github.com/';

module.exports = {
    index
}

async function index(req, res, next) {
    const username = req.query.username;
    const options = {
      method: 'GET',
      url: `${rootUrl}users/${username}`,
      headers: {
        'User-Agent': 'jimbojones1',// From the docs they told us to pass in our username
        Authorization: `token ${token}`
      }
    };

    try {
        const { data } = await axios(options)
        // using destructering here for more information https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        // this is the same as const response = await axios(options)
        // response.data
        // The {data} is shorthand for just defining a variable that is just equal to response.data
      
        options.url = data.repos_url
        const userRepos = await axios(options)
        // Notice how the response is different using axios then it is the request below
        // always log out the response from an api call to confirm what the response object actually 
        // looks like, you never know until you log it 
        data.repos = userRepos.data;
        res.render('index', {userData: data})
    } catch(err){
        res.send(err)
    }


    // request(options, function(err, response, body) {
    //   console.log(typeof body)
    //   const userData = JSON.parse(body)
  
    //   options.url = userData.repos_url;
    //   request(options, function(err, response, body){
  
    //     userData.repos = JSON.parse(body)
    //     console.log(userData.repos[0])
    //     res.render('index', {userData: userData});
    //   })
  
      
    // });
  }