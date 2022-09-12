import Quiz1 from './Components/Quiz1';
import './App.css';
import { Grid } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={6}>
          <Quiz1 />
        </Grid>
        <Grid item xs={6}>
          <Quiz1 />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
