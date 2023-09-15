import axios from "axios";
const serverURL='http://localhost:5000'

const postData=async(Url,body)=>{
try{

    var response=await axios.post(`${serverURL}/${Url}`,body)
    var result=await response.data
    return result
}
catch(e)
{ return null }
}

const getData=async(Url)=>{
    try{
    
        var response=await axios.get(`${serverURL}/${Url}`)
        var result=await response.data
        return result
    }
    catch(e)
    { 
        return null
    }
    
    }

export {serverURL,postData,getData}