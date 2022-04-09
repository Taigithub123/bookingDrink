// import React from 'react'
// import { useState, useEffect } from 'react-dom';

// import {
//     Card,
//     CardTitle,
//     Button,
//     Input,
//     FormGroup,
//     Label,
//     Form,
//     Row,
// } from "reactstrap";
// function Login() {

//     const [userName, setUserName] = useState("");
//     const [password, setPassword] = useState("");



//     useEffect(() => {
//         const lg = async (username, password) => {
//             let response
//             let options = {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     "username": username,
//                     "password": password

//                 }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                     device_token: localStorage.getItem('deviceToken') ? localStorage.getItem('deviceToken') : '',
//                 },
//             };
//             let url = 'api/auth/signin';
//             try {
//                 response = await fetch(url, options);
//                 let body = await response.json();
//                 return [body.errorCode === 0, body];
//                 console.log('body' + body)
//             }
//             catch (error) {
//                 console.log(error);
//                 return [false, null];
//             }
//             console.log('url' + url)
//             console.log('options' + options)
//             console.log('response' + response)

//         };
//         lg(userName, password);
//     }, []);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // let data = await lg(userName, password);
//         // console.log(data);

//     }
//     return (
//         <Row>
//             <Card>
//                 <CardTitle tag="h3" className="border-bottom p-3 mb-0">
//                     <i className="bi bi-bell me-2"> </i>
//                     Đăng nhập
//                 </CardTitle>
//                 <Form onSubmit={handleSubmit} >
//                     <FormGroup>
//                         <Label
//                             for="exampleEmail"
//                         >
//                             Tên đăng nhập
//                         </Label>
//                         <Input
//                             id="userName"
//                             name="userName"
//                             placeholder="Tên đăng nhập"
//                             type="email"
//                             onChange={(e) => setUserName(e.target.value)}
//                             value={userName}
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label
//                             for="examplePassword"
//                         >
//                             Password
//                         </Label>
//                         <Input
//                             id="password"
//                             name="password"
//                             placeholder="mật khẩu"
//                             type="password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                         />
//                     </FormGroup>
//                     <Button>
//                         Đăng nhập
//                     </Button>
//                 </Form>
//             </Card>
//         </Row>
//     )
// }

// export default Login