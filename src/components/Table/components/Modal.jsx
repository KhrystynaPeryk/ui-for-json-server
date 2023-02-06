import './Modal.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction, dataUpdateAction } from '../../../redux/actions/actions';
import { v4 as uuidv4 } from 'uuid';
import { isEqual } from 'lodash';

const Modal = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector((state) => state.getCurrentItem);
    const propsSnapshot = {};

    // stating values from current selected Item
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
    
    //values to handle email logic
    const [emailInputValue, setEmailInputValue] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);

    // useEffect - first thing after page loads
    useEffect(() => {
        propsSnapshot.name = currentItem.name;
        propsSnapshot.info = currentItem.info;
    })

    //close/open Modal logic
    const closeModal = () => {
        // dispatch(currentItemRemoveAction());
        dispatch(closeModalAction());
    }

    //logic for handling email deletion and addition
    const handleDeleteEmail = (id) => {
        const filteredTeamEmails = teamEmails.filter((email) => email.id !== id);
        setTeamEmails(filteredTeamEmails);
    }

    const handleEmailInputChange = (e) => {
        setEmailInputValue(e.target.value);
    }

    const handleEmailAddition = (newEmail) => {
        //email validation regex
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newEmail)) {
            setIsEmailValid(true);
            const emailObjWithId = {email: newEmail, id: uuidv4()};
            setTeamEmails((prev) => [...prev, emailObjWithId]);
            setEmailInputValue('');
        } else {
            setIsEmailValid(false);
        }
    }
    // logic for handling radio buttons in Modal
    const handleEmailOnError = (e) => {
        setEmailOnError(e.target.value)
    }

    const handleEmailOnSuccess = (e) => {
        setEmailOnSuccess(e.target.value)
    }

    const handleEmailOnDiscarded = (e) => {
        setEmailOnDiscarded(e.target.value)
    }

    const handleApplyOnSuccess = (e) => {
        setApplyOnSuccess(e.target.value)
    }

    const handleEmailOnApply = (e) => {
        setEmailOnApply(e.target.value)
    }

    // logic for handling input numbers in Modal
    const handleDestroysChange = (e) => {
        setApplyDestroysTolerance(e.target.value)
    }

    const handleChangesChange = (e) => {
        setApplyChangesTolerance(e.target.value)
    }

    const submitItem = (e) => {
        e.preventDefault();
        propsSnapshot.name = currentItem.name;
        propsSnapshot.info = currentItem.info;
        const objToSubmit = {
            name,
            info: {
                workspace_id: id,
                team_email: teamEmails,
                apply_on_success: applyOnSuccess,
                email_on_apply: emailOnApply,
                email_on_discarded: emailOnDiscarded,
                email_on_error: emailOnError,
                email_on_success: emailOnSuccess,
                apply_changes_tolerance: applyChangesTolerance,
                apply_destroys_tolerance: applyDestroysTolerance
            }
        }
        if (isEqual(propsSnapshot ,objToSubmit)) { //equal - no need to do json file update
            dispatch(closeModalAction());
        } else {
            dispatch(dataUpdateAction(objToSubmit))
            dispatch(closeModalAction());
        }
        console.log(' ------ submitting an item ------ ');
        console.log('INITIAL OBJECT', propsSnapshot)
        console.log('UPDATED OBJECT', objToSubmit)
        console.log('are Objects the same?', isEqual(propsSnapshot ,objToSubmit))
    }
    // html return
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
                <div className='input-container'>
                    <input type='email' className={isEmailValid ? null : 'invalidInput'} id='newEmail' placeholder='Enter a new team email' value={emailInputValue} onChange={handleEmailInputChange}/>
                    <button type='button' className='addEmail' onClick={() => handleEmailAddition(emailInputValue)}>Add</button>
                </div>
            </div>
            <div className='radioItems-container'>
                <div className='modalItem'>
                <div>email_on_error</div>
                <div onChange={handleEmailOnError}>
                    <input type='radio' id='email_on_error_yes' name='email_on_error' value='yes' defaultChecked={emailOnError === 'yes' ? true : false} />
                    <label htmlFor='email_on_error_yes'>Yes</label>
                    <input type='radio' id='email_on_error_no' name='email_on_error' value='no' defaultChecked={emailOnError === 'no' ? true : false} />
                    <label htmlFor='email_on_error_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_success</div>
                <div onChange={handleEmailOnSuccess}>
                    <input type='radio' id='email_on_success_yes' name='email_on_success' value='yes' defaultChecked={emailOnSuccess === 'yes' ? true : false} />
                    <label htmlFor='email_on_success_yes'>Yes</label>
                    <input type='radio' id='email_on_success_no' name='email_on_success' value='no' defaultChecked={emailOnSuccess === 'no' ? true : false} />
                    <label htmlFor='email_on_success_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_discarded</div>
                <div onChange={handleEmailOnDiscarded}>
                    <input type='radio' id='email_on_discarded_yes' name='email_on_discarded' value='yes' defaultChecked={emailOnDiscarded === 'yes' ? true : false} />
                    <label htmlFor='email_on_discarded_yes'>Yes</label>
                    <input type='radio' id='email_on_discarded_no' name='email_on_discarded' value='no' defaultChecked={emailOnDiscarded === 'no' ? true : false} />
                    <label htmlFor='email_on_discarded_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>apply_on_success</div>
                <div onChange={handleApplyOnSuccess}>
                    <input type='radio' id='apply_on_success_yes' name='apply_on_success' value='yes' defaultChecked={applyOnSuccess === 'yes' ? true : false} />
                    <label htmlFor='apply_on_success_yes'>Yes</label>
                    <input type='radio' id='apply_on_success_no' name='apply_on_success' value='no' defaultChecked={applyOnSuccess === 'no' ? true : false} />
                    <label htmlFor='apply_on_success_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_apply</div>
                    <div onChange={handleEmailOnApply}>
                        <input type='radio' id='email_on_apply_yes' name='email_on_apply' value='yes' defaultChecked={emailOnApply === 'yes' ? true : false} />
                        <label htmlFor='email_on_apply_yes'>Yes</label>
                        <input type='radio' id='email_on_apply_no' name='email_on_apply' value='no' defaultChecked={emailOnApply === 'no' ? true : false} />
                        <label htmlFor='email_on_apply_no'>No</label>
                    </div>
            </div>
            <div className='modalItem'>
                <label htmlFor='apply_destroys_tolerance'>apply_destroys_tolerance </label>
                <input type='number' id='apply_destroys_tolerance' name='apply_destroys_tolerance' value={applyDestroysTolerance} onChange={handleDestroysChange} />
            </div>
            <div className='modalItem'>
                <label htmlFor='apply_changes_tolerance'>apply_changes_tolerance </label>
                <input type='number' id='apply_changes_tolerance' name='apply_changes_tolerance' value={applyChangesTolerance} onChange={handleChangesChange} />
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