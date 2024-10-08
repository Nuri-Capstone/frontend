module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
        },
      },
    ],
    ['@babel/plugin-transform-class-properties', { loose: true }], // loose 모드 추가
    ['@babel/plugin-transform-private-methods', { loose: true }],   // loose 모드 추가
    ['@babel/plugin-transform-private-property-in-object', { loose: true }], // loose 모드 추가
  ],
};
