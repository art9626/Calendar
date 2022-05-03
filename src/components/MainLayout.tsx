import { Layout, Menu, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/auth/authActions';
import { getUser } from '../redux/reducers/auth/authSelectors';
import { RouteNames } from '../routes/routes';

type MainLayoutPropsType = {
  isAuth: boolean;
}

const MainLayout: React.FC<MainLayoutPropsType> = ({ isAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser)

  const onLogout = () => {
    dispatch(logout());
  }



  return (
    <Layout>
      <Layout.Header>
        <Row justify='end'>
          {
            user
            &&
            <div style={{
              color: 'white'
            }}>
              {user.username}
            </div>
          }
          <Menu theme='dark' mode='horizontal' selectable={false}>
            {
              isAuth ?
                <Menu.Item
                  onClick={onLogout}
                  key={1}
                >
                  Exit
                </Menu.Item>
                :
                <Menu.Item
                  key={1}
                  onClick={() => navigate(RouteNames.LOGIN)}
                >
                  Login
                </Menu.Item>
            }
          </Menu>
        </Row>
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default MainLayout;