import {useState} from "react";
import {Book} from './interfaces/baseInterface'

interface Props {
    sw: (a: Book[]) => void;
    data: Book[];
}

const SearchForm: React.FC<Props> = (props) => {

    const { data, sw } = props
    const [query, setQuery] = useState("")

    const handleChange = (e: any) => {
        let sq = e.target.value
        setQuery(sq)
    }

    const handleSearch = (e: any) => {
        e.preventDefault()

        let searchResults: Book[] = data.filter( (win) => { return win.title.includes(query) || win.author.includes(query)})
        console.log("search result array: ",searchResults)    
        sw(searchResults)

    }

    return (
        <form onSubmit={handleSearch}>
        <input name="sq" value={query} onChange={handleChange} placeholder="受賞者、受賞作" />
        <input type="submit"  value="検索" />
        </form>
    )

}

export default SearchForm