import {BrowserRouter, Route, Switch} from "react-router-dom";
import Coin from "./Coin";
import CoinList from "./CoinList";

function Router () {

    return (
        <BrowserRouter>
            <Switch>
               <Route path="/:coinId"> 
               {/*Coin.tsx에서 선언한 const {coinId} = useParams<Params>(); */}
                   <Coin />
               </Route>

                <Route path="/">
                    <CoinList/>                    
                </Route>

                <Route path=":/price">

                </Route>
                

            </Switch>
        </BrowserRouter>
    );
};

export default Router;