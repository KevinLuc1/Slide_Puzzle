import React, {Component} from "react";
import Cell from "./Cell";
import "./board.css";
import { allImages } from "./ImageFolder"

import img1 from "./public/Images/image_part_001.jpg";

class Board extends Component {
	static defaultProps = {
	    numRows: 5,
	    numCols: 5,
	    chanceLightStartsOn: 0.25
	}
	constructor(props) {
		super(props);

    	//the initial state
    	this.state = {
      		hasWon: false,
      		board: this.createBoard()
    	}
	}

	createBoard() {
		let board = [];
		

	    // loop over the rows 
	    for (let y = 0; y < this.props.numRows; y++) {

		    let row = [];
		    // loop over the columns in each row
		    for (let x = 0; x < this.props.numCols; x++){
		      //decide if something is on or off
		      // pushing into rows a bunch of true or false
		      row.push(false)
		    }
		    board.push(row)
		    
    	}
    	
    	return board;
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

		// randomize list of images
		let randomImages = this.shuffle(allImages())

		// creates a list of 5 arrays with 5 image each
		let fiveByFive = this.chunkArray(randomImages, 5)


		let tableboard = [];


		for (let z = 0; z < fiveByFive.length; z++){
			let row = [];
			for (let y = 0; y < this.props.numRows; y++){
				row.push(
					
					
					<Cell imgSrc={fiveByFive[z][y]} />
					
					)
				
				}
			tableboard.push(<tr>{row}</tr>)
			}
		




		return (
			<div>
				<h1> hello</h1>
				
	  			<table className="Board">	
	  				<tbody>
	  					{tableboard}
	  				</tbody>
	  			</table>				
				

				

			</div>
			)
	}



}

export default Board;