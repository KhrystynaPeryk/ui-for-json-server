import './Modal.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../../../redux/actions/actions';

const Modal = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector((state) => state.getCurrentItem);

    const closeModal = () => {
        dispatch(closeModalAction())
    }

    const submitItem = (e) => {
        e.preventDefault()
        console.log('submitting an item')
        dispatch(closeModalAction())
    }
    return (
        <form className='modal-wrapper' onSubmit={submitItem}>
            <div className='modalHeader'>
                <b>CONFIGURE AN ITEM</b>
                <div className='closeModalCross' onClick={() => closeModal()}>&#10005;</div>
            </div>
            <div className='infoItems'>
                <div>Workspace name:</div>
                <b>{currentItem.name}</b>
            </div>
            <div className='infoItems'>
                <div>ID:</div>
                <b>{currentItem.info.workspace_id}</b>
            </div>
            <div className='emailContainer'>
                <div>Team email(s):   </div>
                <div className='emailBox-wrapper'>
                    {currentItem.info.team_email.map((email, index) => {
                        return <div key={index} className='email-box'>{email} <span className='redCross'>×</span></div>
                    })}
                </div>
                <div className='input-container'>Enter a new team email: 
                    <input type='email' id='newEmail'/>
                </div>
            </div>
            <div className='radioItems-container'>
                <div className='modalItem'>
                <div>email_on_error</div>
                <div>
                    <input type='radio' id='email_on_error_yes' name='email_on_error' value='yes' defaultChecked={currentItem.info.email_on_error === 'yes' ? true : false} />
                    <label htmlFor='email_on_error_yes'>Yes</label>
                    <input type='radio' id='email_on_error_no' name='email_on_error' value='no' defaultChecked={currentItem.info.email_on_error === 'no' ? true : false} />
                    <label htmlFor='email_on_error_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_success</div>
                <div>
                    <input type='radio' id='email_on_success_yes' name='email_on_success' value='yes' defaultChecked={currentItem.info.email_on_success === 'yes' ? true : false} />
                    <label htmlFor='email_on_success_yes'>Yes</label>
                    <input type='radio' id='email_on_success_no' name='email_on_success' value='no' defaultChecked={currentItem.info.email_on_success === 'no' ? true : false} />
                    <label htmlFor='email_on_success_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_discarded</div>
                <div>
                    <input type='radio' id='email_on_discarded_yes' name='email_on_discarded' value='yes' defaultChecked={currentItem.info.email_on_discarded === 'yes' ? true : false} />
                    <label htmlFor='email_on_discarded_yes'>Yes</label>
                    <input type='radio' id='email_on_discarded_no' name='email_on_discarded' value='no' defaultChecked={currentItem.info.email_on_discarded === 'no' ? true : false} />
                    <label htmlFor='email_on_discarded_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>apply_on_success</div>
                <div>
                    <input type='radio' id='apply_on_success_yes' name='apply_on_success' value='yes' defaultChecked={currentItem.info.apply_on_success === 'yes' ? true : false} />
                    <label htmlFor='apply_on_success_yes'>Yes</label>
                    <input type='radio' id='apply_on_success_no' name='apply_on_success' value='no' defaultChecked={currentItem.info.apply_on_success === 'no' ? true : false} />
                    <label htmlFor='apply_on_success_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_apply</div>
                    <div>
                        <input type='radio' id='email_on_apply_yes' name='email_on_apply' value='yes' defaultChecked={currentItem.info.email_on_apply === 'yes' ? true : false} />
                        <label htmlFor='email_on_apply_yes'>Yes</label>
                        <input type='radio' id='email_on_apply_no' name='email_on_apply' value='no' defaultChecked={currentItem.info.email_on_apply === 'no' ? true : false} />
                        <label htmlFor='email_on_apply_no'>No</label>
                    </div>
            </div>
            <div className='modalItem'>
                <label htmlFor='apply_destroys_tolerance'>apply_destroys_tolerance </label>
                <input type='number' id='apply_destroys_tolerance' name='apply_destroys_tolerance' defaultValue={currentItem.info.apply_destroys_tolerance} />
            </div>
            <div className='modalItem'>
                <label htmlFor='apply_changes_tolerance'>apply_changes_tolerance </label>
                <input type='number' id='apply_changes_tolerance' name='apply_changes_tolerance' defaultValue={currentItem.info.apply_changes_tolerance} />
            </div> 
            </div>
            <div className='btn-container'>
                <button className='btn' type='submit'>Save</button>
                <button className='btn' type='button' onClick={() => closeModal()}>Cancel</button>
            </div>
        </form>
    )
}

export default Modal