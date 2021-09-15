import React, { useMemo } from 'react'
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import { getHeroByName } from '../../selectors/getHeroByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    const { q } = queryString.parse(location.search);

   
    const [formValues, handleInputChange] = useForm({
        searchText : q || ''
    });
    const {searchText} = formValues;
    const heroesFiltered = useMemo(() => getHeroByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`)
        // alert(searchText);
    }

    return (
        <div>
            <h1>Search</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <button type='submit' className="btm m-1 btn-block btn-outline-primary ">
                            Search.
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    
                    { (q === '' ) && <span>Ingresa tu busqueda en el campo</span> }
                    { (q !== '' && !heroesFiltered.length) && <span>Sin coincidencias</span> }

                    {
                       heroesFiltered.map( hero => (
                            <HeroCard key={hero.id} 
                            {...hero}  />
                       )) 
                    }
                </div>
            </div>
        </div>
    )
}
