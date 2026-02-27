import type { ChangeEvent, FormEvent} from "react";

interface Props {
  onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
  searchString: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({onSearchSubmit,
  searchString,
  handleSearchChange}: Props) => {

  return (
    <div>

        <form onSubmit={onSearchSubmit}>

            <input value={searchString}
            onChange={handleSearchChange} />

        </form>
    
    </div>
  )
}

export default Search