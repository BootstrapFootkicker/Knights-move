// Description: This file contains the main logic for the chess knight problem

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
    //node1.edges.push(node2);
    node2.edges.push(node1);
  }

  findNodeInList(x, y) {
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
    this.createBoardEdges();
  }

  createBoardEdges() {
    this.board.nodesList.forEach((node) => {
      //corner nodes
      //todo consider coordinates if x is 0 or 7 or y is 0 or 7 due to out of bounds
      if (node.nodePositionType === "corner") {
        if (node.x === 0 && node.y === 0) {
          this.board.addEdge(this.board.findNodeInList(1, 0), node);
          this.board.addEdge(this.board.findNodeInList(0, 1), node);
          this.board.addEdge(this.board.findNodeInList(1, 1), node);
        } else if (node.x === 0 && node.y === 7) {
          this.board.addEdge(this.board.findNodeInList(0, 6), node);
          this.board.addEdge(this.board.findNodeInList(1, 6), node);
          this.board.addEdge(this.board.findNodeInList(1, 7), node);
        } else if (node.x === 7 && node.y === 0) {
          this.board.addEdge(this.board.findNodeInList(6, 0), node);
          this.board.addEdge(this.board.findNodeInList(6, 1), node);
          this.board.addEdge(this.board.findNodeInList(7, 1), node);
        } else if (node.x === 7 && node.y === 7) {
          this.board.addEdge(this.board.findNodeInList(6, 7), node);
          this.board.addEdge(this.board.findNodeInList(6, 6), node);
          this.board.addEdge(this.board.findNodeInList(7, 6), node);
        }
      }

      //wall nodes
      else if (node.nodePositionType === "wall") {
        if (node.y === 0) {
          this.board.addEdge(
            this.board.findNodeInList(node.x - 1, node.y),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x + 1, node.y),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x, node.y + 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x - 1, node.y + 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x + 1, node.y + 1),
            node,
          );
        } else if (node.y === 7) {
          this.board.addEdge(
            this.board.findNodeInList(node.x - 1, node.y),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x + 1, node.y),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x, node.y - 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x - 1, node.y - 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x + 1, node.y - 1),
            node,
          );
        } else if (node.x === 0) {
          this.board.addEdge(
            this.board.findNodeInList(node.x, node.y - 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x, node.y + 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x + 1, node.y),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x + 1, node.y - 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x + 1, node.y + 1),
            node,
          );
        } else if (node.x === 7) {
          this.board.addEdge(
            this.board.findNodeInList(node.x, node.y - 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x, node.y + 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x - 1, node.y),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x - 1, node.y - 1),
            node,
          );
          this.board.addEdge(
            this.board.findNodeInList(node.x - 1, node.y + 1),
            node,
          );
        }
      }
      //normal nodes
      else if (node.nodePositionType === "normal") {
        this.board.addEdge(this.board.findNodeInList(node.x - 1, node.y), node);
        this.board.addEdge(this.board.findNodeInList(node.x + 1, node.y), node);
        this.board.addEdge(this.board.findNodeInList(node.x, node.y - 1), node);
        this.board.addEdge(this.board.findNodeInList(node.x, node.y + 1), node);
        this.board.addEdge(
          this.board.findNodeInList(node.x - 1, node.y - 1),
          node,
        );
        this.board.addEdge(
          this.board.findNodeInList(node.x - 1, node.y + 1),
          node,
        );
        this.board.addEdge(
          this.board.findNodeInList(node.x + 1, node.y - 1),
          node,
        );
        this.board.addEdge(
          this.board.findNodeInList(node.x + 1, node.y + 1),
          node,
        );
      }
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

// chessBoard1.board.printEdges();
//chessBoard1.printCornerNodes();
chessBoard1.board.printEdges();

// let sevenFiveNode = chessBoard1.board.findNodeInList(7, 5);
// console.log(sevenFiveNode.edges.forEach((edge) => console.log(edge.coords)));
