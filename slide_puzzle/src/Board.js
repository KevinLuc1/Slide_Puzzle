import React, {Component} from "react";
import Cell from "./Cell";
import "./board.css";
import { allImages } from "./ImageFolder"

// import img1 from "./public/Images/image_part_001.jpg";

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
      		board: this.createBoard()

    	}
	}

	// create board to create coordinate keys to pass into makeBoard()
	//  these coord's will becomes the keys to each Cell
	createBoard() {
		

		let board = [];

		let sortedImages = allImages();

		let fiveByFive = this.chunkArray(sortedImages, 5)


    	//makes list of coordinates
    	for (let i = 0; i < 5; i++) {
    		let row = [];
    		for (let j = 0; j < 5; j++ ){
    			let imageData = fiveByFive[i][j]
    			row.push(imageData)
    		}
    		board.push(row)
    	}

    	
    	return board;
    }


    makeBoard(){
		let randomImages = this.shuffle(allImages())
		// let randomImages = this.shuffle(immy)

		// creates a list of 5 arrays with 5 image each
		let fiveByFive = this.chunkArray(randomImages, 5)


		let tableboard = [];


		for (let z = 0; z < fiveByFive.length; z++){
			let row = [];
			for (let y = 0; y < this.props.numRows; y++){

				row.push(
					
					
					<Cell 
					correctImage = {this.state.board[z][y]}
					currentImage = {fiveByFive[z][y]}
					// isMatch is true if currentImage === correctImage
					isMatch = {this.state.board[z][y] === fiveByFive[z][y]}
					// this will be the dark square
					isDark = {this.state.board[4][4] === fiveByFive[z][y]}
					imgSrc={fiveByFive[z][y]} />
					
					)
				
				}
			tableboard.push(<tr>{row}</tr>)
		}


		// maybe try like the instructor board .js, initialize a correct image in create.board()
		return tableboard


  	

    }



    // to randomize the images
    shuffle(array){
    	for (let i = array.length - 1; i > 0; i--) {
        	const j = Math.floor(Math.random() * (i + 1));
        	[array[i], array[j]] = [array[j], array[i]];
   		}
   		return(array)
    }

    // to split randomized images into 5 x 5
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