const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');

const credentials = {
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

router.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi(credentials);

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400)
    });
});

router.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({ ...credentials, refreshToken });

  spotifyApi.refreshAccessToken().then((data) => {
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in,
    })
  }).catch((err) => {
    console.log(err);
    res.sendStatus(400);
  })
});

module.exports = router;
