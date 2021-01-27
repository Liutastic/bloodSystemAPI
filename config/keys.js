module.exports = {
  mongoURI: 'mongodb://127.0.0.1:27017/bloodApi',
  secretOrKey: 'secret',
  baseUrl: 'http://localhost:3000',
  capOption: {
    size: 4,
    ignoreChars: '0o1i',
    noise: 4,
    color: true,
    background: '#ffffff'
  },
  sessionConfig: {
    key: 'appletsystem:sess',
    maxAge: 108000000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false
  },
  sessionKey: ['appletSystem']
}