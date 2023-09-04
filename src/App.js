import { useContext } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

import styles from "./App.module.css";
import { LoadingContext } from "./context/LoadingProvider";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import AppRoute from "./routes/AppRoute";
import Motto from "./components/Motto/Motto";
import Loading from "./components/Loading/Loading";

function App() {
  const { isLoading } = useContext(LoadingContext);

  return (
    <>
      {
        <BrowserRouter basename="/space-travel">
          <div className={styles["app"]}>
            <header className={styles["app__header"]}>
              <NavigationBar />
            </header>

            <main className={styles["app__main"]}>
              <AppRoute />
            </main>

            <footer className={styles["app__footer"]}>
              <Motto />
            </footer>
          </div>
        </BrowserRouter>
      }

      {
        isLoading ? <Loading /> : null
      }
    </>
  );
}

export default App;
