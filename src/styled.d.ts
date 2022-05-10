//theme을 사용하려면 styled.d.ts 형식으로 작성
// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
export interface DefaultTheme {
    
    textColor: string;
    bgColor: string;
    btnColor: string;
    }  
}