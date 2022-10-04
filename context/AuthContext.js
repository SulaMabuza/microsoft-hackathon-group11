import React, {createContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
	const [test, setTest] = useState("Text Value");
	return(
		<AuthContext.Provider value={{test}}>
			{children}
		</AuthContext.Provider>
		);
}