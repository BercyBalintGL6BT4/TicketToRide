import { useDispatch, useSelector } from "react-redux";
import { clearCities, onCardHover } from "../state/map/actions";

export function TicketCard({ actualPlayer }) {
  const dispatch = useDispatch();
  return (
    <div className="m-3 position-relative col w-50  text-white bg-dark border">
      <div className="row">
        <div className="col border">
          <h5>Nagy út</h5>
          {}
          <div
            className="row"
            onMouseEnter={() =>
              dispatch(onCardHover(actualPlayer.long_distance_card))
            }
            onMouseLeave={() =>
              dispatch(clearCities(actualPlayer.long_distance_card))
            }
          >
            {actualPlayer.long_distance_card.fromCity} -{" "}
            {actualPlayer.long_distance_card.toCity}
          </div>
          <div className="row">
            értéke:
            {actualPlayer.long_distance_card.value}
          </div>
        </div>
        <div className="col-10 bg-dark border">
          <h5>Kis utak</h5>
          <div className="row">
            {actualPlayer.short_distance_cards.map((card) => {
              return (
                <div
                  className="col border"
                  onMouseEnter={() => dispatch(onCardHover(card))}
                  onMouseLeave={() => dispatch(clearCities(card))}
                >
                  {card.fromCity} - {card.toCity} értéke:
                  {card.value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
