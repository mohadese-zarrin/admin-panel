import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// import Loading from '../../base/loading'
// import { Button, Input } from '../../components'
import api from '../../../tools/API'
import config from '../../../tools/Globals'
import { useHistory } from 'react-router-dom'

function Login() {
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        error: ""
    })
    const history = useHistory()

    const onchangeInputs = (e) => {
        const { name, value } = e.target
        setInfo({
            ...info,
            [name]: value,
            [`${name}Error`]: ''
        })
    }

    const handleValidation = (callback) => {
        let isValid = true
        const { email, password } = info
        if (!email) {
            isValid = false;
            setInfo({
                ...info,
                emailError: 'ایمیل را وارد کنید'
            })
        } else if (!password) {
            isValid = false
            setInfo({
                ...info,
                passwordError: 'پسورد را وارد کنید'
            })
        }
        return (callback(isValid))
    }

    const handleSendLoginReq = () => {
        const body = { email: info.email, password: info.password }
        api.login(body).then(response => {
            let user = { token:response.data }
            config.setAuth(response.data)
            console.log(response,'login res')
            history.push('/dashbord')
        }).catch(e => {
            console.log(e.response)
            if (e.response.data.data) {
                setInfo({
                    ...info,
                    error: e.response.data.data.message
                })
            }
        })
    }

    const handlePressLogin = () => {
        handleValidation(isValid => {
            if (isValid) {
                handleSendLoginReq()
            }
        })
    }
    console.log(localStorage.getItem('user'))
    return (
        <div className='login-page'>
            <div style={{background:'#9ef0dc',borderRadius:16,padding:12,justifyContent:'center'}}>
                <div className='input-field-header'>
                    <span>شناسه کاربری</span>
                    <div md='6'>
                        <input type="text" name='email' value={info.email} onChange={onchangeInputs} className='ltr-text' error={info.emailError} />
                    </div>
                </div>
                <div className='input-field-header'>
                    <span>رمز عبور</span>
                    <div md='6'>
                        <input type="password" name='password' value={info.password} onChange={onchangeInputs} className='ltr-text' error={info.passwordError} />
                    </div>
                </div>
                <button value='ورود' label='ورود' onClick={handlePressLogin} >ورود</button>
            </div>


            {/* <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCard className="p-4 border-cart d-flex justify-content-center">
              <CCardHeader className="d-flex flex-column align-items-center main-border">
                <h5 className='main-text'>ورود به پنل کاربری</h5>
              </CCardHeader>
              <CCardBody className='px-md-5'>
                <CRow className='justify-content-between align-items-center my-3 mx-0'>
                  <span>شناسه کاربری</span>
                  <CCol md='6'>
                    <Input type="text" name='email' value={info.email} onChange={onchangeInputs} className='ltr-text' error={info.emailError} />
                  </CCol>
                </CRow>
                <CRow className='justify-content-between align-items-center my-3 mx-0'>
                  <span>رمز عبور</span>
                  <CCol md='6'>
                    <Input type="password" name='password' value={info.password} onChange={onchangeInputs} className='ltr-text'error={info.passwordError} />
                  </CCol>
                </CRow>
                {info.error && <span className='error-text'>{info.error}</span>}
               
                <CRow className='justify-content-center mx-0'>
                  <CCol md="4" className='mt-3'>
                    <Button theme='gradiant' label='ورود' onClick = {handlePressLogin} />
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer> */}
            {/* {loading && <Loading />} */}
        </div>
    )
}

export default Login
