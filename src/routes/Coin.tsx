import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

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
}

interface RouteState {
    name:string;

}

function Coin () {
    const {coinId} = useParams<Params>();
    // const [loding, setLoding] = useState(true);
    const {state} = useLocation<RouteState>(); //react-router-dom에서 제공하는 useLocation
    
    useEffect ( ()=> {
        (async () => {
            const coinData = await (await fetch (`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            //캡슐화! 아래와 같음
            // const response = await fetch (`https://api.coinpaprika.com/v1/coins/${coinId}`);
            // const json = response.json();
            console.log(coinData);
            
            const coinPrice = await (await fetch(`https://api.coinpaprika.com/v1/tickers${coinId}`)).json();
            console.log(coinPrice);
        }
        ) ();
        }, []);
    
    return (
        <Container> 
            <Header>
                 <Title>코인 목록 {state?.name || "loading"} </Title>
            </Header>
            {/* {loding ? (<Loader>Loading</Loader>):(null)} */}
        </Container>
    );
};

export default Coin;