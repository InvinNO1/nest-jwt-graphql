if (['dev', 'aws'].includes(process.env.APP_ENV)) {
  console.log(`START ON ${process.env.APP_ENV} MODE`, new Date())
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config({
    path: __dirname + `/../${process.env.APP_ENV}.env`,
  })
}
