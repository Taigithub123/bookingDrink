import React, { Component } from 'react'
import { LoginService } from '../Service/Loginservice.js'
import { Input } from "reactstrap";

class Login1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            errorUsername: false,
            errorPassword: false,
            isSubmitting: false,
        }
    }

    handlePhoneNumber = (event) => {
        this.setState({ username: event.target.value, errorUsername: false })
    };

    handlePassword = (event) => {
        this.setState({ password: event.target.value, errorPassword: false })
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.username === null) {
            this.setState({ errorUsername: true })
        }
        if (this.state.password === null) {
            this.setState({ errorPassword: true })
        }
        if (this.state.username && this.state.password) {
            this.setState({ isSubmitting: true });
            console.log(this.state.username, this.state.password);
            let [success, body] = await LoginService.login(this.state.username, this.state.password);

            if (success) {
                this.setState({ isSubmitting: false });
                let token = body.data.access;
                let refreshToken = body.data.access;
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                let [access, data] = await LoginService.getProvider();
                if (access) {
                    if (data.data.role_name === 'admin') {
                        window.location = '#/active';
                    } else {
                        console.log('Bạn không có quyền truy cập vào trang web này');
                    }
                } else {
                    console.log(body && body.message);
                }
                /*this.setState({phoneNumber: '', password:''});
                window.location = '#/active';*/
            } else {
                if (body && body.errorCode === 401) {
                    // Toast.Fail('Tên đăng nhập và mật khẩu không tồn tại');
                    console.log('Tên đăng nhập và mật khẩu không tồn tại')
                } else {
                    console.log(body && body.message);
                }
                this.setState({ isSubmitting: false });
                //this.setState({isSubmitting: false, phoneNumber: '', password:''});

            }
        }
    };
    render() {
        const { errorUsername, errorPassword, isSubmitting } = this.state;
        return (
            <div className='login-background'>
                <div className='login-content'>
                    <p className='header-text'>Đăng nhập</p>
                    <form onSubmit={this.handleSubmit}>
                        <div className='input-login-content'>
                            <Input
                                className='input-login'
                                placeholder='Tên đăng nhập'
                                value={this.state.phoneNumber}
                                onChange={this.handlePhoneNumber}
                            />
                            {errorUsername &&
                                <div className='error-text'>Bạn chưa nhập tên đăng nhập</div>
                            }
                        </div>
                        <div className='input-login-content input-password'>
                            <Input
                                type='password'
                                className='input-login'
                                placeholder='Mật khẩu'
                                value={this.state.password}
                                onChange={this.handlePassword}
                            />
                            {errorPassword &&
                                <div className='error-text'>Hãy nhập password</div>
                            }
                        </div>
                        <a className="forget-password" href="#/forget-password">Quên mật khẩu</a><br />
                        <button className='button-submit' disabled={isSubmitting}>ĐĂNG NHẬP</button>
                    </form>
                </div>
                <div className="footer-ims">
                    <div className="footer-content">
                        <a className="text" href="#/contacts">Contact Us</a>
                        <a className="text" href="#/helps">Helps</a>
                        <a className="text" href="#/termsofuse">Terms of Use</a>
                        <a className="text-policy" href="#/privacy-policy">Privacy policy </a>
                    </div>
                </div>
            </div>
        )
    }

}
export default Login1;
