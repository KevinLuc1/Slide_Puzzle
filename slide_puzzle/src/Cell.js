import React, {Component} from "react";
import "./cell.css";

class Cell extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		// calls the board to flip cell with blank cell
		this.props.flipCells();
    
	}


	render() {
		// class will be "Cell" or "Cell Cell-lit"
		let classes = "Cell" + (this.props.isMatch ? " Cell-matched" : "")

		

		return (
			<td className={classes} onClick={this.handleClick}>
				<img src={this.props.imgSrc} />
			</td>
		)

	}





}

export default Cell;