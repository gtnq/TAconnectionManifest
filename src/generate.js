// let dup = false;

// const generate = (all) => {
// 	return (all.m   ap((item, ind) => {
// 		console.log(item);
// 		if (!dup) {
// 			let title = item.date.date;
// 			//console.log(item.dep)
// 			let departure = item.dep ? "ARV" : "DEP";
// 			if (item.flight === "departure time") {
// 				departure = "";
// 			}
// 			if (ind + 1 < all.length) {
// 				if (
// 					(item.flight === all[ind + 1]?.flight &&
// 						item.dep === all[ind + 1]?.dep) ||
// 					item.flight === all[ind - 1]?.flight
// 				) {
// 					dup = true;
// 				}
// 			}

// 			if (item.dep === true && all[ind + 1]?.dep === true && !dup) {
// 				//merge the two arrivials that are smaller then 15 mins apart
// 				if (ind + 1 < all.length) {
// 					let time1 = item.date.time.split(":");
// 					let time2 = all[ind + 1]?.date.time.split(":");
// 					let time1Num = parseInt(time1[0]) * 60 + parseInt(time1[1]);
// 					let time2Num = parseInt(time2[0]) * 60 + parseInt(time2[1]);
// 					if (Math.abs(time1Num - time2Num) < 10) {
// 						dup = true;
// 						return (
// 							<div>
// 								{item.flight} @ {item.date.time} and{" "}
// 								{all[ind + 1]?.flight} @{" "}
// 								{all[ind + 1]?.date.time} {departure}
// 							</div>
// 						);
// 					}
// 				}
// 			}

// 			if (title === all[ind - 1]?.date.date) {
// 				return (
// 					<div>
// 						{item.flight} @ {item.date.time} {departure}
// 					</div>
// 				);
// 			} else {
// 				return (
// 					<>
// 						<div>{title}</div>
// 						<div>
// 							{item.flight} @ {item.date.time} {departure}
// 						</div>
// 					</>
// 				);
// 			}
// 		} else {
// 			dup = false;
// 		}
// 	}));
// };

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Driver from './driverSelect';

const generate = (all) => {
  let currentTitle = null;
  let tables = [];
  let rows = [];
  console.log(all)

  all.forEach((item, ind) => {
    let title = item.date.date

    // Your logic for handling duplicates and merging times goes here...
    
    if (title === currentTitle) {
      rows.push(
        <TableRow key={ind}>
          <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>{item.flight}</TableCell>
          <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>{item.date.time}</TableCell>
          <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>{item.dep.time ? item.dep.time : "ARV"}</TableCell>
		  <TableCell><Driver /></TableCell>
        </TableRow>
      );
    } else {
      if (rows.length > 0) {
        tables.push(
          <div className='table-wrapper' key={currentTitle}>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4}>{currentTitle}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>Flight</TableCell>
                  <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>Time</TableCell>
                  <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>Departure</TableCell>
				  <TableCell>Driver</TableCell>
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
          <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>{item.flight}</TableCell>
          <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>{item.date.time}</TableCell>
          <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>{item.dep.time ? item.dep.time : "ARV"}</TableCell>
		  <TableCell><Driver /></TableCell>
        </TableRow>
      );
    }
  });

  // Add the last table
  if (rows.length > 0) {
    tables.push(
      <TableContainer component={Paper} key={currentTitle}>
        <Table style={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} style={{ padding: '4px 8px', fontSize: '0.8em' }}>{currentTitle}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>Flight</TableCell>
              <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>Time</TableCell>
              <TableCell style={{ padding: '4px 8px', fontSize: '0.8em' }}>Departure</TableCell>
			  <TableCell>Driver</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    );
  }

  return <div className='table-container'>
            {tables}
        </div>
};

export default generate;
