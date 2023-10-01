import './App.css';
import Loading from "./components/Loading/Loading";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar  from "./components/NavBar/NavBar";
import CurrentUserContext from './contexts/CurrentUserContext';
import Home from './components/Home/Home';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import Companies from './components/Companies/Companies';
import CompanyJobs from './components/Companies/CompanyJobs';
import Jobs from './components/Jobs/Jobs';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLoading } from './hooks/useLoading';
import JoblyApi from './api';

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage("token","");
  const [displayLoading, displayContent, isLoading]= useLoading();
  const [userApplications, setUserApplications] = useState([]);

  const handleUser = (data) =>{
    setUser(data);
  }
  const handleToken = (_token) =>{
    setToken(_token);
  }
  const handleIsLoading = (bool) =>{
    isLoading(bool);
  }
  const handleLogOut = () =>{
    setToken("");
    setUser(null);
  }

  useEffect(() =>{
    JoblyApi.token = token;
  },[user,token]);

  useEffect(() => {
    // get the current
    async function getCurrentUser(){
      try {
        if (user === null) {
          if (token){
            const tokenInfo = JoblyApi.decodeToken(token);
            if(tokenInfo){
                isLoading(true);
                const currentUser = await JoblyApi.getUser(tokenInfo.username);
                setUserApplications(currentUser.applications)
                if(currentUser){
                  setUser(currentUser);
                  isLoading(false);
                }else{
                  handleLogOut();
                  isLoading(false);
                }
            }
          } 
        }
      } catch (error) {
        handleLogOut();
        isLoading(false);
      }
    }
    getCurrentUser();
   }, [user,token,isLoading]);

  return (
    <>
      <CurrentUserContext.Provider value={{...user,token:token}} >
        <div style={{display:displayLoading}}>
         <Loading/>
        </div>
          <div style={{display:displayContent}}>
          <NavBar handleLogOut={handleLogOut}/>
            <main className='container'>
              <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/login" element={ token? <Navigate to="/" />:<Login handleToken={handleToken} isLoading={handleIsLoading}  /> }/>
                <Route exact path="/signup" element={ token? <Navigate to="/" />:<SignUp handleToken={handleToken} isLoading={handleIsLoading}  />}/>
                <Route exact path="/profile" element={!token? <Navigate to="/" />:<Profile handleUser={handleUser} isLoading={handleIsLoading}/>}/>
                <Route exact path="/jobs" element={!token? <Navigate to="/" />:<Jobs userApplications={userApplications} isLoading={handleIsLoading}/>}/>
                <Route exact path="/companies" element={!token? <Navigate to="/" />:<Companies isLoading={handleIsLoading}/>}/>
                <Route path="/companies/:handle" element={!token? <Navigate to="/" />:<CompanyJobs userApplications={userApplications} isLoading={handleIsLoading}/>}/>
                <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
