const express=require("express");
const app=express();
const mongoose=require("mongoose")
 
let MONGOOSE_URL="mongodb://127.0.0.1:27017/test";

let port=3000;

app.listen(port,()=>{
    console.log("port is listening")
})
    
app.get("/",(req,res)=>{
    res.send(" hlo there just chilling")
    
})
async function main(){
    await mongoose.connect(MONGOOSE_URL);
}
main(

).then(()=>{
    console.log("connection succesfull")
})
.catch((err)=>{
    console.log(err)
})