import { useMemo } from "react";
import { HeroCard } from ".";
import { getHeroesByPublisher } from "../helpers"

export const HeroeList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]); 
    
    return (
        <div className="row rows-col-1 row-cols-md-3 g-3">
            {
                heroes.map( heroe => (
                    <HeroCard 
                        key={ heroe.id }
                        {...heroe}
                    />
                ))
            }
        </div>
    )
}
