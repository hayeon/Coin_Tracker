export async function fetchCoins() { //json Data의 promise를 return하는 함수/ 코인 리스트
    const response = await fetch ("https://api.coinpaprika.com/v1/coins");
    const json = await response.json();

    return json.slice(0,100); //100개로 잘라줌
};

export async function fetchCoinData(coinId:string) { //코인 하나하나의 정보 api
        const coinData = await (await fetch (`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();  //coinId가 정의되지 않았음. 함수의 인수로 coinId 전달
            return coinData;
};

export async function fetchCoinPrice(coinId:string) { //코인 가격api
      //코인 가격받기
    const coinPrice = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json(); //coinId가 정의되지 않았음. 함수의 인수로 coinId 전달
        return coinPrice;
};

//암호화폐의 open, high, kiw, close, volume의 데이터를 보여줌 이 API는 required query parameter로 start-end time을 보내야함
export async function fetchCoinHistory(coinId: string) {
    // Math.floor() 내림차순 1.9 => 1
    const endDate = Math.floor(Date.now()/1000);
    const startDate = endDate - 60*60*24*14; //2주 전 내역까지 보여줌 
    const coinHistory = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json();
    console.log(coinHistory);
    return coinHistory;
   
};