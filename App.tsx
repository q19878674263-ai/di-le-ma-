
import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { CollageCard } from './components/CollageCard';
import { Page, QuizQuestion, Tab, HorseResult, Post } from './types';
import { QUIZ_QUESTIONS, HORSE_RESULTS, MOCK_POSTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('QUIZ');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [resultHorse, setResultHorse] = useState<HorseResult | null>(null);
  const [currentTab, setCurrentTab] = useState<Tab>('破口大马');
  const [waitingFrame, setWaitingFrame] = useState(0);
  
  // Custom images state: mapping horse result ID to a data URL
  const [customHorseImages, setCustomHorseImages] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHome = () => {
    setCurrentPage('QUIZ');
    setCurrentQIndex(0);
    setAnswers([]);
    setResultHorse(null);
  };

  const handleBack = () => {
    if (currentPage === 'SQUARE') {
      setCurrentPage('RESULT');
    } else if (currentPage === 'RESULT') {
      handleHome();
    } else if (currentPage === 'WAITING') {
      setCurrentPage('QUIZ');
    } else if (currentPage === 'QUIZ') {
      if (currentQIndex > 0) {
        setCurrentQIndex(prev => prev - 1);
        setAnswers(prev => prev.slice(0, -1));
      }
    }
  };

  const calculateResult = (ans: boolean[]) => {
    const allYes = ans.every(v => v === true);
    const allNo = ans.every(v => v === false);
    const onlyQ1Q4Yes = ans[0] && ans[3] && !ans[1] && !ans[2] && !ans[4];
    const onlyQ2Q3No = !ans[1] && !ans[2] && ans[0] && ans[3] && ans[4];
    const onlyQ4No = !ans[3] && ans[0] && ans[1] && ans[2] && ans[4];
    const mostYesButQ5No = ans.filter(v => v).length >= 3 && !ans[4];
    const Q2Q3Q5Yes = ans[1] && ans[2] && ans[4];

    if (allYes) return HORSE_RESULTS['旋转木马'];
    if (allNo) return HORSE_RESULTS['收款马'];
    if (onlyQ1Q4Yes) return HORSE_RESULTS['马屁'];
    if (onlyQ2Q3No) return HORSE_RESULTS['哈吉马'];
    if (onlyQ4No) return HORSE_RESULTS['踏马'];
    if (mostYesButQ5No) return HORSE_RESULTS['黄阿马'];
    if (Q2Q3Q5Yes) return HORSE_RESULTS['骡马'];
    return HORSE_RESULTS['班马'];
  };

  const handleQuizChoice = (choice: boolean) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setCurrentPage('WAITING');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && resultHorse) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomHorseImages(prev => ({
          ...prev,
          [resultHorse.id]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (currentPage === 'WAITING') {
      const interval = setInterval(() => {
        setWaitingFrame(prev => (prev + 1) % 8);
      }, 150);
      const timer = setTimeout(() => {
        setResultHorse(calculateResult(answers));
        setCurrentPage('RESULT');
        clearInterval(interval);
      }, 2500);
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [currentPage, answers]);

  const renderQuiz = () => {
    const q = QUIZ_QUESTIONS[currentQIndex];
    return (
      <div className="flex flex-col h-[70vh] justify-center items-center relative select-none">
        <div className="text-center mb-8 w-full">
          <span className="font-palace text-[#F5E8C7] text-2xl bg-[#A72B2B] px-6 py-2 rounded-full shadow-lg border-2 border-[#F5E8C7]/20">
            第 {currentQIndex + 1} 题
          </span>
        </div>

        <CollageCard className="w-full max-w-[420px] min-h-[420px] flex flex-col justify-between items-center text-center py-12 px-8">
          <div className="space-y-6">
            <h2 className="text-[#1A2F1A] text-2xl font-bold font-quirky leading-loose">{q.text}</h2>
            <p className="text-[#1A2F1A]/60 italic text-sm font-medium">{q.hint}</p>
          </div>
          
          <div className="flex w-full justify-around items-center mb-8">
            <button 
              onClick={() => handleQuizChoice(false)}
              className="group flex flex-col items-center space-y-3 transform hover:scale-105 active:scale-95 transition-all"
            >
              <div className="w-20 h-20 rounded-full bg-[#1A2F1A] text-[#F5E8C7] flex items-center justify-center text-2xl font-palace font-bold collage-border">非也</div>
              <span className="text-[#1A2F1A]/40 font-bold text-xs uppercase tracking-widest">NO</span>
            </button>
            <button 
              onClick={() => handleQuizChoice(true)}
              className="group flex flex-col items-center space-y-3 transform hover:scale-105 active:scale-95 transition-all"
            >
              <div className="w-20 h-20 rounded-full bg-[#A72B2B] text-white flex items-center justify-center text-3xl font-palace font-bold collage-border">是</div>
              <span className="text-[#1A2F1A]/40 font-bold text-xs uppercase tracking-widest">YES</span>
            </button>
          </div>

          <div className="absolute bottom-6 left-0 w-full text-center text-[#1A2F1A]/20 text-[10px] font-black uppercase tracking-[0.3em]">
            请翻牌择一而答
          </div>
        </CollageCard>
      </div>
    );
  };

  const renderWaiting = () => (
    <div className="flex flex-col items-center justify-center h-[70vh] space-y-12">
      <div className="relative w-48 h-48">
        <img 
          src={`https://picsum.photos/seed/wait${waitingFrame}/400/400`} 
          className="w-full h-full object-cover rounded-full border-8 border-[#F5E8C7] shadow-2xl grayscale contrast-125" 
          alt="waiting"
        />
        <div className="absolute -bottom-4 -right-4 bg-[#A72B2B] text-[#F5E8C7] px-4 py-2 rounded-lg font-palace rotate-12 shadow-lg">鉴定中...</div>
      </div>
      <div className="text-center space-y-2">
        <p className="font-palace text-4xl animate-pulse tracking-widest text-[#F5E8C7]">马蹄嘚嘚...</p>
        <p className="text-[#F5E8C7]/60">正在为你分封等级</p>
      </div>
    </div>
  );

  const renderResult = () => {
    const currentImageUrl = (resultHorse && customHorseImages[resultHorse.id]) || resultHorse?.image;
    
    return (
      <div className="flex flex-col h-full py-8 space-y-8 overflow-y-auto">
        <CollageCard className="min-h-[500px] flex flex-col items-center p-0">
          <div className="w-full aspect-square overflow-hidden relative border-b-4 border-[#A72B2B] group">
            <img src={currentImageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={resultHorse?.name} />
            
            {/* Status Labels */}
            <div className="absolute top-4 left-4 bg-[#A72B2B] text-[#F5E8C7] px-3 py-1 text-sm font-bold rounded-sm shadow-md z-20">封号：{resultHorse?.name}</div>
            
            {/* Edit/Upload Interaction Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-30">
               <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#F5E8C7] text-[#A72B2B] px-6 py-3 rounded-full font-palace text-xl font-bold shadow-xl border-2 border-[#A72B2B] transform hover:scale-110 transition-transform flex items-center space-x-2"
               >
                 <span>📷</span>
                 <span>上传真容</span>
               </button>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>

          <div className="p-8 space-y-6 text-center">
            <h2 className="text-4xl font-palace text-[#1A2F1A] border-b-2 border-[#1A2F1A]/10 pb-4">
              「{resultHorse?.name}」
            </h2>
            <p className="text-[#1A2F1A] font-quirky text-lg leading-relaxed px-4">
              {resultHorse?.description}
            </p>
            <div className="flex justify-center space-x-4 pt-4 pb-4">
              <button 
                onClick={() => setCurrentPage('SQUARE')}
                className="bg-[#1A2F1A] text-white px-10 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
              >
                起驾喂草广场
              </button>
            </div>
          </div>
        </CollageCard>
        
        <div className="flex flex-col items-center space-y-4 pb-12">
          <button 
            onClick={handleHome}
            className="text-[#F5E8C7]/40 text-sm font-bold underline"
          >
            不服判决？重新测验
          </button>
        </div>
      </div>
    );
  };

  const renderSquare = () => (
    <div className="flex flex-col h-full">
      <div className="flex justify-center space-x-8 mb-8 mt-4">
        {['破口大马', '电子草料'].map((t) => (
          <button
            key={t}
            onClick={() => setCurrentTab(t as Tab)}
            className={`relative px-4 py-2 font-palace text-2xl transition-all ${
              currentTab === t ? 'text-[#A72B2B] scale-110' : 'text-[#F5E8C7]/50'
            }`}
          >
            {t}
            {currentTab === t && (
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#A72B2B] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col space-y-6 pb-32">
        {MOCK_POSTS.filter(p => p.type === currentTab).map((post, idx) => (
          <CollageCard key={post.id} rotation={idx % 2 === 0 ? 0.4 : -0.4} className="min-h-[160px]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#A72B2B] rounded-full flex items-center justify-center text-xs text-white shadow-inner">🐎</div>
                <span className="font-palace text-xl text-[#1A2F1A]">{post.author}</span>
              </div>
              <span className="text-[#1A2F1A]/40 text-[10px] font-bold tracking-tighter uppercase">{post.timestamp}</span>
            </div>
            <p className="text-[#1A2F1A] text-xl font-quirky leading-relaxed mb-4">
              {post.content}
            </p>
          </CollageCard>
        ))}
      </div>
    </div>
  );

  return (
    <Layout onHome={handleHome} onBack={handleBack}>
      {currentPage === 'QUIZ' && renderQuiz()}
      {currentPage === 'WAITING' && renderWaiting()}
      {currentPage === 'RESULT' && renderResult()}
      {currentPage === 'SQUARE' && renderSquare()}
    </Layout>
  );
};

export default App;
