module.exports = ({ INTERVAL, DURATION }, server) => {
    if (!INTERVAL || !DURATION) return;

    const interval = +INTERVAL*1000;
    const duration = +DURATION*1000;

    const begin = new Date();
    const end = begin.getTime() + duration;

    process
        .stdout
        .write(`${begin.toUTCString()} \n`);
        
    const timer = setInterval(() => {
        const date = new Date();
        const utcDate = date.toUTCString();
        const stop = date.getTime() + interval >= end;

        const str = stop 
            ? `Вывод в консоль остановлен в ${utcDate} \n`
            : `${utcDate} \n`;

        process
            .stdout
            .write(str);
        
        if (stop){
            clearInterval(timer);
            process.exit(0);
        } 
    }, interval);
    
}