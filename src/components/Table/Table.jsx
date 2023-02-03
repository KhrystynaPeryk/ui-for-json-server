import './Table.css';
import React, { useEffect, useState } from 'react'
import Modal from './components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction, currentItemAction, fetchAllData } from '../../redux/actions/actions';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
    // const storeData = useSelector((state) => state.getAllData.data);

    useEffect(() => {
      axios.get(`http://localhost:3001/dashboard`).then((res) => {
        console.log(res.data, typeof res.data)
        const objToArrayData = Object.entries((res.data));

        const modifiedData = objToArrayData.map((item) => {
          const info = item[1]
          const teamEmailsWithIDs = info.team_email.map((email) => {
            return email = {email: email, id: uuidv4()}
          });
          info.team_email = teamEmailsWithIDs;
          return item;
        })

        console.log(Object.entries(res.data));
        console.log(modifiedData)
        setData(modifiedData);
        // setData(Object.entries((res.data)));
      })
      // dispatch(fetchAllData()).then(() => {
      //   setData(storeData)
      // })
			}, []);

    const handleModal = (itemInfo) => {
      dispatch(openModalAction())
      dispatch(currentItemAction(itemInfo))
    }
  return (
    <div className='tableContainer'>
      <div className='table'>
        <div className='tableHeader'>
          <div>Workspace Name</div>
          <div>Email on error</div>
          <div>Email on success</div>
          <div>Email on discarded</div>
          <div>Apply on success</div>
          <div>Email on apply</div>
          <div>Apply destroys tolerance</div>
          <div>Apply changes tolerance</div>
          <div>Email/s</div>
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

              const currentItem = {name: itemName, info: itemInfo}
              return (
                <div className='tableRow' key={workspace_id} onDoubleClick={() => handleModal(currentItem)} >
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
                  <div className='tableCell-email'>
                    {team_email.map((email) => {
                      return (
                        <div key={email.id}>{email.email}</div>
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