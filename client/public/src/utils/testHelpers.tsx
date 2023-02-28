/* eslint-disable import/prefer-default-export */
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store";

const testComponent = (Component: any) => (
  <Provider store={store}>
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  </Provider>
);

export default { testComponent };
