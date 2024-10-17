import { useContext } from "react"
import { ProductContext } from "./Context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons"

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch}=useContext(ProductContext)
  return (
   <>
   {showSearch?(
    <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search..," className="flex-1 outline-none bg-inherit text-sm"/>
            <FontAwesomeIcon icon={faSearch} size="lg" ></FontAwesomeIcon>
        </div>
        <FontAwesomeIcon icon={faWindowClose} size="lg" className="cursor-pointer" onClick={()=>setShowSearch(false)}></FontAwesomeIcon>
    </div>
   ):null}
   </>
  )
}

export default SearchBar