import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={
                <div>
                  <Home />
                </div>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
