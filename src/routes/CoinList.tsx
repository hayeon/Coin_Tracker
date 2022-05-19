import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./Api";

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

const Coins = styled.ul `
`;

const Coin = styled.li `
background-color: white;
    color:${(props) => props.theme.bgColor};
    padding: 20px;
    margin-top: 10px;
    border-radius: 15px;
    a {
       align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex; //가운데 맞춤
    }
    &:hover {
        a {
            color:${(props)=> props.theme.accentColor}
        }
    } 
`;
const Title = styled.h1 `
    font-size: 48px;
    color: ${(props) =>props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
    display: block;
`;


interface CoinInterface { //ts에게 알려주기 위한 interface
        id: string,
        name: string,
        symbol: string,
        rank: number,
        is_new: boolean,
        is_active: boolean,
        type: string, }
        
const Img = styled.img`
width: 25px;
height :25px;
margin-right: 10px;
`;


function CoinList () {

    const {isLoading, data} = useQuery<CoinInterface[]>("coinListKey", fetchCoins);
    

    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loding, setLoding] = useState(true);
    // useEffect(()=> {
    //     (async() => {
    //         const response = await fetch ("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0,100));
    //         setLoding(false);
    //     }) ();
    // }, []);
    return (
       <Container> 
           <Header>
                <Title>코인 목록</Title>
           </Header>
           {isLoading ? (<Loader>Loading...</Loader>):(
            <Coins>
               {data?. map((coin)=>( //개체가 'undefined'인 것 같습니다.에 대한 해결책 옵셔널 체이징 ? 추가 값이 unDefined이면 undefined 리턴
                   <Coin key={coin.id}> 
                    <Link to={ {
                        pathname : `/${coin.id}`,
                        state :{name:coin.name},

                    }}>
                        
                        <Img src= {`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}>
                        </Img>
                        {coin.name} &rarr;
                    </Link>
                   </Coin>
               ))}
             
           </Coins>)}
        </Container>
    
    );
};

export default CoinList;