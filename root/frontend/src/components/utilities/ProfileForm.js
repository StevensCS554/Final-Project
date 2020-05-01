import React from 'react';
import profile from '../../images/team-bg.jpeg';

export default function ProfileForm() {
    return (
        <div id='profile-form-container'>
            <div id='profile-form'>
                <div id='profile-form-pic'>
                    <img src={profile} />
                    <input type='submit' />
                </div>
                <form id='profile-form-f'>
                    <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' />
                    </div>
                    <div className='form-group' id='gender-input'>
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender">
                            <option value="male">Male</option>
                            <option value="female" selected>Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='form-group' id='age-input'>
                        <label htmlFor='age'>Age</label>
                        <input type='number' name='age' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='cellphone'>Cell Phone</label>
                        <input type='tel' name='cellphone' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bio'>Bio</label>
                        <input type='tel' name='bio' />
                    </div>
                    
                    <button className='submit-button' type='submit'>SAVE CHANGES</button>
                </form>
            </div>
        </div>
    )
}
