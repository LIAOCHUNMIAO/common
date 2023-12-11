const isNull = (val)=>{
    const type = typeof val;
    // undefined | "object" | "boolean" | "number" | "string" | "function" | "symbol" | "bigint"
    if (type === 'object'){

        if (val === null || val === undefined){
            return true;
        }
        if (Array.isArray(val)){
            return val.length === 0;
        }else {
            return Object.keys(val).length === 0;
        }
    }else if (type === 'undefined'){
        return true;
    }

    return val === null;
}

const isNotNull = (val)=>{
    return !isNull(val);
}

export default {
    isNull,
    isNotNull
}

