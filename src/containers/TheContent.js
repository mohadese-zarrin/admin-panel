import React, { Suspense, useEffect } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
// import { CContainer, CFade } from '@coreui/react'
// import { useSelector, useDispatch } from 'react-redux'
// routes config
// import {Toaster} from '../views/components'
import routes from '../routes'
import TheHeader from './TheHeader'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  // const toast = useSelector(state => state.toast)
  // useEffect(()=>{
  //   console.log(toast)
  // },[toast])
  console.log(localStorage.getItem('baloot'),'localStorage.getItem(baloot)');

  console.log(JSON.parse(localStorage.getItem("baloot")))
  return (
    <main className="c-main">
      {/* <TheHeader /> */}
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route, idx) => {
            if (!localStorage.getItem('baloot')) {
              return (
                <Redirect to="/login" />
              )
            }
            return route.component && (

              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                  <>
                    <route.component {...props} />
                  </>
                )} />
            )
          })}
          {/* <Redirect from="/" to="/coridor-information" /> */}
        </Switch>
      </Suspense>
    </main>
  )
}

export default React.memo(TheContent)
