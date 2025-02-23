import './Table.css';
import React, { useEffect, useState } from 'react'
import Modal from './components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction, currentItemAction, fetchAllDataAction } from '../../redux/actions/actions';
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

  //https://www.tutorialspoint.com/how-to-update-parent-state-in-reactjs#:~:text=To%20update%20the%20parent%20state%20from%20the%20children%20component%2C%20either,children%20and%20handling%20it%20accordingly.
  // if there is an updated current Item from Modal, we need to update it in the table too
  // if (Object.keys(currentItemData).length !== 0 && currentItemData.updated) {
  //   console.log('FROM UPDATING TABLE FUNCTION: updatedItem', currentItemData)
  //   console.log('FROM UPDATING TABLE FUNCTION: Data', data)
  //   const updatedData = data.map((dataArrItem) => {
  //     if (dataArrItem[1].workspace_id === currentItemData.info.workspace_id)
  //     dataArrItem[1] = currentItemData.info;
  //     return dataArrItem;
  //   })
  //   console.log(updatedData)
  //   setData((prev) => [...prev, updatedData]);
  //   dispatch(currentItemRemoveAction());
  // }

  useEffect(() => {
    axios.get(`http://localhost:3001/dashboard`).then((res) => {
      const objToArrayData = Object.entries((res.data));

      //modifying data: namely team_emails - adding ids to them (to be able to manipulate them in an array)
      const modifiedData = objToArrayData.map((item) => {
        const info = item[1]
        const teamEmailsWithIDs = info.team_email.map((email) => {
          return email = {email: email, id: uuidv4()}
        });
        info.team_email = teamEmailsWithIDs;
        return item;
      })
      setData(modifiedData);
      dispatch(fetchAllDataAction(modifiedData));
    })
  }, [dispatch]);

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