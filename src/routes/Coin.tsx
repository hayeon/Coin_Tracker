import styled from "styled-components";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinData, fetchCoinPrice } from "./Api";
import {Helmet} from "react-helmet";

const Overview = styled.div` //배경
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
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

interface IPriceData {
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
  }

function Coin () {
    const {coinId} = useParams<Params>();
    const {state} = useLocation<RouteState>(); //react-router-dom에서 제공하는 useLocation
    const {isLoading: dataLoading, data:coinData} = useQuery<IInfoData>(
      ["coinData",coinId], 
      () => fetchCoinData(coinId),
      {
        refetchInterval: 5000 //5sec
      }

      );
  //fetchCoin(coinId)로 작성하면 함수 실행하는 것이기 때문에 함수 실행 후의 promise가 바로 들어간다.
  //따라서 함수를 바로 실행하는 것이 아닌 () => fetchCoinData(coinId) 형식으로 함수를 실행하는 함수를 새로 만들어 인자로 넘겨야 <함수 자체>를 넘길 수 있다!
 //fetchCoin: 함수 자체를 넘기는 것 fetchCoin() 함수 실행 후의 리턴값을 넘기는 것
    const{isLoading:priceLoading, data:priceData} = useQuery<IPriceData>(["coinPrice",coinId], () => fetchCoinPrice(coinId));

    //리액트 쿼리는 각기 다른 key를 바라기 때문에 같은 키를 쓰는 건 좋지 않음
    //그리고 리액트 쿼리는 key를 array로 감싸서 표현함
    //따라서, key를 array로 만든 다음, 첫번째 item은 coinData, 두번째는 coinPrice로 주면 각각 고유한 id를 가지게 됨

    const loading = dataLoading || priceLoading;
    return (
      <>
      <Helmet>
        <title>
        {state?.name || "loading"}
        </title>
      </Helmet>
        <Container> 
            <Header>
                 <Title>코인 목록 {state?.name || "loading"} </Title>
            </Header>
               {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>순위:</span>
              <span>{coinData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>심볼:</span>
              <span>${coinData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>price:</span>
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
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            
            <Route path={`/${coinId}/chart`}>
              <Chart coinId= {coinId} /> 
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