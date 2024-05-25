import React, { useState } from "react";
import QuizForm from "./QuizForm";
import Quiz from "./Quiz";
import { Quiz as QuizType } from "./types";

const initialQuizzes: QuizType[] = [
  {
    id: 1,
    title: "Sample questions",
    questions: [
      {
        id: 1,
        text: "What is 2 + 2?",
        answers: [
          { id: 1, text: "3", isCorrect: false },
          { id: 2, text: "4", isCorrect: true },
          { id: 3, text: "5", isCorrect: false },
        ],
        points: 1, // Баллы за вопрос
      },
    ],
  },
];

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizType[]>(initialQuizzes);
  const [currentQuizId, setCurrentQuizId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editQuiz, setEditQuiz] = useState<QuizType | null>(null);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const handleAddQuiz = () => {
    const newQuiz: QuizType = {
      id: quizzes.length + 1,
      title: `Тест ${quizzes.length + 1}`,
      questions: [],
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const handleEditQuiz = (quiz: QuizType) => {
    setEditQuiz(quiz);
    setIsEditing(true);
  };

  const handleDeleteQuiz = (id: number) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  const handleSaveQuiz = (quiz: QuizType) => {
    setQuizzes(quizzes.map((q) => (q.id === quiz.id ? quiz : q)));
    setIsEditing(false);
    setEditQuiz(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-purple-800 ">Questions</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="mb-2">
            <button
              onClick={() => {
                setCurrentQuizId(quiz.id);
                setButtonsVisible(false);
              }}
              className="text-blue-500 mr-2"
            >
              {quiz.title}
            </button>
            {buttonsVisible && (
              <>
                <button
                  onClick={() => handleEditQuiz(quiz)}
                  className="text-green-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteQuiz(quiz.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {buttonsVisible && (
        <button
          onClick={handleAddQuiz}
          className="btn-new bg-blue-600 hover:bg-blue-700 text-white rounded-3xl transition duration-200 linear px-4 py-2"
        >
          Add a test
        </button>
      )}
      {isEditing && editQuiz && (
        <QuizForm quiz={editQuiz} onSave={handleSaveQuiz} />
      )}
      {currentQuizId !== null && (
        <Quiz quiz={quizzes.find((quiz) => quiz.id === currentQuizId)!} />
      )}
    </div>
  );
};

export default QuizList;
