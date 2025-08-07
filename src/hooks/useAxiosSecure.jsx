import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosInstance = axios.create({
    baseURL : 'http://localhost:5000',
    withCredentials : true
})



const useAxiosSecure = () => {
    
    const { signOutUser } = useAuth();
    
    useEffect(()=>{
        axiosInstance.interceptors.response.use( response => {
            return response;
        } , error => {

            if (error.status === 401 || error.status === 403) {
                signOutUser()
                .then(()=> {
                    console.log('Logged out user');
                })
                .catch(error => {
                    console.log(error);
                })
            }

            console.log('error caught in interceptor', error);
            return Promise.reject(error);
        })
    },[])

    return axiosInstance;
};

export default useAxiosSecure;