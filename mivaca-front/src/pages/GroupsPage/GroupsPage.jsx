import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import * as groupsService from '../../services/GroupService';
import { useNavigate } from 'react-router-dom';
import CreateModal from './components/CreateModal/CreateModal';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchGroups = () => {
    groupsService
      .getAll()
      .then((res) => {
        setGroups(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end my-4">
          <Button text="New Group" action={() => setIsModalOpen(true)} />
        </div>
        <div className="flex gap-2 flex-wrap md:flex-none justify-center">
          {!groups.length && !isLoading && (
            <h2 className="text-center text-vaki-secondary text-2xl mt-8">
              Looks like there are not groups associated with you
            </h2>
          )}
          {groups.map((group, index) => (
            <Card
              key={index}
              className="w-full sm:w-[calc(50%-4px)] xl:w-[calc(100%/3-8px)]"
              color={group.color}
            >
              <h2 className="text-xl">{group.name}</h2>
              <span className="text-base">
                <span>You owe: </span> <span className="text-vaki-green">$12000</span>
              </span>
              <div className="flex gap-4">
                <Button text="View" action={() => navigate(`/groups/${group.id}`)} size="sm" />
                <Button text="Delete" action={() => console.log('click on delete')} size="sm" />
              </div>
            </Card>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <CreateModal
          onSuccess={fetchGroups}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default GroupsPage;