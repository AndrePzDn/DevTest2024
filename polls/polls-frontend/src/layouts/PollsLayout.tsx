import axios from "axios";
import { useEffect, useState } from "react";
import PollDisplay from "../components/PollDisplay";
import Button from "../common/Button";
import PollForm from "../components/FormAddPoll";

function PollsLayout() {
  const [polls, setPolls] = useState([]);
  const [addPollsOpen, setAddPollsOpen] = useState(false);

  const fetchPolls = async () => {
    const res = await axios.get("http://localhost:3000/polls");
    const data = await res.data;
    setPolls(data);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <section className="flex flex-col w-3/5 justify-self-center">
      <section className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Poll List</h2>
        <Button type="button" onClick={() => setAddPollsOpen(true)}>
          Add New
        </Button>
      </section>
      <section className="flex flex-col gap-4">
        {polls.map((poll, index) => (
          <PollDisplay poll={poll} key={index} />
        ))}
      </section>
      <PollForm isOpen={addPollsOpen} setIsOpen={setAddPollsOpen} fetchData={fetchPolls} />
    </section>
  );
}

export default PollsLayout;
