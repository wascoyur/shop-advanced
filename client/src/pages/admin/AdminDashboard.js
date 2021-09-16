import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../components/nav/AdminNav';
import Orders from '../../components/orders/Orders';
import { changeStatus, getOrders } from '../../functions/admin';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    await getOrders(user.token).then((res) => {
      // console.log('adminDash res:', JSON.stringify(res, null, 4));
      setOrders(res.data);
    });
  };
  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success('Статус доставки обновлен.');
      loadOrders();
    });
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Панель администратора</h4>
          {/* {JSON.stringify(orders)} */}
          <Orders handleStatusChange={handleStatusChange} orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
