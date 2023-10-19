// Description: This file contains the main logic for the chess knight problem

class Node {
  constructor(x, y, nodePositionType) {
    this.x = x;
    this.y = y;
    this.coords = [x, y];
    this.visited = false;
    this.distances = {};
    this.edges = [];
    this.nodePositionType = nodePositionType || ""; //wall,corner,normal
  }
  hasEdges() {
    if (this.edges.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
class Knight {
  constructor(x, y) {
    this.currentX = x;
    this.currentY = y;
    this.currentCoords = [x, y];
    this.possibleMoves = [
      [this.currentX + 1, this.currentY + 2],
      [this.currentX + 2, this.currentY + 1],
      [this.currentX - 1, this.currentY + 2],
      [this.currentX + 2, this.currentY - 1],
      [this.currentX + 1, this.currentY - 2],
      [this.currentX + 2, this.currentY + 1],
      [this.currentX + 2, this.currentY + 1],
      [this.currentX - 2, this.currentY - 1],
      [this.currentX - 1, this.currentY - 2],
    ];
  }

  knightMoves(startNode, endNode) {
    let queue = [];
    let path = [];
    let currentNode = startNode;
    queue.push(startNode);
    while (queue.length > 0 && currentNode !== endNode) {
      currentNode = queue.shift();

      path.push(currentNode.coords);
      if (currentNode.hasEdges() == true && currentNode.visited == false) {
        currentNode.visited = true;
        currentNode.edges.forEach((edge) => {
          queue.push(edge);
        });
      }
    }
    return path;
  }
}
//todo figure out movement and create function to move knight
class Graph {
  constructor() {
    this.nodesList = [];
  }

  addNode(node) {
    this.nodesList.push(node);
  }

  addEdge(node1, node2) {
    //node1.edges.push(node2);
    if (
      node1 !== null &&
      node2 !== null &&
      node1 !== node2 &&
      node1.edges.includes(node2) === false &&
      node2.edges.includes(node1) === false
    ) {
      node2.edges.push(node1);
      node1.edges.push(node2);
    }
  }

  findNodeInList(x, y) {
    let node = this.nodesList.find((node) => {
      return node.x === x && node.y === y;
    });
    if (node === undefined) {
      return null;
    }

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
      if (node.edges.length === 0) {
        console.log(`Node (${node.x}, ${node.y}) has no edges`);
        return;
      } else if (node.edges.length > 0) {
        console.log(`Node (${node.x}, ${node.y}) has edges to:`);
        node.edges.forEach((edge) => {
          console.log(`(${edge.x}, ${edge.y})`);
        });
      }
    });

    return;
  }
}

class ChessBoard {
  constructor() {
    this.board = new Graph();
    this.knight = new Knight(0, 0);
  }
  calculateDistance(node1, node2) {
    let x1 = node1.x;
    let y1 = node1.y;
    let x2 = node2.x;
    let y2 = node2.y;
    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance;
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
    this.createBoardEdges();
  }

  createBoardEdges() {
    this.board.nodesList.forEach((node) => {
      //corner nodes
      this.board.addEdge(
        this.board.findNodeInList(node.x + 1, node.y + 2),
        node,
      );
      this.board.addEdge(
        this.board.findNodeInList(node.x + 2, node.y + 1),
        node,
      );
      this.board.addEdge(
        this.board.findNodeInList(node.x - 1, node.y + 2),
        node,
      );
      this.board.addEdge(
        this.board.findNodeInList(node.x + 2, node.y - 1),
        node,
      );
      this.board.addEdge(
        this.board.findNodeInList(node.x + 1, node.y - 2),
        node,
      );
      this.board.addEdge(
        this.board.findNodeInList(node.x + 2, node.y + 1),
        node,
      );
      this.board.addEdge(
        this.board.findNodeInList(node.x - 2, node.y - 1),
        node,
      );
      this.board.addEdge(
        this.board.findNodeInList(node.x - 1, node.y - 2),
        node,
      );
    });
  }

  sortChessBoardCoords() {
    let sortedChessBoard = [];
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        sortedChessBoard.push(this.board.findNodeInList(i, j));
      }
    }
    return sortedChessBoard;
  }

  findShortestPath(startNode, endNode) {
    let queue = [];
    let path = [];
    let currentNode = startNode;
    queue.push(startNode);
    while (queue.length > 0 && currentNode !== endNode) {
      let possibleMoves = [
        [currentNode.x + 1, currentNode.y + 2],
        [currentNode.x + 2, currentNode.y + 1],
        [currentNode.x - 1, currentNode.y + 2],
        [currentNode.x + 2, currentNode.y - 1],
        [currentNode.x + 1, currentNode.y - 2],
        [currentNode.x + 2, currentNode.y + 1],
        [currentNode.x + 2, currentNode.y + 1],
        [currentNode.x - 2, currentNode.y - 1],
        [currentNode.x - 1, currentNode.y - 2],
      ];
      let possibleMovesNodes = [];
      possibleMoves.forEach((move) => {
        possibleMovesNodes.push(this.board.findNodeInList(move[0], move[1]));
      });
      let nodeDistances = [];
      // possibleMovesNodes.forEach((node) => {
      //   nodeDistances.push(this.calculateDistance(node, endNode));
      // });
      //console.log(possibleMovesNodes);
      let minDistance = Math.min(...nodeDistances);
      console.log(minDistance);
    }

    return;
  }

  printCornerNodes() {
    this.board.nodesList.forEach((node) => {
      if (node.nodePositionType === "corner") {
        console.log(`Node (${node.x}, ${node.y})`);
      }
    });
  }

  printWallNodes() {
    this.board.nodesList.forEach((node) => {
      if (node.nodePositionType === "wall") {
        console.log(`Node (${node.x}, ${node.y})`);
      }
    });
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

// chessBoard1.board.printNodes();
//chessBoard1.printCornerNodes();
// chessBoard1.board.printEdges();

// let sevenFiveNode = chessBoard1.board.findNodeInList(7, 5);
// console.log(sevenFiveNode.edges.forEach((edge) => console.log(edge.coords)));

console.log(
  chessBoard1.calculateDistance(
    chessBoard1.board.findNodeInList(7, 7),
    chessBoard1.board.findNodeInList(0, 0),
  ),
);
// console.log(
//   chessBoard1.knight.knightMoves(
//     chessBoard1.board.findNodeInList(0, 0),
//     chessBoard1.board.findNodeInList(7, 7),
//   ),
// );

// console.log(
//   chessBoard1.findShortestPath(
//     chessBoard1.board.findNodeInList(0, 2),
//     chessBoard1.board.findNodeInList(7, 7),
//   ),
// );

console.log(
  chessBoard1.board
    .findNodeInList(3, 3)
    .edges.forEach((edge) => console.log(edge.coords)),
);
chessBoard1.board.printEdges();
