import { useState } from 'react';
import SetupForm from './components/ticket-to-ride/SetupForm';
import WaveShell from './components/ticket-to-ride/WaveShell';
import Leaderboard from './components/ticket-to-ride/Leaderboard';
import { WAVES } from './ticket-to-ride/waves';
import { createInitialPlayerScore } from './ticket-to-ride/scoring';

function TicketToRide() {
  const [phase, setPhase] = useState('setup');
  const [currentWave, setCurrentWave] = useState(0);
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});
  const [longestRouteWinnerId, setLongestRouteWinnerId] = useState(null);

  function handleStart(newPlayers) {
    const initialScores = {};
    for (const p of newPlayers) {
      initialScores[p.id] = createInitialPlayerScore();
    }
    setPlayers(newPlayers);
    setScores(initialScores);
    setLongestRouteWinnerId(null);
    setCurrentWave(0);
    setPhase('scoring');
  }

  function handleReset() {
    setPhase('setup');
    setCurrentWave(0);
    setPlayers([]);
    setScores({});
    setLongestRouteWinnerId(null);
  }

  function updatePlayerScore(playerId, slice, value) {
    setScores(prev => ({
      ...prev,
      [playerId]: { ...prev[playerId], [slice]: value },
    }));
  }

  function handleNext() {
    if (currentWave < WAVES.length - 1) {
      setCurrentWave(currentWave + 1);
    } else {
      setPhase('summary');
    }
  }

  function handleBack() {
    if (currentWave > 0) setCurrentWave(currentWave - 1);
  }

  return (
    <div className="ticket-to-ride">
      {phase === 'setup' && <SetupForm onStart={handleStart} />}

      {phase === 'scoring' && (
        <WaveShell
          waveIndex={currentWave}
          waveCount={WAVES.length}
          waveLabel={WAVES[currentWave].label}
          onBack={currentWave > 0 ? handleBack : null}
          onNext={handleNext}
          isLast={currentWave === WAVES.length - 1}
        >
          {(() => {
            const ActiveWave = WAVES[currentWave].component;
            return (
              <ActiveWave
                players={players}
                scores={scores}
                updatePlayerScore={updatePlayerScore}
                longestRouteWinnerId={longestRouteWinnerId}
                setLongestRouteWinnerId={setLongestRouteWinnerId}
              />
            );
          })()}
        </WaveShell>
      )}

      {phase === 'summary' && (
        <Leaderboard
          players={players}
          scores={scores}
          longestRouteWinnerId={longestRouteWinnerId}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default TicketToRide;
