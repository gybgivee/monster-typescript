import "./card-list.styles.css";
import Card from "../card/Card.component";
const CardList = (props) => {
    const { filteredMonster } = props;
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