import { useEffect } from 'react';
import {Toaster} from 'react-hot-toast'
import { useDispatch, useSelector  } from 'react-redux';
import { getUserProfileThunk, getOtherUsersThunk  } from './store/slice/user/userThunk';
import useAxiosLoader from '../hooks/useAxiosLoader.js';
import Loader from './pages/home/Loader.jsx';
function App() {
  const dispatch = useDispatch();
  //const loading = useSelector((state) => state.loader.loading);
  const loading = useSelector((state) => state.loaderReducer.loading);
  useAxiosLoader();

  useEffect(() => {
    (async () => {
      const res = await dispatch(getUserProfileThunk());
      if (res.meta.requestStatus === "fulfilled") {
        // ✅ fetch other users only when profile fetch succeeds
        dispatch(getOtherUsersThunk());
      }
    })();
  }, [dispatch]);
  
    
  return (
    <>
      {loading && <Loader />} 
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
