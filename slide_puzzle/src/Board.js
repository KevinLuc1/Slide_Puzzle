import React, {Component} from "react";
import Cell from "./Cell";
import "./board.css";
import { allImages } from "./ImageFolder"
import blankImg from "./Images/image_part_025.jpg"

// import img1 from "./public/Images/image_part_001.jpg";

class Board extends Component {
	static defaultProps = {
	    numRows: 5,
	    numCols: 5,
	    // images: this.chunkArray(allImages(), 5)
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

	// create board to create coordinate keys to pass into makeBoard()
	//  these coord's will becomes the keys to each Cell
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

    	let randomImages = this.shuffle(allImages())
		// let randomImages = this.shuffle(immy)

		// creates a list of 5 arrays with 5 image each
		let fiveByFive = this.chunkArray(randomImages, 5)

    	for (let i = 0; i < this.props.numRows; i++) {
    		let row = [];
    		for (let j = 0; j < this.props.numCols; j++ ){
    			let imageData = fiveByFive[i][j]
    			row.push(imageData)
    		}
    		randomBoard.push(row)
    	}

    	return randomBoard;


    }


    makeBoard(){
		// let randomImages = this.shuffle(allImages())
		// // let randomImages = this.shuffle(immy)

		// // creates a list of 5 arrays with 5 image each
		// let fiveByFive = this.chunkArray(randomImages, 5)


		let tableboard = [];


		for (let z = 0; z < this.props.numRows; z++){
			let row = [];
			for (let y = 0; y < this.props.numCols; y++){
				let coord = `${z}-${y}`;


				row.push(
					
					
					<Cell 
						key={coord}
						// correctImage = {this.state.board[z][y]}
						// currentImage = {this.state.randomBoard[z][y]}
						// isMatch is true if currentImage === correctImage
						isMatch = {this.state.board[z][y] === this.state.randomBoard[z][y]}
						// this will be the dark square
						isDark = {this.state.board[4][4] === this.state.randomBoard[z][y]}
						imgSrc={this.state.randomBoard[z][y]}

						//arrow function to prevent an automatic run
						flipCells={() => this.flipClickedCell(coord, this.state.randomBoard[z][y])}

					/>
					
				)
				
			}
			tableboard.push(<tr>{row}</tr>)
		}


		return tableboard


  	

    }

    flipClickedCell(coord, clickedImage){
    	// copy down the current state of the randomBoard
    	let randomBoard = this.state.randomBoard

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
		// let i = 0;
	    let tempArray = [];
	    
	    for (let i = 0; i < myArray.length; i+= chunk_size) {
	        let myChunk = myArray.slice(i, i+chunk_size);
	        console.log()
	        // Do something if you want with the group
	        tempArray.push(myChunk);
	    }

	    return tempArray;
	}




	// <Cell imgSrc={fiveByFive[z][y]} />

	render() {

		// // randomize list of images
		// let randomImages = this.shuffle(allImages())

		// // creates a list of 5 arrays with 5 image each
		// let fiveByFive = this.chunkArray(randomImages, 5)


		// let tableboard = [];


		// for (let z = 0; z < fiveByFive.length; z++){
		// 	let row = [];
		// 	for (let y = 0; y < this.props.numRows; y++){
		// 		row.push(
					
					
		// 			<Cell imgSrc={fiveByFive[z][y]} />
					
		// 			)
				
		// 		}
		// 	tableboard.push(<tr>{row}</tr>)
		// 	}
		




		return (
			<div>
				<h1> hello</h1>
				
	  			<table className="Board">	
	  				<tbody>
	  					{this.makeBoard()}
	  				</tbody>
	  			</table>				
				

				

			</div>
			)
	}



}

export default Board;