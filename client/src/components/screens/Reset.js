import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
const Reset = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const PostData = () => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            )
        ) {
            M.toast({ html: 'invalid email', classes: '#c62828 red darken-3' });
            return;
        }
        fetch('/reset-password', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({
                        html: data.error,
                        classes: '#c62828 red darken-3',
                    });
                } else {
                    M.toast({
                        html: data.message,
                        classes: '#43a047 green darken-1',
                    });
                    history.push('/signin');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="d--flex justify-content--center align-items--center mt--4">
            <div className="form">
                <h1 className="form__title">LiVi</h1>
                <div className="form__ele">
                    <input
                        type="text"
                        placeholder="Email"
                        className="form__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form__ele">
                    <button
                        className="btn btn__login"
                        onClick={() => PostData()}
                    >
                        Đặt lại mật khẩu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reset;
