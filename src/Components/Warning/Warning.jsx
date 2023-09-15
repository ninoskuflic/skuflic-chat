import React, { useState, useReducer } from 'react'
import Modal from 'react-bootstrap/Modal';

export default function Feedback() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    let tosAccepted = getCookie('Skuflic-Chat-Terms-Accepted');

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
        forceUpdate()
    }

    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    return (
        <>
            {!tosAccepted &&
                <Modal show={show} onHide={handleClose} centered className='warning' backdrop='static' style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(5px)' }}>
                    <p>We take no responsibility for the opinions expressed in this chat room. We are unable to check any facts and therefore cannot attest to the accuracy of information contained in any discussion thread. Users of this chat room shall remain solely responsible for the content of their communications. We urge you not to use language that may be offensive to others, promote violence or negative issues, advertise products or services, or infringe anyone else's intellectual property or proprietary rights (including trademarks, copyright, or rights of publicity or privacy) or to give out personal information. Wereserve the right, but not the obligation, to monitor the content of this chat room and to remove, refuse to post or edit any material or content which we, in our sole discretion, determine to be objectionable. We, our affiliates and assignees may use, reproduce, publish, distribute, store and archive such messages in whole or in part in any form or medium whatsoever, without compensation of any sort. Users of this chat room acknowledge and agree that any material downloaded or otherwise obtained through the use of the chat room is at the user's own discretion and risk, and that such user will be solely responsible for any damage to computer systems or loss of data that may result from the download of any such material. All users under 18 should participate in this chat room under the supervision of their parents. If you DO NOT AGREE with this Terms and Conditions, please EXIT the site immediately. Conversations may be recorded and monitored.</p>
                    <div onClick={() => { setCookie('Skuflic-Chat-Terms-Accepted', 'true', 7); setShow(false) }} className='accept'>I accept the Terms and Conditions</div>
                </Modal>
            }
        </>
    )
}