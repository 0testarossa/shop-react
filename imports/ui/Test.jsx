import React from 'react';

export const useStateWithLocalStorage = localStorageKey => {
    const [value, setValue] = React.useState(
      localStorage.getItem(localStorageKey) || ''
    );
   
    React.useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [value]);
   
    return [value, setValue];
  };

const Test = (props) => {
    const [user, setUser] = useStateWithLocalStorage('userName')

    const changeStatus2 = () => {
        setUser("Ana");
    }
    const changeStatus3 = () => {
        setUser("Sara");
    }

    console.log("propsTest");
    console.log(props);
    return (
    <>
    <button onClick={() => changeStatus2()}>Button</button>
    <button onClick={() => changeStatus3()}>Button</button>
    <div>hej <a href="/">link</a></div>
    </>
    )
}

export default Test;