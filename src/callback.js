module.exports = function callback(methodName, err, data, cbResolve, cbReject){
    if (err){
        console.log(methodName, err);
        cbReject();
    } else {
        cbResolve(data);
    }
}