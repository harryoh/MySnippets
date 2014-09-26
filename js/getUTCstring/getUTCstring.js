var res = new Date().toISOString().slice(0,16).replace("T", " ").replace(/-/g,"/");

console.log(res);
