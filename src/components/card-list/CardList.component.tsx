import "./card-list.styles.css";
import Card from "../card/Card.component";
import { Monster } from "../../App";
type CardListProps = {
    filteredMonster:Monster[];
}
const CardList = ({filteredMonster}:CardListProps) => {

    return(
        //A good rule of thumb is that elements inside the map() call need keys.

            <div className='card-list'>
                {filteredMonster.map((monster) => {
                    return < Card key={monster.id.toString()} monster={monster} />
                })}

            </div>
        
    )
}


export default CardList;