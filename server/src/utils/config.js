require("dotenv").config();

module.exports = {
  /*
   ** mongodb connection string
   */
  mongoDbConnectionString: process.env.MONGODB_CONNECTION || false,

  /*
   ** Location where the app is hosted, used for oauth callbacks
   ** NOTE: NO slash at the end
   **
   ** example: "https://test.example.com/backend"
   */
  host: process.env.HOST || false,

  /*
   ** Hosts that are allowed to call the api
   **
   ** example: "https://test.example.com/backend"
   */
  corsHosts: (process.env.CORS || "").split(" ").filter((v) => v.length),

  /*
   ** port on which it should run the application
   **
   ** example: "80"
   */
  port: parseInt(process.env.PORT) || 8080,

  /*
   ** Location of the app, used for redirections
   **
   ** example: "https://test.example.com"
   */
  clientUrl: process.env.CLIENT_URL || false,

  /*
   ** secret used for authentication encryption
   ** NOTE: by changing this value, sessions/tokens will all invalidate
   */
  authSecret: process.env.AUTH_SECRET || false,

  /*
   ** Configuration for discord strategy
   */
  discord: {
    /*
     ** Discord client ID, get from discord application
     */
    clientId: process.env.DISCORD_CLIENT_ID || false,

    /*
     ** Discord client Secret, get from discord application
     */
    clientSecret: process.env.DISCORD_CLIENT_SECRET || false,
  },
};
