import React from 'react'
import './SearchInput.css'
import {useSearching} from '../../../../hoc/Searching'

const Search = props =>{
    const {getVal} = useSearching()

    return(
        <div className='search_wrapper'>
            <input type='text' name='searcher' onKeyDown={event=>getVal(event)} ></input>
            <label htmlFor='searcher'><svg width="20" height="20" className="glass"><path d="M19.77 18.709l-5.464-5.463a7.5 7.5 0 1 0-1.06 1.06l5.463 5.464a.75.75 0 1 0 1.061-1.061zM2.5 8.5a6 6 0 1 1 6 6 6.007 6.007 0 0 1-6-6z"></path></svg></label>
        </div>
    )
}
export default Search