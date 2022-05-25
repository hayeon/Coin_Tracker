import { useQuery } from "react-query";
import { fetchCoinHistory} from "./Api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

interface IChartProps {
    coinId : string;
};

interface IcoinHistory { //api 타입 설정해주기
    time_open:string;
    time_close:string;
    open:number;
    high:number;
    low:number; 
    close:number;
    volume:number;
    market_cap:number; 
};

// IChartProps props가 chart props라는 것을 알려줘야함
function Chart ({coinId}:IChartProps) { //coindId를 가지고 있으니, api request를 보내서 모든 가격을 가져올 수 있음
    const {isLoading, data:historyData} = useQuery<IcoinHistory[]>(["coinHistory",coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 5000
    }); //배열로 쓴 이유 IcoinHistory[]는 저 값들은 딱 하루치임! 저거 7일치를 가져올거니까 배열로 선언해야함!
    const isDark = useRecoilValue(isDarkAtom);
    return (
      <div>
          {isLoading ? ("Chart를 로딩중입니다") 
          :(
            <ApexCharts 
            type="candlestick" 
            series={[
                {
                  data: 
                  historyData?.map((price) => {
                      return [
                        Date.parse(price.time_close),
                        price.open.toFixed(3),
                        price.high.toFixed(3),
                        price.low.toFixed(3),
                        price.close.toFixed(3),
                      ];
                    }),
                },
              ] as unknown as number[]}
            options={{ 
                theme:{
                   mode: isDark?("dark") : ("light")
                },   
                
                chart : {
                    height: 500,
                    width: 1000,
                    toolbar:{show:false},
                    background: "transparent" //투명
                }, 
                stroke: {
                    curve: "smooth",
                    width: 2,
                },
                grid: {
                    show:false,
                },
                tooltip: {
                    y : {formatter: (value) => `$${value.toFixed(3)}`}, // 소수점 3번째까지
                },
                colors: ["red"], 
                xaxis: { //날짜
                    axisBorder:{show:false},
                    axisTicks:{show:false},
                    labels: {style: {colors: 'blue'}},
                    type: "datetime",
                    categories: historyData?.map((price) => price.time_close)
                },
                yaxis: {
                  //show:false,
                  
                },
                plotOptions: {
                    candlestick: {colors: {upward:'#0040FF',downward: '#FF0000'}}
                  }
            }}>
            </ApexCharts>
          )}
         
      </div>
        // isLoading?(<h1>Loading</h1>) : ( console.log(data) );
    );

    // const parmas = useParams();
    // console.log(parmas); //이미 coin.tsx가 coinId를 알고 있기 때문에 이 방법은 지양

};

export default Chart;