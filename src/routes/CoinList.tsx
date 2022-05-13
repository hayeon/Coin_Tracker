import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
        transition: color 0.2s ease-in;
        display: block; //글씨 밖까지 클릭 가능
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
        type: string,
        
const Img = styled.img`
width: 25px;
height :25px;

`};


function CoinList () {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loding, setLoding] = useState(true);
    useEffect(()=> {
        (async() => {
            const response = await fetch ("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            // setLoding(false);
;
            console.log(coins);
        }) ();
    }, []);
    return (
       <Container> 
           <Header>
                <Title>코인 목록</Title>
           </Header>
           {loding ? (<Loader>Loading</Loader>):(
            <Coins>
               {coins. map((coin)=>(
                   <Coin key={coin.id}> 
                    <Link to={coin.id}>
                        <img src= {`https://coinicons-api.vercel.app/${coin.symbol.toLocaleLowerCase()}`}></img>
                        {coin.name} &rarr;
                    </Link>
                   </Coin>
               ))}
             
           </Coins>)}
        </Container>
    
    );
};

export default CoinList;