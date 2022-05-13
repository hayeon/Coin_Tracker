import { useParams } from "react-router-dom";

interface Params {
    coinId:string;
}

function Coin () {
    const {coinId} = useParams<Params>();
    console.log(coinId);
    return (
    <div>
        <h1>코인 이름은 {coinId}</h1>
    </div>
    );
};

export default Coin;