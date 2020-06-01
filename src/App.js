import React, { useEffect, lazy, Suspense } from 'react';
import './sass/main.scss';
import Header from './containers/Header/Header';
import Toolbar from './containers/Toolbar/Toolbar';
import Layout from './containers/Layout/Layout';
import Preview from './containers/Preview/Preview';
import TopThree from './components/TopThree/TopThree';
import Brand from './containers/Brand/Brand';
import Info from './containers/Info/Info';
import Checkout from './containers/Checkout/Checkout';
import OrderSummary from './containers/OrderSummary/OrderSummary';
import About from './containers/About/About';
import Faq from './components/Faq/Faq';
import { Route, Switch } from "react-router-dom";
import * as action from './store/actions/index';
import * as actionTypes from './store/actions/actionTypes';
import { connect } from 'react-redux';

// Lazy Loading...
const Parfum = lazy(() => import('./pages/Parfum'))
const Catalogue =lazy(() => import('./pages/Catalogue'))

const App = props => {

  useEffect(() => {
     props.updateStateFromLocalStorage();
  }, [props.cartUpdated])
  
  return (
    <Suspense fallback={<div style={{
      height: '100vh', textAlign: 'center'
    }}>Stranica se učitava...</div>}>
        <div className="App">
          <Switch>
          <Route exact path="/" render={(props) => {
            return <Layout route={props} >
                      <Header route={props} />
                      <Info />
                      <Preview route={props}/>
                      <TopThree route={props}/>
                      <Brand />
                  </Layout>
          }} />

            <Route strict path="/parfem/:id" render={(props) => {
              return <Layout route={props}>
                        <Parfum route={props}/>
                    </Layout>
            }} />

            <Route exact path="/originalni-testeri" render={(props) => {
              return <Layout route={props}>
                          <Catalogue route={props}/>
                    </Layout>
            }} />

        <Route exact path="/originalni-testeri/page=:id" render={(props) => {
                  return <Layout route={props}>
                              <Catalogue route={props}/>
                        </Layout>
                }} />

        <Route exact path="/muški-testeri/page=:id" render={(props) => {
                      return <Layout route={props}>
                                  <Catalogue route={props}/>
                            </Layout>
                    }} />

        <Route exact path="/ženski-testeri/page=:id" render={(props) => {
                      return <Layout route={props}>
                                  <Catalogue route={props}/>
                            </Layout>
                    }} />

        <Route exact path="/checkout" render={(props) => {
                          return <Layout route={props}>
                                    <Info />
                                    <Checkout route={props}/>
                                </Layout>
                        }} />

        <Route exact path="/order-summary" render={(props) => {
                              return <Layout route={props}>
                                        <OrderSummary />
                                    </Layout>
                            }} />

        <Route exact path="/about" render={(props) => {
                                  return <Layout route={props}>
                                            <About />
                                        </Layout>
                                }} />
          <Route exact path="/faq" render={(props) => {
                                  return <Layout route={props}>
                                            <Faq />
                                        </Layout>
                                }} />
          </Switch>
        </div>
    </Suspense>
  );
}

const mapStateToProps = state => {
  return {
    cartOpen: state.cartOpen,
    cartUpdated: state.cartUpdated,
  }
}

const mapDispatchToProps = dispatch => ({
  updateStateFromLocalStorage: () => dispatch(action.addToCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
