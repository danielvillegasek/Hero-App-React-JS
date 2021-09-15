import React, { useMemo } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroById';

export const HeroScreen = ({history}) => {

    const { heroId } = useParams();
    const hero = useMemo(() => getHeroesById(heroId), [heroId]);

    if (!hero) {
        return <Redirect to="/" />
    }

    const { id, superhero, publisher, alter_ego, first_appearance, characters } = hero;

    const handleReturn = () => {

        if(history.length <= 2){
            history.push('/');
        }else{
            history.goBack();
        }
        
    }

    return (
        <div className="row mt-5">
            <div className="col-4 animate__animated animate__fadeInLeft">
                <img src={`../assets/heroes/${id}.jpg`} alt={superhero} className="card-img" />
            </div>
            <div className="col-8 animate__animated animate__fadeInRight">
                <div className="card-body">
                    <h1 className="card-title">  {superhero} </h1>
                    <p className="card-text">Alter ego: {alter_ego}</p>
                    <p className="card-text">Publisher: {publisher}</p>
                    <p className="card-text"> First appearance: {first_appearance} </p>
                    {
                        (alter_ego !== characters) && <p className="card-text" > Characters: {characters} </p>
                    }
                </div>

                <button className="btn btn-outline-info"
                onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
