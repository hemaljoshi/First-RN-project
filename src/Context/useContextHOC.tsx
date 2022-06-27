import React, {useContext} from 'react';
import ThemeContext from './ThemeContext';

export const useContextHOC = (Component: any) => {
  const Wrapper = (props: any) => {
    const context = useContext(ThemeContext);
    return <Component context={context} {...props} />;
  };
  return Wrapper;
};
