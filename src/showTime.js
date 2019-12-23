module.exports = (interval, duration) => {
    return new Promise((response, reject) => {
        if (!interval || !duration) reject();
    
        interval *= 1000;
        duration *= 1000;
    
        const begin = new Date();
        const end = begin.getTime() + duration;
    
        console.log(`${begin.toUTCString()} \n`);
            
        const timer = setInterval(() => {
            const date = new Date();
            const utcDate = date.toUTCString();
            const stop = date.getTime() + interval >= end;
    
            const str = stop 
                ? `Вывод в консоль остановлен в ${utcDate} \n`
                : `${utcDate} \n`;
    
            if (!stop){
                console.log(str);
            } else {
                clearInterval(timer);
                response(str);                
            }
        }, interval);
    })
    
}