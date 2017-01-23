// We only need to import the modules necessary for initial render
import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import FeedbackRoute from './Feedback'
import AboutRoute from './About'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

// export const createRoutes = (store) => ({
//   path        : '/',
//   component   : CoreLayout,
//   indexRoute  : AboutRoute,
//   childRoutes : [
//     {
//       path        : '/about',
//       props: {title       : 'About'},
//       state: {title       : 'About'},

//       title       : 'About',
//       indexRoute  : AboutRoute,
//     },
//     {
//       path        : '/feedback',
//       indexRoute  : FeedbackRoute,
//     },
//     //CounterRoute(store),
//   ]
// })

export const createRoutes = (store) => (
    <Route path="/" component={CoreLayout}>
      <IndexRedirect to="about" />
      <Route path="about" component={AboutRoute}/>
      <Route path="feedback" component={FeedbackRoute} />
    </Route>
)

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
