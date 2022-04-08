import * as XLSX from "xlsx";
import { Readable } from "stream";

XLSX.stream.set_readable(Readable);

// var workbook = XLSX.readFile("./me.xlsx");

const sheetData = XLSX.readFile("./me.xlsx").Sheets["Лист1"];

const graph = {};

// console.log(sheetData);

let route = {
  from: "",
  to: "",
  time: 0,
};

for (const field in sheetData) {
  if (field.at(0) == "A") {
    route.from = sheetData[field].w;
  }

  if (field.at(0) == "B") {
    route.to = sheetData[field].w;
  }

  if (field.at(0) == "C") {
    route.time = sheetData[field].v;

    if (!graph[route.from]) {
      graph[route.from] = {};
    }

    graph[route.from][route.to] = route.time;
  }
}

console.log(graph);

console.log(shortPathDextra(graph, "88"));

function shortPathDextra(graph, start) {
  const costs = {};
  const processed = [];
  let neighbors = {};

  for (const node in graph) {
    if (node !== start) {
      let value = graph[start][node];
      costs[node] = value || 100000000;
    }
  }

  let node = findNodeLowestCost(costs, processed);

  while (node) {
    const cost = costs[node];
    neighbors = graph[node];

    for (const neighbor in neighbors) {
      let newCost = cost + neighbors[neighbor];
      if (newCost < costs[neighbor]) {
        costs[neighbor] = newCost;
      }
    }

    // console.log(node);
    processed.push(node);
    node = findNodeLowestCost(costs, processed);
  }
  return costs;
}

function findNodeLowestCost(costs, processed) {
  let lowestCost = 100000000;
  let lowestNode;

  for (const node in costs) {
    const cost = costs[node];

    if (cost < lowestCost && !processed.includes(node)) {
      lowestCost = cost;
      lowestNode = node;
    }
  }
  return lowestNode;
}
