import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div `
    padding: 0px, 20px;
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


function CoinList () {

    const coins = [
        {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: 1,
        is_new: false,
        is_active: true,
        type: "coin",
        },
        {
        id: "eth-ethereum",
        name: "Ethereum",
        symbol: "ETH",
        rank: 2,
        is_new: false,
        is_active: true,
        type: "coin",
        },
        {
        id: "hex-hex",
        name: "HEX",
        symbol: "HEX",
        rank: 3,
        is_new: false,
        is_active: true,
        type: "token",
        }

    ];
    return (
       <Container> 
           <Header>
            <Title>코인 목록</Title>
           </Header>
           <Coins>
               {coins. map((coin)=>(
                   <Coin key={coin.id}> 
                    <Link to={coin.id}>
                        {coin.name} &rarr;
                    </Link>
                   </Coin>
               ))}
             
           </Coins>
        </Container>
    
    );
};

export default CoinList;