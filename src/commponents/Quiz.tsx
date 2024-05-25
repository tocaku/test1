import React, { useState } from "react";
import Timer from "./Timer";
import EndButton from "./EndButton";
import { Quiz as QuizType } from "./types";

interface QuizProps {
  quiz: QuizType;
}

const Quiz: React.FC<QuizProps> = ({ quiz }) => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const handleAnswerChange = (questionId: number, answerId: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  const handleTimeout = () => {
    setTimerExpired(true);
    handleSubmit();
  };

  const handleSubmit = () => {
    if (!timerExpired) {
      const newScore = quiz.questions.reduce((acc, question) => {
        const selectedAnswerId = answers[question.id];
        const selectedAnswer = question.answers.find(
          (answer) => answer.id === selectedAnswerId
        );
        if (selectedAnswer && selectedAnswer.isCorrect) {
          return acc + 1;
        }
        return acc;
      }, 0);

      setScore(newScore);
      setQuizCompleted(true);
    }
  };

  const handleFinishQuiz = () => {
    setTimerExpired(true);
    handleSubmit();
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">{quiz.title}</h3>
      {!quizCompleted && (
        <Timer durationInSeconds={60} onTimeout={handleTimeout} />
      )}
      {quiz.questions.map((question) => (
        <div key={question.id} className="mb-4">
          <p>{question.text}</p>
          {question.answers.map((answer) => (
            <label key={answer.id} className="block">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={answer.id}
                onChange={() => handleAnswerChange(question.id, answer.id)}
              />
              {answer.text}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Submit
      </button>
      {quizCompleted && (
        <p className="mt-4">Test Completed! Your score: {score}</p>
      )}
      {!quizCompleted && (
        <EndButton onClick={handleFinishQuiz} disabled={quizCompleted} />
      )}
    </div>
  );
};

export default Quiz;
