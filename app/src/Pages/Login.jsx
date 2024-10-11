

const Login = () => {
  return (
    <>
     <div>
        <h1>Login</h1>
        <form>
          <div>
            <input 
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              required
            />
          </div>
        </form>
     </div>
    </>
  )
}

export default Login