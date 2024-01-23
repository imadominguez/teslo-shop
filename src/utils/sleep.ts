export const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve;
    }, 3000); // 3000 milisegundos equivalen a 3 segundos
  });
