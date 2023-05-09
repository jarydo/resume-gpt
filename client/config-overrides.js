module.exports = function override(config, env) {
    config.resolve.fallback = {
      "util": false,
      "buffer": false,
      "url": false,
      "path": false, 
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
    };
    return config;
};