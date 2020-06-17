function leftPad(value, count = 2, char = '0'){
    const stringValue = value.toString();
    let newValue = stringValue;

    if(stringValue.length < count){
        for(let i = 0; i < count - stringValue.length; i++){
            newValue = char + value;
        }
    }

    return newValue;
}
function getNewTimesTamp(){
    const now = new Date();

    let result = '';

    result += leftPad(now.getDate());
    result += '/';
    result += leftPad(now.getMonth() + 1);
    result += '/';
    result += now.getFullYear();
    result += ' '; 
    result += leftPad(now.getHours());
    result += ':';
    result += leftPad(now.getMinutes());
    result += ':';
    result += leftPad(now.getSeconds());
    result += '.';
    result += leftPad(now.getMilliseconds(), 3);

    return result;
}