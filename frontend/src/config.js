export const config = {
    "MODE" : "development",
    "PORT" : 3000,
    "console":(MODE="development")=>{
        if(MODE==="development"){
            return;
        }
        console.log=()=>{};
    }
}