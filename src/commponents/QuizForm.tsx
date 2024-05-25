import React, { useState } from "react";
import { Quiz as QuizType, Question } from "./types";

interface QuizFormProps {
  onSave: (quiz: QuizType) => void;
  quiz?: QuizType | null;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSave, quiz }) => {
  const [title, setTitle] = useState(quiz ? quiz.title : "");
  const [questions, setQuestions] = useState<Question[]>(
    quiz ? quiz.questions : []
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleQuestionPointsChange = (index: number, value: number) => {
    const newQuestions = [...questions];
    newQuestions[index].points = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: "", answers: [], points: 0 }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({
      id: Date.now(),
      text: "",
      isCorrect: false,
    });
    setQuestions(newQuestions);
  };

  const handleRemoveAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.forEach((answer, idx) => {
      answer.isCorrect = idx === answerIndex;
    });
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    const newQuiz: QuizType = {
      id: quiz ? quiz.id : Date.now(),
      title,
      questions,
    };
    onSave(newQuiz);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">Quiz Title</label>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={handleTitleChange}
        className="border p-2 mb-4 w-full"
      />
      {questions.map((question, qIndex) => (
        <div key={question.id} className="mb-4">
          <label className="block mb-2 font-bold">
            Question {qIndex + 1}
          </label>
          <input
            type="text"
            placeholder="Question"
            value={question.text}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <label className="block mb-2">Points</label>
          <input
            type="number"
            placeholder="Points"
            value={question.points}
            onChange={(e) => handleQuestionPointsChange(qIndex, Number(e.target.value))}
            className="border p-2 mb-2 w-full"
          />
          {question.answers.map((answer, aIndex) => (
            <div key={answer.id} className="flex items-center mb-2">
              <input
                type="text"
                placeholder="Answer"
                value={answer.text}
                onChange={(e) =>
                  handleAnswerChange(qIndex, aIndex, e.target.value)
                }
                className="border p-2 w-full mr-2"
              />
              <input
                type="radio"
                name={`correct-${qIndex}`}
                checked={answer.isCorrect}
                onChange={() => handleCorrectAnswerChange(qIndex, aIndex)}
              />
              <button
                onClick={() => handleRemoveAnswer(qIndex, aIndex)}
                className="bg-red-500 text-white px-2 py-1 ml-2"
              >
                Remove Answer
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddAnswer(qIndex)}
            className="bg-blue-500 text-white px-4 py-2 mr-2"
          >
            Add Answer
          </button>
          <button
            onClick={() => handleRemoveQuestion(qIndex)}
            className="bg-red-500 font-bold text-white px-4 py-2"
          >
            Remove Question
          </button>
        </div>
      ))}
      <button
        onClick={handleAddQuestion}
        className="bg-green-500 font-bold text-white px-4 py-2 mt-4"
      >
        Add Question
      </button>
      <button
        onClick={handleSave}
        className="bg-green-500 font-bold text-white px-4 py-2 mt-4 ml-4"
      >
        Save Quiz
      </button>
    </div>
  );
};

export default QuizForm;
