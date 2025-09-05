
import React from 'react';

interface LineSelectorProps {
  onSelectLine: (line: 1 | 2) => void;
  appMode: 'reports' | 'scheduler' | null;
}

const LineSelector: React.FC<LineSelectorProps> = ({ onSelectLine, appMode }) => {
  const title = appMode === 'reports' ? 'Rapoarte de Constatare' : 'Programare Mentenanță';
  const subTitle = appMode === 'reports' ? 'Sistem de inspecție și mentenanță' : 'Planificare bazată pe ore de funcționare';
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-white">
                <span className="text-sky-400">Eco Life Style</span> {title}
            </h1>
            <p className="text-slate-400 mt-2 text-lg">{subTitle}</p>
        </header>
        <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-slate-200 mb-6">Selectați Linia de Sortare</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                onClick={() => onSelectLine(1)}
                className="w-full text-xl font-bold bg-sky-600 hover:bg-sky-500 text-white py-6 rounded-lg transition-transform transform hover:scale-105"
                >
                Linia 1
                </button>
                <button
                onClick={() => onSelectLine(2)}
                className="w-full text-xl font-bold bg-teal-600 hover:bg-teal-500 text-white py-6 rounded-lg transition-transform transform hover:scale-105"
                >
                Linia 2
                </button>
            </div>
        </div>
        <footer className="text-slate-500 mt-12">
            <p>&copy; {new Date().getFullYear()} Corneliu Bogea &lt;1963&gt;. Toate drepturile rezervate.</p>
        </footer>
    </div>
  );
};

export default LineSelector;