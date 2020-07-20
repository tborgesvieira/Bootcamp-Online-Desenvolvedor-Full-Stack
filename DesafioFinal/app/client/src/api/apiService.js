import axios from 'axios';

const API_URL = '/api/transaction';

async function getAll(period){
    const res = await axios.get(API_URL+'?period='+period);

    const data = res.data.map((p)=>{
        const { description } = p;
        return {
            ...p,
            descriptionLower: description.toLowerCase(),
        }
    });    

    return data.sort((a, b) => a.day - b.day);
}

async function getAllPeriods(){
    const res = await axios.get(API_URL+'/periods');

    return res.data;
}

async function insert(lancamento){
    const res = await axios.post(API_URL, lancamento);

    return res.data;
}

async function remove(id){
    const res = await axios.delete(API_URL+"/"+id);

    return res.data;
}

async function update(lancamento){
    const res = await axios.put(API_URL, lancamento);

    return res.data;
}

export { getAll, getAllPeriods, insert, remove, update }