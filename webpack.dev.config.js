const path = require('path');
const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('webpack-dev');

config.resolve.modules = [
  path.resolve(__dirname, './src'),
  'node_modules',
];

config.module.rules[0].exclude = /node_modules\/(?!(query-string|split-on-first|strict-uri-encode|@edx))/;

// Add comprehensive warning filters
config.stats = {
  ...config.stats,
  warningsFilter: [
    // Filter legacy JS API warnings
    /Deprecation The legacy JS API is deprecated/,
    
    // Filter Dart Sass 3.0.0 warnings about global built-in functions
    /Global built-in functions are deprecated/,
    
    // Filter Sass @import warnings
    /Sass @import rules are deprecated/,
    
    // Filter specific paragon warnings
    /@openedx\/paragon\/scss\/core\/_exports\.module\.scss/,
    
    // Filter map-get warnings
    /Use map\.get instead/,
    
    // Filter repetitive warnings
    /repetitive deprecation warnings omitted/
  ]
};

module.exports = config;