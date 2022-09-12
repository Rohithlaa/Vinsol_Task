import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { useState } from 'react';



export default function StickyHeadTable({QuestionData}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const[Score, setScore] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    QuestionData.forEach( item => {
      if(item.YourAnswer === item.CorrectAnswer){
        setScore( (prev) => prev + 1)
        console.log("Entered")
      }
    })
    //eslint-disable-next-line
  }, [])
    

  return (
    <div >
    <Typography variant='h4'>
        Your Score is : {Score}
    </Typography>
      <TableContainer >
        <Table  aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>YourAnswer</TableCell>
              <TableCell>CorrectAnswer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {QuestionData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, key) => {
                return (
                  <TableRow  key={key} style={ row.YourAnswer === row.CorrectAnswer ? {backgroundColor:'#75b017'} : {backgroundColor: '#e63029'}  }>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.question}</TableCell>
                    <TableCell>{row.YourAnswer}</TableCell>
                    <TableCell>{row.CorrectAnswer}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={QuestionData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
