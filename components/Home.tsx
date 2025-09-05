import React from 'react';
import { EditIcon, CheckIcon, ArchiveIcon } from './icons'; 

interface HomeProps {
  onSelectMode: (mode: 'reports' | 'scheduler' | 'archive') => void;
}

const Home: React.FC<HomeProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-white">
                <span className="text-sky-400">Eco Life Style</span> Mentenanță
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Sistem de inspecție și programare</p>
        </header>
        <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-center text-slate-200 mb-6">Selectați Modul de Lucru</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => onSelectMode('reports')}
                    className="group flex flex-col items-center justify-center text-center p-6 bg-slate-700 hover:bg-sky-600 rounded-lg transition-all transform hover:scale-105"
                >
                    <EditIcon className="w-12 h-12 mb-4 text-sky-400 group-hover:text-white" />
                    <h3 className="text-xl font-bold text-white">Rapoarte de Constatare</h3>
                    <p className="text-slate-400 mt-1 text-sm">Înregistrați neconformități și mentenanță efectuată.</p>
                </button>
                <button
                    onClick={() => onSelectMode('scheduler')}
                    className="group flex flex-col items-center justify-center text-center p-6 bg-slate-700 hover:bg-teal-600 rounded-lg transition-all transform hover:scale-105"
                >
                    <CheckIcon className="w-12 h-12 mb-4 text-teal-400 group-hover:text-white" />
                    <h3 className="text-xl font-bold text-white">Programare Preventivă</h3>
                    <p className="text-slate-400 mt-1 text-sm">Calculați programul de mentenanță pe baza orelor de funcționare.</p>
                </button>
                 <button
                    onClick={() => onSelectMode('archive')}
                    className="group flex flex-col items-center justify-center text-center p-6 bg-slate-700 hover:bg-indigo-600 rounded-lg transition-all transform hover:scale-105"
                >
                    <ArchiveIcon className="w-12 h-12 mb-4 text-indigo-400 group-hover:text-white" />
                    <h3 className="text-xl font-bold text-white">Arhivă Ordine de Lucru</h3>
                    <p className="text-slate-400 mt-1 text-sm">Vizualizați ordinele de lucru interactive salvate.</p>
                </button>
            </div>
        </div>
        <footer className="text-slate-500 mt-12">
            <p>&copy; {new Date().getFullYear()} Corneliu Bogea &lt;1963&gt;. Toate drepturile rezervate.</p>
        </footer>
    </div>
  );
};

export default Home;