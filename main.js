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
    //app possible knight moves to each node
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

  //dijkstra's algorithm
  findShortestPath(startNode, endNode) {
    let distances = {};
    let previous = {};
    let unvisited = [];
    let path = [];
    let currentNode = startNode;

    this.board.nodesList.forEach((node) => {
      if (node !== startNode) {
        distances[node.coords] = Infinity;
        previous[node.coords] = null;
      } else {
        distances[node.coords] = 0;
        previous[node.coords] = null;
      }
      unvisited.push(node);
    });

    while (unvisited.length > 0) {
      currentNode = unvisited.reduce((minNode, node) => {
        if (distances[node.coords] < distances[minNode.coords]) {
          return node;
        } else {
          return minNode;
        }
      });

      unvisited.splice(unvisited.indexOf(currentNode), 1);

      if (currentNode === endNode) {
        while (previous[currentNode.coords]) {
          path.push(currentNode.coords);
          currentNode = previous[currentNode.coords];
        }
        break;
      }

      if (distances[currentNode.coords] === Infinity) {
        break;
      }

      currentNode.edges.forEach((edge) => {
        let potentialDistance = distances[currentNode.coords] + 1;
        if (potentialDistance < distances[edge.coords]) {
          distances[edge.coords] = potentialDistance;
          previous[edge.coords] = currentNode;
        }
      });
    }
    path.push(startNode.coords);
    return path.reverse();
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

let chessBoard1 = new ChessBoard();

chessBoard1.createBoard();

console.log(
  chessBoard1.findShortestPath(
    chessBoard1.board.findNodeInList(0, 0),
    chessBoard1.board.findNodeInList(7, 7),
  ),
);
