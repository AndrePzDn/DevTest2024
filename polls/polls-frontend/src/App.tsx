import PollForm from "./common/Form"
import Header from "./common/Header"
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
