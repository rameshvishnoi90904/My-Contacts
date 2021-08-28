const transformIgnoreModules = [
    'react-native',
    'react-native-permissions',
    '@react-native',
    '@react-native-community',
    '@react-navigation',
    '@react-native-async-storage/async-storage',
    'react-native-vector-icons',
    'react-native-image-picker',
    '../src/helper/index.js',
    '../src/context/'
  ];
  
  module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [`node_modules/(?!(${transformIgnoreModules.join('|')})/)`],
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
          '\\.(js|ts|tsx)$': require.resolve('react-native/jest/preprocessor.js'),
      },
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/assetsTransformer.js',
      '\\.(css|less)$': '<rootDir>/assetsTransformer.js',
    },
  };
  
