export const baseUrl = "http://localhost:5000/api"

export const postRequest = async(url, body) => {

    const responce = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body,
    });
    const data = await responce.json();

    if(!responce.ok){
        let message

        if(data?.message){
            message=data.message
        }else{
            message=data
        }
        return {error: true, message};
    }

    return data;
}

export const getRequest = async(url) => {

    const responce = await fetch(url);
    
    const data = await responce.json();

    if(!responce.ok){
        let message

        if(data?.message){
            message=data.message
        }else{
            message=data
        }
        return {error: true, message};
    }

    return data;
}