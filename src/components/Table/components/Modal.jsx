import './Modal.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../../../redux/actions/actions';
import { v4 as uuidv4 } from 'uuid';

const Modal = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector((state) => state.getCurrentItem);

    const [name, setName] = useState(currentItem.name);
    const [id, setID] = useState(currentItem.info.workspace_id);
    const [teamEmails, setTeamEmails] = useState(currentItem.info.team_email);
    const [emailOnError, setEmailOnError ] = useState(currentItem.info.email_on_error);
    const [emailOnSuccess, setEmailOnSuccess] = useState(currentItem.info.email_on_success);
    const [emailOnDiscarded, setEmailOnDiscarded] = useState(currentItem.info.email_on_discarded);
    const [applyOnSuccess, setApplyOnSuccess] = useState(currentItem.info.apply_on_success);
    const [emailOnApply, setEmailOnApply] = useState(currentItem.info.email_on_apply);
    const [applyDestroysTolerance, setApplyDestroysTolerance] = useState(currentItem.info.apply_destroys_tolerance);
    const [applyChangesTolerance, setApplyChangesTolerance] = useState(currentItem.info.apply_changes_tolerance);

    const closeModal = () => {
        dispatch(closeModalAction())
    }

    const handleDeleteEmail = (id) => {
        const filteredTeamEmails = teamEmails.filter((email) => email.id !== id)
        setTeamEmails(filteredTeamEmails)
        console.log('deleting', id)
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
                <b>{name}</b>
            </div>
            <div className='infoItems'>
                <div>ID:</div>
                <b>{id}</b>
            </div>
            <div className='emailContainer'>
                <div>Team email(s):   </div>
                <div className='emailBox-wrapper'>
                    {teamEmails.map((email) => {
                        return <div key={email.id} className='email-box'>{email.email} <span className='redCross' onClick={() => handleDeleteEmail(email.id)}>×</span></div>
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
                    <input type='radio' id='email_on_error_yes' name='email_on_error' value='yes' defaultChecked={emailOnError === 'yes' ? true : false} />
                    <label htmlFor='email_on_error_yes'>Yes</label>
                    <input type='radio' id='email_on_error_no' name='email_on_error' value='no' defaultChecked={emailOnError === 'no' ? true : false} />
                    <label htmlFor='email_on_error_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_success</div>
                <div>
                    <input type='radio' id='email_on_success_yes' name='email_on_success' value='yes' defaultChecked={emailOnSuccess === 'yes' ? true : false} />
                    <label htmlFor='email_on_success_yes'>Yes</label>
                    <input type='radio' id='email_on_success_no' name='email_on_success' value='no' defaultChecked={emailOnSuccess === 'no' ? true : false} />
                    <label htmlFor='email_on_success_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_discarded</div>
                <div>
                    <input type='radio' id='email_on_discarded_yes' name='email_on_discarded' value='yes' defaultChecked={emailOnDiscarded === 'yes' ? true : false} />
                    <label htmlFor='email_on_discarded_yes'>Yes</label>
                    <input type='radio' id='email_on_discarded_no' name='email_on_discarded' value='no' defaultChecked={emailOnDiscarded === 'no' ? true : false} />
                    <label htmlFor='email_on_discarded_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>apply_on_success</div>
                <div>
                    <input type='radio' id='apply_on_success_yes' name='apply_on_success' value='yes' defaultChecked={applyOnSuccess === 'yes' ? true : false} />
                    <label htmlFor='apply_on_success_yes'>Yes</label>
                    <input type='radio' id='apply_on_success_no' name='apply_on_success' value='no' defaultChecked={applyOnSuccess === 'no' ? true : false} />
                    <label htmlFor='apply_on_success_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_apply</div>
                    <div>
                        <input type='radio' id='email_on_apply_yes' name='email_on_apply' value='yes' defaultChecked={emailOnApply === 'yes' ? true : false} />
                        <label htmlFor='email_on_apply_yes'>Yes</label>
                        <input type='radio' id='email_on_apply_no' name='email_on_apply' value='no' defaultChecked={emailOnApply === 'no' ? true : false} />
                        <label htmlFor='email_on_apply_no'>No</label>
                    </div>
            </div>
            <div className='modalItem'>
                <label htmlFor='apply_destroys_tolerance'>apply_destroys_tolerance </label>
                <input type='number' id='apply_destroys_tolerance' name='apply_destroys_tolerance' defaultValue={applyDestroysTolerance} />
            </div>
            <div className='modalItem'>
                <label htmlFor='apply_changes_tolerance'>apply_changes_tolerance </label>
                <input type='number' id='apply_changes_tolerance' name='apply_changes_tolerance' defaultValue={applyChangesTolerance} />
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