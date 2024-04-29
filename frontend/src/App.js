import './App.css';
import Navbar from './Components/Navbar/Navbar';
import './Global.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Wishlist from './Pages/Wishlist';
import Profile from './Pages/Profile';
import Footer from './Components/Footer/Footer';
import PLP from './Pages/PLP';
import PDP from './Pages/PDP';
import ScrollImage from '../src/Assets/Images/scrolltop-btn.png';
import './common.css';

function App() {

  const handleScrollPage = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional, smooth scrolling animation
    });
  }

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <div className='app-main-container'>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/men' element={<PLP category='Men' />} />
            <Route path='/women' element={<PLP category='Women' />} />
            <Route path='/kids' element={<PLP category='Kids' />} />
            <Route path='/product' element={<PDP />}>
              <Route path=':productID' element={<PDP />}/>
            </Route>
          </Routes>
      </div>
      <div className='scrolltop-container' onClick={handleScrollPage}><img src={ScrollImage} alt="scrollTo" /></div>
      <Footer />

    </div>
    </BrowserRouter>
  );
}

export default App;
