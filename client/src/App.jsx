import { useEffect } from 'react';
import {Toaster} from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { getOtherUsersThunk, getUserProfileThunk } from './store/slice/user/userThunk';
function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    (async ()=> {
      await dispatch(getUserProfileThunk());
      await dispatch(getOtherUsersThunk())
    })();
  }, []);
    
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
