# account-linking
Account linking for Discord with Google SSO using PassportJS, NodeJS, ExpressJS, MongoDB. 
This app create for Link and Unlink social media account to the app such as Facebook, Twitter and etc.
In this app we use a Discord as a social media account that connect with user that login with Google SSO. 

We use PassportJS as our authentication middleware for Node.js. Check more info click here [PassportJS Pages](http://www.passportjs.org/).

## How to run?

### 1. Install dependencies.

To install all the dependencies use this command

```
npm i
```

### 2. Create MongoDB url

Go to .env file and change the url. To create your mongodb url click here [MongoDB Pages](https://www.mongodb.com/atlas/database).
``` env
MONGODB_URL = ' put your mongodb url here '
```

### 3. Create Client ID and Secret ID

In .env file put your Client ID and Secret ID for Google and Discord. 

*Please put `http://localhost:9000` as a url

- Google
To get Google Client ID and Secret ID [click here](https://console.developers.google.com/).
- Discord
To get Discord Client ID and Secret ID [click here](https://discord.com/developers/applications).

``` env
GOOGLE_CLIENT_ID = ''
GOOGLE_SECRET_ID = ''
GOOGLE_CALLBACK_URL = '/auth/google/callback'

DISCORD_CLIENT_ID = ''
DISCORD_SECRET_ID = ''
DISCORD_CALLBACK_URL = '/auth/discord/callback'
```

### 4. Run the app
1. Terminal
```
node server.js
```
or
```
nodemon
```

2. After run in terminal go to your browser and type 
```
localhost:9000
```
