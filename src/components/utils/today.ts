export function getToday() : string[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
  const date = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`;

  const weekago = new Date(now);
  weekago.setDate(weekago.getDate() - 6);
  const weekagoYear = weekago.getFullYear();
  const weekagoMonth = weekago.getMonth() >= 9 ? weekago.getMonth() + 1 : `0${weekago.getMonth() + 1}`;
  const weekagoDate = weekago.getDate() >= 10 ? weekago.getDate() : `0${weekago.getDate()}`;
  
  const fiveYearAgo = new Date(now);
  fiveYearAgo.setFullYear(fiveYearAgo.getFullYear() - 4);
  
  // yyyyMMdd, yyyyMMdd(a week age), yyyy(5 year age), yyyy
  return [
    `${year}${month}${date}`,
    `${weekagoYear}${weekagoMonth}${weekagoDate}`,
    `${fiveYearAgo.getFullYear()}`,
    `${year}`,
  ];
}