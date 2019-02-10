// We only need to import the modules necessary for initial render
import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import FeedbackRoute from './Feedback'
import AboutRoute from './About'
import SearchRoute from './Search';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
    path: '/',
    component: CoreLayout,
    indexRoute: {
        onEnter: (_, replaceState) => {
            replaceState('/search')
        }
    },
    childRoutes: [
        SearchRoute(store),
        {
            path: 'about',
            component: AboutRoute
        },
        {
            path: 'feedback',
            component: FeedbackRoute
        }
    ]
});

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
