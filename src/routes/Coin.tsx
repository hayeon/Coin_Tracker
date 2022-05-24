import styled from "styled-components";
import { Route, Switch, useLocation, useParams, useRouteMatch, Link} from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinData, fetchCoinPrice } from "./Api";
import {Helmet, HelmetProvider} from "react-helmet-async";
import { useHistory } from 'react-router-dom';

const Overview = styled.div` //배경
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 10px;
  border: 2px solid ${(props)=> props.theme.textColor};
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p` //코인에 대한 설명
  margin: 20px 0px;
`;

const Container = styled.div `
    padding: 0px, 20px;
    max-width : 480px;
    margin : 0 auto;
`;

const Header = styled.header `
    height : 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1 `
    font-size: 48px;
    color: ${(props) =>props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
    display: block;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) =>props.theme.bgColor};
  border-radius: 10px;
  border: 2px solid ${(props)=> props.theme.textColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

const Back = styled.button`
  width: 20;
  height: 30;
  text-align: center;
  font-size: 12px;
  border-radius: 10px;
`;

interface Params {
    coinId:string;
};

interface RouteState {
    name:string;
};

interface IInfoData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
};

export interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  };



function Coin () {
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const {coinId} = useParams<Params>();
    const {state} = useLocation<RouteState>(); //react-router-dom에서 제공하는 useLocation
    let history = useHistory();
    
    const {isLoading:dataLoading, data:coinData} = useQuery<IInfoData>(["coinData",coinId],() => fetchCoinData(coinId),
      {refetchInterval: 5000 //5sec
    } );
    const{ isLoading:priceLoading,data:priceData} = useQuery<IPriceData>(["coinPrice",coinId], () => fetchCoinPrice(coinId));
    const loading = dataLoading || priceLoading;
  
   
    return (
      <>
      <HelmetProvider>
      <Helmet><title>{state?.name || "코인 상세 내역"}</title></Helmet>
      </HelmetProvider>

        <Container> 
            <Header>
                 <Title> {state?.name || "코인 상세 내역"} </Title>
               
            </Header>
               {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
          <Back onClick={ () => {history.push('/');}} > 뒤로가기 </Back>
            <OverviewItem>
              <span>순위:</span>
              <span>{coinData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>심볼:</span>
              <span>${coinData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>가격:</span>
              <span>{priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            
            <Route path={`/${coinId}/chart`}>
              <Chart  coinId= {coinId}   /> 
              {/* Chart.tsx는 coinId가 없으므로, Chart.tsx에서 Interface 선언 */}
            </Route>
          </Switch>
        </>
      )}
        </Container>
        </>
    );
};

export default Coin;