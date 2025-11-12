import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  RefreshCw
} from 'lucide-react';
import Footer from '@/components/ui/Footer';
import { supabase, signOut, type LeaderboardEntry } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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

type GameState = 'quiz' | 'results' | 'leaderboard';

const Quiz = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [endTime, setEndTime] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'all'>('all');
  const [loading, setLoading] = useState(false);

  const score = answers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
  const timeTaken = Math.floor((endTime - startTime) / 1000);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchLeaderboard();
    }
  }, [timeFilter, user]);

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
    } finally {
      setLoading(false);
    }
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
    const endT = Date.now();
    setEndTime(endT);
    setGameState('results');

    const finalScore = finalAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
    const finalTime = Math.floor((endT - startTime) / 1000);

    if (!user) return;

    try {
      const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous';
      
      const { error } = await supabase.from('leaderboard').insert([
        {
          user_id: user.id,
          username: username,
          score: finalScore,
          total_questions: questions.length,
          time_taken: finalTime
        }
      ]);

      if (error) throw error;

      toast({
        title: "Score Submitted! 🎉",
        description: `Great job!`,
      });
      
      fetchLeaderboard();
    } catch (error) {
      console.error('Error submitting score:', error);
      toast({
        title: "Submission Error",
        description: "Could not submit score to leaderboard",
        variant: "destructive"
      });
    }
  };

  const resetQuiz = () => {
    setGameState('quiz');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(new Array(questions.length).fill(null));
    setShowExplanation(false);
    setStartTime(Date.now());
    setEndTime(0);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="starfield" />
        <div className="relative z-10">
          <RefreshCw className="animate-spin mx-auto text-blue-400 mb-4" size={48} />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  // Quiz Screen
  if (gameState === 'quiz') {
    const question = questions[currentQuestion];
    const isAnswered = selectedAnswer !== null;
    const isCorrect = selectedAnswer === question.correctAnswer;

    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="starfield" />
        
        <div className="relative z-10 container mx-auto px-4 py-6 max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft size={20} />
              Home
            </Link>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="border-gray-700 hover:bg-gray-800"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {formatTime(Math.floor((Date.now() - startTime) / 1000))}
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <Card className="bg-gray-900/50 border-gray-700 p-6 mb-4">
            <h2 className="text-xl font-bold mb-6">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                
                let className = "w-full text-left p-4 rounded-lg border-2 transition-all ";
                
                if (!showExplanation) {
                  className += isSelected
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600";
                } else {
                  if (isCorrectAnswer) {
                    className += "border-green-500 bg-green-500/10";
                  } else if (isSelected && !isCorrect) {
                    className += "border-red-500 bg-red-500/10";
                  } else {
                    className += "border-gray-700 bg-gray-800/50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswerSelect(index)}
                    className={className}
                    disabled={showExplanation}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 text-left">{option}</span>
                      {showExplanation && isCorrectAnswer && (
                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                      )}
                      {showExplanation && isSelected && !isCorrect && (
                        <XCircle className="text-red-500 flex-shrink-0" size={20} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-200">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            )}
          </Card>

          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
            >
              Previous
            </Button>

            {!showExplanation ? (
              <Button
                onClick={() => selectedAnswer !== null && setShowExplanation(true)}
                disabled={selectedAnswer === null}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Results Screen
  if (gameState === 'results') {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="starfield" />
        
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center mb-8">
            <Trophy size={64} className="mx-auto text-yellow-400 mb-4" />
            <h1 className="text-4xl font-bold mb-2 gradient-text">Quiz Complete!</h1>
          </div>

          <Card className="bg-gray-900/50 border-gray-700 p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-blue-400 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-2xl text-gray-400">{percentage}%</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/30 p-4 rounded-lg text-center">
                <Clock size={20} className="mx-auto text-blue-400 mb-2" />
                <p className="text-xl font-bold">{formatTime(timeTaken)}</p>
                <p className="text-sm text-gray-400">Time</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg text-center">
                <Trophy size={20} className="mx-auto text-yellow-400 mb-2" />
                <p className="text-xl font-bold">{percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good!' : 'Keep Learning!'}</p>
                <p className="text-sm text-gray-400">Grade</p>
              </div>
            </div>

            <div className="space-y-3">
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
                className="w-full border-gray-700 hover:bg-gray-800"
              >
                <RefreshCw className="mr-2" />
                Try Again
              </Button>
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
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors">
          <ArrowLeft size={20} />
          Home
        </Link>

        <div className="text-center mb-8">
          <Trophy size={64} className="mx-auto text-yellow-400 mb-4" />
          <h1 className="text-4xl font-bold mb-2 gradient-text">Leaderboard</h1>
          <p className="text-gray-300">Top Quantum Champions</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 justify-center">
          <Button
            onClick={() => setTimeFilter('today')}
            variant={timeFilter === 'today' ? 'default' : 'outline'}
            size="sm"
            className={timeFilter === 'today' ? 'bg-blue-600' : 'border-gray-700'}
          >
            Today
          </Button>
          <Button
            onClick={() => setTimeFilter('week')}
            variant={timeFilter === 'week' ? 'default' : 'outline'}
            size="sm"
            className={timeFilter === 'week' ? 'bg-blue-600' : 'border-gray-700'}
          >
            Week
          </Button>
          <Button
            onClick={() => setTimeFilter('all')}
            variant={timeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            className={timeFilter === 'all' ? 'bg-blue-600' : 'border-gray-700'}
          >
            All Time
          </Button>
        </div>

        <Card className="bg-gray-900/50 border-gray-700 p-6 mb-6">
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="animate-spin mx-auto text-blue-400 mb-4" size={40} />
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No scores yet. Be the first!
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-lg flex items-center gap-4 ${
                    index < 3 ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20' : 'bg-black/20'
                  }`}
                >
                  <div className="text-xl font-bold w-10 text-center">
                    {getRankEmoji(index)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{entry.username}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(entry.created_at!).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-400">
                      {entry.score}/{entry.total_questions}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-1 justify-end">
                      <Clock size={12} />
                      {formatTime(entry.time_taken)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={resetQuiz}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
          >
            Take Quiz Again
          </Button>
          <Button
            onClick={fetchLeaderboard}
            variant="outline"
            className="border-gray-700 hover:bg-gray-800"
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
