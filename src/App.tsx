import React from "react";
import QuizList from "./commponents/QuizList";
const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
<h1 className="text-4xl font-bold mb-8 text-center text-indigo-800 ">React Questions</h1>
      <QuizList />
    </div>
  );
};

export default App;
