import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

/*import groq from 'groq'
import  sanityClient    from 'sanityClient';*/


// Init Nuxt.js and start listening on localhost:4000
test.before('Init Nuxt.js', async (t) => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  config.mode = 'universal' // Isomorphic application
  const nuxt = new Nuxt(config)
  t.context.nuxt = nuxt // We keep a reference to Nuxt so we can close the server at the end of the test
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Example of testing get request

/*
test('should be null when user is not logged in', async (t) => {

   const query = groq`
  {
    "people": *[_type == "person"]
  }
`
  //const result = await graphql(schema, query, rootValue, context);
  const result = await sanityClient.fetch(query)
  const { data } = result
    t.is(data, null);
});
*/


/*
test('check that GET requests for certain routes in the application do not fail. ', async (t) => {
  const { nuxt } = t.context
  const result = await nuxt.renderRoute('/')
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(!!result.body)
})*/

// Example of testing only generated html
test('Route / exists and render HTML', async (t) => {
  const { nuxt } = t.context
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  //t.log(html)
  t.true(html.includes('<h1 class="mb-3">Velg person</h1>'))
})

// Example of testing via DOM checking
test('Route / exists and renders HTML with CSS applied', async (t) => {
  const { nuxt } = t.context
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.title')
  t.not(element, null)
  t.log(element.textContent)
  t.is(element.textContent, 'Speakers')
  t.is(element.className, 'title')
  //t.is(window.getComputedStyle(element).color, 'red')
})

// Close the Nuxt server
test.after('Closing server', (t) => {
  const { nuxt } = t.context
  nuxt.close()
})
