import React, { useState } from "react";
import Window from './styled';
import { PageHeader, Input, Button } from "antd";

export default function LogInWindow(props) {
    //const [ isLogged, setIsLogged ] = useState(false);
    const [ username, setUsername ] = useState();
    const [ password, setPassword ] = useState();

    function loginWindowRender() {
        if(props.child === 'Log In') {
            return (
                <div>
                    <Window>
                        <PageHeader
                            title='Log in'
                            subTitle='Input your login and password'
                        />
                        <Input
                            id='usernameInput_LoginWindow'
                            size='large'
                            placeholder='Login'
                            onChange={
                                () => {
                                    setUsername(document.getElementById('usernameInput_LoginWindow').value)
                                }
                            }
                        />
                        <Input
                            id='passwordInput_LoginWindow'
                            size='large'
                            placeholder='Password'
                            type='password'
                            onChange={
                                () => {
                                    setPassword(document.getElementById('passwordInput_LoginWindow').value)
                                }
                            }
                        />
                        <Button
                            onClick={() => { props.userLogIn(username, password) }}
                            style={{'max-width': '100px'}}
                            type='primary'>{props.child}
                        </Button>
                    </Window>
                </div>
            )
        }
    }

    return(
        loginWindowRender()
    )
}