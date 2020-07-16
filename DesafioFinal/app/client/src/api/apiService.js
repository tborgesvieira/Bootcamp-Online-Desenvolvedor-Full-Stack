import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

async function getAll(period){
    const res = await axios.get(API_URL+'?period='+period);

    const data = res.data.map((p)=>{
        const { description } = p;
        return {
            ...p,
            descriptionLower: description.toLowerCase()
        }
    });

    return data;
}

async function getAllPeriods(){
    const res = await axios.get(API_URL+'/periods');

    return res.data;
}

export { getAll, getAllPeriods }