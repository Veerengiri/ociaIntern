import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile(props) {
    const { isadmin, ai } = props;
    const nav = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    let adminid = ai;
    const [newpass, setNewpass] = useState("");
    const [cp, setCp] = useState("");
    const getadmin = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:7000/api/getmalik/${adminid}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();

        setName(data.admin.name);
        setEmail(data.admin.email);
        setMobileNo(data.admin.mobileNo);

    }
    const update = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:7000/api/updateadmin`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                adminid,
                name,
                mobileNo,
            })
        })
        const data = await response.json();
        alert(data.status);
        document.getElementById('showprofile').click();
        document.getElementById('updateuser').style.display = "none";
        document.getElementById('profileinfo').style.display = "unset";
    }
    const changepass = async (e) => {
        e.preventDefault();
        if (newpass != cp) {
            alert("password not matched");
            return;
        }
        const response = await fetch(`http://localhost:7000/api/addmincp/${email}/${newpass}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await response.json();
        alert(data.status);
        document.getElementById('closecp').click();
    }
    const openchangepass = async (e) => {
        e.preventDefault();
        document.getElementById('updateuser').style.display = "none";
        document.getElementById('profileinfo').style.display = "none";
        document.getElementById('changepass').style.display = "unset";
    }
    const closeupdate = (e) => {
        e.preventDefault();
        document.getElementById('updateuser').style.display = "none";
        document.getElementById('profileinfo').style.display = "unset";
        document.getElementById('changepass').style.display = "none";
    }
    const updateprofile = async (e) => {
        e.preventDefault();
        document.getElementById('updateuser').style.display = "unset";
        document.getElementById('profileinfo').style.display = "none";
    }
    useEffect(() => {
        if (!isadmin) {
            nav('/');
        }
        document.getElementById('showprofile').click();
        document.getElementById('updateuser').style.display = "none";
        document.getElementById('profileinfo').style.display = "unset";
        document.getElementById('changepass').style.display = "none";
    }, [])

    return (
        <div className='mainlogin'>
            <button id='showprofile' style={{ display: "none" }} onClick={getadmin}>getadmin</button>

            <form id='updateuser' className='profileinfo login' style={{ padding: "10px 0px" }}  onSubmit={update}>
                <div style={{ marginTop: "30px" }}>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
                    <input type="text" value={mobileNo} onChange={(e) => { setMobileNo(e.target.value) }} /><br />
                    <span>

                    <button className='btns' type="submit">update</button>
                    <button className='btns' onClick={closeupdate}>close</button>
                    </span>

                </div>
            </form>


            <form style={{ padding: "30px 20px" }}  id='changepass' className='profileinfo login' onSubmit={changepass}>
                {/* <h3>Enter new password</h3> */}
                <div style={{ marginTop: "30px" }}>

                <input placeholder='Enter New Password' type="text" value={newpass} onChange={(e) => { setNewpass(e.target.value) }} /><br />
                <input placeholder='Confirm password' type="text" value={cp} onChange={(e) => { setCp(e.target.value) }} /><br />
                <span>

                <button className='btns' type="submit">change</button>
                <button className='btns' id='closecp' onClick={closeupdate} >close</button>
                </span>
                </div>
            </form>
            <div id='profileinfo' style={{ padding: "60px 20px" }} className='profileinfo'>

                <p style={{ marginTop: "0" }}><span> Name :</span>  {name} </p>
                <p><span> Email :</span>  {email} </p>
                <p><span> MobileNo :</span>  {mobileNo}</p>
                <span>

                <button className='btns' onClick={updateprofile}>update profile</button>
                <button className='btns' onClick={openchangepass}>change password</button>
                </span>
            </div>
        </div>
    )
}

export default Profile
