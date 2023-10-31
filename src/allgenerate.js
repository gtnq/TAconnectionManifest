import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Allgenerate = (all) => {
	let currentTitle = null;
	let tables = [];
	let rows = [];
	//console.log(all);
	const tableCells = (item) => {
		return (
			<TableCell
				size="small"
				style={{ padding: "0px 2px", fontSize: "0.5em" }}>
				{item}
			</TableCell>
		);
	};

	all.forEach((item, ind) => {
		let title = item.date.date;

		// Your logic for handling duplicates and merging times goes here...

		if (title === currentTitle) {
			rows.push(
				<TableRow key={ind}>
					{tableCells(item.flight)}
					{tableCells(item.date.time)}
				</TableRow>
			);
		} else {
			if (rows.length > 0) {
				tables.push(
					<div
						className="table-wrapper-all"
						key={currentTitle}>
						<TableContainer component={Paper}>
							<Table
                            style={{ minWidth: 100 }}
								aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell
											size="small"
											style={{
												fontWeight: "bold",
												padding: "0px 2px",
												fontSize: "0.5em",
											}}
											colSpan={2}>
											{currentTitle}
										</TableCell>
									</TableRow>
									<TableRow>
										{tableCells("Flight")}
										{tableCells("Time")}
									</TableRow>
								</TableHead>
								<TableBody>{rows}</TableBody>
							</Table>
						</TableContainer>
					</div>
				);
				rows = [];
			}
			currentTitle = title;
			rows.push(
				<TableRow key={ind}>
					{tableCells(item.flight)}
					{tableCells(item.date.time)}
				</TableRow>
			);
		}
	});

	// Add the last table
	if (rows.length > 0) {
		tables.push(
			<div
				className="table-wrapper-all"
				key={currentTitle}>
				<TableContainer
					component={Paper}
					key={currentTitle}>
					<Table
                    style={{ minWidth: 100 }}
						aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell
									size="small"
									style={{
										fontWeight: "bold",
										padding: "0px 2px",
										fontSize: "0.5em",
									}}
									colSpan={2}>
									{currentTitle}
								</TableCell>
							</TableRow>
							<TableRow>
								{tableCells("Flight")}
								{tableCells("Time")}
							</TableRow>
						</TableHead>
						<TableBody>{rows}</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}

	return <div className="table-container-all">{tables}</div>;
};

export default Allgenerate;
