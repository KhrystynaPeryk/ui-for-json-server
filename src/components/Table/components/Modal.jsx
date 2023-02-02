import './Modal.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../../../redux/actions/actions';

const Modal = () => {
    const dispatch = useDispatch();
    // const stateCourses = useSelector((state) => state.courses.courses);

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
            <div><b>Edit an item:</b></div>
            <div className='infoItems'>
                Name and ID
            </div>
            <div className='infoItems'>
                <span>Team email(s):   </span>
                <span className='email-box'>oleksandr.peryk@adia.ae <span className='redCross'>×</span></span>
                <div className='input-container'>Enter a new email: 
                    <input type='email' id='newEmail'/>
                </div>
            </div>
            <div className='radioItems-container'>
                <div className='modalItem'>
                <div>email_on_error</div>
                <div>
                    <input type='radio' id='email_on_error_yes' name='email_on_error' value='yes' />
                    <label htmlFor='email_on_error_yes'>Yes</label>
                    <input type='radio' id='email_on_error_no' name='email_on_error' value='no' />
                    <label htmlFor='email_on_error_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_success</div>
                <div>
                    <input type='radio' id='email_on_success_yes' name='email_on_success' value='yes' />
                    <label htmlFor='email_on_success_yes'>Yes</label>
                    <input type='radio' id='email_on_success_no' name='email_on_success' value='no' />
                    <label htmlFor='email_on_success_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_discarded</div>
                <div>
                    <input type='radio' id='email_on_discarded_yes' name='email_on_discarded' value='yes' />
                    <label htmlFor='email_on_discarded_yes'>Yes</label>
                    <input type='radio' id='email_on_discarded_no' name='email_on_discarded' value='no' />
                    <label htmlFor='email_on_discarded_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>apply_on_success</div>
                <div>
                    <input type='radio' id='apply_on_success_yes' name='apply_on_success' value='yes' />
                    <label htmlFor='apply_on_success_yes'>Yes</label>
                    <input type='radio' id='apply_on_success_no' name='apply_on_success' value='no' />
                    <label htmlFor='apply_on_success_no'>No</label>
                </div>
            </div>
            <div className='modalItem'>
                <div>email_on_apply</div>
                    <div>
                        <input type='radio' id='email_on_apply_yes' name='email_on_apply' value='yes' />
                        <label htmlFor='email_on_apply_yes'>Yes</label>
                        <input type='radio' id='email_on_apply_no' name='email_on_apply' value='no' />
                        <label htmlFor='email_on_apply_no'>No</label>
                    </div>
            </div>
            <div className='modalItem'>
                <label htmlFor='apply_destroys_tolerance'>apply_destroys_tolerance </label>
                <input type='number' id='apply_destroys_tolerance' name='apply_destroys_tolerance'></input>
            </div>
            <div className='modalItem'>
                <label htmlFor='apply_changes_tolerance'>apply_changes_tolerance </label>
                <input type='number' id='apply_changes_tolerance' name='apply_changes_tolerance'></input>
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