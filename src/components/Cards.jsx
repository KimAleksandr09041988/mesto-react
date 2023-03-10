export default function Card({ card, onCardClick }) {

  return (
    <>
      <li className="gallery__card">
        <img className="gallery__img"
          src={card.link}
          alt={card.name}
          onClick={() => onCardClick(card)} />
        <div className="gallery__info">
          <h2 className="gallery__title">{card.name}</h2>
          <div className="gallery__wrapper">
            <button className="gallery__like" type="button"></button>
            <span className="gallery__quantity-like">{card.likes.length}</span>
          </div>
        </div>
        <button className="gallery__btn-remove"></button>
      </li>
    </>
  )
}
