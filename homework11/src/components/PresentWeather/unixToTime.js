const unixToTime = (t) => {
    const dt = new Date(t * 1000);
    const hr = dt.getHours();
    const m = "0" + dt.getMinutes();
    const s = "0" + dt.getSeconds();
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
}

const unixToDateTime = (t) => {
    const a = new Date(t * 1000);
    console.log(a)
    const year = a.getFullYear();
    const month = '0' + (a.getMonth()+1);
    const day = '0' + a.getDate();
    const hour = '0' + a.getHours();
    const min = '0' + a.getMinutes();
    const sec = '0' + a.getSeconds();
    return  day.substr(-2) + '/' + month.substr(-2) + '/' + year + ' ' + hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2);

}

export { unixToTime, unixToDateTime };