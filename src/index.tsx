import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import App from "./App";



const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    {/* QueryClientProvider는 client Props(queryClient)가 필요! */}
   <QueryClientProvider client={queryClient}> 
        <App />
   </QueryClientProvider>
   </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);