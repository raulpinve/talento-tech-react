import { decreaseNumber, increaseNumber } from '../features/numberSlice';
import { useSelector, useDispatch } from 'react-redux';

function Profile({ user }) {
  return (
    <>
      <div className='mx-2 shadow-md rounded-xl bg-white'>
        <img
          className="avatar rounded-t-lg"
          src={user.imageUrl}
          alt={'Photo of ' + user.name}
          style={{
            backgroundColor: 'black',
            height: '250px', 
            width: '100%',
            objectFit: 'cover'
          }}
        />
        <p className='p-5'>{user.name}</p>
      </div>
    </>
  );
}


export default function Example() {
  /** Cambiando el estado de las variables */
  const users = [
    {
      name: 'Elvis Presley',
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/singer-elvis-presley-news-photo-1590531497.jpg',
    },
    {
      name: 'Brad Pitt',
      imageUrl:
        'https://goldenglobes.com/wp-content/uploads/2023/10/brad-pitt_03_paramount-pictures.jpg',
    },
    {
      name: 'Madonna',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVATslgVY87n3lp3XHUlxF8Edc6jubIVkmbg&usqp=CAU',
    },
    {
      name: 'Zinedine Zidane',
      imageUrl:
        'https://publish-p47754-e237306.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--c477d5d0-4f24-486c-9984-5f07beef79fd/_330186270595.app.png?preferwebp=true&width=312',
    },
  ];

  return (
    <div className='mt-8'>
      <div className='container grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center mx-auto'>
        {users.map((user) => (
          <Profile key={user.name} user={user} />
        ))}
      </div>
    </div>
  );
}
