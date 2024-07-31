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
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '2' ,
    PRESENCE : process.env.PRESENCE || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUdKcjdtTHFoalo2SHBheGxDQnR4QWtScUloNEpYQndOZi9ycXc2dGNXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDFLMUhjRGxiVk1wcitkaVFsUnpkamhOSElFSm96WFBDQWV2QUQ2Wm1oMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSnQ2NnorK2ZJRlZxZXJoY3hQSlFuVC9KSWJWLzF5K3hNS3p3c3RFVkV3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTc3JqeSt3WkordUpad3RJdStWZUN5cElmKzBjajRlekV1b3VUQU02QXg0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNBYlczWXJPS0taZW5CY0dzTlIvbUxvRVBDZW9zaFFDRWlUK1FhU1RVbjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpFcXZYRTIwMlZ5OVJ5UWNXcjA1RDlBbVVJM0wvYUNGWE56V1ZZM05pVEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUc1SDhpYlRJek5RRXdoZFBNbTZUc3pWN3U4NmhjL2xKeXhtK0dhR1EzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjJEQU95aURHamlnNkw2L1M1eXFTd2U2STVmcVVuTGVsTDBFd3JWeHEzMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpRM0hpWWwydDJML3pFaFBFUEpuRzFhN3FaRnM5N0hWMVR2UjZxQ3FMRVdXYXpRcW9pdU95eEdlWWRBMmdvNHBYUTBwOElpdHJiZmE1bTZOVU5QeWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTcsImFkdlNlY3JldEtleSI6IjFjSVpjNzRQa3BwbU1ISkdLaFY0TzhQUlBpeGVEWHFXaDF0K0RDK3llT009IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMyLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkxfQ1drenFOU2pDR1R5WGs5S1RFVEEiLCJwaG9uZUlkIjoiMzdhYmU3YTItZmI5NC00NzMxLWJkNTEtMjE3Zjk3ZDYzZmY2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpVRm80cUtaVEFhcDZOTTdSMUtYRndWTGpJbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwSWxqdzBtbjlwUE9rQVFlWXJzUFpuUEdKT2M9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRzVYUkZRRjQiLCJtZSI6eyJpZCI6IjUwOTM3MDQyODAxOjU0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLdXl0YVVIRUpMVnFiVUdHQXNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJsL0JlWW1vK0RhNEtRSE9nM2xqQ3RpdkJGNkwzdWZiWFBlc2oyWS9ialJFPSIsImFjY291bnRTaWduYXR1cmUiOiJ1RlVoQjdQcUcwZWc2UlkrNENCQ3hYcmpuY2ZWb2xUeEJwNnNJaXpESUNZai90ekh6eWdtZzVKR1NRaFh4YndrdW1ia3dnZmRuOVRwUEFrUS9qTTNCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoibWdPUVl3MURCY3ByeTQ4MC9wRTFibGwyQTlld1Nocm1jbU9BajVlY0F5QlRZOVRUZUQzbnFTQjBCZm8xS0RoTUZRMnVSVEZvWUVIUFJ2N3dWaW9MaUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDkzNzA0MjgwMTo1NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaZndYbUpxUGcydUNrQnpvTjVZd3JZcndSZWk5N24yMXozckk5bVAyNDBSIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyNDQ0NDQ3fQ==',
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
