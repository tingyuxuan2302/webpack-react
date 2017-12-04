import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from 'components/Loading/Loading';

import Bundle from './Bundle';

import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo';
 

const createComponent = (component) => () => (
	<Bundle load={ component }>
		{
			(Component) => Component ? <Component /> : <Loading />
		}
	</Bundle>
)

export default () => (
	<div>
		<Switch>
			<Route exact path="/" component={ createComponent(Home) }></Route>
			<Route path="/page1" component={ createComponent(Page1) }></Route>
			<Route path="/counter" component={ createComponent(Counter) }></Route>
			<Route path="/userinfo" component={ createComponent(UserInfo) }></Route>
			<Route component={ createComponent(NotFound) }/>
		</Switch>
	</div>
);