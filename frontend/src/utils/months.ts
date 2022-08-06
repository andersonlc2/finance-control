export let months: Array<MonthOfYear> = [
  { "name": "Janeiro", "id": 0 },
  { "name": "Fevereiro", "id": 1 },
  { "name": "Março", "id": 2 },
  { "name": "Abril", "id": 3 },
  { "name": "Maio", "id": 4 },
  { "name": "Junho", "id": 5 },
  { "name": "Julho", "id": 6 },
  { "name": "Agosto", "id": 7 },
  { "name": "Setembro", "id": 8 },
  { "name": "Outubro", "id": 9 },
  { "name": "Novembro", "id": 10 },
  { "name": "Dezembro", "id": 11 }
];

export type MonthOfYear = {
  "name": String,
  "id": number
};

export let monthsName: String[] = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
