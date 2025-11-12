import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Award,
  Target,
  Zap,
  RefreshCw
} from 'lucide-react';
import Footer from '@/components/ui/Footer';
import { supabase, canSubmitScore, updateLastSubmission, type LeaderboardEntry } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does BB84 stand for?",
    options: [
      "Bennett-Brassard 1984",
      "Binary-Basis 84-bit",
      "Bit-By-Bit 84-protocol",
      "Bilateral-Basis 84-quantum"
    ],
    correctAnswer: 0,
    explanation: "BB84 is named after its inventors Charles Bennett and Gilles Brassard, who proposed it in 1984."
  },
  {
    id: 2,
    question: "How many polarization states are used in BB84?",
    options: ["2 states", "3 states", "4 states", "8 states"],
    correctAnswer: 2,
    explanation: "BB84 uses 4 polarization states: Vertical (|), Horizontal (—), Diagonal (/), and Anti-diagonal (\\)."
  },
  {
    id: 3,
    question: "What happens when Alice and Bob use different bases to measure the same photon?",
    options: [
      "They keep the bit",
      "They discard the bit",
      "They get an error",
      "The photon is destroyed"
    ],
    correctAnswer: 1,
    explanation: "When bases don't match, the measurement is random, so they discard that bit during basis reconciliation."
  },
  {
    id: 4,
    question: "What is the main advantage of quantum cryptography over classical encryption?",
    options: [
      "It's faster",
      "It uses less power",
      "Eavesdropping is detectable",
      "It requires less bandwidth"
    ],
    correctAnswer: 2,
    explanation: "The main advantage is that any eavesdropping attempt disturbs the quantum states, making it detectable."
  },
  {
    id: 5,
    question: "What are the two measurement bases used in BB84?",
    options: [
      "Linear and Circular",
      "Rectilinear (+) and Diagonal (×)",
      "Horizontal and Vertical",
      "Clockwise and Counter-clockwise"
    ],
    correctAnswer: 1,
    explanation: "BB84 uses Rectilinear (+) basis for |/— and Diagonal (×) basis for /\\  polarizations."
  },
  {
    id: 6,
    question: "If Eve intercepts and measures a photon, what happens?",
    options: [
      "Nothing, she can copy it",
      "The photon disappears",
      "She disturbs its state",
      "Alice is immediately alerted"
    ],
    correctAnswer: 2,
    explanation: "Due to quantum mechanics, Eve's measurement disturbs the photon's state, introducing errors that can be detected."
  },
  {
    id: 7,
    question: "What is QBER?",
    options: [
      "Quantum Bit Encryption Rate",
      "Quantum Basis Error Ratio",
      "Quantum Bit Error Rate",
      "Quantum Binary Encoding Rule"
    ],
    correctAnswer: 2,
    explanation: "QBER (Quantum Bit Error Rate) measures the percentage of errors in the key, indicating potential eavesdropping."
  },
  {
    id: 8,
    question: "What is the typical threshold QBER for detecting eavesdropping in BB84?",
    options: ["5%", "11%", "25%", "50%"],
    correctAnswer: 2,
    explanation: "A QBER above ~11-25% typically indicates eavesdropping, though the exact threshold depends on the protocol variant."
  },
  {
    id: 9,
    question: "What quantum principle prevents copying of quantum states?",
    options: [
      "Heisenberg Uncertainty Principle",
      "No-Cloning Theorem",
      "Pauli Exclusion Principle",
      "Wave-Particle Duality"
    ],
    correctAnswer: 1,
    explanation: "The No-Cloning Theorem states that it's impossible to create an identical copy of an arbitrary unknown quantum state."
  },
  {
    id: 10,
    question: "In our simulation, what color indicates matching bases?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctAnswer: 1,
    explanation: "Green photons indicate that Alice and Bob used the same basis, so the bit is kept for the secret key."
  },
  {
    id: 11,
    question: "What does Alice do first in the BB84 protocol?",
    options: [
      "She measures photons",
      "She generates random bits",
      "She announces her bases",
      "She checks for errors"
    ],
    correctAnswer: 1,
    explanation: "Alice starts by generating random bits that she wants to send as the secret key."
  },
  {
    id: 12,
    question: "When do Alice and Bob publicly compare their measurement bases?",
    options: [
      "Before sending photons",
      "While sending photons",
      "After Bob receives all photons",
      "Never, it's kept secret"
    ],
    correctAnswer: 2,
    explanation: "They compare bases AFTER Bob has received and measured all photons, keeping only matching basis results."
  },
  {
    id: 13,
    question: "What happens to photons where bases matched?",
    options: [
      "They're discarded",
      "They become the secret key",
      "They're sent again",
      "They're used to check for errors"
    ],
    correctAnswer: 1,
    explanation: "Photons measured with matching bases have reliable bit values and form the secret key."
  },
  {
    id: 14,
    question: "If we send 32 photons and bases match 50% of the time, how many key bits do we get?",
    options: ["8 bits", "16 bits", "24 bits", "32 bits"],
    correctAnswer: 1,
    explanation: "On average, bases match ~50% of the time, so 32 × 0.5 = 16 bits for the secret key."
  },
  {
    id: 15,
    question: "What makes BB84 'future-proof' against quantum computers?",
    options: [
      "It uses quantum-resistant algorithms",
      "It's based on physics, not math",
      "It uses longer keys",
      "It updates automatically"
    ],
    correctAnswer: 1,
    explanation: "BB84's security is based on the laws of quantum physics, not computational complexity, so quantum computers can't break it."
  }
];

