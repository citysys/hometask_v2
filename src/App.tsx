import Signup from "./view/pages/Signup/Signup";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Signup />
      </div>
    </QueryClientProvider>
  );
}

export default App;
