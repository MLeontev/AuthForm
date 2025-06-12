import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import LoginForm from './components/LoginForm/LoginForm.tsx';
import Snowflakes from './components/Snowflakes/Snowflakes.tsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <LoginForm />
      </main>
      <Footer />
      <Snowflakes />
    </>
  );
}

export default App;
