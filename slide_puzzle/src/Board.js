import React, {Component} from "react";
import Cell from "./Cell";
import "./board.css";
import { allImages } from "./ImageFolder"
import blankImg from "./Images/image_part_025.jpg"
import fullPicture from "./Images/mario.jpg"



class Board extends Component {
	static defaultProps = {
	    numRows: 5,
	    numCols: 5,
	}
	constructor(props) {
		super(props);

    	//the initial state
    	this.state = {
      		hasWon: false,
      		board: this.createBoard(),
      		randomBoard: this.makeRandom(),
      		blankImg: blankImg
      		

    	}
	}


	blankImg(){
		let image = [];
		let blankImg = allImages()

		image.push(blankImg[24])

		return image

	}

	createBoard() {
		

		let board = [];

		let sortedImages = allImages();

		let fiveByFive = this.chunkArray(sortedImages, 5)


    	//makes list of coordinates
    	for (let i = 0; i < this.props.numRows; i++) {
    		let row = [];
    		for (let j = 0; j < this.props.numCols; j++ ){
    			let imageData = fiveByFive[i][j]
    			row.push(imageData)
    		}
    		board.push(row)
    	}
    	 console.log()
    	
    	return board;
    }

    makeRandom() {
    	let randomBoard = []

    	//save sorted images
  		let imagesToShuffle = allImages();

  		//convert into 
  		let fiveByFive = this.chunkArray(imagesToShuffle, 5)

    	for (let i = 0; i < this.props.numRows; i++) {
    		let row = [];
    		for (let j = 0; j < this.props.numCols; j++ ){
    			let imageData = fiveByFive[i][j]
    			row.push(imageData)
    		}
    		randomBoard.push(row)
    	}  		

    	// we will start with a solved puzzle, making valid moves over and over
    	// to randomize it, kind of like a rubics cube
    	function randomSwap(){

	    	//starting blank cell
	    	let [y, x] = [4, 4]


    		for (let i = 0; i < 10000; i++) {

	    		let roll = Math.floor(Math.random() *4);


	    		// x|0|x
	    		// 3|x|1
	    		// x|2|x
	    		// 0 flips up, 1 flips right, 2 flips down, 3 flips left
	    		if (roll === 0){
	    			let next = y - 1;
	    			if (next >=0 && next <5){
	    				let temp = randomBoard[y][x]

	    				randomBoard[y][x] = randomBoard[next][x]
	    				randomBoard[next][x] = temp
	    				y = next
	    				
	    			} 

	    		}
	    		else if (roll === 1){
	    			let next = (x + 1);
	    			if (next >=0 && next <5){
	    				let temp = randomBoard[y][x]

	    				randomBoard[y][x] = randomBoard[y][next]
	    				randomBoard[y][next] = temp
	    				x = next
	    			} 

	    		}
	    		else if (roll === 2){
	    			let next = (y + 1);
	    			if (next >=0 && next <5){
	    				let temp = randomBoard[y][x]

	    				randomBoard[y][x] = randomBoard[next][x]
	    				randomBoard[next][x] = temp
	    				y = next
	    			} 
	    		}
	    		else {
	    			let next = (x - 1);
	    			if (next >=0 && next <5){
	    				let temp = randomBoard[y][x]

	    				randomBoard[y][x] = randomBoard[y][next]
	    				randomBoard[y][next] = temp
	    				x = next
	    			} 

	    		}
	    	}

    	}

    	randomSwap();

    	return randomBoard;

    }


    makeBoard(){

		let tableboard = [];


		for (let z = 0; z < this.props.numRows; z++){
			let row = [];
			for (let y = 0; y < this.props.numCols; y++){
				let coord = `${z}-${y}`;


				row.push(
					
					<Cell 
						key={coord}
						// isMatch is true if currentImage === correctImage
						isMatch = {this.state.board[z][y] === this.state.randomBoard[z][y]}
						// this will be the dark square
						// isDark = {this.state.board[4][4] === this.state.randomBoard[z][y]}
						imgSrc={this.state.randomBoard[z][y]}

						//arrow function to prevent an automatic run
						flipCells={() => this.flipClickedCell(coord, this.state.randomBoard[z][y])}

					/>
					
				)
				
			}
			tableboard.push(<tr key={z}>{row}</tr>)
		}


		return tableboard


  	

    }

    flipClickedCell(coord, clickedImage){
    	// copy down the current state of the randomBoard
    	let randomBoard = this.state.randomBoard
    	let board = this.state.board

    	//  use Number function to convert y,x string into y,x numbers
    	let [y, x] = coord.split("-").map(Number)

    	// locate the current coordinates of the blank image inside randomBoard
    	let locationOfBlankIMG = []
    	for (let i = 0; i < 5; i++){
    		for (let j = 0; j < 5; j++){
				// if the image data at randomBoardij is equal to the blank image
				// give me the i and j coordinates 
    			if (this.state.randomBoard[i][j] === this.state.board[4][4]) {
    				locationOfBlankIMG.push(i,j)
    			}
    		}

    	}
 
    	// if cell below blank image clicked
    	if (y === locationOfBlankIMG[0]+1 && x === locationOfBlankIMG[1]) {
    		swapCells()
    	}
    	//if cell above blank image clicked
    	if (y === locationOfBlankIMG[0]-1 && x === locationOfBlankIMG[1]) {
    		swapCells()
    	}
    	//if cell to right of blank image clicked
    	if (y === locationOfBlankIMG[0] && x === locationOfBlankIMG[1]+1) {
    		swapCells()
    	}
    	//if cell to left of blank image clicked
    	if (y === locationOfBlankIMG[0] && x === locationOfBlankIMG[1]-1) {
    		swapCells()
    	}



		function swapCells(){
	    	// set the clicked image to become blank image
	    	randomBoard[y][x] = blankImg

	    	// set the current location of blank image to clickedImage
	    	randomBoard[locationOfBlankIMG[0]][locationOfBlankIMG[1]] = clickedImage

		}

		let hasWon = isWinner()

		// if every random image matched the sorted image, win
		function isWinner() {
			for (let i = 0; i< 5; i++){
				for (let j = 0; j<5; j++){
					if (board[i][j] === randomBoard[i][j] ){
						return true
					}
					else {
						return false
					}
				}
			}
		}
		// console.log(hasWon)

    	this.setState(randomBoard)

    }



    // to randomize the images
    shuffle(array){
    	for (let i = array.length - 1; i > 0; i--) {
        	const j = Math.floor(Math.random() * (i + 1));
        	[array[i], array[j]] = [array[j], array[i]];
   		}
   		return(array)
    }

    // to split images into 5 x 5
	chunkArray(myArray, chunk_size){
	    let tempArray = [];
	    
	    for (let i = 0; i < myArray.length; i+= chunk_size) {
	        let myChunk = myArray.slice(i, i+chunk_size);
	 
	        tempArray.push(myChunk);
	    }

	    return tempArray;
	}




	// <Cell imgSrc={fiveByFive[z][y]} />

	render() {
		return (
			<div>
				
				<div className="title"> Solve the Puzzle</div>
				<div>
	  				<table className="Board">	
		  				<tbody>
		  					{this.makeBoard()}
		  				</tbody>
		  			</table>
	  			</div>	
	  			<div>	
	  				{this.state.hasWon ? (<h1 className="title">WINNER</h1>) : (	
	  				<div>	
		  				<div className="title"> Solution</div>
						<div> <img src={fullPicture} className="fullPicture" /> </div>
					</div>
					)}
				</div>
			</div>




			)
	}



}

export default Board;