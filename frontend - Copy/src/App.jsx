
import { useState } from 'react';

const questions = [
  { id: 1, question: '5 + 5 = ?', options: ['8','9','10','11'], answer: 2 },
  { id: 2, question: '10 * 2 = ?', options: ['20','10','30','40'], answer: 0 }
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [responses, setResponses] = useState({});

  const saveAnswer = (idx) => {
    setResponses({...responses, [questions[current].id]: idx});
  };

  return (
    <div style={{padding:'20px'}}>
      <h1>Banking Exam Simulator</h1>
      <h3>Q{current+1}. {questions[current].question}</h3>
      {questions[current].options.map((o,i)=>
        <div key={i}>
          <button onClick={()=>saveAnswer(i)}>{o}</button>
        </div>
      )}
      <br/>
      <button onClick={()=>setCurrent(Math.max(0,current-1))}>Previous</button>
      <button onClick={()=>setCurrent(Math.min(questions.length-1,current+1))}>Next</button>
    </div>
  )
}
