import { useQuery } from "react-query";
import {fetchCoinPrice } from "./Api";
import {IPriceData} from "./Coin";

interface IPrice {
    coinId : string;
};

function Price({coinId}:IPrice) {
    const {isLoading, data:priceData} = useQuery<IPriceData>(["coinPrice",coinId], () => fetchCoinPrice(coinId), {
        //refetchInterval: 5000
    });
    console.log(priceData);
    const todayPrice : any = priceData?.quotes.USD.price.toFixed(2);
    const won = todayPrice * 1263.66
    
    
    return (
        <>
            {isLoading ? ("가격 로딩중입니다") 
            : ( <h3>현재 가격: {won.toFixed(2)}원</h3>)}
        </>
    );
};

export default Price;