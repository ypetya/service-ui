export const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const pickNRandom = (arr, n) => {
  const ret=[];
  for(let i=0;i<n;i++) ret.push(pickRandom(arr));
  return ret;
}