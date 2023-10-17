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

class Node {
  constructor(x, y, nodePositionType) {
    this.x = x;
    this.y = y;
    this.coords = [x, y];
    this.visited = false;
    this.distance = 0;
    this.edges = [];
    this.nodePositionType = nodePositionType || ""; //wall,corner,normal
  }
}

class Graph {
  constructor() {
    this.nodesList = [];
  }

  addNode(node) {
    this.nodesList.push(node);
  }

  addEdge(node1, node2) {
    node1.edges.push(node2);
    node2.edges.push(node1);
  }

  findNodeinList(x, y) {
    let node = this.nodesList.find((node) => {
      return node.x === x && node.y === y;
    });
    return node;
  }
  printNodes() {
    this.nodesList.forEach((node) => {
      if (node.nodePositionType === "") {
        console.log(`Node (${node.x}, ${node.y})`);
      } else {
        console.log(
          `Node (${node.x}, ${node.y}) is a ${node.nodePositionType} node`,
        );
      }
    });
  }

  printEdges() {
    this.nodesList.forEach((node) => {
      console.log(`Node (${node.x}, ${node.y}) has edges to:`);
      node.edges.forEach((edge) => {
        console.log(`(${edge.x}, ${edge.y})`);
      });
    });
  }
}

class ChessBoard {
  constructor() {
    this.board = new Graph();
  }

  createWallNodes() {
    let wallNodes = [];
    for (let i = 1; i <= 6; i++) {
      let node1 = new Node(0, i, "wall");
      let node2 = new Node(7, i, "wall");
      let node3 = new Node(i, 0, "wall");
      let node4 = new Node(i, 7, "wall");
      wallNodes.push(node1, node2, node3, node4);
    }

    return wallNodes;
  }

  createCornerNodes() {
    let node1 = new Node(0, 0, "corner");
    let node2 = new Node(0, 7, "corner");
    let node3 = new Node(7, 0, "corner");
    let node4 = new Node(7, 7, "corner");

    let cornerNodes = [];

    cornerNodes.push(node1, node2, node3, node4);
    return cornerNodes;
  }

  createNormalNodes() {
    let normalNodes = [];
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 6; j++) {
        let node = new Node(i, j, "normal");
        normalNodes.push(node);
      }
    }
    return normalNodes;
  }

  createBoard() {
    let wallNodes = this.createWallNodes();
    let cornerNodes = this.createCornerNodes();
    let normalNodes = this.createNormalNodes();
    let allNodes = wallNodes.concat(cornerNodes, normalNodes);
    for (let i = 0; i < allNodes.length; i++) {
      this.board.addNode(allNodes[i]);
    }
    this.board.nodesList = this.sortChessBoardCoords();
  }

  // createBoardEdges() {
  //   this.board.nodes.forEach((node) => {
  // });
  sortChessBoardCoords() {
    let sortedChessBoard = [];
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        sortedChessBoard.push(this.board.findNodeinList(i, j));
      }
    }
    return sortedChessBoard;
  }
}

let graph = new Graph();

let chessBoard1 = new ChessBoard();

chessBoard1.createBoard();

// console.log(chessBoard1.createWallNodes());
// console.log(chessBoard1.createCornerNodes());
//chessBoard1.board.printNodes();

// console.log(chessBoard1.createNormalNodes());

/*console.log(sortArrayByXandY(array1));

console.log(chessBoard1.sortChessBoardCoords());*/

chessBoard1.board.printNodes();
