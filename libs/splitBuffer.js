module.exports = (buffer, delimiter) => {
    const delimiterBuffer = Buffer.from(delimiter);
    let arr = [];
    let index = 0;

    while((index = buffer.indexOf(delimiter)) >= 0){
        arr.push(buffer.slice(0, index));
        buffer = buffer.slice(index + delimiter.length);
    }
    arr.push(buffer);
    return arr;
};