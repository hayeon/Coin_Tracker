import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coin from "./Coin";
import CoinList from "./CoinList";

function Router () {

    return (
        <BrowserRouter>
            <Switch>
               <Route path="/:coinId">
                   <Coin/>
               </Route>

                <Route path="/">
                    <CoinList/>                    
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;