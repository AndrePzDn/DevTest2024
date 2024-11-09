import Header from "./common/Header"
import PollForm from "./components/FormAddPoll"
import PollsLayout from "./layouts/PollsLayout"

function App() {

  return (
    <main>
      <Header />
      <PollsLayout />
      <PollForm />
    </main>
  )
}

export default App
