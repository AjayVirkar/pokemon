import { useState } from 'react';

const Card = ({ card }) => {
  return (
    <div className="border p-4">
      {/* your card component here */}
    </div>
  );
};

const Pagination = ({ cards, cardsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
      <div className="flex mt-4">
        <button
          className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`${currentPage === i + 1
                ? 'bg-blue-500 hover:bg-blue-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } font-bold py-2 px-4`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`${currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : ''
            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r`}
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function MyPage({ cards }) {
  return (
    <div className="container mx-auto my-4">
      <Pagination cards={cards} cardsPerPage={20} />
    </div>
  );
}
