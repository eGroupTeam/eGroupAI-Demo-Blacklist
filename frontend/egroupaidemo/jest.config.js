module.exports = {
  rootDir: 'src',
  reporters: [
    'default',
    ['jest-junit', { output: 'jenkinsJunitResult/result.xml' }],
  ],
}
