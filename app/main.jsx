'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'

import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Userpage from './components/Userpage'
import Products from './components/Products'
import Cart from './components/Cart'

import SingleProduct from './components/SingleProduct'

import { receiveAllProducts, receiveSingleProduct, receiveSimilarProducts } from './reducers/products'

import Success from './components/Success'

import { selectUser, getAllUsers } from './reducers/user'


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar />

      {children}
    </div>
)

const onAppEnter = () => {
  store.dispatch(getAllUsers())
}

const onUserpageEnter = (nextRouterState) => {
  const userId = nextRouterState.params.id;
  store.dispatch(selectUser(userId))
}

const onProductsEnter =(nextRouterState) => {
  store.dispatch(receiveAllProducts())
}

const onCartEnter = (nextRouterState) => {
  // fill this out with proper dispatcher that gets everything from cart in order model
  //store.dispatch(receiveWorkingOrder())
}

const onSingleItemEnter = (nextRouterState) => {
  const productId = nextRouterState.params.id;
  store.dispatch(receiveSingleProduct(productId))
  store.dispatch(receiveSimilarProducts(productId))
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp} onEnter={onAppEnter}>
        <IndexRedirect to="/products" />
        {/*<Route path="/jokes" component={Jokes} />*/}
        <Route path="/signup" component={SignUp} />
        <Route path="/user/:id" component={Userpage} onEnter={onUserpageEnter} />
        <Route path="/products" component={Products} onEnter={onProductsEnter} />
        <Route path="/products/:id" component={SingleProduct} onEnter={onSingleItemEnter} />
        <Route path="/success" component={Success} />
        <Route path="/cart" component={Cart} onEnter={onCartEnter}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
