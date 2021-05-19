import {API} from "../../../backend"
import axios from "axios"


export const signup=user=>{
    console.log(user);

    return axios.post(`${API}/auth/signup`,user)
    .then(response =>{
        return response
    })
    .catch(err =>{ return err.response.data})
}