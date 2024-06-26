// utils/randomUtils.ts
export function randomUniform(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  
  export function randomLogNormal(mu: number, sigma: number) {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num * sigma + mu;
    return num;
  }
  