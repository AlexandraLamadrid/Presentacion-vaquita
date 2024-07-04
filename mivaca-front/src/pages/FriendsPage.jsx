import { useEffect, useState } from 'react';
import * as friendService from '../services/FriendService';
import Card from '../components/Card/Card';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchFriends = () => {
    friendService
      .getAll()
      .then((res) => {
        const friends = res.data;
        setFriends(friends);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchFriends();
  }, []);


  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-2 flex-wrap md:flex-none justify-center">
          {!friends.length && !isLoading && (
            <h2 className="text-center text-vaki-secondary text-2xl mt-8">
              Looks like there are not friends associated with you
            </h2>
          )}
          {friends.map((friend, index) => (
            <Card
              key={index}
              className="w-full sm:w-[calc(50%-4px)] xl:w-[calc(100%/3-8px)]"
              color="white"
            >
              <h2 className="text-xl">{friend.name}</h2>
              <span className="text-base">
                <span> {friend.email} </span>
              </span>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
