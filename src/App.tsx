import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import SignUp from './view/pages/SignUp';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <SignUp />
  </QueryClientProvider>
);

export default App;