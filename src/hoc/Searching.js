import React,{useState, useContext} from 'react'

const SearchContext = React.createContext()

export const useSearching =()=>{
    return useContext(SearchContext)
}

export const Searching = ({children})=>{
    const [search,setSearch] = useState('')

    function getVal(event){
        console.log(event.target.keyCode)
        if (event.keyCode === 13){
        setSearch(event.target.value)
        event.target.value = ''
        }
      }

      function resetVal(){
       setSearch('')
      }

    return (
        <SearchContext.Provider value = {{
            sValue:search,
            getVal,
            resetVal
        }} >
        {children}
        </SearchContext.Provider>
    )
}