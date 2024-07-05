import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import * as groupsService from '../../services/GroupService';
import * as friendService from '../../services/FriendService';
import EditModal from './components/EditModal/EditModal';
import { useParams } from 'react-router-dom';

const expenses = [
  {
    id: 1,
    name: 'Café en Cali',
    participants: 8,
    paidBy: 'Juan Guillermo',
    value: 25000,
    owe: 0,
  },
  {
    id: 2,
    name: 'Cine - Poor things',
    participants: 4,
    paidBy: 'Alicia',
    value: 105000,
    owe: 45000,
  },
  {
    id: 3,
    name: 'Almuerzo de clase',
    participants: 5,
    paidBy: 'Liliana',
    value: 25000,
    owe: 0,
  },
];

const GroupsDetailPage = () => {
  const [group, setGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const params = useParams();

  const fetchGroup = () => {
    groupsService
      .getById(params.id)
      .then((res) => setGroup(res.data))
      .catch((error) => console.log(error));
  };

  const fetchFriends = () => {
    friendService
      .getAll()
      .then((res) => {
        setFriends(res.data);
        setIsLoadingFriends(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingFriends(false);
      });
  };

  const handleDeleteGroup = (groupId) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      groupsService.deleteById(groupId)
        .then(() => {
          alert('Group successfully deleted');
          fetchGroups();
        })
        .catch(error => {
          console.error('Failed to delete the group:', error);
          alert('Failed to delete the group');
        });
    }
  };

  const handleAddFriend = () => {
    if (!selectedFriend) return;
    setIsAddingFriend(true);
    groupsService.addFriendToGroup(params.id, { name: selectedFriend.name, email: selectedFriend.email })
      .then(() => {
        setIsAddingFriend(false);
        setIsFriendModalOpen(false);
        setSelectedFriend(null);
        fetchGroup(); // Refresh the group details to include the new friend
      })
      .catch((error) => {
        console.error('Failed to add friend:', error);
        setIsAddingFriend(false);
      });
  };

  useEffect(() => {
    if (!params.id) {
      return;
    }

    fetchGroup();
  }, [params]);

  useEffect(() => {
    fetchFriends();
  }, []);

  if (!group) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col xs:flex-row xs:justify-end my-4 gap-2 sm:gap-4">
          <Button text="New Expense" action={() => console.log('click on new expense')} />
          <Button text="New Friend" action={() => setIsFriendModalOpen(true)} />
          <Button text="Edit Group" action={() => setIsModalOpen(true)} />
        </div>
        <div>
          <Card className="border-0 shadow-none w-full sm:w-1/2 xl:w-1/3" color={group.color}>
            <h2 className="text-xl">{group.name}</h2>
            <span className="text-base">
              <span>You owe: </span> <span className="text-vaki-green">$12000</span>
            </span>
            <div className="flex gap-4">
              <Button text="Delete" action={() => handleDeleteGroup(group)}/>
            </div>
          </Card>
        </div>
        <div className="mx-2">
          <h2 className="text-vaki-secondary border-b-2">EXPENSES</h2>
        </div>
        <div className="flex gap-2 flex-wrap md:flex-none justify-center">
          {expenses.map((expense, index) => (
            <Card
              hideLogo
              key={index}
              className="w-full sm:w-[calc(50%-4px)] xl:w-[calc(100%/3-8px)]"
            >
              <h2 className="text-xl">{expense.name}</h2>
              <span className="text-base">
                <span className="text-vaki-secondary">{expense.paidBy} </span> paid{' '}
                <span>${expense.value}</span>
              </span>
              <span className="text-base">
                {expense.owe > 0 ? `I owe $${expense.owe}` : 'I did not participate'}
              </span>
              <div className="flex gap-4">
                <Button text="View" action={() => navigate(`/groups/${group.id}`)} size="sm" />
                <Button text="Delete" action={() => handleDeleteGroup(group.id)} size="sm" />
              </div>
            </Card>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <EditModal
          group={group}
          onSuccess={fetchGroup}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isFriendModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-2xl font-semibold mb-4">Select Friend to Add</h2>
            {isLoadingFriends ? (
              <p>Loading friends...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {friends.map((friend) => (
                  <div
                    key={friend.email}
                    className={`p-4 border rounded cursor-pointer ${
                      selectedFriend?.email === friend.email ? 'bg-blue-100 border-blue-500' : 'bg-white'
                    }`}
                    onClick={() => setSelectedFriend(friend)}
                  >
                    <h3 className="text-xl">{friend.name}</h3>
                    <p className="text-sm text-gray-600">{friend.email}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <Button text={isAddingFriend ? 'Adding...' : 'Add Friend'} action={handleAddFriend} disabled={isAddingFriend || !selectedFriend} />
              <Button text="Close" action={() => setIsFriendModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupsDetailPage;