type GameState = 'username' | 'quiz' | 'results' | 'leaderboard';

const Quiz = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>('username');
  const [username, setUsername] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'all'>('all');
  const [loading, setLoading] = useState(false);

  const score = answers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
  const timeTaken = Math.floor((endTime - startTime) / 1000);

  useEffect(() => {
    fetchLeaderboard();
  }, [timeFilter]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .order('time_taken', { ascending: true })
        .limit(10);

      if (timeFilter === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query = query.gte('created_at', today.toISOString());
      } else if (timeFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte('created_at', weekAgo.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast({
        title: "Error",
        description: "Failed to load leaderboard",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    if (username.trim().length < 2) {
      toast({
        title: "Invalid Username",
        description: "Username must be at least 2 characters",
        variant: "destructive"
      });
      return;
    }
    setStartTime(Date.now());
    setGameState('quiz');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Select an answer",
        description: "Please select an answer before continuing",
        variant: "destructive"
      });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowExplanation(false);
    } else {
      submitResults(newAnswers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowExplanation(false);
    }
  };

  const submitResults = async (finalAnswers: (number | null)[]) => {
    setEndTime(Date.now());
    setGameState('results');

    const finalScore = finalAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
    const finalTime = Math.floor((Date.now() - startTime) / 1000);

    // Check rate limiting
    if (!canSubmitScore()) {
      toast({
        title: "Please wait",
        description: "You can submit again in 30 seconds",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.from('leaderboard').insert([
        {
          username: username.trim(),
          score: finalScore,
          total_questions: questions.length,
          time_taken: finalTime
        }
      ]);

      if (error) throw error;

      updateLastSubmission();
      toast({
        title: "Score Submitted! 🎉",
        description: `Great job, ${username}!`,
      });
      
      fetchLeaderboard();
    } catch (error) {
      console.error('Error submitting score:', error);
      toast({
        title: "Submission Error",
        description: "Score saved locally but not submitted to leaderboard",
        variant: "destructive"
      });
    }
  };

  const resetQuiz = () => {
    setGameState('username');
    setUsername('');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(new Array(questions.length).fill(null));
    setShowExplanation(false);
    setStartTime(0);
    setEndTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  // Username Screen
  if (gameState === 'username') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="starfield" />
        
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full">
              <span className="text-purple-400 text-sm font-medium">🎯 Test Your Knowledge</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
              Quantum Quiz Challenge
            </h1>
            <p className="text-xl text-gray-300">
              Think you understand BB84? Prove it!
            </p>
          </div>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-8">
            <div className="text-center mb-8">
              <Trophy size={64} className="mx-auto text-yellow-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Enter Your Name</h2>
              <p className="text-gray-400">Compete on the global leaderboard!</p>
            </div>

            <Input
              type="text"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
              className="mb-6 bg-black/30 border-purple-500/50 text-white text-lg p-6 text-center"
              maxLength={20}
            />

            <Button
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-lg py-6"
            >
              <Star className="mr-2" />
              Start Quiz
            </Button>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-black/30 p-4 rounded-lg">
                <Target size={24} className="mx-auto text-blue-400 mb-2" />
                <p className="text-2xl font-bold">{questions.length}</p>
                <p className="text-sm text-gray-400">Questions</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <Zap size={24} className="mx-auto text-yellow-400 mb-2" />
                <p className="text-2xl font-bold">~5min</p>
                <p className="text-sm text-gray-400">Duration</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                <Award size={24} className="mx-auto text-purple-400 mb-2" />
                <p className="text-2xl font-bold">Global</p>
                <p className="text-sm text-gray-400">Ranking</p>
              </div>
            </div>

            <Button
              onClick={() => setGameState('leaderboard')}
              variant="outline"
              className="w-full mt-6 border-purple-500/50 hover:bg-purple-500/10"
            >
              <Trophy className="mr-2" size={18} />
              View Leaderboard
            </Button>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  // Quiz Screen
  if (gameState === 'quiz') {
    const question = questions[currentQuestion];
    const isAnswered = selectedAnswer !== null;
    const isCorrect = selectedAnswer === question.correctAnswer;

    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="starfield" />
        
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <Clock size={16} />
                {formatTime(Math.floor((Date.now() - startTime) / 1000))}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-8 mb-6">
            <h2 className="text-2xl font-bold mb-8">{question.question}</h2>

            <div className="space-y-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                
                let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
                
                if (!showExplanation) {
                  buttonClass += isSelected
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-gray-700 bg-gray-800/50 hover:border-purple-500/50";
                } else {
                  if (isCorrectAnswer) {
                    buttonClass += "border-green-500 bg-green-500/20";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "border-red-500 bg-red-500/20";
                  } else {
                    buttonClass += "border-gray-700 bg-gray-800/50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showExplanation}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {showExplanation && isCorrectAnswer && (
                        <CheckCircle className="text-green-500" size={24} />
                      )}
                      {showExplanation && isSelected && !isCorrect && (
                        <XCircle className="text-red-500" size={24} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-300">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            )}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex-1 border-purple-500/50 hover:bg-purple-500/10"
            >
              Previous
            </Button>

            {!showExplanation ? (
              <Button
                onClick={() => {
                  if (selectedAnswer !== null) {
                    setShowExplanation(true);
                  }
                }}
                disabled={selectedAnswer === null}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            )}
          </div>

          {/* Question Navigator */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentQuestion(idx);
                  setSelectedAnswer(answers[idx]);
                  setShowExplanation(false);
                }}
                className={`w-10 h-10 rounded-full font-bold transition-all ${
                  idx === currentQuestion
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                    : answers[idx] !== null
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Results Screen
  if (gameState === 'results') {
    const percentage = Math.round((score / questions.length) * 100);
    let grade = '';
    let gradeColor = '';
    
    if (percentage >= 90) {
      grade = 'Quantum Master! 🏆';
      gradeColor = 'text-yellow-400';
    } else if (percentage >= 75) {
      grade = 'Excellent! 🌟';
      gradeColor = 'text-green-400';
    } else if (percentage >= 60) {
      grade = 'Good Job! 👍';
      gradeColor = 'text-blue-400';
    } else if (percentage >= 40) {
      grade = 'Keep Learning! 📚';
      gradeColor = 'text-orange-400';
    } else {
      grade = 'Review Theory! 🔄';
      gradeColor = 'text-red-400';
    }

    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="starfield" />
        
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-12">
            <Trophy size={80} className="mx-auto text-yellow-400 mb-4 animate-pulse" />
            <h1 className="text-5xl font-bold mb-4 gradient-text">Quiz Complete!</h1>
            <p className="text-xl text-gray-300">Great effort, {username}!</p>
          </div>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-8 mb-6">
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-2 ${gradeColor}`}>
                {score}/{questions.length}
              </div>
              <div className="text-3xl font-bold mb-4">{percentage}%</div>
              <div className={`text-2xl ${gradeColor}`}>{grade}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/30 p-4 rounded-lg text-center">
                <Clock size={24} className="mx-auto text-blue-400 mb-2" />
                <p className="text-2xl font-bold">{formatTime(timeTaken)}</p>
                <p className="text-sm text-gray-400">Time Taken</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg text-center">
                <Target size={24} className="mx-auto text-green-400 mb-2" />
                <p className="text-2xl font-bold">{Math.round((score / timeTaken) * 60)}%</p>
                <p className="text-sm text-gray-400">Accuracy/Min</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => setGameState('leaderboard')}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500"
              >
                <Trophy className="mr-2" />
                View Leaderboard
              </Button>
              <Button
                onClick={resetQuiz}
                variant="outline"
                className="w-full border-purple-500/50 hover:bg-purple-500/10"
              >
                <RefreshCw className="mr-2" />
                Try Again
              </Button>
              <Link to="/theory" className="block">
                <Button
                  variant="outline"
                  className="w-full border-blue-500/50 hover:bg-blue-500/10"
                >
                  <ArrowLeft className="mr-2" />
                  Review Theory
                </Button>
              </Link>
            </div>
          </Card>

          {/* Answer Review */}
          <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 p-8">
            <h2 className="text-2xl font-bold mb-6">Answer Review</h2>
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === q.correctAnswer;
                
                return (
                  <div key={q.id} className="p-4 bg-black/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                      ) : (
                        <XCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                      )}
                      <div className="flex-1">
                        <p className="font-bold mb-2">{idx + 1}. {q.question}</p>
                        <p className="text-sm text-gray-400">
                          Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                            {userAnswer !== null ? q.options[userAnswer] : 'Not answered'}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-400 mt-1">
                            Correct answer: {q.options[q.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  // Leaderboard Screen
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="starfield" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <Trophy size={80} className="mx-auto text-yellow-400 mb-4" />
          <h1 className="text-5xl font-bold mb-4 gradient-text">Global Leaderboard</h1>
          <p className="text-xl text-gray-300">Top Quantum Quiz Champions</p>
        </div>

        {/* Time Filter */}
        <div className="flex gap-2 mb-6 justify-center">
          <Button
            onClick={() => setTimeFilter('today')}
            variant={timeFilter === 'today' ? 'default' : 'outline'}
            className={timeFilter === 'today' ? 'bg-purple-600' : 'border-purple-500/50'}
          >
            Today
          </Button>
          <Button
            onClick={() => setTimeFilter('week')}
            variant={timeFilter === 'week' ? 'default' : 'outline'}
            className={timeFilter === 'week' ? 'bg-purple-600' : 'border-purple-500/50'}
          >
            This Week
          </Button>
          <Button
            onClick={() => setTimeFilter('all')}
            variant={timeFilter === 'all' ? 'default' : 'outline'}
            className={timeFilter === 'all' ? 'bg-purple-600' : 'border-purple-500/50'}
          >
            All Time
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-8 mb-6">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="animate-spin mx-auto text-purple-400 mb-4" size={48} />
              <p className="text-gray-400">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400">No scores yet. Be the first!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-lg flex items-center gap-4 transition-all ${
                    index < 3
                      ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30'
                      : 'bg-black/30'
                  }`}
                >
                  <div className="text-2xl font-bold w-12 text-center">
                    {getRankEmoji(index)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{entry.username}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(entry.created_at!).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-400">
                      {entry.score}/{entry.total_questions}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-1 justify-end">
                      <Clock size={14} />
                      {formatTime(entry.time_taken)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={resetQuiz}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
          >
            <Star className="mr-2" />
            Take Quiz
          </Button>
          <Button
            onClick={fetchLeaderboard}
            variant="outline"
            className="border-purple-500/50 hover:bg-purple-500/10"
          >
            <RefreshCw size={18} />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Quiz;
