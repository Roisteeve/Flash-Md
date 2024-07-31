const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐒 𝐓 𝐄 E 𝐕 𝐄 ☯︎",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "50937042801", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '2' ,
    PRESENCE : process.env.PRESENCE || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU4yRk80ZmduOThnQmNUbkxhRFFpd2lHR3pSZTJJR0NNWEg4ZEZENkkyUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1NvNlhzaFhMMWpRWmtXQjk1bHQ0dHZ6VUF4OHhHSHBKOGNTWkJNWHZTdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQm9BTkF6UHh3QUJ2cHZwbHpycUF5Z3V2elVuYjd4cU9Sam4yZlg2dTNjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SXdBbWlXWE1iTmdOa1BYZjk4a0VLUEhlSlA3b2tyeTRZa0JMYmFMclZzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitDL2lwQlJrV3FyQzdPbmhwc1NHYjc4QUZlalRuVEVZQTM2RFJpYVhkR289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFhNnBNem1MMGxhUVRZRy9uazZKRytBVmFMeHhsaElzTnB0NHlEckJFeDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEgyWFV0MVd1OStEZmJIM3R0MEM1eUEzVFhaUFYwMDVacTRVcDF2bGdYUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXpmVE1ZdlNtVzJVUXpBNDVYTWNHWjh3aWFXZWlBcy9uMmo3MDB0T0lnVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ink2UTVqQWt2bVJ6ZVFyTDdMaDB5aEc0OS9nNlptVW9qZ2IwVFpiUXRISko2bDhtVEovdEJ4TFV2TUxtdnp5R2ZkN0hIZUl2Q3NBYWtLdUxZMkJkY2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY0LCJhZHZTZWNyZXRLZXkiOiJYMUFHeFVGcDJuL2JCY1R0UDR0RUlNN01ZdGhJQ1UrcEhFd1RvT0Y2NE9RPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJIWG8xV0N0VlNfMmc1ME9xcmItdUdBIiwicGhvbmVJZCI6IjRhMDg0NTEyLWVkOTUtNDA3Yi1hNTBkLWVmZmRjNzliN2JlYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyQU14SUxLS01leHd4STdKRDdvVUw4SUxMTVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVNkejk1ZmRFbnYybWlTc2VycVdIREI0enU4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkhLU044WFA4IiwibWUiOnsiaWQiOiI1MDkzNzA0MjgwMTo1N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSzJ5dGFVSEVKajhxYlVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibC9CZVltbytEYTRLUUhPZzNsakN0aXZCRjZMM3VmYlhQZXNqMlkvYmpSRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZVh5TmxsWWhzcGNRM3NtLzFOVXQra2FGeDU1M3pVMHpXdWVFbTMvOHVGRERTYWpoR2lWSFhlNHYzOGJnd0Vya05ZOVp2OWpNVVRmKzQ3c1lJemJvRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IkRUMzVOc2tGY2FjaW5tNTlFaTZTUmcvRjZMM3JOcWQ0QVcxTi95VENvV0IzZ2p6cXEvOXlMS2hrVFk0MFpITzdJSUNoNlIrb2xCWXlsQnJFMGlQU2hBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5MzcwNDI4MDE6NTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWmZ3WG1KcVBnMnVDa0J6b041WXdyWXJ3UmVpOTduMjF6M3JJOW1QMjQwUiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjQ0OTQ0NX0=',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
