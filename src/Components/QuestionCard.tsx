import React from 'react'
import '../App.css'

type Props = {
    question: string;
    answers: string[];
    callback: (e : React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: any;
    questionNumber: number;
    totalQuestions: number;
}


export const QuestionCard: React.FC<Props> = ({questionNumber,question,totalQuestions,callback,userAnswer,answers}) => {


    return (
        <div className="questionCard">
            <p>
            Question: {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}} />
            <div>
                {answers.map(answer => <button className="option-buttons" disabled={userAnswer} onClick={callback} value={answer} >
                        <span dangerouslySetInnerHTML={{__html: answer}} />
                    </button>)}
            </div>
        </div>
    )
}

