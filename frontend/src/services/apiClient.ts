


export const apiClient = async(url : string, options : RequestInit = {}) => {

    try{

        const res = await fetch(url, {
            ...options,
            credentials : "include"
        });

        if(res.status !== 401 && res.status !== 403){
            return res;
        }

        const refreshRes = await fetch("https://mobilia-xzo6.onrender.com/api/v1/auth/refresh-token", {
            method : 'POST',
            credentials : "include"
        });

        if(!refreshRes.ok){
            window.location.href = "/account";
            throw new Error("Unable to refresh token");
        }

           

        return fetch(url, {
            ...options,
            credentials : "include"
        });
    }catch(err){
        console.error("API error :", err);
        throw err;
    }
}
 
