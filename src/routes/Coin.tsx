import styled from "styled-components";
import { Route, Switch, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinData, fetchCoinPrice } from "./Api";


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
    // const [loding, setLoding] = useState(true);
    // const {state} = useLocation<RouteState>(); //react-router-dom에서 제공하는 useLocation
    // const [data, setData] = useState<IInfoData>();
    // const [price, setPrice] = useState<IPriceData>();
    const { } =useQuery(coinId, ()=> fetchCoinData(coinId));
    const { } =useQuery(coinId, ()=> fetchCoinPrice(coinId));
    
    // useEffect ( ()=> {
    //     (async () => {
    //         const coinData = await (await fetch (`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         //캡슐화! 아래와 같음
    //         // const response = await fetch (`https://api.coinpaprika.com/v1/coins/${coinId}`);
    //         // const json = response.json();
    //         //console.log(coinData);
    //         setData(coinData);
    //         //코인 가격받기
    //         const coinPrice = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         console.log(coinPrice);
    //         setPrice(coinPrice);
    //         setLoding(false);
    //     }
    //     ) ();
    //     }, [coinId]);
    //     //coinId를 넣으면 coinId가 바뀔 때 또 다시 컴포넌트가 실행되지 않을까요?
    //     //coinId는 바뀔 일이 없기 때문에 괜찮슴다
    
    return (
        <Container> 
            <Header>
                 <Title>코인 목록 {state?.name || "loading"} </Title>
            </Header>
               {loding ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>순위:</span>
              <span>{data?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>심볼:</span>
              <span>${data?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>오픈소스 가능 여부:</span>
              <span>{data?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{data?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
        </Container>

       

    );
};

export default Coin;