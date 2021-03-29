if (!process.env.NODE_ENV) {
  console.log('START ON DEV MODE')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config({ path: __dirname + '/../dev.env' })
}
