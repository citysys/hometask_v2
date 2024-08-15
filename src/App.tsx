import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Signup} from './view/pages/Signup'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <main className="main-container">
          <Signup />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
