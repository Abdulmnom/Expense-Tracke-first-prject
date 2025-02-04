
import { createContext , useState , useContext } from "react";
import Transaction from "./models/Transaction";
import AddTransaction from "./home/components/AddTransaction";
import { IAuth , ITransaction } from "./types/user";
import useLocalStorage from "./hooks/useLocalStorage";




type AppProviderType = {
  auth? : IAuth,
  transactions? : ITransaction[],
  authenticate : (auth? : IAuth) => void,
  addTransaction : (transaction : ITransaction) => void,
  removeTransaction : (id : string) => void,
} | null 

type Props ={
  children: React.ReactNode;
}  // use 

const AppContext =  createContext<AppProviderType>({
    auth : undefined,
    transactions : [],
    authenticate : () => {},
    addTransaction : () => {},
    removeTransaction : () => {},
}) 




export const AppProvider = ( { children} : Props) => {
  const [auth , setAuth, handleSaveStorage] :any = useLocalStorage() // useState<IAuth | undefined>(undefined);
  const [transactions, setTransactions] = useState<ITransaction[]>([]) // useState<ITransaction[]>([]);
 
  if(auth) {
    return ( 
      <AppContext.Provider value={
        {
          auth ,
          transactions, 
           authenticate : ( auth? : IAuth) =>{
            setAuth(auth);
           },
           addTransaction : (transaction : ITransaction) => {
            setTransactions([...transactions,transaction]);
           },
           removeTransaction : (id : string) => {
            setTransactions(transactions => transactions.filter(t => t._id!== id)  );
           }
           
           }
           
      } >
         {children}
      </AppContext.Provider>
    )
  }

}


export const useAppContext = () => useContext(AppContext);
