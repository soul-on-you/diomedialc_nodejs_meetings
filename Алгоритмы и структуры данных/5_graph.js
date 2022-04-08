const graph = {};

graph.a = ["b", "c"];
graph.b = ["f"];
graph.c = ["d", "e"];
graph.d = ["f"];
graph.e = ["f"];
graph.f = ["g"];

//поиск в ширину
function breadthSearch(graph, start, end) {
  let queue = [];
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift();

    if (!graph[current]) {
      graph[current] = [];
    }

    if (graph[current].includes(end)) {
      return true;
    } else {
      queue = [...queue, ...graph[current]];
    }
  }
  return false;
}

console.log(breadthSearch(graph, "a", "t"));

// Алгоритм дейкстры
const graphWithWeight = {};
graphWithWeight.a = { b: 2, c: 1 };
graphWithWeight.b = { f: 7 };
graphWithWeight.c = { d: 5, e: 2 };
graphWithWeight.d = { f: 2 };
graphWithWeight.e = { f: 1 };
graphWithWeight.f = { g: 1 };
graphWithWeight.g = {};

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

    console.log(node);
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

console.log(shortPathDextra(graphWithWeight, "c"));
 