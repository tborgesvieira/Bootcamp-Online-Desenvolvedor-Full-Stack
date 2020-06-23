import React, { useEffect, useState } from 'react';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Candidates from './components/Candidates';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [previousVotes, setPreviousVotes] = useState([]);
  const [previousPercentages, setPreviousPercentages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const previousVotesObject = candidates.map(({ id, votes }) => {
            return { id, votes };
          });

          const previousPercentagesObject = candidates.map(({ id, percentage }) => {
            return { id, percentage };
          });

          setCandidates(json.candidates);

          setPreviousVotes(previousVotesObject);

          setPreviousPercentages(previousPercentagesObject);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [candidates])

  if (candidates.length === 0) {
    return <Spinner description="Carregando..." />
  }

  return (
    <div className="container">
      <Header>Votação</Header>
      <Candidates
        previousVotes={previousVotes}
        previousPercentages={previousPercentages}
        candidates={candidates} />
    </div>
  );
}
