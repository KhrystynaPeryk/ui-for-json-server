import './Table.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modal from './components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction, currentItemAction } from '../../redux/actions/actions';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
// import { useQuery } from 'react-query';

// async function getData() {
//   const { data } = await axios.get(`http://localhost:3001/dashboard`);

//   return data;
// }

// function useData() {
//   const { isLoading, isFetching, data, isError, refetch } = useQuery(
//     "products",
//     getData,
//     {
//       retry: 1,
//       retryDelay: 500,
//     }
//   );
//   return { data, isLoading, isFetching, isError, refetch };
// }

const Table = () => {
    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    const modal = useSelector((state) => state.isModalOpen);
    console.log(modal)

    useEffect(() => {
        axios.get(`http://localhost:3001/dashboard`).then((res) => {
          console.log(res.data, typeof res.data)
          setData(Object.entries((res.data)));
          console.log(Object.entries(res.data));
          console.log('data length', data.length);
          console.log(data);
        })
    }, [])

    const handleModal = (itemInfo) => {
      dispatch(openModalAction())
      dispatch(currentItemAction(itemInfo))
      console.log(itemInfo)
    }
  return (
    <div className='tableContainer'>
      <div className='table'>
        <div className='tableHeader'>
          <div className='tableCell'>Workspace Name</div>
          <div className='tableCell'>Email on error</div>
          <div className='tableCell'>Email on success</div>
          <div className='tableCell'>Email on discarded</div>
          <div className='tableCell'>Apply on success</div>
          <div className='tableCell'>Email on apply</div>
          <div className='tableCell'>Apply destroys tolerance</div>
          <div className='tableCell'>Apply changes tolerance</div>
          <div className='tableCell'>Email/s</div>
        </div>
            {data.map((item) => {
              const itemName = item[0];
              const itemInfo = item[1];
              const {
                email_on_error,
                email_on_success,
                email_on_discarded,
                apply_on_success,
                email_on_apply,
                apply_destroys_tolerance,
                apply_changes_tolerance,
                team_email,
                workspace_id
              } = itemInfo;
              return (
                // change below to handleModal(workspace_id)
                <div className='tableRow' key={workspace_id} onDoubleClick={() => handleModal(itemInfo)} >
                  <div className='tableCell'>{itemName}</div>
                  <div className='tableCell'>
                    {email_on_error === 'yes' ? <div className='checkedIcon'><FaRegCheckCircle /></div> : <div className='crossIcon'><FaRegWindowClose /></div>}
                  </div>
                  <div className='tableCell'>
                    {email_on_success === 'yes' ? <div className='checkedIcon'><FaRegCheckCircle /></div> : <div className='crossIcon'><FaRegWindowClose /></div>}
                  </div>
                  <div className='tableCell'>
                    {email_on_discarded === 'yes' ? <div className='checkedIcon'><FaRegCheckCircle /></div> : <div className='crossIcon'><FaRegWindowClose /></div>}
                  </div>
                  <div className='tableCell'>
                    {apply_on_success === 'yes' ? <div className='checkedIcon'><FaRegCheckCircle /></div> : <div className='crossIcon'><FaRegWindowClose /></div>}
                  </div>
                  <div className='tableCell'>
                    {email_on_apply === 'yes' ? <div className='checkedIcon'><FaRegCheckCircle /></div> : <div className='crossIcon'><FaRegWindowClose /></div>}
                  </div>
                  <div className='tableCell'>
                    {apply_destroys_tolerance}
                  </div>
                  <div className='tableCell'>
                    {apply_changes_tolerance}
                  </div>
                  <div className='tableCell'>
                    {team_email.map((email, index) => {
                      return (
                        <div key={index}>{email}</div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            {modal ? (
              <div className='modal-container'>
                <Modal />
              </div>
            ) : null}
      </div>
    </div>
  )
}

export default Table