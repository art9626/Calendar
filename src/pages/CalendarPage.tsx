import { Button, Calendar, Layout, Modal } from 'antd';
import { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddEvenetForm from '../components/AddEvenetForm';
import { getUser } from '../redux/reducers/auth/authSelectors';
import { loadEvents, saveEvents } from '../redux/reducers/event/eventActions';
import { EventType } from '../redux/reducers/event/eventReducer';
import { getEvents } from '../redux/reducers/event/eventSelectors';
import { formatDate } from '../utils/formatDate';


const CalendarPage: React.FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(getEvents);
  const user = useSelector(getUser);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    dispatch(loadEvents(user?.username || ''));
  }, []);

  const onSubmit = useCallback((event: EventType) => {
    dispatch(saveEvents(event));
    setModalIsVisible(false);
  }, [])

  const dateCellRender = (value: Moment) => {
    const formatedDate = formatDate(value);
    const currentDayEvents = events.filter((item) => item.date === formatedDate);
    return (
      <ul className="events">
        {
          currentDayEvents.map((item, index) => (
            <div key={index}>
              {item.description}
            </div>
          ))
        }
      </ul>
    );
  }


  return (
    <Layout>
      <Button onClick={() => setModalIsVisible(true)}>Add new event</Button>
      <Calendar dateCellRender={dateCellRender} />
      <Modal
        title='New event'
        visible={modalIsVisible}
        onCancel={() => setModalIsVisible(false)}
        footer={null}
      >
        <AddEvenetForm
          onSubmit={onSubmit}
        />
      </Modal>
    </Layout>
  );
};

export default CalendarPage;