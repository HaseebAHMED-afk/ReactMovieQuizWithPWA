import React,{useState} from 'react';
import './App.css';
import {QuestionCard} from './Components/QuestionCard';
import { fetchQuestions, QuestionState } from './Components/API';

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question : string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers,setUserAnswer] = useState<AnswerObject[]>([]);
  const [score , setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async() => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions()
    setQuestions(newQuestions)
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  }



  const nextQuestion = async() => {
    const nextQuestion = number + 1;
    if(number === TOTAL_QUESTIONS){
      setGameOver(true);
    }else{ 
    setNumber(nextQuestion);
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(prev => prev + 5);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswer( prev => [...prev , answerObject])
    }
  }

  return (
    <div>
    <h1 className="main-heading" >Movie Quiz</h1>
    { !gameOver ||  userAnswers.length === TOTAL_QUESTIONS ? (<h2 className='score'>Score: {score} </h2>) : null }
    { loading ? (<h2 className='loading' >Loading</h2>): null }
    {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<button className='start' onClick={startQuiz}>Start</button>): null }
    { !gameOver && !loading  ? ( <QuestionCard 
      questionNumber={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question = {questions[number].question}
      answers = {questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
    />) : null}
   
    { !gameOver && !loading && userAnswers.length === number+1 && number !== TOTAL_QUESTIONS -1 ? (
    <button onClick={nextQuestion} className="next-button" >Next</button>) : null}
    </div>
  );
}

export default App;
