import { useState } from 'react';

export const useLoading = () => {
  
    const [displayLoading, setDisplayLoading] = useState('none');
    const [displayContent, setDisplayContent] = useState('block');
    
    const isLoading = (bool) =>{
        
        if(bool){
            setDisplayLoading('block');
            setDisplayContent('none');
        }else{
            setDisplayLoading('none');
            setDisplayContent('block');
        }
      }
    return [displayLoading, displayContent, isLoading]

}
