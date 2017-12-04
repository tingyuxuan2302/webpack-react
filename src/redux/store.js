 import { createStore, applyMiddleware } from 'redux';
 // import thunkMiddleware from 'redux-thunk';
 import combineReducers from './reducers';

 import promiseMiddleware from './middleware/promiseMiddleware'

 let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

 if (module.hot) {
     module.hot.accept("./reducers", () => {
         const nextCombineReducers = require("./reducers").default;
         store.replaceReducer(nextCombineReducers);
     });
 }
 
 export default store;