import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Grid, MenuItem, Zoom } from '@mui/material';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import StickyHeadTable from './Table';

const useStyles = makeStyles({
  buttonStart: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  CenterItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PaperStyling: {
    height: '90vh',
    width: '100%',
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardStyling: {
    height: '45vh',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  CardContentStyling: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

function Quiz1() {
  const classes = useStyles();

  let Operators = ['+', '*', '/', '-', '%'];
  let Number = [10, 20, 40, 60, 80, 100];

  const [QuestionsCount, setQuestionCount] = useState(0);

  const [checked, setChecked] = useState(false);

  const [Answer, setAnswer] = useState('');
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [EnableQuiz, setEnableQuiz] = useState(false);

  const initialValues = {
    Number: 0,
    UserSelectedOperands: '',
  };
  const [values, setValues] = useState(initialValues);
  const [key, setKey] = useState(0);

  const handleAnswers = (e) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const generateRandomnumber = (num) => {
    return Math.floor(Math.random() * num) + 1;
  };
  const generateRandomOperator = (symbol) => {
    return Math.floor(Math.random() * symbol);
  };

  const [RandomNumber1, setRandomNumber1] = useState(0);
  const [RandomNumber2, setRandomNumber2] = useState(0);
  const [operator, setOperator] = useState(
    Operators[generateRandomOperator(Operators.length)]
  );

  const handleSingleCardSubmit = () => {
    //eslint-disable-next-line
    let originalOutput = eval(`${RandomNumber1}${operator}${RandomNumber2}`);
    let obj = {
      id: `${QuestionsCount}`,
      question: `${RandomNumber1} ${operator} ${RandomNumber2}`,
      YourAnswer: Answer !== '' ? (+Answer).toFixed(2) : 'Not Attempted',
      CorrectAnswer: originalOutput.toFixed(2),
    };
    listOfQuestions.push(obj);
    setListOfQuestions(listOfQuestions);
    setRandomNumber1(generateRandomnumber(values?.UserSelectedOperands));
    setRandomNumber2(generateRandomnumber(values?.UserSelectedOperands));
    setOperator(Operators[generateRandomOperator(Operators.length)]);
    setQuestionCount(QuestionsCount + 1);
    setKey((prevKey) => prevKey + 1);
    setAnswer('');
  };

  const [showResult, setshowResult] = useState(false);

  const handleSubmit = () => {
    //eslint-disable-next-line
    let originalOutput = eval(`${RandomNumber1}${operator}${RandomNumber2}`);
    let obj = {
      id: `${QuestionsCount}`,
      question: `${RandomNumber1} ${operator} ${RandomNumber2}`,
      YourAnswer: Answer !== '' ? (+Answer).toFixed(2) : 'Not Attempted',
      CorrectAnswer: originalOutput.toFixed(2),
    };
    listOfQuestions.push(obj);
    setListOfQuestions(listOfQuestions);
    setshowResult(true);
    setAnswer('');
  };

  const handleStartQuiz = () => {
    setChecked(true);
    setEnableQuiz(true);
    setRandomNumber1(generateRandomnumber(values?.UserSelectedOperands));
    setRandomNumber2(generateRandomnumber(values?.UserSelectedOperands));
    setQuestionCount(QuestionsCount + 1);
  };

  const HandleInputForm = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const ResetQuiz = () => {
    setEnableQuiz(false);
    setListOfQuestions([]);
    setValues(initialValues);
    setshowResult(false)
    setQuestionCount(0)
  };

  return (
    <div className={classes.CenterItem}>
      <Paper elevation={16} className={classes.PaperStyling}>
        <Typography variant="h4">
          {showResult ? 'Result' : 'Arithmetic Quiz'}
        </Typography>

        {EnableQuiz ? (
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? '500ms' : '0ms' }}
          >
            {showResult ? (
              <Grid item xs={12} className={classes.CenterItem}>
                <StickyHeadTable QuestionData={listOfQuestions} />
              </Grid>
            ) : (
              <div className={classes.CenterItem}>
                <Card sx={{ margin: '1rem' }} className={classes.CardStyling}>
                  <CardContent className={classes.CardContentStyling}>
                    <CountdownCircleTimer
                      isPlaying
                      key={key}
                      duration={20}
                      size={80}
                      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                      colorsTime={[7, 5, 2, 0]}
                      onComplete={() => {
                        if (QuestionsCount < values.Number) {
                          setRandomNumber1(
                            generateRandomnumber(values?.UserSelectedOperands)
                          );
                          setRandomNumber2(
                            generateRandomnumber(values?.UserSelectedOperands)
                          );
                          setOperator(
                            Operators[generateRandomOperator(Operators.length)]
                          );
                          setQuestionCount(QuestionsCount + 1);
                          return { shouldRepeat: true };
                        } else if (QuestionsCount >= values.Number) {
                          setKey(0);
                          handleSubmit();
                          return { shouldRepeat: false };
                        }
                      }}
                    >
                      {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                    <Typography
                      variant="h5"
                      component="div"
                      style={{ fontWeight: 'bolder' }}
                    >
                      {QuestionsCount}. What is the Output of{' '}
                      {RandomNumber1 + ' ' + operator + ' ' + RandomNumber2}?
                    </Typography>
                  </CardContent>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      style={{ marginLeft: '5%', marginRight: '5%' }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Answer"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={Answer}
                        onChange={handleAnswers}
                      />
                    </Grid>
                  </Grid>

                  {QuestionsCount < values?.Number ? (
                    <CardActions>
                      <Button
                        size="medium"
                        variant="contained"
                        onClick={handleSingleCardSubmit}
                        className={classes.buttonStart}
                      >
                        Next
                      </Button>
                    </CardActions>
                  ) : (
                    <CardActions>
                      <Button
                        size="medium"
                        variant="contained"
                        className={classes.buttonStart}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </div>
            )}
          </Zoom>
        ) : (
          <>
            <div className={classes.CenterItem}>
              <Card
                sx={{ width: 400, margin: '1rem' }}
                className={classes.CardStyling}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ margin: '2%' }}>
                    <TextField
                      id="outlined-basic"
                      label="Enter Number of Questions"
                      type="number"
                      name="Number"
                      variant="outlined"
                      onChange={HandleInputForm}
                      value={values.Number}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ margin: '2%' }}>
                    <TextField
                      select
                      name="UserSelectedOperands"
                      multiple
                      fullWidth
                      value={values.UserSelectedOperands}
                      onChange={HandleInputForm}
                      label="Please select number range"
                    >
                      <MenuItem value="" style={{ display: 'none' }}>
                        Please Select
                      </MenuItem>
                      {Number?.map((option) => (
                        <MenuItem
                          key={option + '_operator'}
                          value={option}
                          style={{ textAlign: 'center' }}
                        >
                          less than {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <CardActions>
                  <Button
                    variant="outlined"
                    className={classes.buttonStart}
                    onClick={handleStartQuiz}
                    disabled={
                      values.Number > 0 && values.UserSelectedOperands !== ''
                        ? false
                        : true
                    }
                  >
                    Start Quiz
                  </Button>
                </CardActions>
              </Card>
            </div>
          </>
        )}
          <Button variant="outlined" onClick={ResetQuiz}>
            Reset Quiz
          </Button>
        
      </Paper>
    </div>
  );
}

export default Quiz1;
