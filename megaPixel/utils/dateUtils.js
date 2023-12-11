import {zeroReplace} from "./myUtils";

export function newDateTime(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // 注意，JavaScript中的月份是从0开始的，所以我们需要+1
    let day = date.getDate();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return year + '-' + zeroReplace(month) + '-' + zeroReplace(day)+ ' '+zeroReplace(hours)+':'+zeroReplace(minutes)+':'+zeroReplace(seconds)
}

export function dateConvert(time){
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // 注意，JavaScript中的月份是从0开始的，所以我们需要+1
    let day = date.getDate();
    return year + '-' + zeroReplace(month) + '-' + zeroReplace(day)
}

// 日期转 yyyy/MM/dd HH:mm:ss
export function dateToBiasDateTime(time){
    const startTime = new Date(time);

    const year = startTime.getFullYear();
    const month = String(startTime.getMonth() + 1).padStart(2, '0');
    const day = String(startTime.getDate()).padStart(2, '0');
    const hours = String(startTime.getHours()).padStart(2, '0');
    const minutes = String(startTime.getMinutes()).padStart(2, '0');
    const seconds = String(startTime.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// 日期转 yyyy/MM/dd
export function dateToBiasDate(time){
    const startTime = new Date(time);

    const year = startTime.getFullYear();
    const month = String(startTime.getMonth() + 1).padStart(2, '0');
    const day = String(startTime.getDate()).padStart(2, '0');
    const hours = String(startTime.getHours()).padStart(2, '0');
    const minutes = String(startTime.getMinutes()).padStart(2, '0');
    const seconds = String(startTime.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

export function dateSlicingTime(time){
    const startTime = new Date(time);

    const year = startTime.getFullYear();
    const month = String(startTime.getMonth() + 1).padStart(2, '0');
    const day = String(startTime.getDate()).padStart(2, '0');

    const hours = String(startTime.getHours()).padStart(2, '0');
    const minutes = String(startTime.getMinutes()).padStart(2, '0');
    const seconds = String(startTime.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
