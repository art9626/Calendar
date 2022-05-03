import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/reducers/auth/authSelectors';
import { loadGuests } from '../redux/reducers/event/eventActions';
import { EventType } from '../redux/reducers/event/eventReducer';
import { getGuests } from '../redux/reducers/event/eventSelectors';
import { rules } from '../utils/rules';

type AddEventFormType = {
  onSubmit: (event: EventType) => void;
}

const AddEvenetForm: React.FC<AddEventFormType> = React.memo(({ onSubmit }) => {
  const dispatch = useDispatch();
  const guests = useSelector(getGuests);
  const user = useSelector(getUser);
  const [event, setEvent] = useState<EventType>({
    author: user ? user.username : '',
    description: '',
    guest: '',
    date: '',
  });


  useEffect(() => {
    dispatch(loadGuests());
  }, []);
  
  return (
    <Form
      onFinish={() => onSubmit(event)}
    >
      <Form.Item
        label='Event description'
        name='description'
        rules={[rules.required('Description is required')]}
      >
        <Input
          placeholder='Input event'
          value={event.description}
          onChange={(e) => setEvent({...event, description: e.currentTarget.value})}
        />
      </Form.Item>
      <Form.Item
        label='Guest'
        name='guest'
      >
        <Select 
          style={{ width: 120 }}
          onChange={(guest) => setEvent({...event, guest})}
        >
          {
            guests.map((item) => {
              return (
                <Select.Option key={item.username} value={item.username}>{item.username}</Select.Option>
              );
            })
          }
        </Select>
      </Form.Item>
      <Form.Item
        label='Date'
        name='date'
        rules={[rules.required('Date is required')]}
      >
        <DatePicker
          onChange={(_, dateString) => setEvent({...event, date: dateString})}
        />
      </Form.Item>
      <Row
        justify='end'
      >
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
});

export default AddEvenetForm;