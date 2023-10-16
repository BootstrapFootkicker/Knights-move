let chessBoard = [
  [7, 0],
  [7, 1],
  [7, 2],
  [7, 3],
  [7, 4],
  [7, 5],
  [7, 6],
  [7, 7],
  [6, 0],
  [6, 1],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [6, 6],
  [6, 7],
  [5, 0],
  [5, 1],
  [5, 2],
  [5, 3],
  [5, 4],
  [5, 5],
  [5, 6],
  [5, 7],
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
  [4, 5],
  [4, 6],
  [4, 7],
  [3, 0],
  [3, 1],
  [3, 2],
  [3, 3],
  [3, 4],
  [3, 5],
  [3, 6],
  [3, 7],
  [2, 0],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [2, 7],
  [1, 0],
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [1, 7],
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
];

class node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.distance = 0;
    this.edges = [];
  }
}
class graph {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  addEdge(node1, node2) {
    node1.edges.push(node2);
    node2.edges.push(node1);
  }

  printEdges() {
    this.nodes.forEach((node) => {
      console.log(`Node (${node.x}, ${node.y}) has edges to:`);
      node.edges.forEach((edge) => {
        console.log(`(${edge.x}, ${edge.y})`);
      });
    });
  }
}

node1 = new node(0, 0);
node2 = new node(0, 1);

graph1 = new graph();

graph1.addNode(node1);
graph1.addNode(node2);

graph1.addEdge(node1, node2);

console.log(graph1.nodes);
graph1.printEdges();
