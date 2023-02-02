import './Table.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modal from './components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction, currentItemAction } from '../../redux/actions/actions';
import { FaRegCheckCircle } from "react-icons/fa";
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
    <div className='container'>
      <div className='tableHeader'>
        <div className='tablerowCell'>Workspace Name</div>
        <div className='tablerowCell'>Email on error</div>
        <div className='tablerowCell'>Email on success</div>
        <div className='tablerowCell'>Email on discarded</div>
        <div className='tablerowCell'>Apply on success</div>
        <div className='tablerowCell'>Email on apply</div>
        <div className='tablerowCell'>Apply destroys tolerance</div>
        <div className='tablerowCell'>Apply changes tolerance</div>
        <div className='tablerowCell'>Email/s</div>
      </div>
        <div className='wrapper'>
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
              <div className='table' key={workspace_id} onClick={() => handleModal(itemInfo)} >
                <div className='tablerowCell'>{itemName}</div>
                <div className='tablerowCell'>
                  {email_on_error === 'yes' ? <FaRegCheckCircle /> : null}
                </div>
                <div className='tablerowCell'>
                  {email_on_success === 'yes' ? <FaRegCheckCircle /> : null}
                </div>
                <div className='tablerowCell'>
                  {email_on_discarded === 'yes' ? <FaRegCheckCircle /> : null}
                </div>
                <div className='tablerowCell'>
                  {apply_on_success === 'yes' ? <FaRegCheckCircle /> : null}
                </div>
                <div className='tablerowCell'>
                  {email_on_apply === 'yes' ? <FaRegCheckCircle /> : null}
                </div>
                <div className='tablerowCell'>
                  <div className='tablerowCell-number'>{apply_destroys_tolerance}</div>
                </div>
                <div className='tablerowCell'>
                  <div className='tablerowCell-number'>{apply_changes_tolerance}</div>
                </div>
                <div className='tablerowCell'>
                  {team_email.map((email, index) => {
                    return (
                      <div key={index}>{email}</div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
          {modal ? (
            <div className='modal-container'>
              <Modal />
            </div>
          ) : null}
    </div>
  )
}

export default Table