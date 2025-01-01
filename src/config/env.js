require("dotenv").config();
function env(key, defaultVal = null) {
    if (!process.env[key]) {
        return defaultVal;
    }
    return process.env[key];
}

module.exports = env;
