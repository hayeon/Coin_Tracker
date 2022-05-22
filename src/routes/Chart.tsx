import { useQuery } from "react-query";
import { fetchCoinHistory} from "./Api";
import ApexCharts from "react-apexcharts";
import { type } from "os";

interface IChart {
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

// IChart props가 chart props라는 것을 알려줘야함
function Chart ({coinId}:IChart) { //coindId를 가지고 있으니, api request를 보내서 모든 가격을 가져올 수 있음
    const {isLoading, data:historyData} = useQuery<IcoinHistory[]>(["coinHistory",coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 1000
    });
    //배열로 쓴 이유 IcoinHistory[]는 저 값들은 딱 하루치임! 저거 7일치를 가져올거니까 배열로 선언해야함!

    return (
      <div>
          {isLoading ? ("Chart를 로딩중입니다") 
          :(
            <ApexCharts 
            type="line" 
            series={ [
                { name: "주식 종가",
                  data: historyData?.map((price) => price.close)as number[],
                },
                ]} 
            options={{ 
                theme:{
                    mode:"dark",
                },   
                chart : {
                    height: 500,
                    width: 500,
                    toolbar:{show:false},
                    background: "transparent" //투명
                }, 
                stroke: {
                    curve: "smooth",
                    width: 3,
                },
                grid: {
                    show:false,
                },
                //선 그라데이션
                fill: {
                  type: "gradient",
                  gradient : {gradientToColors:["blue"], stops : [0, 100]},
                },
                tooltip: {
                    y : {formatter: (value) => `$${value.toFixed(3)}`}, // 소수점 3번째까지

                },
                colors: ["red"], 
                xaxis: {
                    axisBorder:{show:false},
                    axisTicks:{show:false},
                    labels:{show:false},
                    type: "datetime",
                    categories: historyData?.map((price) => price.time_close)
                },
                yaxis: {
                  show:false,
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