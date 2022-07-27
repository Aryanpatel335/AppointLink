import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
const auth = async (req,res,next) =>{
    try{
        
        const token = req.headers.authorization.split(" ")[1];  
         
        const isCustomAuth = token.length < 500; 
        let decodedData; 
        if(token && isCustomAuth){
            //the "test" is a secret and must use env file late on 
            decodedData = jwt.verify(token,process.env.SECRET);
            req.userId = decodedData.id;
        
        }else{
            
            decodedData =jwt_decode(token);
            req.userId = decodedData.sub;

        }
        next();
    }catch(error){
        console.log(error);
    }
}

export default auth;