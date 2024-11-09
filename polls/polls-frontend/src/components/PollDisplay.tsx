import { useEffect, useState } from "react";
import Button from "../common/Button";

interface Option {
  name: string;
  votes: number;
}

export interface Poll {
  name: string;
  options: Option[];
}

interface Props {
  poll: Poll;
}

function PollDisplay({ poll }: Props) {
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    updateTotalVotes();
  });

  const updateTotalVotes = () => {
    let total = 0;
    poll.options.map((option) => {
      total += option.votes;
    });
    setTotalVotes(total);
  };

  return (
    <article className="flex flex-col gap-2 border-2 rounded-md p-4">
      <section className="flex justify-between">
        <h3 className="font-bold text-lg">{poll.name}</h3>
        <Button type="button">Vote</Button>
      </section>
      {poll.options.map((option) => (
        <div className="flex justify-between">
          <p>{option.name}</p>
          <p>{option.votes}</p>
        </div>
      ))}
      <p>Total votes: {totalVotes}</p>
    </article>
  );
}

export default PollDisplay;
