import { useParams } from "react-router-dom";

function Chart () {
    //먼저 가격을 알아야함
    const parmas = useParams();
    console.log(parmas);

return <h1>
        Chart
    
    </h1>
};

export default Chart;