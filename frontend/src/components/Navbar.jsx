import { useState } from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '65%',
      padding: '40px 30px',
    }
  };

const Navbar = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    }

    const  closeModal = () => {
        setIsOpen(false);
      }
  
  return (
    
        <div className="px-10 py-8 flex items-center justify-between">
            <div className="text-xl font-bold">Name</div>
            <div className="flex gap-4">
                <a onClick={openModal} className='pt-2'>Rules</a>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
            
                    <div className='text-slate-800' >
                        <button onClick={closeModal} className='absolute top-0 rounded-none text-white right-0'>X</button>
                        <div className='flex flex-col justify-between'>
                            <h2 className='font-semibold pb-5'> Rules – </h2>
                            <p>- If the card drawn from the deck is a cat card, then the card is removed from the deck.</p>
                            <p>- If the card is exploding kitten (bomb) then the player loses the game.</p>
                            <p>- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</p>
                            <p>- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
                        </div>
                    </div>
                </Modal>
                <button className="">Login</button>
                <button className="">Signup</button>
                <button className="">Logout</button>
            </div>
        </div>

  )
}

export default Navbar