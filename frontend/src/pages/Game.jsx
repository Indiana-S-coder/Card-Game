import { useState, useEffect } from 'react'
import Card from '../components/card/Card'
import cardBack from '../assets/card-back.png'

const Game = () => {
    const [cardsInDeck, setCardsInDeck] = useState([]);
    const [defuseCardCount, setDefuseCardCount] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [isExplodingKitten, setIsExplodingKitten] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    // const [isCardRevealed, setIsCardRevealed] = useState(false);

    const initializeCardDeck = () => {
        const availableCards = [
            { name: 'Cat', title: 'What a majestic cat!' },
            { name: 'Defuse', title: 'You\'re safe... for now' },
            { name: 'Shuffle', title: 'Cute little kitty' },
            { name: 'Exploding Kitten', title: 'Adorable cat' },
        ];

        const deck = [];

        const getRandomIdx = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        for (let i = 0; i < 5; i++) {
            deck.push(availableCards[getRandomIdx(0, availableCards.length - 1)]);
          }

        return deck;
    }

    const restart = () => {
        const newDeck = initializeCardDeck();
        setCardsInDeck(newDeck);
        setDefuseCardCount(0);
        // dispatch(fetchUserHighscore());
        setIsGameOver(false);
        setIsGameWon(false);
    }

    const handleExplodingKitten = () => {
        const updatedDeck = [...cardsInDeck];
        updatedDeck.pop();

        if(cardsInDeck.length === 1){
            // dispatch(updateHighscore());
            setIsGameWon(true);
        } else {
            setDefuseCardCount(prevCount => prevCount - 1);
            setCardsInDeck(updatedDeck);
            setIsExplodingKitten(false);
        }
    }

    const handleCardReveal = () => {
        const updatedDeck = [...cardsInDeck];
        const currentCard = updatedDeck[updatedDeck.length - 1];
        setActiveCard(currentCard);
        // setIsCardRevealed(true);
        setTimeout(() => {
            if(updatedDeck.length === 1 && currentCard.name !== "Shuffle" && currentCard.name !== "Exploding Kitten"){
                setIsGameWon(true);
                // dispatch(updateHighscore());
            }

            if(currentCard.name === "Cat"){
                updatedDeck.pop();
                setCardsInDeck(updatedDeck);
            } else if(currentCard.name === "Defuse"){
                setDefuseCardCount(prevCount => prevCount + 1);
                updatedDeck.pop();
                setCardsInDeck(updatedDeck);
            } else if(currentCard.name === "Shuffle"){
                restart();
            } else if(currentCard.name === "Exploding Kitten"){
                if(defuseCardCount > 0){
                    setIsExplodingKitten(true);
                } else {
                    setIsGameOver(true);
                }
            }
            setActiveCard(null);
            // setIsCardRevealed(false);
        }, 2000);
    }

    useEffect(() => {
        const newDeck = initializeCardDeck();
        setCardsInDeck(newDeck);
    }, []);
console.log(cardsInDeck)


    return (
    <>
       {
            isGameWon ? (
                <div className='flex flex-col gap-6 justify-center items-center'>
                    <h1 className='font-bold text-6xl '>Congratulations! 🎉</h1>
                    <h1 className='font-bold text-6xl '>You Won</h1>
                    <button className='bg-green-500' onClick={restart}>Restart</button>
                </div>
                ) : (
                    isGameOver ? (
                        <div className='flex flex-col gap-6 justify-center items-center'>
                            <h1 className='font-bold text-red-500 text-6xl'>Game Over!</h1>
                            <p className='text-8xl'>😵</p>
                            <button className='bg-green-500' onClick={restart}>Restart</button>
                        </div>
                    ) : (
                        <div className='flex h-[100vh]'>
                            <div className="flex flex-col items-center mt-[6vh] w-[70%]">
                                <div className='flex gap-5 items-center m-8'>
                                    {
                                        cardsInDeck.map((card, index) => (
                                            <div key={index} onClick={handleCardReveal} className='cursor-pointer hover:scale-[1.15] rounded-lg border-4 border-white bg-cover bg-center w-[100px] h-[150px]' style={{backgroundImage: `url(${cardBack})`}}></div>
                                        ))
                                    }
                                </div>
                                {
                                    activeCard && (
                                        <Card type={activeCard.name} />
                                    )
                                }
                                {/* { !isCardRevealed && <button className='bg-[#007bff] py-1 cursor-pointer hover:bg-[#0056b3]' onClick={handleCardReveal}>Show</button>}  */}
                                {
                                    isExplodingKitten && <button onClick={handleExplodingKitten}>Use Defuse</button>
                                }
                                <h2>Defuse Cards Available: {defuseCardCount}</h2>
                            </div>
                            {/* <Highscore highscore={userHighscore} /> */}
                        </div>
                    )
                )
            } 
    </>
  )
}

export default Game