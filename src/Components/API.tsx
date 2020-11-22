import { shuffleArray } from '../util';
import data from '../data/questions.json';


export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string
}

export type QuestionState = Question & { answers: string[] };

export const fetchQuestions = async() =>{

    const {questions} : any = data;
    console.log(questions);
    

    return questions.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers , question.correct_answer])
        }
    ))
   
    
}



