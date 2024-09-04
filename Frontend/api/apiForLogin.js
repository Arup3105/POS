import axios from "axios";

const ApiForLogin ={
    baseURL: "http://localhost:5000",// there should be the url of the backend

    login: async (credentials)=>{
        try{
            const response = await axios.post(
                `${ApiForLogin.baseURL}/login`,
                credentials,
                {
                    withCredentials: true,
                    headers: {
                      "Content-Type": "application/json",
                    },
                }
            );
            return response;
        }catch(error){
            throw error.response;
        }
    }
}
export default ApiForLogin;